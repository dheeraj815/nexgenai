import json
from backend.app.core.database import SessionLocal, Base, engine
from backend.app.core.security import get_password_hash
from backend.app.models.entities import (
    User, Profile, Domain, DomainSkill, Course, Module, Lesson,
    CodingProblem, SocIncident, Organization, Job, PlacementDrive
)

def run_seed():
    print("Beginning NexGenAI production database seed...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # 1. Users & Profiles
    demo_users = [
        {"email": "student11@nexgenai.edu", "role": "STUDENT", "name": "Dheeraj Muley", "stage": "CLASS_11", "target": "Software Engineering & AI Foundations", "cgpa": 9.4, "pwd": "Password@123"},
        {"email": "student12@nexgenai.edu", "role": "STUDENT", "name": "Aarav Sharma", "stage": "CLASS_12", "target": "Web & Systems Engineering", "cgpa": 9.1, "pwd": "Password@123"},
        {"email": "student.y4@nexgenai.edu", "role": "STUDENT", "name": "Vikram Malhotra", "stage": "COLLEGE_YEAR_4", "target": "SDE-1 / Graduate Cloud Engineer", "cgpa": 9.3, "pwd": "Password@123"},
        {"email": "tpo@college.edu", "role": "TPO", "name": "Dr. Ramesh Kulkarni", "stage": "COLLEGE_YEAR_4", "target": "Training & Placement Officer", "cgpa": 9.8, "pwd": "Password@123"},
        {"email": "recruiter@google.com", "role": "RECRUITER", "name": "Sarah Jenkins", "stage": "FIRST_JOB", "target": "Lead University Talent Partner", "cgpa": 9.5, "pwd": "Password@123"},
        {"email": "student@demo.edu", "role": "STUDENT", "name": "Aditya Sharma", "stage": "COLLEGE_YEAR_3", "target": "Full Stack Engineer", "cgpa": 8.8, "pwd": "Demo@123"},
        {"email": "tpo@demo.edu", "role": "TPO", "name": "Dr. Rajesh Verma", "stage": "COLLEGE_YEAR_4", "target": "Training & Placement Officer", "cgpa": 9.5, "pwd": "Demo@123"},
        {"email": "recruiter@techcorp.com", "role": "RECRUITER", "name": "Sarah Jenkins", "stage": "FIRST_JOB", "target": "Lead Talent Partner", "cgpa": 8.0, "pwd": "Demo@123"},
        {"email": "admin@demo.edu", "role": "SUPER_ADMIN", "name": "System Administrator", "stage": "FIRST_JOB", "target": "Platform Admin", "cgpa": 9.0, "pwd": "Demo@123"}
    ]

    for u in demo_users:
        existing = db.query(User).filter(User.email == u["email"]).first()
        if not existing:
            new_u = User(email=u["email"], hashed_password=get_password_hash(u.get("pwd", "Password@123")), role=u["role"])
            db.add(new_u)
            db.flush()
            prof = Profile(
                user_id=new_u.id,
                full_name=u["name"],
                academic_stage=u["stage"],
                target_role=u["target"],
                institution="National Institute of Technology",
                department="Computer Science & Engineering",
                graduation_year=2027,
                cgpa=u["cgpa"],
                is_onboarded=True,
                readiness_score=78.5
            )
            db.add(prof)

    # 2. 30 Canonical Domains
    domains_data = [
        ("Artificial Intelligence", "ai", "Data & AI", "Neural networks, cognitive systems, and intelligence architectures."),
        ("Machine Learning", "ml", "Data & AI", "Supervised, unsupervised algorithms, statistical modeling, and inference."),
        ("Generative AI / LLM Engineering", "genai", "Data & AI", "Large language models, prompt engineering, RAG pipelines, fine-tuning."),
        ("Data Science", "data-science", "Data & AI", "Exploratory data analysis, statistical modeling, feature engineering."),
        ("Software Engineering", "software-engineering", "Core Engineering", "Production software architecture, design patterns, testing."),
        ("Full Stack Development", "fullstack", "Core Engineering", "End-to-end web applications with modern client & server frameworks."),
        ("Backend Engineering", "backend", "Core Engineering", "High-performance microservices, REST/gRPC APIs, distributed systems."),
        ("Frontend Engineering", "frontend", "Core Engineering", "Interactive interfaces, state management, client performance, UI/UX."),
        ("Mobile Development", "mobile", "Core Engineering", "Native & cross-platform iOS and Android mobile engineering."),
        ("Cloud Computing", "cloud", "Infrastructure", "AWS, GCP, Azure infrastructure, serverless, and distributed storage."),
        ("DevOps / SRE", "devops", "Infrastructure", "CI/CD pipelines, containerization, Kubernetes, reliability engineering."),
        ("Cybersecurity", "cybersecurity", "Security", "Defensive security, threat modeling, ethical hacking, secure coding."),
        ("SOC / Security Operations", "soc", "Security", "SIEM triage, log monitoring, incident containment, digital forensics."),
        ("Data Engineering", "data-engineering", "Data & AI", "ETL/ELT data pipelines, data lakes, Spark, distributed processing."),
        ("MLOps", "mlops", "Data & AI", "Automated model deployment, monitoring, feature stores, drift detection."),
        ("Computer Vision", "computer-vision", "Data & AI", "Image recognition, object detection, segmentation with OpenCV & PyTorch."),
        ("NLP", "nlp", "Data & AI", "Text processing, sentiment analysis, transformers, tokenization."),
        ("Robotics", "robotics", "Hardware & Systems", "ROS2, kinematics, embedded control systems, sensor fusion."),
        ("IoT", "iot", "Hardware & Systems", "Connected sensor telemetry, edge computing, MQTT architectures."),
        ("Embedded Systems", "embedded", "Hardware & Systems", "Microcontrollers, RTOS, low-level firmware engineering in C/C++."),
        ("Blockchain / Web3", "blockchain", "Emerging Tech", "Smart contracts, decentralized ledgers, cryptography, Solidity."),
        ("QA / Test Automation", "qa-automation", "Core Engineering", "End-to-end test automation, integration suites, Cypress, Playwright."),
        ("Product Engineering", "product-engineering", "Core Engineering", "Agile velocity, scalable architecture, customer value delivery."),
        ("System Design / Architecture", "system-design", "Core Engineering", "High-level architecture, scalability, CAP theorem, trade-off analysis."),
        ("Database Engineering", "database-engineering", "Data & AI", "Relational indexing, query optimization, NoSQL, replication."),
        ("Business/Data Analytics", "business-analytics", "Business & Product", "Data visualization, Tableau, PowerBI, business metrics."),
        ("FinTech / Quant", "fintech-quant", "Business & Product", "Financial APIs, algorithmic trading algorithms, risk analytics."),
        ("Product Management", "product-management", "Business & Product", "User stories, roadmapping, PRD authoring, product metrics."),
        ("UI/UX Design", "ui-ux", "Design & UX", "User research, wireframing, Figma prototyping, design systems."),
        ("Technical Communication", "tech-communication", "Professional Skills", "API documentation, architecture decision records, stakeholder comms.")
    ]

    for name, slug, cat, desc in domains_data:
        existing = db.query(Domain).filter(Domain.slug == slug).first()
        if not existing:
            dom = Domain(name=name, slug=slug, category=cat, description=desc, icon="Layers")
            db.add(dom)
            db.flush()
            # Seed 3 core skills for each domain
            db.add(DomainSkill(domain_id=dom.id, name=f"{name} Core Principles", level="Beginner"))
            db.add(DomainSkill(domain_id=dom.id, name=f"{name} Practical Architecture", level="Intermediate"))
            db.add(DomainSkill(domain_id=dom.id, name=f"{name} Production Engineering", level="Advanced"))

    # 3. Stage-Aligned Courses
    sample_domain = db.query(Domain).filter(Domain.slug == "software-engineering").first()
    dom_id = sample_domain.id if sample_domain else None

    stage_courses = [
        ("CLASS_11", "Computational Thinking & Tech Exploration", "comp-thinking-11", "Discover algorithms, logic, and early digital architecture."),
        ("CLASS_12", "Foundations of Web & Python", "foundations-web-python-12", "Master basic programming, git version control, and web principles."),
        ("COLLEGE_YEAR_1", "Full-Stack Foundations & Relational DBs", "fullstack-foundations-y1", "Build real-world client-server apps with databases."),
        ("COLLEGE_YEAR_2", "Distributed Systems & Cloud Architecture", "distributed-systems-y2", "Deploy production cloud microservices with Docker."),
        ("COLLEGE_YEAR_3", "System Design & Industry Interview Prep", "system-design-prep-y3", "Master technical interviews, ATS resumes, and architecture."),
        ("COLLEGE_YEAR_4", "Placement Command & Production Engineering", "placement-readiness-y4", "Live company drive practice and production deployment.")
    ]

    for stage, title, slug, desc in stage_courses:
        existing = db.query(Course).filter(Course.slug == slug).first()
        if not existing:
            crs = Course(
                domain_id=dom_id,
                stage=stage,
                title=title,
                slug=slug,
                description=desc,
                instructor="Dr. Emily Chen, Lead Architect",
                estimated_hours=12,
                level="Beginner" if "11" in stage or "12" in stage else "Intermediate"
            )
            db.add(crs)
            db.flush()
            # Add a module and 2 lessons
            mod = Module(course_id=crs.id, title="Module 1: Core Fundamentals", order_num=1)
            db.add(mod)
            db.flush()
            db.add(Lesson(
                module_id=mod.id,
                title="Lesson 1: Architecture Overview & Mental Models",
                order_num=1,
                content="Explore how high-performance systems decouple presentation from persistence.",
                duration_mins=20
            ))
            db.add(Lesson(
                module_id=mod.id,
                title="Lesson 2: Hands-On Implementation & Verification",
                order_num=2,
                content="Step-by-step guidance on implementing resilient code and validating outputs.",
                duration_mins=25
            ))

    # 4. Coding Problems
    two_sum_code = '''def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        diff = target - n
        if diff in seen:
            return [seen[diff], i]
        seen[n] = i
    return []

print(two_sum([2, 7, 11, 15], 9))'''

    valid_parens_code = '''def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    return len(stack) == 0

print(is_valid("()[]{}"))'''

    coding_problems = [
        {
            "title": "Two Sum",
            "slug": "two-sum",
            "difficulty": "Easy",
            "domain": "Algorithms",
            "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
            "starter_code": json.dumps({"python": two_sum_code}),
            "test_cases": json.dumps([{"input": "[2,7,11,15], 9", "expected": "[0, 1]"}])
        },
        {
            "title": "Valid Parentheses",
            "slug": "valid-parentheses",
            "difficulty": "Easy",
            "domain": "Data Structures",
            "description": "Given a string s containing just characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
            "starter_code": json.dumps({"python": valid_parens_code}),
            "test_cases": json.dumps([{"input": "'()[]{}'", "expected": "True"}])
        }
    ]

    for cp in coding_problems:
        existing = db.query(CodingProblem).filter(CodingProblem.slug == cp["slug"]).first()
        if not existing:
            db.add(CodingProblem(**cp))

    # 5. SOC Incidents
    soc_data = [
        {
            "title": "Suspicious Lateral Movement & PowerShell Obfuscation",
            "severity": "HIGH",
            "category": "Endpoint Intrusion",
            "description": "EDR alert triggered on internal workstation WS-4402 executing encoded PowerShell communicating with an external rogue IP.",
            "logs": json.dumps([
                {"timestamp": "2026-09-04T10:14:02Z", "host": "WS-4402", "event_id": 4688, "process": "powershell.exe -enc JABjAGwAaQBlAG4AdAAg...", "action": "ALERT"},
                {"timestamp": "2026-09-04T10:15:30Z", "host": "WS-4402", "dest_ip": "198.51.100.23:443", "action": "OUTBOUND_SYN"}
            ]),
            "indicators": json.dumps(["198.51.100.23", "powershell.exe -enc", "WS-4402"]),
            "remediation_steps": json.dumps(["Isolate host WS-4402", "Block IP 198.51.100.23 at perimeter firewall", "Revoke cached Kerberos tokens"])
        }
    ]

    for s in soc_data:
        existing = db.query(SocIncident).filter(SocIncident.title == s["title"]).first()
        if not existing:
            db.add(SocIncident(**s))

    # 6. Organizations & Jobs
    orgs = [
        {"name": "TechCorp Systems", "slug": "techcorp", "domain": "Enterprise Cloud"},
        {"name": "FinEdge Analytics", "slug": "finedge", "domain": "FinTech"}
    ]

    for o in orgs:
        existing = db.query(Organization).filter(Organization.slug == o["slug"]).first()
        if not existing:
            org = Organization(name=o["name"], slug=o["slug"], domain=o["domain"], website="https://techcorp.example.com", is_verified=True)
            db.add(org)
            db.flush()
            db.add(Job(
                organization_id=org.id,
                title="Associate Cloud Engineer",
                domain="Cloud Computing",
                role_type="Full-Time",
                location="Bengaluru, India / Hybrid",
                work_mode="Hybrid",
                min_salary=800000,
                max_salary=1400000,
                requirements=json.dumps(["Python", "Docker", "AWS", "FastAPI", "SQL"])
            ))

    # 7. Placement Drives
    drives = [
        {
            "title": "TechCorp Annual Campus Placement Drive 2026",
            "company_name": "TechCorp Systems",
            "date": "2026-10-15",
            "min_cgpa": 7.5,
            "max_backlogs": 0,
            "status": "UPCOMING"
        }
    ]

    for d in drives:
        existing = db.query(PlacementDrive).filter(PlacementDrive.title == d["title"]).first()
        if not existing:
            db.add(PlacementDrive(**d))

    db.commit()
    db.close()
    print("NexGenAI database seeding completed successfully!")

if __name__ == "__main__":
    run_seed()
