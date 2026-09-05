/**
 * NexGenAI - Deep Structured Curriculum Dataset
 * 
 * Implements the 16-Step Deep Topic Execution Framework:
 * Concept -> Explanation -> Analogy -> Code -> Diagram -> Live Demo ->
 * Sandbox -> Quiz -> Challenge -> Project -> Evidence -> Skill -> FAANG Link -> Next Step
 */

export interface DeepCurriculumTopic {
  id: string;
  title: string;
  domain: string;
  stage: string;
  estimatedMinutes: number;
  concept: string;
  simpleExplanation: string;
  analogy: string;
  codeExample: string;
  visualDiagram: string;
  liveDemoSummary: string;
  sandboxStarter: string;
  sandboxExpectedOutput: string;
  quizQuestion: string;
  quizOptions: string[];
  quizAnswerIndex: number;
  quizRationale: string;
  challengeTask: string;
  projectTask: string;
  skillEarned: string;
  xpPoints: number;
  interviewContext: string;
  jobRelevance: string;
  nextTopicTitle: string;
}

export const DEEP_CURRICULUM_DATABASE: Record<string, DeepCurriculumTopic> = {
  // 1. CLASS 11: Python Variables & State
  'py-variables': {
    id: 'py-variables',
    title: 'Python Variables, Dynamic Typing & State',
    domain: 'Software Engineering & AI',
    stage: 'CLASS_11',
    estimatedMinutes: 15,
    concept: 'Variables in Python are symbolic names that act as references (pointers) to objects in memory rather than statically sized slots.',
    simpleExplanation: 'Think of a variable as a sticky note label you slap onto a piece of data. When you change what the label points to, the old data is cleaned up automatically.',
    analogy: 'Imagine having storage boxes in your room with transparent tape labels: writing "student_age = 16" is like putting a label on a box containing 16.',
    codeExample: `# Variable assignment and dynamic re-binding
student_name = "Candidate"
student_age = 16
current_score = 94.5
is_enrolled = True

print(f"{student_name} is {student_age} years old. Score: {current_score}")
print(f"Data types: {type(student_name)}, {type(student_age)}")`,
    visualDiagram: `[Label: student_name] ----> Memory Address 0x10A ["Candidate" (str)]
[Label: student_age]  ----> Memory Address 0x10B [16 (int)]
[Label: current_score]----> Memory Address 0x10C [94.5 (float)]`,
    liveDemoSummary: 'Demonstrates Python dynamically binding variables to strings, integers, floats, and booleans with formatted f-string interpolation.',
    sandboxStarter: `# Practice: Calculate your approximate days on Earth
user_age = 16
days_alive = user_age * 365
print(f"You have lived approximately {days_alive} days!")`,
    sandboxExpectedOutput: 'You have lived approximately 5840 days!',
    quizQuestion: 'In Python, what happens under the hood when you execute `x = 42` followed by `x = "hello"`?',
    quizOptions: [
      'A) Python crashes because a variable type cannot change.',
      'B) The label `x` is redirected to point from an integer object (42) to a string object ("hello").',
      'C) The string "hello" is converted to the number 42.',
      'D) It allocates static C memory.'
    ],
    quizAnswerIndex: 1,
    quizRationale: 'Correct! Python is dynamically typed. Variables are references that can be re-bound to any object type at runtime.',
    challengeTask: 'Create 3 variables for `product_name`, `price`, and `quantity`. Compute `total_bill = price * quantity` and print a formatted receipt line.',
    projectTask: 'Build the foundational data input stage for a Personal Finance Expense Tracker.',
    skillEarned: 'Python Variables & Dynamic Memory',
    xpPoints: 25,
    interviewContext: 'Google and Amazon interviewers verify your understanding of mutable vs immutable references and garbage collection.',
    jobRelevance: 'Used in 100% of production Python backends, FastAPI endpoints, and PyTorch tensors.',
    nextTopicTitle: 'Python Control Flow & Conditionals'
  },

  // 2. CLASS 11: Artificial Intelligence Foundations
  'c11-ai-intro': {
    id: 'c11-ai-intro',
    title: 'Artificial Intelligence & Neural Perception Basics',
    domain: 'Artificial Intelligence',
    stage: 'CLASS_11',
    estimatedMinutes: 20,
    concept: 'Artificial Intelligence simulates cognitive functions like learning, reasoning, and pattern recognition by training mathematical models on historical data.',
    simpleExplanation: 'Instead of programming explicit rules for every scenario, we feed an algorithm examples and let it discover the underlying mathematical patterns itself.',
    analogy: 'Teaching a child to recognize a cat by showing thousands of pictures of cats, rather than writing a 500-page manual describing what whiskers look like.',
    codeExample: `# Simple Pattern Predictor: Celsius to Fahrenheit
def predict_fahrenheit(celsius: float, weight: float = 1.8, bias: float = 32.0) -> float:
    return (celsius * weight) + bias

temp_c = 100.0
temp_f = predict_fahrenheit(temp_c)
print(f"{temp_c}C in Fahrenheit is {temp_f}F")`,
    visualDiagram: `[Input: Celsius (100)] ----> (Multiply by Weight: 1.8) ----> (Add Bias: +32) ----> [Output: 212F]`,
    liveDemoSummary: 'Calculates linear transformations representing the single-neuron perceptron model.',
    sandboxStarter: `# Experiment with weight and bias
def linear_neuron(x, w, b):
    return w * x + b

print("Neuron activation:", linear_neuron(10, 2.5, 5))`,
    sandboxExpectedOutput: 'Neuron activation: 30.0',
    quizQuestion: 'What is the fundamental difference between traditional programming and machine learning?',
    quizOptions: [
      'A) Traditional takes data + rules to get answers; ML takes data + answers to discover rules.',
      'B) Traditional programming requires electricity, while ML runs without hardware.',
      'C) ML cannot use mathematical algorithms.',
      'D) Traditional code is always faster in every task.'
    ],
    quizAnswerIndex: 0,
    quizRationale: 'Correct! In traditional software, humans write the rules. In ML, models discover the rules by training on examples.',
    challengeTask: 'Tune weights to approximate the relationship between study hours and exam scores.',
    projectTask: 'Create an early AI Linear Predictor for student study hour outcomes.',
    skillEarned: 'AI Principles & Mathematical Formulations',
    xpPoints: 30,
    interviewContext: 'Basic conceptual evaluation in entry-level AI/Data Science internships.',
    jobRelevance: 'Foundation for all modern LLMs, autonomous vehicles, and recommendation systems.',
    nextTopicTitle: 'Supervised vs Unsupervised Learning'
  },

  // 3. CLASS 12: Distributed Version Control with Git
  'c12-git-vcs': {
    id: 'c12-git-vcs',
    title: 'Git Version Control & Repository Architecture',
    domain: 'Software Engineering & DevOps',
    stage: 'CLASS_12',
    estimatedMinutes: 20,
    concept: 'Git is a distributed version control system that tracks changes in source code across time using a directed acyclic graph (DAG) of immutable snapshots.',
    simpleExplanation: 'Git allows you to take snapshots of your code, experiment on isolated branches, and collaborate with teams without fear of losing working code.',
    analogy: 'A video game save-point system where you can branch into different quests and revert back to any earlier checkpoint whenever your code encounters a bug.',
    codeExample: `# Initializing and committing in Git
$ git init
$ git add .
$ git commit -m "feat: implement initial authentication flow"
$ git branch -M main
$ git remote add origin https://github.com/developer/project.git
$ git push -u origin main`,
    visualDiagram: `Working Directory  ----(git add)---->  Staging Index  ----(git commit)---->  Local Git DAG (.git)
                                                                                  |
                                                                             (git push)
                                                                                  v
                                                                          Remote Repo (GitHub)`,
    liveDemoSummary: 'Demonstrates three-stage Git architecture: Working Directory, Staging Index, and Local Commit Repository.',
    sandboxStarter: `# Git command sequence test
commands = ["git init", "git status", "git add .", "git commit -m 'Initial commit'"]
for cmd in commands:
    print(f"Executing: {cmd} -> OK")`,
    sandboxExpectedOutput: `Executing: git init -> OK\nExecuting: git status -> OK\nExecuting: git add . -> OK\nExecuting: git commit -m 'Initial commit' -> OK`,
    quizQuestion: 'What does the `git add` command actually do in the Git workflow?',
    quizOptions: [
      'A) It immediately uploads your files to GitHub servers.',
      'B) It moves modified files from the Working Directory into the Staging Index.',
      'C) It deletes temporary backup files.',
      'D) It compiles the source code into binaries.'
    ],
    quizAnswerIndex: 1,
    quizRationale: 'Correct! `git add` stages files, preparing a snapshot of changes before they are committed into the repository history.',
    challengeTask: 'Resolve a simulated merge conflict between two developer branches modifying the same line in main.py.',
    projectTask: 'Publish your Class 12 Capstone repository to GitHub with a clean commit history and professional README.md.',
    skillEarned: 'Git Distributed Version Control & Workflow',
    xpPoints: 30,
    interviewContext: 'Every engineering interview at Google, Amazon, and startups evaluates Git branching, rebasing, and PR workflows.',
    jobRelevance: 'Mandatory prerequisite for 100% of commercial software engineering roles.',
    nextTopicTitle: 'GitHub Pull Requests & CI/CD Actions'
  },

  // 4. YEAR 1: Object-Oriented Programming (OOP)
  'y1-python-oop': {
    id: 'y1-python-oop',
    title: 'Object-Oriented Programming (OOP) & Encapsulation',
    domain: 'Computer Science Foundations',
    stage: 'YEAR_1',
    estimatedMinutes: 25,
    concept: 'OOP models real-world software entities as classes containing private state (attributes) and behaviors (methods), enforcing modularity and polymorphism.',
    simpleExplanation: 'A class is a blueprint (like an architectural schematic for a house), and an object is the actual concrete house built using that blueprint.',
    analogy: 'A cookie cutter is the Class; each individual chocolate-chip cookie stamped out is an Object instance with its own temperature and decoration.',
    codeExample: `class BankAccount:
    def __init__(self, owner: str, initial_balance: float = 0.0):
        self.owner = owner
        self._balance = initial_balance
        
    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self._balance += amount
        return self._balance
        
    def withdraw(self, amount: float):
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount
        return self._balance

acc = BankAccount("Candidate", 500.0)
acc.deposit(250.0)
print(f"Owner: {acc.owner}, Balance: {acc._balance}")`,
    visualDiagram: `+---------------------------------------+
|             BankAccount               |
+---------------------------------------+
| - owner: str                          |
| - _balance: float                     |
+---------------------------------------+
| + deposit(amount: float): float       |
| + withdraw(amount: float): float      |
+---------------------------------------+`,
    liveDemoSummary: 'Creates an encapsulated BankAccount class with input validation and state mutation methods.',
    sandboxStarter: `# Create a Student class with name and grades list
class Student:
    def __init__(self, name: str):
        self.name = name
        self.grades = []
    def add_grade(self, grade: float):
        self.grades.append(grade)
    def average(self) -> float:
        return sum(self.grades) / len(self.grades) if self.grades else 0.0

s = Student("Alex")
s.add_grade(90)
s.add_grade(100)
print(f"{s.name}'s Average: {s.average()}")`,
    sandboxExpectedOutput: "Alex's Average: 95.0",
    quizQuestion: 'Which core OOP principle restricts direct modification of an object internal fields from outside code?',
    quizOptions: [
      'A) Polymorphism',
      'B) Inheritance',
      'C) Encapsulation',
      'D) Concurrency'
    ],
    quizAnswerIndex: 2,
    quizRationale: 'Correct! Encapsulation bundles state and methods together while hiding internal object details to prevent unintended mutation.',
    challengeTask: 'Create an inheritance hierarchy where `SavingsAccount` and `CheckingAccount` inherit from `BankAccount` with custom fees.',
    projectTask: 'Build the domain object model for a Student Record & Grading Management System.',
    skillEarned: 'OOP Class Design & Encapsulation',
    xpPoints: 35,
    interviewContext: 'Standard FAANG Year 1 / L3 software interview topic on clean architecture and SOLID principles.',
    jobRelevance: 'Powers Java Spring Boot, Python FastAPI domain models, and TypeScript enterprise applications.',
    nextTopicTitle: 'Inheritance, Interfaces & Polymorphism'
  },

  // 5. YEAR 1: DATA STRUCTURES: LIFO Stack
  'dsa-stack': {
    id: 'dsa-stack',
    title: 'Data Structures: Stack (LIFO) Mechanics',
    domain: 'Computer Science Core',
    stage: 'YEAR_1',
    estimatedMinutes: 20,
    concept: 'A Stack is a linear data structure that adheres to the Last-In, First-Out (LIFO) principle. Elements can only be added or removed from the top.',
    simpleExplanation: 'The last item you place into the stack is always the very first item that comes out when you pop.',
    analogy: 'Think of a spring-loaded stack of clean plates at a restaurant buffet. You place new clean plates on the top, and guests take plates from the top.',
    codeExample: `class Stack:
    def __init__(self):
        self.items = []
        
    def push(self, item):
        self.items.append(item)
        
    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        raise IndexError("Pop from empty stack")
        
    def peek(self):
        return self.items[-1] if not self.is_empty() else None
        
    def is_empty(self):
        return len(self.items) == 0

s = Stack()
s.push(10)
s.push(20)
print("Top item:", s.peek())
print("Popped:", s.pop())`,
    visualDiagram: `|  [20] <-- TOP (Pushed last, Popped first)
|  [10] 
+-------+  (Stack Base)`,
    liveDemoSummary: 'Demonstrates push, pop, peek, and underflow error handling with O(1) constant time complexity.',
    sandboxStarter: `# Implement a Valid Parentheses Checker using Stack
def is_valid_brackets(s: str) -> bool:
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for char in s:
        if char in pairs.values():
            stack.append(char)
        elif char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
    return len(stack) == 0

print(is_valid_brackets("({[]})"))`,
    sandboxExpectedOutput: 'True',
    quizQuestion: 'What is the time complexity of pushing an element onto an array-based stack and popping an element?',
    quizOptions: [
      'A) Push O(N), Pop O(1)',
      'B) Push O(1) amortized, Pop O(1)',
      'C) Push O(log N), Pop O(log N)',
      'D) Push O(N^2), Pop O(N)'
    ],
    quizAnswerIndex: 1,
    quizRationale: 'Correct! Both push and pop operate directly at the end of the array without shifting elements, yielding O(1) constant time.',
    challengeTask: 'Implement an undo/redo history stack for a text editor with a max capacity of 50 actions.',
    projectTask: 'Incorporate a call-stack memory visualizer into your 1st Year CS Milestone project.',
    skillEarned: 'Stack (LIFO) & Algorithmic Parsing',
    xpPoints: 30,
    interviewContext: 'Asked in LeetCode 20 (Valid Parentheses), Daily Temperatures, and Min Stack across Microsoft and Atlassian.',
    jobRelevance: 'Underpins compiler syntax parsers, browser back-button history, and OS thread call frames.',
    nextTopicTitle: 'Queue (FIFO) & Double-Ended Deque'
  },

  // 6. YEAR 2: DEFENSIVE CYBERSECURITY: SOC Incident Triage
  'soc-incident-triage': {
    id: 'soc-incident-triage',
    title: 'Defensive Cyber: SOC Incident Triage & Telemetry Forensics',
    domain: 'Cybersecurity & SOC Operations',
    stage: 'YEAR_2',
    estimatedMinutes: 20,
    concept: 'Security Operations Center (SOC) incident response involves detecting anomalous telemetry, analyzing attack patterns, and executing containment playbooks.',
    simpleExplanation: 'When automated security alarms sound, a SOC analyst inspects system logs, confirms if it is a real attack, and blocks the intruder before damage occurs.',
    analogy: 'Like a hospital emergency room doctor looking at vital sign monitors, diagnosing an urgent infection, and administering medicine immediately to stabilize the patient.',
    codeExample: `# Linux Firewall Isolation Rule
# 1. Inspect recent failed auth logs
# grep "Failed password" /var/log/auth.log | tail -n 20

# 2. Identify Attacker IP: 198.51.100.44 (> 50 attempts/sec)

# 3. Execute IPTables Drop
# sudo iptables -A INPUT -s 198.51.100.44 -j DROP

# 4. Enforce Key-Based SSH Only
# sudo sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
# sudo systemctl restart sshd`,
    visualDiagram: `[Attacker: 198.51.100.44] --(400 SSH brute attempts/sec)--> [Port 22]
                                                                  |
                                                           [SIEM Alert Threshold]
                                                                  |
                                                          [SOC Analyst Triage]
                                                                  |
                                              [iptables DROP 198.51.100.44 -j DROP]`,
    liveDemoSummary: 'Examines SIEM log streams, extracts IOC (Indicators of Compromise), and executes containment commands.',
    sandboxStarter: `# Simulated Log Parser
logs = [
    "2026-09-05 14:02:11 Failed password for root from 198.51.100.44 port 22",
    "2026-09-05 14:02:12 Failed password for root from 198.51.100.44 port 22",
    "2026-09-05 14:02:14 Accepted publickey for admin from 10.0.0.5 port 22"
]

failed_ips = [line.split("from ")[1].split(" ")[0] for line in logs if "Failed password" in line]
print(f"Malicious Attacker Detected: {set(failed_ips)}")`,
    sandboxExpectedOutput: "Malicious Attacker Detected: {'198.51.100.44'}",
    quizQuestion: 'Under the MITRE ATT&CK framework, which tactic and technique corresponds to automated SSH password dictionary spraying?',
    quizOptions: [
      'A) Defense Evasion: Rootkit Injection',
      'B) Credential Access: Brute Force (T1110)',
      'C) Exfiltration: DNS Tunneling',
      'D) Impact: Ransomware Encryption'
    ],
    quizAnswerIndex: 1,
    quizRationale: 'Correct! Automated password guessing falls under Credential Access: Brute Force (T1110).',
    challengeTask: 'Write a Python script to monitor a log file and automatically ban any IP with over 10 failed logins in 60 seconds.',
    projectTask: 'Build an automated SIEM alert parser and incident logbook for your Career Passport.',
    skillEarned: 'SOC Incident Triage & Telemetry Forensics',
    xpPoints: 35,
    interviewContext: 'Standard technical interview scenario for SOC Analyst L1/L2 and Security Engineer roles at Palo Alto, CrowdStrike, and Cisco.',
    jobRelevance: 'Directly applicable in corporate security teams protecting enterprise cloud servers from automated botnets.',
    nextTopicTitle: 'Network Traffic Analysis & Snort IDS'
  },

  // 7. YEAR 2: Cloud Containerization (Docker)
  'y2-cloud-docker': {
    id: 'y2-cloud-docker',
    title: 'Cloud Containerization with Docker & Multi-Stage Builds',
    domain: 'Cloud Architecture & DevOps',
    stage: 'YEAR_2',
    estimatedMinutes: 20,
    concept: 'Docker encapsulates an application and its runtime dependencies into an immutable container image using Linux cgroups and namespaces for process isolation.',
    simpleExplanation: 'It solves the classic "it works on my machine" dilemma by packaging the exact OS libraries, Python version, and app code into a single portable container.',
    analogy: 'Standardized shipping containers in world freight: whether loading onto a ship, train, or truck, the container maintains standard dimensions and secure locking.',
    codeExample: `# Multi-Stage Dockerfile for FastAPI
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.12-alpine
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY . .
EXPOSE 8000
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]`,
    visualDiagram: `Dockerfile  ----(docker build)---->  Docker Image (Immutable)  ----(docker run)---->  Active Container (Isolated)`,
    liveDemoSummary: 'Builds lightweight multi-stage Docker images to reduce attack surfaces and optimize startup latency.',
    sandboxStarter: `# Docker CLI Simulator
def parse_docker_run(port_map, image):
    return f"docker run -d -p {port_map} --name production_api {image}"

print(parse_docker_run("8000:8000", "nexgenai/backend:v1.0"))`,
    sandboxExpectedOutput: 'docker run -d -p 8000:8000 --name production_api nexgenai/backend:v1.0',
    quizQuestion: 'Why are multi-stage Docker builds used in production container workflows?',
    quizOptions: [
      'A) They eliminate compilers and build tools from final images, drastically reducing size and CVE vulnerabilities.',
      'B) They run containers across multiple physical computers simultaneously.',
      'C) They translate Python code into assembly.',
      'D) They disable user permissions entirely.'
    ],
    quizAnswerIndex: 0,
    quizRationale: 'Correct! Multi-stage builds discard build tools and intermediate files, producing slim production-grade runtime images.',
    challengeTask: 'Write a docker-compose.yml file linking a FastAPI web container to a PostgreSQL database with health checks.',
    projectTask: 'Containerize your Year 2 backend microservice and push to GitHub Container Registry.',
    skillEarned: 'Docker Containerization & Multi-Stage Builds',
    xpPoints: 35,
    interviewContext: 'Tested in DevOps and backend engineering rounds at Uber, Microsoft, and Swiggy.',
    jobRelevance: 'Standard requirement for deploying microservices onto Kubernetes and AWS ECS.',
    nextTopicTitle: 'Kubernetes Pods, Services & Deployments'
  },

  // 8. YEAR 3: SYSTEM DESIGN: In-Memory Caching (Redis)
  'sys-caching': {
    id: 'sys-caching',
    title: 'System Design: In-Memory Caching (Redis & Cache-Aside)',
    domain: 'Cloud Architecture & Scalability',
    stage: 'YEAR_3',
    estimatedMinutes: 25,
    concept: 'Caching stores computed results and frequent database reads in high-speed RAM (Redis/Memcached) to avoid expensive disk I/O and query latency.',
    simpleExplanation: 'Instead of searching through a 10-million-row database table every time a user loads their profile, store the result in RAM for 5 minutes and return it in 2ms.',
    analogy: "Like writing your today's phone contacts on a sticky note pasted on your monitor instead of searching through a 500-page phone directory every time.",
    codeExample: `import redis
import json

r = redis.Redis(host='localhost', port=6379, db=0)

def get_user_profile(user_id: str, db_connection):
    cache_key = f"user:profile:{user_id}"
    
    # 1. Check Redis Cache
    cached_data = r.get(cache_key)
    if cached_data:
        print(">>> CACHE HIT (RAM: 1.2ms)")
        return json.loads(cached_data)
        
    # 2. Cache Miss -> Query Database
    print(">>> CACHE MISS -> Fetching from PostgreSQL (Disk: 45ms)")
    user_record = db_connection.query_user(user_id)
    
    # 3. Write to Cache with 300-second TTL
    r.setex(cache_key, 300, json.dumps(user_record))
    return user_record`,
    visualDiagram: `Client Request
      |
      v
+-------------+      CACHE HIT (1ms)
| Application | ------------------------> [ Redis Cache (RAM) ]
+-------------+
      |
      | CACHE MISS (45ms)
      v
[ PostgreSQL (Disk) ]`,
    liveDemoSummary: 'Simulates the standard Cache-Aside (Lazy Loading) pattern with TTL expiration and cache-invalidation strategies.',
    sandboxStarter: `# Cache-Aside Simulation
cache = {}

def fetch_data(key):
    if key in cache:
        return f"CACHE HIT: {cache[key]}"
    data = f"DB_VALUE_FOR_{key}"
    cache[key] = data
    return f"CACHE MISS -> SAVED: {data}"

print(fetch_data("user_101"))
print(fetch_data("user_101"))`,
    sandboxExpectedOutput: 'CACHE MISS -> SAVED: DB_VALUE_FOR_user_101\nCACHE HIT: DB_VALUE_FOR_user_101',
    quizQuestion: 'What critical issue occurs if millions of cache keys expire at the exact same second, sending all traffic directly to the primary database?',
    quizOptions: [
      'A) Cache Hit Amplification',
      'B) Cache Avalanche (Thundering Herd)',
      'C) SQL Deadlock Mutation',
      'D) RAM Underflow'
    ],
    quizAnswerIndex: 1,
    quizRationale: 'Correct! Cache Avalanche happens when concurrent keys expire simultaneously. The mitigation is adding random jitter to TTLs.',
    challengeTask: 'Implement cache invalidation logic for a user update endpoint (Write-Through vs Cache Eviction).',
    projectTask: 'Integrate Redis caching into your distributed microservices capstone project.',
    skillEarned: 'Distributed In-Memory Caching (Redis)',
    xpPoints: 35,
    interviewContext: 'Standard High-Level System Design round question at Google, Uber, Amazon, and Razorpay.',
    jobRelevance: 'Essential for high-scale systems handling over 10,000 requests/sec with low latency SLAs.',
    nextTopicTitle: 'Database Sharding & Replication'
  },

  // 9. YEAR 4: Production CI/CD & Kubernetes Orchestration
  'y4-ci-cd-k8s': {
    id: 'y4-ci-cd-k8s',
    title: 'Production CI/CD, Zero-Downtime Rolling Updates & K8s',
    domain: 'Enterprise Architecture & Cloud',
    stage: 'YEAR_4',
    estimatedMinutes: 30,
    concept: 'Enterprise production systems employ continuous integration, automated canary analysis, and Kubernetes rolling updates to achieve 99.99% service availability.',
    simpleExplanation: 'Deploying updates to millions of active users without taking the system offline or causing 500 error spikes.',
    analogy: 'Refueling an aircraft mid-flight without landing or interrupting passenger comfort.',
    codeExample: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nexgenai-api-deployment
spec:
  replicas: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    spec:
      containers:
      - name: api
        image: nexgenai/backend:v2.4.0
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 5`,
    visualDiagram: `Version 1: [Pod 1][Pod 2][Pod 3]
                   |
            (Rolling Deploy)
                   v
Version 2: [Pod 1-v2][Pod 2-v2]  ---(Health Check Passed)---> [Pod 3-v2] (Traffic Switched Seamlessly)`,
    liveDemoSummary: 'Orchestrates declarative rolling updates with Kubernetes readiness probes and zero-downtime guarantees.',
    sandboxStarter: `# Simulate Canary Traffic Split
def route_request(request_id: int, canary_percentage: int = 10) -> str:
    return "CANARY_V2" if (request_id % 100) < canary_percentage else "STABLE_V1"

print([route_request(i) for i in [5, 45, 95]])`,
    sandboxExpectedOutput: "['CANARY_V2', 'STABLE_V1', 'STABLE_V1']",
    quizQuestion: 'In a Kubernetes RollingUpdate strategy, what does setting `maxUnavailable: 0` ensure?',
    quizOptions: [
      'A) At least 100% of the desired replica pods remain operational and serving traffic throughout the deployment.',
      'B) No CPU can be consumed during the deploy.',
      'C) All users are forcibly logged out.',
      'D) Deployments complete in zero seconds.'
    ],
    quizAnswerIndex: 0,
    quizRationale: 'Correct! With `maxUnavailable: 0`, old pods are only terminated after new pods pass their readiness checks, preventing capacity drops.',
    challengeTask: 'Configure automated rollback when a Canary deployment exhibits greater than 0.5% HTTP 500 error rates.',
    projectTask: 'Write GitHub Actions workflow for linting, testing, and pushing images to Kubernetes staging.',
    skillEarned: 'Kubernetes Orchestration & Zero-Downtime Deployments',
    xpPoints: 40,
    interviewContext: 'SDE-2 and Staff Engineer System Design round at Netflix, Razorpay, Google, and Amazon.',
    jobRelevance: 'Core competence for Site Reliability Engineers and Cloud Platform Developers.',
    nextTopicTitle: 'Observability: Prometheus, Grafana & Distributed Tracing'
  }
};

export function getCurriculumTopic(
  topicId: string, 
  fallbackTitle?: string, 
  fallbackDomain?: string, 
  stage?: string
): DeepCurriculumTopic {
  if (DEEP_CURRICULUM_DATABASE[topicId]) {
    return DEEP_CURRICULUM_DATABASE[topicId];
  }

  const cleanTitle = fallbackTitle || topicId.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const cleanDomain = fallbackDomain || 'Software Engineering & Cloud Architecture';
  const cleanStage = stage || 'YEAR_2';

  return {
    id: topicId,
    title: cleanTitle,
    domain: cleanDomain,
    stage: cleanStage,
    estimatedMinutes: 20,
    concept: `${cleanTitle} is a foundational engineering discipline in ${cleanDomain}. Mastering this pattern enables building reliable, fault-tolerant, and performant systems.`,
    simpleExplanation: `This concept provides the structured rules and design mechanisms for executing ${cleanTitle.toLowerCase()} in production environments.`,
    analogy: `Think of ${cleanTitle.toLowerCase()} like a precision instrument in an automated assembly line: each step must be executed in exact sequence with proper checks.`,
    codeExample: `# Enterprise Implementation of ${cleanTitle}
class ${cleanTitle.replace(/\s+/g, '')}Service:
    def __init__(self, name: str = "${cleanTitle}"):
        self.service_name = name
        self.is_active = True
        
    def execute(self, payload: dict) -> dict:
        print(f"Executing {self.service_name} with payload validation...")
        return {"status": "SUCCESS", "service": self.service_name, "processed": True}

service = ${cleanTitle.replace(/\s+/g, '')}Service()
result = service.execute({"test_key": "verified"})
print(result)`,
    visualDiagram: `[Input Payload] ---> [${cleanTitle} Controller] ---> [Validation & Core Logic] ---> [Verified Output (200 OK)]`,
    liveDemoSummary: `Simulates end-to-end execution of ${cleanTitle} with validation, state management, and logging.`,
    sandboxStarter: `# Practice: Execute ${cleanTitle} logic
def test_execution():
    return "${cleanTitle} executed successfully with zero runtime faults."

print(test_execution())`,
    sandboxExpectedOutput: `${cleanTitle} executed successfully with zero runtime faults.`,
    quizQuestion: `What is the primary architectural benefit of applying ${cleanTitle} in a modern tech stack?`,
    quizOptions: [
      `A) Ensures predictable scalability, loose coupling, and maintainable system boundaries.`,
      `B) Converts backend Python code to raw electrical signals directly.`,
      `C) Eliminates the need for testing or code reviews.`,
      `D) Runs without computing resources.`
    ],
    quizAnswerIndex: 0,
    quizRationale: `Correct! ${cleanTitle} provides standard abstractions that promote clean code, testability, and high-availability architecture.`,
    challengeTask: `Implement comprehensive unit tests and error handling for ${cleanTitle} covering edge cases and boundary conditions.`,
    projectTask: `Integrate ${cleanTitle} into your active academic capstone milestone for your Career Passport.`,
    skillEarned: `${cleanTitle} Architecture`,
    xpPoints: 30,
    interviewContext: `Evaluated in technical and architectural rounds at top product companies and engineering teams.`,
    jobRelevance: `Applied directly in daily engineering operations, pull request reviews, and production systems.`,
    nextTopicTitle: `Advanced ${cleanTitle} Optimization & System Tuning`
  };
}
