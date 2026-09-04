from typing import List, Dict, Any

class ReadinessService:
    def calculate(self, skills_count: int, verified_skills: int, projects_count: int, assessments_passed: int, has_resume: bool, has_github: bool) -> Dict[str, Any]:
        skills_score = min(25.0, (skills_count * 2.0) + (verified_skills * 5.0))
        projects_score = min(25.0, projects_count * 10.0)
        assessments_score = min(20.0, assessments_passed * 10.0)
        resume_score = 15.0 if has_resume else 0.0
        github_score = 15.0 if has_github else 0.0

        total = round(skills_score + projects_score + assessments_score + resume_score + github_score, 1)

        recommendations = []
        if verified_skills < 2:
            recommendations.append("Submit project or assessment evidence to verify at least 2 claimed skills.")
        if projects_count < 2:
            recommendations.append("Build and link at least 2 domain-aligned projects with GitHub repositories.")
        if assessments_passed < 1:
            recommendations.append("Take a domain skill assessment to validate your core competencies.")
        if not has_resume:
            recommendations.append("Upload and run an ATS scan on your resume in the Preparation Center.")

        return {
            "overall_score": total,
            "breakdown": {
                "skills": round(skills_score, 1),
                "projects": round(projects_score, 1),
                "assessments": round(assessments_score, 1),
                "resume": round(resume_score, 1),
                "github": round(github_score, 1)
            },
            "recommendations": recommendations if recommendations else ["Outstanding progress! You meet the standard readiness threshold."]
        }

readiness_service = ReadinessService()
