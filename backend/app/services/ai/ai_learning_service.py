import os
import json
import re
from typing import Any, Dict, List, Optional

from groq import Groq


AI_MODEL = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")


def get_groq_client():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        return None

    return Groq(api_key=api_key)


def clean_text(value: Optional[str], default: str = "") -> str:
    if value is None:
        return default

    return str(value).strip()


def extract_json(text: str) -> Dict[str, Any]:
    if not text:
        raise ValueError("Empty AI response")

    text = text.strip()

    text = re.sub(r"^```json", "", text, flags=re.IGNORECASE).strip()
    text = re.sub(r"^```", "", text).strip()
    text = re.sub(r"```$", "", text).strip()

    start = text.find("{")
    end = text.rfind("}")

    if start == -1 or end == -1 or end <= start:
        raise ValueError("No JSON object found in AI response")

    return json.loads(text[start : end + 1])


def normalize_learning_response(
    data: Dict[str, Any],
    role: str,
    skill: str,
    concept: str,
    content_type: str,
    source: str,
) -> Dict[str, Any]:
    return {
        "title": clean_text(
            data.get("title"),
            f"Master {concept} in {skill} for {role}",
        ),
        "summary": clean_text(
            data.get("summary"),
            f"A beginner-friendly guide to understand {concept}.",
        ),
        "notes": data.get("notes") if isinstance(data.get("notes"), list) else [],
        "real_world_use": clean_text(
            data.get("real_world_use"),
            f"{concept} helps a {role} solve practical tasks using {skill}.",
        ),
        "practice_tasks": data.get("practice_tasks")
        if isinstance(data.get("practice_tasks"), list)
        else [],
        "interview_questions": data.get("interview_questions")
        if isinstance(data.get("interview_questions"), list)
        else [],
        "coding_questions": data.get("coding_questions")
        if isinstance(data.get("coding_questions"), list)
        else [],
        "exam_questions": data.get("exam_questions")
        if isinstance(data.get("exam_questions"), dict)
        else {"theory": [], "coding": []},
        "source": source,
        "content_type": content_type,
    }


def fallback_learning_content(
    role: str,
    skill: str,
    concept: str,
    content_type: str = "learning",
) -> Dict[str, Any]:
    role = clean_text(role, "Career Role")
    skill = clean_text(skill, "Skill")
    concept = clean_text(concept, "Concept")
    content_type = clean_text(content_type, "learning")

    return {
        "title": f"Master {concept} in {skill} for {role}",
        "summary": f"A complete beginner-friendly chapter to master {concept}.",
        "notes": [
            f"{concept} is an important topic in {skill}. First understand its meaning, then understand where it is used.",
            f"For a {role}, {concept} is useful because it helps solve real work problems.",
            f"Do not memorize only definitions. Understand the logic, syntax, formula, or process behind it.",
            f"Start with small examples, then move to real-world questions.",
            f"Common mistakes happen when students skip basics, use wrong syntax, or do not verify the output.",
            f"To master this topic, revise notes, solve practice questions, and explain the concept in your own words.",
            f"In interviews, explain {concept} with one simple example and one practical use case.",
            f"In projects, use {concept} only after understanding the input, process, and expected output.",
        ],
        "real_world_use": f"A {role} uses {concept} in {skill} to solve job-related tasks, create better outputs, and work confidently in projects.",
        "practice_tasks": [
            {
                "task": f"Explain {concept} in your own words.",
                "hint": f"Think about what {concept} means and why it is used in {skill}.",
                "solution": f"{concept} is a useful concept in {skill}. It helps a {role} solve practical problems by applying the correct method, formula, or logic.",
            },
            {
                "task": f"Create one simple example using {concept}.",
                "hint": "Use a small beginner-level example.",
                "solution": f"Example: A {role} can use {concept} while working on a {skill}-based task. First identify the problem, then apply the correct concept step by step.",
            },
            {
                "task": f"Write two common mistakes students make in {concept}.",
                "hint": "Think about syntax, logic, formula, and wrong assumptions.",
                "solution": f"Two common mistakes are misunderstanding the basic meaning of {concept} and applying it without checking the correct steps or output.",
            },
        ],
        "interview_questions": [
            {
                "question": f"What is {concept}?",
                "answer": f"{concept} is an important topic in {skill} used by {role}s to solve practical problems.",
            },
            {
                "question": f"Why is {concept} important?",
                "answer": f"It is important because it helps in real projects, interviews, and job tasks related to {role}.",
            },
        ],
        "coding_questions": [
            {
                "question": f"Solve one practical task using {concept}.",
                "solution": f"Apply {concept} step by step on a small {skill}-based example and explain the result.",
            }
        ],
        "exam_questions": {
            "theory": [
                f"Define {concept}.",
                f"Explain the importance of {concept}.",
                f"Write two uses of {concept}.",
                f"Write two common mistakes in {concept}.",
                f"Explain {concept} with one example.",
            ],
            "coding": [
                f"Solve one practical question based on {concept}.",
                f"Create one real-world example using {concept}.",
                f"Debug one wrong example related to {concept}.",
            ],
        },
        "source": "fallback_learning_content",
        "content_type": content_type,
    }


