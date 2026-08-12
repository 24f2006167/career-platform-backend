"""
Nexvora Submission Worker

This background worker:
1. Polls the submission queue (Redis list)
2. Executes code via the sandbox
3. Updates submission record in PostgreSQL
4. Publishes result to WebSocket channel

Run this as a separate process:
    python -m app.services.judge.worker

For production, use supervisor, systemd, or Docker to manage this process.
"""

import json
import time
import logging
import os
from datetime import datetime

# Try to import Redis (graceful fallback)
try:
    import redis
    REDIS_AVAILABLE = True
except ImportError:
    REDIS_AVAILABLE = False

from app.services.judge.sandbox import evaluate_solution
from app.core.database import SessionLocal
from app.models.submission import Submission
from app.models.problem import Problem
from app.models.test_case import TestCase
from app.models.user import User

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
SUBMISSION_QUEUE = "nexvora:submission_queue"
RESULT_CHANNEL_PREFIX = "nexvora:result:"


def get_redis_client():
    """Get Redis client with graceful fallback."""
    if not REDIS_AVAILABLE:
        return None
    try:
        client = redis.from_url(REDIS_URL, decode_responses=True)
        client.ping()
        return client
    except Exception as e:
        logger.warning(f"Redis unavailable: {e}. Worker will poll database directly.")
        return None


def process_submission(submission_id: str, redis_client=None) -> None:
    """
    Process a single submission:
    1. Load submission + problem + test cases from DB
    2. Execute code via sandbox
    3. Save result back to DB
    4. Notify via Redis pub/sub
    """
    db = SessionLocal()
    try:
        # Load submission
        submission = db.query(Submission).filter(
            Submission.id == submission_id
        ).first()

        if not submission:
            logger.error(f"Submission {submission_id} not found")
            return

        # Mark as running
        submission.status = "running"
        db.commit()

        # Load problem + test cases
        problem = db.query(Problem).filter(Problem.id == submission.problem_id).first()
        if not problem:
            submission.status = "runtime_error"
            submission.error_message = "Problem not found"
            db.commit()
            return

        test_cases = db.query(TestCase).filter(
            TestCase.problem_id == submission.problem_id
        ).order_by(TestCase.order_index).all()

        if not test_cases:
            submission.status = "runtime_error"
            submission.error_message = "No test cases configured"
            db.commit()
            return

        # Prepare test case data
        tc_data = [
            {
                "input": tc.input_data,
                "expected_output": tc.expected_output,
                "is_hidden": tc.is_hidden,
            }
            for tc in test_cases
        ]

        logger.info(
            f"Executing submission {submission_id} | "
            f"lang={submission.language} | "
            f"problem={problem.slug} | "
            f"test_cases={len(tc_data)}"
        )

        # Run code through sandbox
        result = evaluate_solution(
            code=submission.code,
            language=submission.language,
            test_cases=tc_data,
        )

        # Update submission record
        submission.status = result["status"]
        submission.runtime_ms = result["runtime_ms"]
        submission.test_cases_passed = result["passed"]
        submission.total_test_cases = result["total"]
        submission.test_results = result["test_results"]
        submission.score = (result["passed"] / result["total"] * 100) if result["total"] > 0 else 0

        # Update problem stats
        problem.total_submissions += 1
        if result["status"] == "accepted":
            problem.total_accepted += 1
            # Update user stats
            user = db.query(User).filter(User.id == submission.user_id).first()
            if user:
                user.problems_solved += 1
                difficulty = problem.difficulty.lower()
                if difficulty == "easy":
                    user.easy_solved += 1
                    user.nexvora_rating = min(3000, user.nexvora_rating + 8)
                elif difficulty == "medium":
                    user.medium_solved += 1
                    user.nexvora_rating = min(3000, user.nexvora_rating + 15)
                elif difficulty == "hard":
                    user.hard_solved += 1
                    user.nexvora_rating = min(3000, user.nexvora_rating + 30)

        if problem.total_submissions > 0:
            problem.acceptance_rate = (problem.total_accepted / problem.total_submissions) * 100

        db.commit()
        db.refresh(submission)

        logger.info(
            f"Submission {submission_id} complete | "
            f"status={result['status']} | "
            f"passed={result['passed']}/{result['total']} | "
            f"runtime={result['runtime_ms']}ms"
        )

        # Notify via Redis pub/sub
        if redis_client:
            channel = f"{RESULT_CHANNEL_PREFIX}{submission_id}"
            payload = {
                "submission_id": str(submission_id),
                "status": result["status"],
                "passed": result["passed"],
                "total": result["total"],
                "runtime_ms": result["runtime_ms"],
                "score": submission.score,
                "test_results": result["test_results"],
            }
            redis_client.publish(channel, json.dumps(payload))
            logger.info(f"Published result to {channel}")

    except Exception as e:
        logger.error(f"Error processing submission {submission_id}: {e}", exc_info=True)
        if db:
            try:
                sub = db.query(Submission).filter(Submission.id == submission_id).first()
                if sub:
                    sub.status = "runtime_error"
                    sub.error_message = str(e)[:500]
                    db.commit()
            except Exception:
                pass
    finally:
        db.close()


def run_worker():
    """Main worker loop — polls Redis queue for submissions."""
    logger.info("🚀 Nexvora Judge Worker starting...")
    redis_client = get_redis_client()

    if redis_client:
        logger.info(f"✅ Redis connected: {REDIS_URL}")
        logger.info(f"📥 Listening on queue: {SUBMISSION_QUEUE}")
    else:
        logger.warning("⚠️  Redis not available — falling back to pending-submission polling")

    while True:
        try:
            if redis_client:
                # Blocking pop from Redis queue (waits up to 5s)
                result = redis_client.blpop(SUBMISSION_QUEUE, timeout=5)
                if result:
                    _, submission_id = result
                    logger.info(f"📨 Got submission from queue: {submission_id}")
                    process_submission(submission_id, redis_client)
            else:
                # Fallback: poll database for pending submissions
                db = SessionLocal()
                try:
                    pending = db.query(Submission).filter(
                        Submission.status == "pending"
                    ).limit(5).all()

                    for sub in pending:
                        process_submission(str(sub.id), None)

                    if not pending:
                        time.sleep(2)
                finally:
                    db.close()

        except KeyboardInterrupt:
            logger.info("Worker shutting down...")
            break
        except Exception as e:
            logger.error(f"Worker error: {e}", exc_info=True)
            time.sleep(1)


if __name__ == "__main__":
    run_worker()
