"""
Nexvora Code Sandbox — Phase 1 (Subprocess-based, no Docker required yet)

This implements a secure code execution sandbox using:
- subprocess with strict resource limits via resource module
- Timeout enforcement via threading
- Output size limits
- Isolated temp directory per execution

Phase 2 upgrade path: wrap each execution in a Docker container
for full network + filesystem isolation.
"""

import subprocess
import tempfile
import os
import sys
import time
import threading
import resource
from dataclasses import dataclass
from typing import Optional


@dataclass
class ExecutionResult:
    stdout: str
    stderr: str
    exit_code: int
    runtime_ms: int
    memory_kb: int
    timed_out: bool
    error: Optional[str] = None


# Language configurations
LANGUAGE_CONFIG = {
    "python": {
        "extension": ".py",
        "compile_cmd": None,  # interpreted
        "run_cmd": [sys.executable, "-u"],
        "timeout_s": 5,
        "memory_limit_mb": 256,
    },
    "javascript": {
        "extension": ".js",
        "compile_cmd": None,
        "run_cmd": ["node"],
        "timeout_s": 5,
        "memory_limit_mb": 256,
    },
    "cpp": {
        "extension": ".cpp",
        "compile_cmd": ["g++", "-O2", "-o", "{output}"],
        "run_cmd": ["{output}"],
        "timeout_s": 3,
        "memory_limit_mb": 256,
    },
    "java": {
        "extension": ".java",
        "compile_cmd": ["javac"],
        "run_cmd": ["java", "Solution"],
        "timeout_s": 10,
        "memory_limit_mb": 512,
    },
}

# Maximum output size (bytes)
MAX_OUTPUT_BYTES = 64 * 1024  # 64 KB


def set_limits(memory_limit_mb: int):
    """Set resource limits for the child process (Unix only)."""
    try:
        mem_bytes = memory_limit_mb * 1024 * 1024
        resource.setrlimit(resource.RLIMIT_AS, (mem_bytes, mem_bytes))
        # Limit number of processes
        resource.setrlimit(resource.RLIMIT_NPROC, (64, 64))
        # Limit file size writes
        resource.setrlimit(resource.RLIMIT_FSIZE, (10 * 1024 * 1024, 10 * 1024 * 1024))
    except Exception:
        pass  # resource module may not be available on all platforms


