import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "HEALTHY"
    assert "NexGenAI" in data["system"]

def test_auth_and_profile_flow():
    # Signup a new student
    email = "teststudent@campus.edu"
    signup_res = client.post("/api/v1/auth/signup", json={
        "email": email,
        "password": "Password@123",
        "role": "STUDENT",
        "full_name": "Rohan Patel",
        "academic_stage": "COLLEGE_YEAR_2"
    })
    assert signup_res.status_code in (200, 400) # 200 or already registered
    
    # Login
    login_res = client.post("/api/v1/auth/login", json={
        "email": email,
        "password": "Password@123"
    })
    assert login_res.status_code == 200
    token = login_res.json()["access_token"]
    assert token is not None

    # Get Me
    headers = {"Authorization": f"Bearer {token}"}
    me_res = client.get("/api/v1/auth/me", headers=headers)
    assert me_res.status_code == 200
    me_data = me_res.json()
    assert me_data["email"] == email
    assert me_data["profile"]["academic_stage"] == "COLLEGE_YEAR_2"

def test_rbac_security_enforcement():
    # Login as student
    login_res = client.post("/api/v1/auth/login", json={
        "email": "student@demo.edu",
        "password": "Demo@123"
    })
    assert login_res.status_code == 200
    student_token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {student_token}"}

    # Student attempting to access admin stats must be rejected with 403 Forbidden
    admin_res = client.get("/api/v1/admin/stats", headers=headers)
    assert admin_res.status_code == 403

def test_30_canonical_domains():
    res = client.get("/api/v1/domains")
    assert res.status_code == 200
    domains = res.json()
    assert len(domains) >= 30
    slugs = [d["slug"] for d in domains]
    assert "ai" in slugs
    assert "fullstack" in slugs
    assert "cybersecurity" in slugs
    assert "cloud" in slugs
    assert "soc" in slugs

def test_academic_journey_stages():
    # Login student
    login_res = client.post("/api/v1/auth/login", json={
        "email": "student@demo.edu",
        "password": "Demo@123"
    })
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    res = client.get("/api/v1/journey", headers=headers)
    assert res.status_code == 200
    journey = res.json()
    stage_ids = [s["id"] for s in journey["stages"]]
    assert "CLASS_11" in stage_ids
    assert "CLASS_12" in stage_ids
    assert "COLLEGE_YEAR_1" in stage_ids
    assert "COLLEGE_YEAR_4" in stage_ids
    assert "INTERNSHIP" in stage_ids

def test_learning_courses():
    res = client.get("/api/v1/learning/courses")
    assert res.status_code == 200
    courses = res.json()
    assert len(courses) > 0
    stages = [c["stage"] for c in courses]
    assert "CLASS_11" in stages or "COLLEGE_YEAR_1" in stages

def test_coding_lab_execution():
    login_res = client.post("/api/v1/auth/login", json={
        "email": "student@demo.edu",
        "password": "Demo@123"
    })
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    problems_res = client.get("/api/v1/coding/problems")
    assert problems_res.status_code == 200
    problems = problems_res.json()
    assert len(problems) > 0
    prob_id = problems[0]["id"]

    exec_res = client.post("/api/v1/coding/execute", json={
        "problem_id": prob_id,
        "language": "python",
        "code": "print('Code executed successfully in sandbox!')"
    }, headers=headers)
    assert exec_res.status_code == 200
    assert exec_res.json()["status"] == "ACCEPTED"

def test_soc_incident_triage():
    login_res = client.post("/api/v1/auth/login", json={
        "email": "student@demo.edu",
        "password": "Demo@123"
    })
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    inc_res = client.get("/api/v1/soc/incidents")
    assert inc_res.status_code == 200
    incidents = inc_res.json()
    assert len(incidents) > 0
    inc_id = incidents[0]["id"]

    triage_res = client.post(f"/api/v1/soc/incidents/{inc_id}/triage", json={
        "incident_id": inc_id,
        "triage_notes": "Observed anomalous PowerShell encoded string invoking external C2 server at 198.51.100.23.",
        "severity_assessment": "HIGH",
        "containment_action": "Isolate host WS-4402 from subnet immediately and revoke Active Directory tokens.",
        "remediation_plan": "Re-image infected endpoint and update EDR behavioral rules."
    }, headers=headers)
    assert triage_res.status_code == 200
    assert triage_res.json()["passed"] is True
    assert triage_res.json()["score"] >= 70.0

def test_resume_ats_scanner():
    login_res = client.post("/api/v1/auth/login", json={
        "email": "student@demo.edu",
        "password": "Demo@123"
    })
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    ats_res = client.post("/api/v1/resumes/scan-ats", json={
        "job_description": "Looking for a Software Engineer with strong Python, FastAPI, Docker, and SQL experience."
    }, headers=headers)
    assert ats_res.status_code == 200
    data = ats_res.json()
    assert "ats_score" in data
    assert "python" in data["matched_keywords"]

def test_ai_career_mentor():
    login_res = client.post("/api/v1/auth/login", json={
        "email": "student@demo.edu",
        "password": "Demo@123"
    })
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    mentor_res = client.post("/api/v1/ai/mentor", json={
        "message": "What should I learn next for placement readiness?"
    }, headers=headers)
    assert mentor_res.status_code == 200
    assert "reply" in mentor_res.json()
    assert len(mentor_res.json()["reply"]) > 20