def generate_ai_learning_content(
    role: str,
    skill: str,
    concept: str,
    content_type: str = "learning",
) -> Dict[str, Any]:
    role = clean_text(role, "Career Role")
    skill = clean_text(skill, "Skill")
    concept = clean_text(concept, "Concept")
    content_type = clean_text(content_type, "learning")

    client = get_groq_client()

    if not client:
        return fallback_learning_content(role, skill, concept, content_type)

    prompt = f"""
You are Nexvora AI, an expert AI career teacher.

Create a complete BOOK-STYLE learning chapter for a student.

Role: {role}
Skill: {skill}
Concept: {concept}
Content Type: {content_type}

Return ONLY valid JSON in this exact format:

{{
  "title": "",
  "summary": "",
  "notes": [
    "Detailed explanation point 1 with beginner-friendly meaning and example.",
    "Detailed explanation point 2 with syntax/formula/rules.",
    "Detailed explanation point 3 with real use case.",
    "Detailed explanation point 4 with common mistakes.",
    "Detailed explanation point 5 with advanced understanding.",
    "Detailed explanation point 6 with revision shortcut.",
    "Detailed explanation point 7 with interview importance.",
    "Detailed explanation point 8 with project usage."
  ],
  "real_world_use": "",
  "practice_tasks": [
    {{
      "task": "Question 1 for student to solve.",
      "hint": "Small hint only. Do not reveal full answer.",
      "solution": "Full correct solution with explanation."
    }},
    {{
      "task": "Question 2 for student to solve.",
      "hint": "Small hint only. Do not reveal full answer.",
      "solution": "Full correct solution with explanation."
    }},
    {{
      "task": "Question 3 for student to solve.",
      "hint": "Small hint only. Do not reveal full answer.",
      "solution": "Full correct solution with explanation."
    }},
    {{
      "task": "Question 4 for student to solve.",
      "hint": "Small hint only. Do not reveal full answer.",
      "solution": "Full correct solution with explanation."
    }},
    {{
      "task": "Question 5 for student to solve.",
      "hint": "Small hint only. Do not reveal full answer.",
      "solution": "Full correct solution with explanation."
    }}
  ],
  "interview_questions": [
    {{"question": "", "answer": ""}},
    {{"question": "", "answer": ""}},
    {{"question": "", "answer": ""}},
    {{"question": "", "answer": ""}},
    {{"question": "", "answer": ""}}
  ],
  "coding_questions": [
    {{"question": "", "solution": ""}},
    {{"question": "", "solution": ""}},
    {{"question": "", "solution": ""}}
  ],
  "exam_questions": {{
    "theory": ["", "", "", "", ""],
    "coding": ["", "", ""]
  }}
}}

Rules:
- Keep language simple for students.
- Notes must be detailed like a small book chapter.
- Practice tasks must not reveal solution inside task.
- Every practice task must have hint and solution.
- If concept is Excel, include formulas and spreadsheet examples.
- If concept is coding, include code examples.
- If concept is theory, include real-world examples.
- Return only JSON. No markdown.
"""

    try:
        response = client.chat.completions.create(
            model=AI_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": "Return only valid JSON. No markdown. Generate deep student-friendly learning content.",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
            max_tokens=4096,
        )

        result = extract_json(response.choices[0].message.content)

        return normalize_learning_response(
            data=result,
            role=role,
            skill=skill,
            concept=concept,
            content_type=content_type,
            source="groq_book_style_ai",
        )

    except Exception as e:
        print("Groq AI learning failed:", str(e))
        return fallback_learning_content(role, skill, concept, content_type)


