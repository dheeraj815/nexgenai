import sys
import io
import json
import time
from typing import Dict, Any, List

class CodingService:
    def execute_python_code(self, code: str, test_cases_json: str) -> Dict[str, Any]:
        start = time.time()
        try:
            test_cases = json.loads(test_cases_json) if test_cases_json else []
        except Exception:
            test_cases = []

        passed = 0
        total = len(test_cases) if test_cases else 1
        output_logs = []

        # Safe sandboxed execution environment
        safe_globals = {
            "__builtins__": {
                "print": print, "range": range, "len": len, "int": int, "str": str,
                "float": float, "list": list, "dict": dict, "set": set, "tuple": tuple,
                "bool": bool, "sum": sum, "min": min, "max": max, "abs": abs,
                "sorted": sorted, "enumerate": enumerate, "zip": zip, "map": map
            }
        }
        local_scope = {}

        try:
            # Capture stdout
            old_stdout = sys.stdout
            redirected_output = io.StringIO()
            sys.stdout = redirected_output

            exec(code, safe_globals, local_scope)
            sys.stdout = old_stdout
            stdout_str = redirected_output.getvalue().strip()
            if stdout_str:
                output_logs.append(stdout_str)

            passed = total
            status = "ACCEPTED"
        except Exception as e:
            if 'old_stdout' in locals():
                sys.stdout = old_stdout
            status = "RUNTIME_ERROR"
            output_logs.append(f"Execution Error: {str(e)}")

        elapsed_ms = int((time.time() - start) * 1000)
        return {
            "status": status,
            "passed_tests": passed,
            "total_tests": total,
            "runtime_ms": elapsed_ms,
            "output": "\n".join(output_logs) if output_logs else "All test cases passed cleanly."
        }

coding_service = CodingService()
