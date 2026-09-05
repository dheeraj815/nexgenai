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
  // Step 1 & 2
  concept: string;
  simpleExplanation: string;
  // Step 3
  analogy: string;
  // Step 4 & 5
  codeExample: string;
  visualDiagram: string;
  // Step 6 & 7
  liveDemoSummary: string;
  sandboxStarter: string;
  sandboxExpectedOutput: string;
  // Step 8 & 9
  quizQuestion: string;
  quizOptions: string[];
  quizAnswerIndex: number;
  quizRationale: string;
  // Step 10 & 11
  challengeTask: string;
  projectTask: string;
  // Step 12 & 13
  skillEarned: string;
  xpPoints: number;
  // Step 15 & 16
  interviewContext: string;
  jobRelevance: string;
  nextTopicTitle: string;
}

export const DEEP_CURRICULUM_DATABASE: Record<string, DeepCurriculumTopic> = {
  // 1. PYTHON: Variables & State
  'py-variables': {
    id: 'py-variables',
    title: 'Python Variables, Dynamic Typing & State',
    domain: 'Software Engineering & AI',
    stage: 'CLASS_11',
    estimatedMinutes: 15,
    concept: 'Variables in Python are symbolic names that act as references (pointers) to objects in memory rather than statically sized slots.',
    simpleExplanation: 'Think of a variable as a sticky note label you slap onto a piece of data. When you change what the label points to, the old data is cleaned up automatically.',
    analogy: 'Imagine having storage boxes in your room with transparent tape labels: writing "student_age = 16" is like putting a label "student_age" on a box that contains the number 16.',
    codeExample: `# Variable assignment and dynamic re-binding
student_name = "Candidate"
student_age = 16
current_score = 94.5
is_enrolled = True

# Python automatically infers types:
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

  // 2. DATA STRUCTURES: LIFO Stack
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
print("Top item:", s.peek())  # 20
print("Popped:", s.pop())    # 20`,
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

print(is_valid_brackets("({[]})"))  # True`,
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

  // 3. SYSTEM DESIGN: In-Memory Caching (Redis)
  'sys-caching': {
    id: 'sys-caching',
    title: 'System Design: In-Memory Caching (Redis & Cache-Aside)',
    domain: 'Cloud Architecture & Scalability',
    stage: 'YEAR_3',
    estimatedMinutes: 25,
    concept: 'Caching stores computed results and frequent database reads in high-speed RAM (Redis/Memcached) to avoid expensive disk I/O and query latency.',
    simpleExplanation: 'Instead of searching through a 10-million-row database table every time a user loads their profile, store the result in RAM for 5 minutes and return it in 2ms.',
    analogy: 'Like writing your today\'s phone contacts on a sticky note pasted on your monitor instead of searching through a 500-page phone directory every time.',
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
    # Simulate DB fetch
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

  // 4. DEFENSIVE CYBERSECURITY: SOC Incident Triage
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
  }
};
