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
    id: 'c-1',
    title: 'Computational Thinking & Tech Exploration',
    slug: 'comp-thinking-11',
    stage: 'CLASS_11',
    description: 'Discover algorithms, logic, and early digital architecture tailored for high school foundation.',
    lessons_count: 8,
    progress: 25,
    category: 'Foundations'
  },
  {
    id: 'c-2',
    title: 'Foundations of Web & Python Programming',
    slug: 'foundations-web-python-12',
    stage: 'CLASS_12',
    description: 'Master basic programming, git version control, and core web principles.',
    lessons_count: 12,
    progress: 10,
    category: 'Core Programming'
  },
  {
    id: 'c-3',
    title: 'Full-Stack Foundations & Relational DBs',
    slug: 'fullstack-foundations-y1',
    stage: 'YEAR_1',
    description: 'Build real-world client-server apps with modern databases and REST APIs.',
    lessons_count: 16,
    progress: 40,
    category: 'Full Stack'
  },
  {
    id: 'c-4',
    title: 'Distributed Systems & Cloud Architecture',
    slug: 'distributed-systems-y2',
    stage: 'YEAR_2',
    description: 'Deploy production cloud microservices with Docker and Kubernetes.',
    lessons_count: 14,
    progress: 15,
    category: 'Cloud & Systems'
  },
  {
    id: 'c-5',
    title: 'System Design & Industry Interview Prep',
    slug: 'system-design-prep-y3',
    stage: 'YEAR_3',
    description: 'Master technical interviews, ATS resumes, and high-scale architecture.',
    lessons_count: 18,
    progress: 60,
    category: 'Career Readiness'
  },
  {
    id: 'c-6',
    title: 'Placement Command & Production Engineering',
    slug: 'placement-readiness-y4',
    stage: 'YEAR_4',
    description: 'Live company drive practice, production deployment, and executive technical interviews.',
    lessons_count: 20,
    progress: 80,
    category: 'Placement'
  }
];

export const MOCK_SOC_INCIDENTS = [
  {
    id: 'soc-1',
    title: 'Suspicious SSH Brute-Force from Foreign ASN',
    severity: 'HIGH',
    status: 'OPEN',
    source_ip: '185.220.101.5',
    target_host: 'prod-auth-service-01',
    description: 'Over 4,200 failed authentication attempts detected within 3 minutes targeting port 22.',
    recommended_action: 'Block source subnet on perimeter firewall and rotate compromised administrative credentials.'
  },
  {
    id: 'soc-2',
    title: 'Anomalous Data Exfiltration via DNS Tunneling',
    severity: 'CRITICAL',
    status: 'INVESTIGATING',
    source_ip: '10.0.4.12',
    target_host: 'internal-db-replica',
    description: 'High frequency of TXT query lookups to dynamic domain suspicious-cloud-sync.xyz.',
    recommended_action: 'Isolate host from VPC and capture memory dump for forensics analysis.'
  },
  {
    id: 'soc-3',
    title: 'SQL Injection Signature Detected in API Gateway',
    severity: 'MEDIUM',
    status: 'CONTAINED',
    source_ip: '194.26.29.112',
    target_host: 'api.nexgenai.edu/v1/search',
    description: 'WAF blocked UNION SELECT payload attempting to enumerate schema tables.',
    recommended_action: 'Verify parameter sanitization in ORM models and audit WAF rule thresholds.'
  }
];

export const MOCK_CODING_PROBLEMS = [
  {
    id: 'p-1',
    slug: 'two-sum-career',
    title: 'Optimal Skill Pairing (Two Sum)',
    difficulty: 'EASY',
    category: 'Arrays & Hashing',
    description: 'Given an array of skill score integers and a target competency score, find the two indices that add up to target.',
    initialCode: 'def solve(nums, target):\n    # Write your solution here\n    seen = {}\n    for i, n in enumerate(nums):\n        diff = target - n\n        if diff in seen:\n            return [seen[diff], i]\n        seen[n] = i\n    return []',
    testCases: [{ input: '[2, 7, 11, 15], 9', output: '[0, 1]' }]
  },
  {
    id: 'p-2',
    slug: 'lru-cache-architecture',
    title: 'LRU Cache Design for High-Throughput API',
    difficulty: 'MEDIUM',
    category: 'Design & Linked List',
    description: 'Implement an LRU Cache with O(1) get and put operations to back an enterprise session store.',
    initialCode: 'class LRUCache:\n    def __init__(self, capacity: int):\n        self.capacity = capacity\n        self.cache = {}\n\n    def get(self, key: int) -> int:\n        return self.cache.get(key, -1)\n\n    def put(self, key: int, value: int) -> None:\n        self.cache[key] = value',
    testCases: [{ input: 'put(1, 1), get(1)', output: '1' }]
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
