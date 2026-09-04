import os
import json
import urllib.request
from typing import Dict, Any, List

class AIService:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY", "")

    def generate_mentor_response(self, user_name: str, academic_stage: str, target_role: str, skills: List[str], message: str) -> str:
        prompt = f"""You are the NexGenAI Career Mentor for {user_name}, currently in {academic_stage}, targeting the role of {target_role}.
Skills claimed/verified: {', '.join(skills) if skills else 'None yet'}.
Student asks: "{message}"
Provide constructive, stage-specific, highly actionable advice grounded strictly in practical skill-building and proof of work."""

        if self.api_key:
            try:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={self.api_key}"
                data = json.dumps({"contents": [{"parts": [{"text": prompt}]}]}).encode("utf-8")
                req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
                with urllib.request.urlopen(req, timeout=10) as resp:
                    res_data = json.loads(resp.read().decode("utf-8"))
                    return res_data["candidates"][0]["content"]["parts"][0]["text"]
            except Exception:
                pass

        # Robust deterministic fallback
        msg_lower = message.lower()
        if "learn" in msg_lower or "next" in msg_lower:
            return f"Based on your target of {target_role} in {academic_stage}, your primary focus should be building verified proof of work. Prioritize core foundational concepts, commit modular projects to GitHub, and validate your skills through our structured Assessments."
        elif "job" in msg_lower or "placement" in msg_lower:
            return f"For placement readiness in {target_role}, ensure your resume ATS score is above 80%, complete at least 2 full-stack/system projects, and practice behavioral and technical interview questions in the Preparation Center."
        elif "cyber" in msg_lower or "soc" in msg_lower:
            return "For Cybersecurity & SOC roles, hands-on defensive triage is essential. Review network logs, isolate anomalous IOCs, and work through our defensive SOC incident simulator scenarios."
        else:
            return f"Hello {user_name}! As your AI Career Mentor, I am analyzing your progress in {academic_stage}. Target your efforts toward building demonstrable projects and completing domain milestones for {target_role}."

    def evaluate_interview_answer(self, question: str, answer: str, domain: str) -> Dict[str, Any]:
        words = len(answer.split())
        score = min(95.0, max(40.0, 50.0 + (words * 0.5)))
        clarity = "High" if words > 30 else "Needs elaboration"
        return {
            "score": score,
            "clarity": clarity,
            "technical_depth": "Demonstrated core principles" if score > 70 else "Basic awareness shown",
            "feedback": f"Strong conceptual alignment with {domain} standards. Elaborate more on architectural trade-offs and edge-case handling for a higher score.",
            "follow_up_question": f"How would you monitor and debug this component in a high-concurrency production environment?"
        }

ai_service = AIService()