def generate_ai_chat_answer(
    role: str,
    skill: str,
    concept: str,
    question: str,
    content_type: str = "learning",
) -> Dict[str, Any]:
    role = clean_text(role, "Career Role")
    skill = clean_text(skill, "Skill")
    concept = clean_text(concept, "Concept")
    question = clean_text(question)
    content_type = clean_text(content_type, "learning")

    client = get_groq_client()

    if not client:
        return {
            "answer": f"""
Let me explain simply.

Your question is:
{question}

This topic belongs to {concept} in {skill}.

Step-by-step:
1. Understand what the question is asking.
2. Identify the correct formula, syntax, or concept.
3. Apply it slowly.
4. Check the final answer.

Example:
If you want to sum a column in Excel, use =SUM(A1:A10).

Common mistake:
Excel formulas must start with =.

Practice:
Try creating one small example using {concept}.
""",
            "source": "fallback_chat",
        }

    prompt = f"""
You are Nexvora AI, a friendly expert teacher.

Student is learning:
Role: {role}
Skill: {skill}
Concept: {concept}
Content Type: {content_type}

Student question:
{question}

Give a complete student-friendly answer.

Rules:
1. Explain like the student is a beginner.
2. First explain the meaning.
3. Then give step-by-step solution.
4. Give exact syntax/formula/code if needed.
5. Give one simple example.
6. Give one real-world use.
7. Mention common mistakes.
8. End with a small practice task.
9. Do not use markdown table.

Return ONLY valid JSON:
{{
  "answer": "full detailed answer"
}}
"""

    try:
        response = client.chat.completions.create(
            model=AI_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": "Return only valid JSON. Give complete, clear, step-by-step learning answers.",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.6,
            max_tokens=2500,
        )

        result = extract_json(response.choices[0].message.content)

        return {
            "answer": clean_text(
                result.get("answer"),
                f"This question is about {concept}. Understand the basic meaning, then apply it step by step.",
            ),
            "source": "groq_ai_chat",
        }

    except Exception as e:
        print("Groq chat failed:", str(e))
        return {
            "answer": f"AI failed, but your question is about {concept}. First understand the basic meaning, then apply it step by step. Question: {question}",
            "source": "fallback_chat",
        }


def check_ai_practice_answer(
    role: str,
    skill: str,
    concept: str,
    question: str,
    expected_solution: str,
    student_answer: str,
    attempt: int,
    content_type: str = "learning",
) -> Dict[str, Any]:
    role = clean_text(role, "Career Role")
    skill = clean_text(skill, "Skill")
    concept = clean_text(concept, "Concept")
    question = clean_text(question)
    expected_solution = clean_text(expected_solution)
    student_answer = clean_text(student_answer)
    content_type = clean_text(content_type, "learning")

    try:
        attempt = int(attempt)
    except Exception:
        attempt = 1

    client = get_groq_client()

    if not client:
        keywords = [
            word.lower()
            for word in expected_solution.split()
            if len(word.strip()) > 4
        ]

        is_correct = len(student_answer) > 20 and any(
            word in student_answer.lower() for word in keywords
        )

        return {
            "correct": is_correct,
            "feedback": (
                "Good attempt. Your answer has some matching idea."
                if is_correct
                else "Not correct yet. Recheck the concept, formula, syntax, and required output."
            ),
            "hint": (
                "Compare your answer with the main logic of the expected solution."
                if attempt < 3
                else "You can reveal the solution now and compare step by step."
            ),
            "mistake": (
                "" if is_correct else "Your answer may be missing key logic or exact steps."
            ),
            "can_reveal": attempt >= 3,
            "source": "fallback_check_answer",
        }

    prompt = f"""
You are Nexvora AI Practice Evaluator.

Student is learning:
Role: {role}
Skill: {skill}
Concept: {concept}
Content Type: {content_type}

Practice Question:
{question}

Expected Solution:
{expected_solution}

Student Answer:
{student_answer}

Attempt Number:
{attempt}

Evaluate the student's answer.

Rules:
- Be strict but helpful.
- If answer is correct or mostly correct, mark correct true.
- If answer is wrong, explain what is missing.
- Give a hint but do not reveal full solution before attempt 3.
- If attempt is 3 or more, set can_reveal true.
- Feedback should guide student like a teacher.
- Return only JSON.

Return JSON exactly:
{{
  "correct": false,
  "feedback": "teacher-style feedback",
  "hint": "small hint without full solution",
  "mistake": "where student is going wrong",
  "can_reveal": false
}}
"""

    try:
        response = client.chat.completions.create(
            model=AI_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": "Return only valid JSON. Evaluate student answers clearly.",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.4,
            max_tokens=1200,
        )

        result = extract_json(response.choices[0].message.content)

        return {
            "correct": bool(result.get("correct", False)),
            "feedback": clean_text(
                result.get("feedback"),
                "Review your answer and compare it with the expected logic.",
            ),
            "hint": clean_text(
                result.get("hint"),
                "Focus on the main concept and required steps.",
            ),
            "mistake": clean_text(
                result.get("mistake"),
                "Possible missing syntax, formula, logic, or explanation.",
            ),
            "can_reveal": bool(result.get("can_reveal", attempt >= 3)),
            "source": "groq_check_answer",
        }

    except Exception as e:
        print("Groq answer check failed:", str(e))

        return {
            "correct": False,
            "feedback": "I could not fully check the answer, but your response may be missing key steps.",
            "hint": "Review the concept notes and compare your logic with the question requirement.",
            "mistake": "Possible missing syntax, formula, logic, or explanation.",
            "can_reveal": attempt >= 3,
            "source": "fallback_check_answer",
        }


generate_ai_learning_chat_answer = generate_ai_chat_answer