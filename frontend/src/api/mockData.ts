// Client-Side Resilient Mock Engine for NexGenAI
// Provides instantaneous fallback for static hosts (Vercel) & offline dev environments

export interface MockUser {
  id: string;
  email: string;
  full_name: string;
  role: 'STUDENT' | 'TPO' | 'RECRUITER' | 'COLLEGE_ADMIN' | 'FACULTY' | 'SUPER_ADMIN';
  academic_stage: string;
  is_onboarded: boolean;
  avatar_url?: string;
  profile?: {
    id: string;
    user_id: string;
    full_name: string;
    academic_stage: string;
    institution?: string;
    department?: string;
    graduation_year?: number;
    cgpa?: number;
    target_role?: string;
    bio?: string;
    github_url?: string;
    linkedin_url?: string;
    portfolio_url?: string;
    is_onboarded: boolean;
    readiness_score: number;
    backlogs: number;
  };
}

export const CANONICAL_DOMAINS = [
  { id: 'd-1', name: 'Artificial Intelligence', slug: 'ai', category: 'Data & AI', description: 'Neural networks, cognitive systems, and intelligence architectures.', icon: 'Brain' },
  { id: 'd-2', name: 'Machine Learning', slug: 'ml', category: 'Data & AI', description: 'Supervised, unsupervised algorithms, statistical modeling, and inference.', icon: 'Cpu' },
  { id: 'd-3', name: 'Generative AI / LLM Engineering', slug: 'genai', category: 'Data & AI', description: 'Large language models, prompt engineering, RAG pipelines, fine-tuning.', icon: 'Sparkles' },
  { id: 'd-4', name: 'Data Science', slug: 'data-science', category: 'Data & AI', description: 'Exploratory data analysis, statistical modeling, feature engineering.', icon: 'BarChart' },
  { id: 'd-5', name: 'Software Engineering', slug: 'software-engineering', category: 'Core Engineering', description: 'Production software architecture, design patterns, testing.', icon: 'Code' },
  { id: 'd-6', name: 'Full Stack Development', slug: 'fullstack', category: 'Core Engineering', description: 'End-to-end web applications with modern client & server frameworks.', icon: 'Layers' },
  { id: 'd-7', name: 'Backend Engineering', slug: 'backend', category: 'Core Engineering', description: 'High-performance microservices, REST/gRPC APIs, distributed systems.', icon: 'Server' },
  { id: 'd-8', name: 'Frontend Engineering', slug: 'frontend', category: 'Core Engineering', description: 'Interactive interfaces, state management, client performance, UI/UX.', icon: 'Layout' },
  { id: 'd-9', name: 'Mobile Development', slug: 'mobile', category: 'Core Engineering', description: 'Native & cross-platform iOS and Android mobile engineering.', icon: 'Smartphone' },
  { id: 'd-10', name: 'Cloud Computing', slug: 'cloud', category: 'Infrastructure', description: 'AWS, GCP, Azure infrastructure, serverless, and distributed storage.', icon: 'Cloud' },
  { id: 'd-11', name: 'DevOps / SRE', slug: 'devops', category: 'Infrastructure', description: 'CI/CD pipelines, containerization, Kubernetes, reliability engineering.', icon: 'Terminal' },
  { id: 'd-12', name: 'Cybersecurity', slug: 'cybersecurity', category: 'Security', description: 'Defensive security, threat modeling, ethical hacking, secure coding.', icon: 'Shield' },
  { id: 'd-13', name: 'SOC / Security Operations', slug: 'soc', category: 'Security', description: 'SIEM triage, log monitoring, incident containment, digital forensics.', icon: 'ShieldAlert' },
  { id: 'd-14', name: 'Data Engineering', slug: 'data-engineering', category: 'Data & AI', description: 'ETL/ELT data pipelines, data lakes, Spark, distributed processing.', icon: 'Database' },
  { id: 'd-15', name: 'MLOps', slug: 'mlops', category: 'Data & AI', description: 'Automated model deployment, monitoring, feature stores, drift detection.', icon: 'Repeat' },
  { id: 'd-16', name: 'Computer Vision', slug: 'computer-vision', category: 'Data & AI', description: 'Image recognition, object detection, segmentation with OpenCV & PyTorch.', icon: 'Eye' },
  { id: 'd-17', name: 'NLP', slug: 'nlp', category: 'Data & AI', description: 'Text processing, sentiment analysis, transformers, tokenization.', icon: 'MessageSquare' },
  { id: 'd-18', name: 'Robotics', slug: 'robotics', category: 'Hardware & Systems', description: 'ROS2, kinematics, embedded control systems, sensor fusion.', icon: 'Bot' },
  { id: 'd-19', name: 'IoT', slug: 'iot', category: 'Hardware & Systems', description: 'Connected sensor telemetry, edge computing, MQTT architectures.', icon: 'Wifi' },
  { id: 'd-20', name: 'Embedded Systems', slug: 'embedded', category: 'Hardware & Systems', description: 'Microcontrollers, RTOS, low-level firmware engineering in C/C++.', icon: 'Cpu' },
  { id: 'd-21', name: 'Blockchain / Web3', slug: 'blockchain', category: 'Emerging Tech', description: 'Smart contracts, decentralized ledgers, cryptography, Solidity.', icon: 'Link' },
  { id: 'd-22', name: 'QA / Test Automation', slug: 'qa-automation', category: 'Core Engineering', description: 'End-to-end test automation, integration suites, Cypress, Playwright.', icon: 'CheckCircle' },
  { id: 'd-23', name: 'Product Engineering', slug: 'product-engineering', category: 'Core Engineering', description: 'Agile velocity, scalable architecture, customer value delivery.', icon: 'Target' },
  { id: 'd-24', name: 'System Design / Architecture', slug: 'system-design', category: 'Core Engineering', description: 'High-level architecture, scalability, CAP theorem, trade-off analysis.', icon: 'Network' },
  { id: 'd-25', name: 'Database Engineering', slug: 'database-engineering', category: 'Data & AI', description: 'Relational indexing, query optimization, NoSQL, replication.', icon: 'Database' },
  { id: 'd-26', name: 'Business/Data Analytics', slug: 'business-analytics', category: 'Business & Product', description: 'Data visualization, Tableau, PowerBI, business metrics.', icon: 'TrendingUp' },
  { id: 'd-27', name: 'FinTech / Quant', slug: 'fintech-quant', category: 'Business & Product', description: 'Financial APIs, algorithmic trading algorithms, risk analytics.', icon: 'DollarSign' },
  { id: 'd-28', name: 'Product Management', slug: 'product-management', category: 'Business & Product', description: 'User stories, roadmapping, PRD authoring, product metrics.', icon: 'Briefcase' },
  { id: 'd-29', name: 'UI/UX Design', slug: 'ui-ux', category: 'Design & UX', description: 'User research, wireframing, Figma prototyping, design systems.', icon: 'Figma' },
  { id: 'd-30', name: 'Technical Communication', slug: 'tech-communication', category: 'Professional Skills', description: 'API documentation, architecture decision records, stakeholder comms.', icon: 'BookOpen' }
];

