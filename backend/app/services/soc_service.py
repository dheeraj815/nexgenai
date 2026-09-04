from typing import Dict, Any

class SocService:
    def evaluate_triage(self, incident_title: str, severity: str, triage_notes: str, containment: str) -> Dict[str, Any]:
        score = 75.0
        feedback = []

        if len(triage_notes) > 40:
            score += 15.0
            feedback.append("Excellent root-cause indicator analysis.")
        else:
            feedback.append("Provide deeper indicator analysis in triage notes.")

        if "isolate" in containment.lower() or "block" in containment.lower() or "revoke" in containment.lower():
            score += 10.0
            feedback.append("Decisive containment strategy applied.")
        else:
            feedback.append("Containment strategy should include immediate host isolation or token revocation.")

        final_score = min(100.0, score)
        return {
            "score": final_score,
            "passed": final_score >= 70.0,
            "feedback": " ".join(feedback),
            "recommendation": "Maintain audit log preservation during live forensic capture."
        }

soc_service = SocService()