def run_code(
    code: str,
    language: str,
    stdin_input: str = "",
    timeout_s: Optional[int] = None,
    memory_limit_mb: Optional[int] = None,
) -> ExecutionResult:
    """
    Execute code in an isolated subprocess with resource limits.

    Args:
        code: Source code to execute
        language: Programming language ("python", "cpp", "javascript", "java")
        stdin_input: Input to pass via stdin
        timeout_s: Execution timeout in seconds (overrides language default)
        memory_limit_mb: Memory limit in MB (overrides language default)

    Returns:
        ExecutionResult with stdout, stderr, timing, and status
    """
    lang_config = LANGUAGE_CONFIG.get(language.lower())
    if not lang_config:
        return ExecutionResult(
            stdout="",
            stderr="",
            exit_code=1,
            runtime_ms=0,
            memory_kb=0,
            timed_out=False,
            error=f"Unsupported language: {language}",
        )

    effective_timeout = timeout_s or lang_config["timeout_s"]
    effective_memory = memory_limit_mb or lang_config["memory_limit_mb"]

    with tempfile.TemporaryDirectory(prefix="nexvora_sandbox_") as tmpdir:
        # Write source file
        src_filename = f"solution{lang_config['extension']}"
        src_path = os.path.join(tmpdir, src_filename)

        with open(src_path, "w") as f:
            f.write(code)

        binary_path = os.path.join(tmpdir, "solution_bin")

        # Compile if needed (C++, Java)
        if lang_config["compile_cmd"]:
            compile_cmd = [
                c.replace("{output}", binary_path).replace("{source}", src_path)
                for c in lang_config["compile_cmd"]
            ]
            compile_cmd.append(src_path)

            try:
                compile_result = subprocess.run(
                    compile_cmd,
                    capture_output=True,
                    text=True,
                    timeout=30,
                    cwd=tmpdir,
                )
                if compile_result.returncode != 0:
                    return ExecutionResult(
                        stdout="",
                        stderr=compile_result.stderr[:2000],
                        exit_code=compile_result.returncode,
                        runtime_ms=0,
                        memory_kb=0,
                        timed_out=False,
                        error="Compilation Error",
                    )
            except subprocess.TimeoutExpired:
                return ExecutionResult(
                    stdout="",
                    stderr="Compilation timed out",
                    exit_code=1,
                    runtime_ms=0,
                    memory_kb=0,
                    timed_out=False,
                    error="Compilation Timeout",
                )

        # Build run command
        run_cmd = [
            c.replace("{output}", binary_path).replace("{source}", src_path)
            for c in lang_config["run_cmd"]
        ]
        if language == "python":
            run_cmd.append(src_path)
        elif language == "javascript":
            run_cmd.append(src_path)

        # Execute with resource limits
        start_time = time.perf_counter()
        timed_out = False
        proc = None

        try:
            proc = subprocess.Popen(
                run_cmd,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                cwd=tmpdir,
                preexec_fn=lambda: set_limits(effective_memory),
            )

            try:
                stdout_bytes, stderr_bytes = proc.communicate(
                    input=stdin_input.encode("utf-8"),
                    timeout=effective_timeout,
                )
            except subprocess.TimeoutExpired:
                proc.kill()
                proc.wait()
                timed_out = True
                stdout_bytes, stderr_bytes = b"", b"Time Limit Exceeded"

        except Exception as e:
            return ExecutionResult(
                stdout="",
                stderr=str(e),
                exit_code=1,
                runtime_ms=0,
                memory_kb=0,
                timed_out=False,
                error=f"Execution Error: {str(e)}",
            )

        end_time = time.perf_counter()
        runtime_ms = int((end_time - start_time) * 1000)

        # Truncate output to prevent memory bombs
        stdout = stdout_bytes[:MAX_OUTPUT_BYTES].decode("utf-8", errors="replace")
        stderr = stderr_bytes[:MAX_OUTPUT_BYTES].decode("utf-8", errors="replace")

        return ExecutionResult(
            stdout=stdout,
            stderr=stderr,
            exit_code=proc.returncode if proc else 1,
            runtime_ms=runtime_ms,
            memory_kb=0,  # Phase 2: measure via /proc or Docker stats
            timed_out=timed_out,
        )


def evaluate_solution(
    code: str,
    language: str,
    test_cases: list[dict],
    timeout_s: Optional[int] = None,
) -> dict:
    """
    Run code against multiple test cases and return results.

    Args:
        code: Source code
        language: Programming language
        test_cases: List of {"input": str, "expected_output": str, "is_hidden": bool}
        timeout_s: Per-test-case timeout override

    Returns:
        {
            "status": "accepted" | "wrong_answer" | "time_limit_exceeded" | "runtime_error",
            "passed": int,
            "total": int,
            "runtime_ms": int,
            "test_results": [{"passed": bool, "runtime_ms": int, "output": str, "expected": str}],
        }
    """
    results = []
    total_runtime = 0
    passed_count = 0
    final_status = "accepted"

    for tc in test_cases:
        result = run_code(
            code=code,
            language=language,
            stdin_input=tc.get("input", ""),
            timeout_s=timeout_s,
        )

        actual = result.stdout.strip()
        expected = tc.get("expected_output", "").strip()
        is_hidden = tc.get("is_hidden", False)

        if result.timed_out:
            test_status = "time_limit_exceeded"
            final_status = "time_limit_exceeded"
        elif result.exit_code != 0:
            test_status = "runtime_error"
            if final_status == "accepted":
                final_status = "runtime_error"
        elif actual == expected:
            test_status = "passed"
            passed_count += 1
        else:
            test_status = "wrong_answer"
            if final_status == "accepted":
                final_status = "wrong_answer"

        total_runtime += result.runtime_ms

        results.append({
            "passed": test_status == "passed",
            "status": test_status,
            "runtime_ms": result.runtime_ms,
            # Only reveal actual output for public test cases
            "output": actual if not is_hidden else None,
            "expected": expected if not is_hidden else None,
            "error": result.stderr[:500] if result.stderr else None,
        })

    return {
        "status": final_status,
        "passed": passed_count,
        "total": len(test_cases),
        "runtime_ms": total_runtime,
        "test_results": results,
    }