export const MOCK_COURSES = [
  {
    id: 'c-101',
    title: 'Class 11: Tech Exploration & Career Discovery',
    slug: 'career-discovery-101',
    stage: 'CLASS_11',
    description: 'Explore 30 technology domains, algorithmic logic, and early digital architecture tailored for high school foundations.',
    lessons_count: 8,
    progress: 25,
    category: 'Foundations',
    instructor: 'Prof. Arvind Sharma',
    estimated_hours: 14,
    modules: [
      {
        id: 'mod-1',
        title: 'Algorithmic Logic & Decomposition',
        order_num: 1,
        description: 'Understand how complex computational problems are broken down into logical sub-routines.',
        lessons: [
          {
            id: 'les-1-1',
            title: 'Deconstructing Problems Into Computational Logic',
            orderIndex: 1,
            order_num: 1,
            estimatedMinutes: 15,
            duration_mins: 15,
            isCompleted: true,
            progress: [{ isCompleted: true }],
            contentText: `# Introduction to Algorithmic Deconstruction

Computational thinking is the mental process for decomposing problems into smaller, manageable components that an automated system can execute.

### The Four Pillars of Computational Thinking

1. **Decomposition**: Breaking down a complex problem or system into smaller, more manageable parts.
2. **Pattern Recognition**: Looking for similarities among and within problems to find repeatable templates.
3. **Abstraction**: Focusing on the important information only, ignoring irrelevant details.
4. **Algorithm Design**: Developing a step-by-step solution to the problem or the rules to follow.

### Practical Example: Binary Search Logic

When searching for a key in a sorted sequence, linear scanning inspects each item sequentially: O(N). By repeatedly dividing the search interval in half, binary search completes in logarithmic time: O(log N).

\`\`\`python
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
\`\`\`

Every software system from relational databases to modern operating system kernels relies on these core algorithmic principles.`
          }
        ]
      }
    ]
  },

  {
    id: 'c-1',
    title: 'Computational Thinking & Tech Exploration',
    slug: 'comp-thinking-11',
    stage: 'CLASS_11',
    description: 'Discover algorithms, logic, and early digital architecture tailored for high school foundation.',
    lessons_count: 8,
    progress: 25,
    category: 'Foundations',
    instructor: 'Prof. Arvind Sharma',
    estimated_hours: 14,
    modules: [
      {
        id: 'mod-1',
        title: 'Algorithmic Logic & Decomposition',
        order_num: 1,
        description: 'Understand how complex computational problems are broken down into logical sub-routines.',
        lessons: [
          {
            id: 'les-1-1',
            title: 'Deconstructing Problems Into Computational Logic',
            orderIndex: 1,
            order_num: 1,
            estimatedMinutes: 15,
            duration_mins: 15,
            isCompleted: true,
            progress: [{ isCompleted: true }],
            contentText: `# Introduction to Algorithmic Deconstruction

Computational thinking is the mental process for decomposing problems into smaller, manageable components that an automated system can execute.

### The Four Pillars of Computational Thinking

1. **Decomposition**: Breaking down a complex problem or system into smaller, more manageable parts.
2. **Pattern Recognition**: Looking for similarities among and within problems to find repeatable templates.
3. **Abstraction**: Focusing on the important information only, ignoring irrelevant details.
4. **Algorithm Design**: Developing a step-by-step solution to the problem or the rules to follow.

### Practical Example: Binary Search Logic

When searching for a key in a sorted sequence, linear scanning inspects each item sequentially: O(N). By repeatedly dividing the search interval in half, binary search completes in logarithmic time: O(log N).

\`\`\`python
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
\`\`\`

Every software system from relational databases to modern operating system kernels relies on these core algorithmic principles.`
          },
          {
            id: 'les-1-2',
            title: 'Control Flow, Conditionals & State Trees',
            orderIndex: 2,
            order_num: 2,
            estimatedMinutes: 20,
            duration_mins: 20,
            isCompleted: false,
            progress: [],
            contentText: `# Control Flow & State Trees

Programs make decisions using conditional statements and control flow branching.

### Boolean Logic & Decision Nodes

Computers evaluate logic using truth tables and boolean algebra. Branching conditions evaluate truthiness:

\`\`\`python
def evaluate_risk(score, has_backlog):
    if score >= 80 and not has_backlog:
        return "READY_FOR_DRIVE"
    elif score >= 60:
        return "FOUNDATION_STRENGTHENING"
    else:
        return "PRIORITY_MENTORING"
\`\`\`

Mastering control flow is the fundamental bridge from mathematical logic to software engineering.`
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Data Representation & Memory',
        order_num: 2,
        description: 'How integers, floats, characters, and memory addressing operate in modern computer architectures.',
        lessons: [
          {
            id: 'les-2-1',
            title: 'Bits, Bytes and Character Encodings (ASCII & UTF-8)',
            orderIndex: 3,
            order_num: 3,
            estimatedMinutes: 18,
            duration_mins: 18,
            isCompleted: false,
            progress: [],
            contentText: `# How Memory Works: Bits to Bytes

All digital computing represents information through voltage differences mapped to binary digits: 0 and 1.

### Encodings in Modern Software

- **ASCII**: 7-bit standard mapping 128 characters.
- **UTF-8**: Variable-width encoding from 1 to 4 bytes backward-compatible with ASCII and supporting all global alphabets and emojis.

\`\`\`python
# Inspecting byte representation in Python
text = "NexGenAI"
byte_array = text.encode('utf-8')
print([bin(b) for b in byte_array])
\`\`\`

Understanding data representation gives you complete clarity when debugging networks, file I/O, and database storage.`
          },
          {
            id: 'les-2-2',
            title: 'Arrays, Lists and Memory Contiguity',
            orderIndex: 4,
            order_num: 4,
            estimatedMinutes: 22,
            duration_mins: 22,
            isCompleted: false,
            progress: [],
            contentText: `# Memory Contiguity & Indexing

An array is a contiguous block of memory where each element can be accessed in O(1) constant time through pointer arithmetic:

### Address Calculation Formula:
Address(A[i]) = BaseAddress + i * SizeOfElement

Because memory cells are arranged sequentially, cache pre-fetching makes iterating over contiguous arrays extraordinarily fast.`
          }
        ]
      }
    ]
  },
  {
    id: 'c-2',
    title: 'Foundations of Web & Python Programming',
    slug: 'foundations-web-python-12',
    stage: 'CLASS_12',
    description: 'Master basic programming, git version control, and core web principles.',
    lessons_count: 12,
    progress: 10,
    category: 'Core Programming',
    instructor: 'Dr. Neha Patel',
    estimated_hours: 20,
    modules: [
      {
        id: 'mod-w-1',
        title: 'Python Essentials & Data Modeling',
        order_num: 1,
        description: 'Functions, modules, object-oriented concepts, and dictionary manipulation.',
        lessons: [
          {
            id: 'les-w-1',
            title: 'Idiomatic Python & Functional Primitives',
            orderIndex: 1,
            order_num: 1,
            estimatedMinutes: 20,
            duration_mins: 20,
            isCompleted: false,
            progress: [],
            contentText: `# Idiomatic Python Programming

Python is known for readable, expressive syntax and powerful standard library primitives.

### Comprehensions and Lambdas

\`\`\`python
# List comprehension with filtering
scores = [45, 82, 91, 67, 74, 95]
honors = [s for s in scores if s >= 80]
print(f"Distinction candidates: {honors}")
\`\`\`

Focus on clean variable naming, exception handling, and modular code encapsulation.`
          }
        ]
      }
    ]
  },
  {
    id: 'c-3',
    title: 'Full-Stack Foundations & Relational DBs',
    slug: 'fullstack-foundations-y1',
    stage: 'YEAR_1',
    description: 'Build real-world client-server apps with modern databases and REST APIs.',
    lessons_count: 16,
    progress: 40,
    category: 'Full Stack',
    instructor: 'Alex Mercer',
    estimated_hours: 28,
    modules: [
      {
        id: 'mod-fs-1',
        title: 'Modern Client-Server Architectures',
        order_num: 1,
        description: 'HTTP protocol, REST verbs, JSON serialization, and stateless sessions.',
        lessons: [
          {
            id: 'les-fs-1',
            title: 'HTTP Methods, Status Codes & REST Conventions',
            orderIndex: 1,
            order_num: 1,
            estimatedMinutes: 25,
            duration_mins: 25,
            isCompleted: true,
            progress: [{ isCompleted: true }],
            contentText: `# RESTful API Design Principles

Representational State Transfer (REST) is the standard architectural style for web-based services.

### Core HTTP Methods

- **GET**: Idempotent retrieval of resource representations.
- **POST**: Creating a new resource.
- **PUT / PATCH**: Replacing or updating resources.
- **DELETE**: Removing a target resource.

\`\`\`typescript
// Fetching API resources with authorization header
const response = await fetch('/api/v1/passport', {
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  }
});
const data = await response.json();
\`\`\`

Always return semantic HTTP status codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, and 404 Not Found.`
          }
        ]
      }
    ]
  },
  {
    id: 'c-4',
    title: 'Distributed Systems & Cloud Architecture',
    slug: 'distributed-systems-y2',
    stage: 'YEAR_2',
    description: 'Deploy production cloud microservices with Docker and Kubernetes.',
    lessons_count: 14,
    progress: 15,
    category: 'Cloud & Systems',
    instructor: 'Devin Vance',
    estimated_hours: 32,
    modules: [
      {
        id: 'mod-ds-1',
        title: 'Containerization & Microservices',
        order_num: 1,
        description: 'Linux namespaces, cgroups, Dockerfile builds, and multi-stage container deployments.',
        lessons: [
          {
            id: 'les-ds-1',
            title: 'Dockerizing FastAPI & Node Services',
            orderIndex: 1,
            order_num: 1,
            estimatedMinutes: 30,
            duration_mins: 30,
            isCompleted: false,
            progress: [],
            contentText: `# Production Containerization

Containers package application code together with its complete runtime dependencies, ensuring deterministic execution across development and production environments.

\`\`\`dockerfile
FROM python:3.11-slim as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\`

Container images isolate processes, standardize deployment artifacts, and enable automated horizontal scaling.`
          }
        ]
      }
    ]
  },
  {
    id: 'c-5',
    title: 'System Design & Industry Interview Prep',
    slug: 'system-design-prep-y3',
    stage: 'YEAR_3',
    description: 'Master technical interviews, ATS resumes, and high-scale architecture.',
    lessons_count: 18,
    progress: 60,
    category: 'Career Readiness',
    instructor: 'Priya Sundaram',
    estimated_hours: 36,
    modules: [
      {
        id: 'mod-sd-1',
        title: 'Scalability & Trade-off Analysis',
        order_num: 1,
        description: 'CAP theorem, database sharding, replication, and distributed caching.',
        lessons: [
          {
            id: 'les-sd-1',
            title: 'Designing High-Throughput URL Shorteners (Bitly)',
            orderIndex: 1,
            order_num: 1,
            estimatedMinutes: 35,
            duration_mins: 35,
            isCompleted: false,
            progress: [],
            contentText: `# System Design: High-Throughput URL Shortener

### 1. Requirements Clarification
- **Traffic**: 100M new URLs/month, 10:1 read-to-write ratio.
- **Latency**: <20ms lookup for redirections.
- **Availability**: 99.99% uptime.

### 2. Capacity Planning & Math
100M writes/month ≈ 40 writes/second. Read requests = 400 reads/second. Peak traffic multiplier: 5x -> 2,000 QPS.

### 3. Architecture Blueprint
- **API Gateway**: TLS termination & rate limiting.
- **Web App Cluster**: Stateless ASGI workers.
- **Redis Cache**: LRU cache storing top 20% hot links.
- **PostgreSQL / Cassandra**: Distributed key-value persistent storage.

\`\`\`
Client -> Cloudflare DNS -> Nginx Load Balancer -> FastAPI Workers -> Redis Cluster -> Sharded DB
\`\`\`

By decoupling components and caching hot records, our architecture effortlessly scales to handle billions of monthly hits.`
          }
        ]
      }
    ]
  },
  {
    id: 'c-6',
    title: 'Placement Command & Production Engineering',
    slug: 'placement-readiness-y4',
    stage: 'YEAR_4',
    description: 'Live company drive practice, production deployment, and executive technical interviews.',
    lessons_count: 20,
    progress: 80,
    category: 'Placement',
    instructor: 'Marcus Brody',
    estimated_hours: 40,
    modules: [
      {
        id: 'mod-pl-1',
        title: 'Corporate Placement Mastery',
        order_num: 1,
        description: 'Technical rounds, behavioral STAR method, and live whiteboard coding.',
        lessons: [
          {
            id: 'les-pl-1',
            title: 'The STAR Method for Senior Engineering Behavioral Rounds',
            orderIndex: 1,
            order_num: 1,
            estimatedMinutes: 25,
            duration_mins: 25,
            isCompleted: true,
            progress: [{ isCompleted: true }],
            contentText: `# Mastering Behavioral Engineering Interviews

Companies assess leadership, collaboration, conflict resolution, and technical judgment through the STAR framework:

- **Situation**: Define the business or system context.
- **Task**: What was the specific technical objective or problem to solve?
- **Action**: What architectural or engineering actions did *you* specifically take?
- **Result**: Quantified business impact (e.g. reduced latency by 45%, eliminated 12 flaky tests).`
          }
        ]
      }
    ]
  }
];

export const MOCK_SOC_INCIDENTS = [
  {
    id: 'soc-1',
    title: 'Suspicious SSH Brute-Force from Foreign ASN',
    severity: 'HIGH',
    status: 'OPEN',
    source_ip: '198.51.100.24',
    target_host: 'prod-auth-service-01',
    description: 'Over 4,200 failed authentication attempts detected within 3 minutes targeting port 22.',
    recommended_action: 'Block source subnet on perimeter firewall and rotate compromised administrative credentials.',
    logs: [
      '2026-09-05T08:12:01.042Z sshd[4102]: Failed password for invalid user admin from 198.51.100.24 port 44324 ssh2',
      '2026-09-05T08:12:02.115Z sshd[4105]: Failed password for invalid user root from 198.51.100.24 port 44326 ssh2',
      '2026-09-05T08:12:04.992Z sshd[4118]: Accepted publickey for deploy from 198.51.100.24 port 44330 ssh2',
      '2026-09-05T08:12:06.120Z auditd[901]: USER_CMD pid=4124 uid=1001 comm="sudo /bin/bash" success=yes'
    ]
  },
  {
    id: 'soc-2',
    title: 'Anomalous Data Exfiltration via DNS Tunneling',
    severity: 'CRITICAL',
    status: 'INVESTIGATING',
    source_ip: '10.0.4.12',
    target_host: 'internal-db-replica',
    description: 'High frequency of TXT query lookups to dynamic domain suspicious-cloud-sync.xyz.',
    recommended_action: 'Isolate host from VPC and capture memory dump for forensics analysis.',
    logs: [
      '2026-09-05T09:30:11.201Z named[812]: query: a8f93bc.suspicious-cloud-sync.xyz IN TXT + (10.0.4.12)',
      '2026-09-05T09:30:12.441Z named[812]: query: 91fa02c.suspicious-cloud-sync.xyz IN TXT + (10.0.4.12)',
      '2026-09-05T09:30:14.008Z named[812]: query: c83be11.suspicious-cloud-sync.xyz IN TXT + (10.0.4.12)'
    ]
  },
  {
    id: 'soc-3',
    title: 'SQL Injection Signature Detected in API Gateway',
    severity: 'MEDIUM',
    status: 'CONTAINED',
    source_ip: '194.26.29.112',
    target_host: 'api.nexgenai.edu/v1/search',
    description: 'WAF blocked UNION SELECT payload attempting to enumerate schema tables.',
    recommended_action: 'Verify parameter sanitization in ORM models and audit WAF rule thresholds.',
    logs: [
      '2026-09-05T06:15:02.100Z modsecurity[2041]: Access denied with code 403 (phase 2). Pattern match "UNION SELECT" found.',
      '2026-09-05T06:15:02.102Z nginx[1104]: 194.26.29.112 - - [05/Sep/2026:06:15:02 +0000] "GET /api/v1/search?q=%27+UNION+SELECT+null%2Ctable_name+FROM+information_schema.tables-- HTTP/1.1" 403'
    ]
  }
];

export const MOCK_CODING_PROBLEMS = [
  {
    id: 'p-1',
    slug: 'two-sum-career',
    title: 'Optimal Skill Pairing (Two Sum)',
    difficulty: 'EASY',
    category: 'Arrays & Hashing',
    description: 'Given an array of skill score integers and a target competency score, find the two indices that add up to target. Each input has exactly one solution and you may not use the same element twice.',
    starterCodeJs: `function twoSum(nums, target) {
  // Write your solution here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    starterCodePy: `def two_sum(nums, target):
    # Write your solution here
    seen = {}
    for i, n in enumerate(nums):
        diff = target - n
        if diff in seen:
            return [seen[diff], i]
        seen[n] = i
    return []`,
    testCases: [
      { input: '[2, 7, 11, 15], 9', output: '[0, 1]' },
      { input: '[3, 2, 4], 6', output: '[1, 2]' },
      { input: '[3, 3], 6', output: '[0, 1]' }
    ]
  },
  {
    id: 'p-2',
    slug: 'lru-cache-architecture',
    title: 'LRU Cache Design for High-Throughput API',
    difficulty: 'MEDIUM',
    category: 'Design & Linked List',
    description: 'Implement an LRU (Least Recently Used) Cache with O(1) get and put operations to back an enterprise session store.',
    starterCodeJs: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}`,
    starterCodePy: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        val = self.cache.pop(key)
        self.cache[key] = val
        return val

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.pop(key)
        elif len(self.cache) >= self.capacity:
            oldest = next(iter(self.cache))
            del self.cache[oldest]
        self.cache[key] = value`,
    testCases: [
      { input: 'put(1, 1), put(2, 2), get(1)', output: '1' },
      { input: 'put(3, 3), get(2)', output: '-1' }
    ]
  }
];

export const MOCK_ASSESSMENTS = [
  {
    id: 'ass-1',
    slug: 'python-engineering-core',
    title: 'Python Engineering & Algorithmic Aptitude',
    domain: 'Core Engineering',
    durationMinutes: 20,
    passingScore: 70,
    questionsCount: 4,
    questions: [
      {
        id: 'q1',
        text: 'What is the average time complexity of looking up a key in a Python dictionary?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
        correctIndex: 0
      },
      {
        id: 'q2',
        text: 'Which built-in Python module is primarily used for asynchronous event loops?',
        options: ['threading', 'asyncio', 'multiprocessing', 'socket'],
        correctIndex: 1
      },
      {
        id: 'q3',
        text: 'What does the Global Interpreter Lock (GIL) in CPython prevent?',
        options: [
          'Memory allocation across multiple threads',
          'Simultaneous execution of multiple native Python bytecodes across CPU cores',
          'Disk I/O operations from blocking the main thread',
          'Garbage collection from running during function calls'
        ],
        correctIndex: 1
      },
      {
        id: 'q4',
        text: 'Which HTTP method should be used for idempotent partial updates to a REST resource?',
        options: ['POST', 'PATCH', 'CONNECT', 'OPTIONS'],
        correctIndex: 1
      }
    ]
  },
  {
    id: 'ass-2',
    slug: 'cloud-devops-security',
    title: 'Cloud Security & Defensive Infrastructure',
    domain: 'Infrastructure & Security',
    durationMinutes: 25,
    passingScore: 75,
    questionsCount: 3,
    questions: [
      {
        id: 'cq1',
        text: 'In a Zero Trust Architecture, what is the core governing rule?',
        options: [
          'Trust internal IP subnets implicitly',
          'Never trust, always verify every incoming and outgoing request',
          'Rely exclusively on perimeter VPNs',
          'Encrypt data only at rest, not in transit'
        ],
        correctIndex: 1
      },
      {
        id: 'cq2',
        text: 'Which Kubernetes object distributes network traffic across a set of pods?',
        options: ['ConfigMap', 'DaemonSet', 'Service', 'Namespace'],
        correctIndex: 2
      },
      {
        id: 'cq3',
        text: 'What is the standard defense against SQL injection attacks in modern web APIs?',
        options: [
          'String concatenation of input parameters',
          'Parameterized queries and Object Relational Mapping (ORM) escaping',
          'Disabling database indexing',
          'Running database servers on non-standard ports'
        ],
        correctIndex: 1
      }
    ]
  }
];

export const MOCK_ROADMAPS = [
  {
    id: 'rd-30',
    durationDays: 30,
    title: '30-Day Accelerated Foundations & Proof-of-Work Sprint',
    targetRole: 'Full Stack Engineer',
    items: [
      {
        id: 'rd-item-1',
        weekNumber: 1,
        title: 'Algorithmic Mastery & Problem Solving',
        goalDescription: 'Solve 15 Easy and 10 Medium LeetCode problems covering Two-Pointers, Hash Maps, and Binary Search.',
        skillName: 'Data Structures & Algorithms',
        actionItem: 'Complete 3 daily Coding Lab problems and submit verified proofs.'
      },
      {
        id: 'rd-item-2',
        weekNumber: 2,
        title: 'REST API & Relational Database Architecture',
        goalDescription: 'Design a clean schema with PostgreSQL and build a FastAPI or Express server with JWT authentication.',
        skillName: 'Backend Engineering',
        actionItem: 'Ship an authenticated backend service with automated Pytest unit tests.'
      },
      {
        id: 'rd-item-3',
        weekNumber: 3,
        title: 'React & Tailwind Client Engineering',
        goalDescription: 'Build a responsive, modern frontend dashboard with optimistic UI updates and robust error boundaries.',
        skillName: 'Frontend Engineering',
        actionItem: 'Connect frontend to backend API and verify zero console errors.'
      },
      {
        id: 'rd-item-4',
        weekNumber: 4,
        title: 'Docker Deployment & ATS Resume Optimization',
        goalDescription: 'Containerize your full-stack repository with Docker Compose and score 85%+ on the NexGenAI ATS scanner.',
        skillName: 'DevOps & Career Prep',
        actionItem: 'Publish live GitHub repository and link verified URL to Career Passport.'
      }
    ]
  },
  {
    id: 'rd-60',
    durationDays: 60,
    title: '60-Day Microservices & Cloud Specialization Track',
    targetRole: 'Full Stack & Cloud Engineer',
    items: [
      {
        id: 'rd60-1',
        weekNumber: 1,
        title: 'Advanced DSA & Tree/Graph Traversal',
        goalDescription: 'Master BFS, DFS, and topological sort for dependency resolution.',
        skillName: 'Algorithms',
        actionItem: 'Pass the Python Core Assessment with distinction.'
      },
      {
        id: 'rd60-2',
        weekNumber: 3,
        title: 'Distributed Caching with Redis',
        goalDescription: 'Implement cache-aside and write-through patterns for 10x throughput enhancement.',
        skillName: 'Distributed Systems',
        actionItem: 'Build a high-scale URL shortener with rate limiting.'
      },
      {
        id: 'rd60-3',
        weekNumber: 5,
        title: 'CI/CD Pipeline Automation & GitHub Actions',
        goalDescription: 'Set up automated linting, test suites, and continuous deployment workflows.',
        skillName: 'DevOps',
        actionItem: 'Configure automated pull request validation.'
      },
      {
        id: 'rd60-4',
        weekNumber: 8,
        title: 'Mock Placement Drives & System Design Interviews',
        goalDescription: 'Pass 3 architectural interviews and achieve placement-ready status.',
        skillName: 'Career Readiness',
        actionItem: 'Complete campus drive registration on TPO portal.'
      }
    ]
  },
  {
    id: 'rd-90',
    durationDays: 90,
    title: '90-Day Full-Spectrum Production Mastery & Executive Placement',
    targetRole: 'Software Development Engineer (SDE-1)',
    items: [
      {
        id: 'rd90-1',
        weekNumber: 1,
        title: 'Complete Core Computer Science Fundamentals',
        goalDescription: 'Operating systems, computer networks, and database internals.',
        skillName: 'CS Fundamentals',
        actionItem: 'Complete Class 11 & Year 1 core course modules.'
      },
      {
        id: 'rd90-2',
        weekNumber: 4,
        title: 'Production Event-Driven Architecture (Kafka / RabbitMQ)',
        goalDescription: 'Decouple services using asynchronous messaging pipelines.',
        skillName: 'Event-Driven Systems',
        actionItem: 'Build an order-processing pipeline handling 1,000 msg/sec.'
      },
      {
        id: 'rd90-3',
        weekNumber: 8,
        title: 'Security Operations & Threat Defense (SOC Lab)',
        goalDescription: 'Perform incident response, firewall blocking, and log forensics.',
        skillName: 'Cybersecurity',
        actionItem: 'Score 90%+ on all 3 SOC simulator scenarios.'
      },
      {
        id: 'rd90-4',
        weekNumber: 12,
        title: 'Live Campus Recruitment Drives & Offer Negotiation',
        goalDescription: 'Participate in top-tier tier-1 company drives with 80%+ readiness score.',
        skillName: 'Placement Command',
        actionItem: 'Accept offer letter and export cryptographic Career Passport.'
      }
    ]
  }
];

export const MOCK_SKILL_TREE_NODES = [
  { id: 'st-1', name: 'Python Engineering', category: 'Core Backend', status: 'VERIFIED', level: 'Advanced', evidenceCount: 4, description: 'Idiomatic Python, async programming, data modeling, and clean architectures.' },
  { id: 'st-2', name: 'FastAPI Microservices', category: 'Core Backend', status: 'VERIFIED', level: 'Advanced', evidenceCount: 3, description: 'Dependency injection, Pydantic validation, OpenAPI specs, and middleware.' },
  { id: 'st-3', name: 'PostgreSQL Relational DB', category: 'Databases', status: 'VERIFIED', level: 'Intermediate', evidenceCount: 2, description: 'Indexing, B-Trees, transactions, foreign key constraints, and query optimization.' },
  { id: 'st-4', name: 'React & TypeScript', category: 'Frontend', status: 'VERIFIED', level: 'Advanced', evidenceCount: 4, description: 'Custom hooks, state management, Vite builds, and component design patterns.' },
  { id: 'st-5', name: 'Docker & Containerization', category: 'DevOps', status: 'CLAIMED', level: 'Intermediate', evidenceCount: 1, description: 'Multi-stage builds, container networks, and volume persistence.' },
  { id: 'st-6', name: 'System Design & Scalability', category: 'Architecture', status: 'CLAIMED', level: 'Intermediate', evidenceCount: 2, description: 'Load balancing, caching strategies, horizontal scaling, and CAP trade-offs.' },
  { id: 'st-7', name: 'Cybersecurity Incident Response', category: 'Security', status: 'VERIFIED', level: 'Intermediate', evidenceCount: 3, description: 'SIEM log analysis, brute force mitigation, and perimeter firewall rules.' },
  { id: 'st-8', name: 'Kubernetes Cluster Orchestration', category: 'DevOps', status: 'MISSING', level: 'Beginner', evidenceCount: 0, description: 'Deployments, services, ingress controllers, and auto-scalers.' },
  { id: 'st-9', name: 'Distributed Message Queues', category: 'Architecture', status: 'MISSING', level: 'Beginner', evidenceCount: 0, description: 'Kafka topic partitioning, producer/consumer offsets, and dead-letter queues.' }
];

export const MOCK_JOURNEY_STAGES = [
  {
    id: 'CLASS_11',
    name: 'Class 11 Foundation',
    stageNumber: 1,
    description: 'Computational thinking, algorithmic logic, and early digital exploration.',
    focusAreas: ['Algorithmic Logic', 'Binary Systems', 'Python Syntax', 'Problem Decomposition'],
    recommendedCourseSlug: 'comp-thinking-11',
    status: 'ACTIVE'
  },
  {
    id: 'CLASS_12',
    name: 'Class 12 Preparation',
    stageNumber: 2,
    description: 'Data structures, web primitives, OOP concepts, and entrance readiness.',
    focusAreas: ['Data Structures', 'Object-Oriented Design', 'Git Version Control', 'Web Basics'],
    recommendedCourseSlug: 'foundations-web-python-12',
    status: 'UPCOMING'
  },
  {
    id: 'COLLEGE_YEAR_1',
    name: 'Engineering Year 1',
    stageNumber: 3,
    description: 'Full-stack development, relational databases, and verifiable GitHub projects.',
    focusAreas: ['Full Stack Web', 'PostgreSQL', 'REST APIs', 'Linux Command Line'],
    recommendedCourseSlug: 'fullstack-foundations-y1',
    status: 'UPCOMING'
  },
  {
    id: 'COLLEGE_YEAR_2',
    name: 'Engineering Year 2',
    stageNumber: 4,
    description: 'Distributed systems, Docker containers, and cybersecurity fundamentals.',
    focusAreas: ['Distributed Systems', 'Docker', 'SIEM & SOC', 'Operating Systems'],
    recommendedCourseSlug: 'distributed-systems-y2',
    status: 'UPCOMING'
  },
  {
    id: 'COLLEGE_YEAR_3',
    name: 'Engineering Year 3',
    stageNumber: 5,
    description: 'System design, ATS resume engineering, internships, and technical interviews.',
    focusAreas: ['System Design', 'ATS Resumes', 'LeetCode Mediums', 'Internship Applications'],
    recommendedCourseSlug: 'system-design-prep-y3',
    status: 'UPCOMING'
  },
  {
    id: 'COLLEGE_YEAR_4',
    name: 'Final Year / Placement Command',
    stageNumber: 6,
    description: 'Tier-1 campus recruitment drives, company rounds, and executive offer negotiation.',
    focusAreas: ['Campus Drives', 'HR/STAR Interviews', 'Offer Negotiation', 'Production Engineering'],
    recommendedCourseSlug: 'placement-readiness-y4',
    status: 'UPCOMING'
  },
  {
    id: 'CAREER_ACCELERATION',
    name: 'Career Acceleration',
    stageNumber: 7,
    description: 'Senior software engineering promotions, architectural leadership, and specialized AI/ML.',
    focusAreas: ['Staff Engineering', 'Large-Scale Architecture', 'Tech Leadership', 'Patents'],
    recommendedCourseSlug: 'distributed-systems-y2',
    status: 'UPCOMING'
  }
];

export const MOCK_JOBS = [
  {
    id: 'j-1',
    title: 'Graduate Software Engineer - AI Platforms',
    company: 'NextGen Cloud Technologies',
    location: 'Bengaluru / Hybrid',
    type: 'Full-time',
    stage_eligibility: 'YEAR_4 / CAREER',
    stipend: 'Rs 14,00,000 - Rs 18,00,000 / yr',
    match_score: 92,
    skills: ['Python', 'FastAPI', 'React', 'Docker']
  },
  {
    id: 'j-2',
    title: 'Cybersecurity Analyst Intern (SOC)',
    company: 'SecureShield Global',
    location: 'Remote',
    type: 'Internship',
    stage_eligibility: 'YEAR_3 / YEAR_4',
    stipend: 'Rs 45,000 / month',
    match_score: 87,
    skills: ['Network Security', 'SIEM', 'Linux', 'Splunk']
  },
  {
    id: 'j-3',
    title: 'Full Stack Developer Trainee',
    company: 'InnovateX Labs',
    location: 'Pune / On-site',
    type: 'Full-time',
    stage_eligibility: 'YEAR_4 / PLACEMENT',
    stipend: 'Rs 8,50,000 - Rs 11,00,000 / yr',
    match_score: 95,
    skills: ['TypeScript', 'Next.js', 'PostgreSQL', 'Tailwind CSS']
  }
];

export const MOCK_CANDIDATES = [
  {
    id: 'cand-1',
    name: 'Dheeraj Muley',
    academicStage: 'CLASS_11',
    institution: 'National Institute of Technology',
    targetRole: 'Full Stack & AI Engineer',
    readinessScore: 78,
    verifiedSkillsCount: 6,
    topSkills: ['Python', 'React', 'FastAPI', 'Algorithms'],
    githubEvidenceCount: 3,
    cgpa: 8.8
  },
  {
    id: 'cand-2',
    name: 'Aanya Sharma',
    academicStage: 'COLLEGE_YEAR_3',
    institution: 'Indian Institute of Technology',
    targetRole: 'Cloud & DevOps Engineer',
    readinessScore: 92,
    verifiedSkillsCount: 9,
    topSkills: ['Docker', 'Kubernetes', 'AWS', 'Go'],
    githubEvidenceCount: 7,
    cgpa: 9.3
  },
  {
    id: 'cand-3',
    name: 'Rohan Mehta',
    academicStage: 'COLLEGE_YEAR_4',
    institution: 'BITS Pilani',
    targetRole: 'Cybersecurity / SOC Engineer',
    readinessScore: 89,
    verifiedSkillsCount: 8,
    topSkills: ['SIEM', 'Threat Analysis', 'Python', 'Linux'],
    githubEvidenceCount: 5,
    cgpa: 8.6
  }
];
