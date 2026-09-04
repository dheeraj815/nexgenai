import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const domains = [
  ['artificial-intelligence', 'Artificial Intelligence', 'AI & Data', 'Bot', 'Creation of intelligent software agents, neural systems, and automated cognitive engines.'],
  ['machine-learning', 'Machine Learning', 'AI & Data', 'Cpu', 'Predictive modeling, algorithmic pattern recognition, regression, and gradient boosting.'],
  ['generative-ai-llm', 'Generative AI & LLM Engineering', 'AI & Data', 'Sparkles', 'Foundation models, prompt engineering, RAG pipelines, fine-tuning, and AI agent frameworks.'],
  ['data-science', 'Data Science', 'AI & Data', 'BarChart3', 'Statistical discovery, exploratory analysis, hypothesis validation, and quantitative modeling.'],
  ['software-engineering', 'Software Engineering', 'Core Engineering', 'Code', 'Software craftsmanship, object-oriented design, algorithms, testing, and maintainability.'],
  ['full-stack-development', 'Full Stack Development', 'Web & Applications', 'Layers', 'End-to-end web engineering linking modern frontends, robust APIs, and databases.'],
  ['backend-engineering', 'Backend Engineering', 'Core Engineering', 'Server', 'High-throughput servers, database optimization, distributed transactions, and microservices.'],
  ['frontend-engineering', 'Frontend Engineering', 'Web & Applications', 'Layout', 'Modern responsive SPAs, accessibility, state management, design systems, and rendering.'],
  ['mobile-development', 'Mobile Development', 'Web & Applications', 'Smartphone', 'Native and cross-platform mobile apps for iOS and Android with offline-first state.'],
  ['cloud-computing', 'Cloud Computing', 'Infrastructure', 'Cloud', 'Public cloud platforms (AWS, GCP, Azure), virtual networks, IAM, and serverless compute.'],
  ['devops-sre', 'DevOps & SRE', 'Infrastructure', 'GitMerge', 'CI/CD pipelines, container orchestration with Kubernetes, observability, and 99.99% uptime.'],
  ['cybersecurity', 'Cybersecurity', 'Security', 'Shield', 'Information assurance, penetration testing, threat modeling, and defensive system hardening.'],
  ['soc-operations', 'SOC & Security Operations', 'Security', 'ShieldAlert', '24/7 security monitoring, SIEM log triage, IoC containment, and incident response.'],
  ['data-engineering', 'Data Engineering', 'AI & Data', 'Database', 'ETL pipelines, data warehousing (Snowflake, BigQuery), stream processing with Kafka and Spark.'],
  ['mlops', 'MLOps', 'AI & Data', 'Workflow', 'Automated ML training pipelines, model registries, drift detection, and production deployment.'],
  ['computer-vision', 'Computer Vision', 'AI & Data', 'Eye', 'Image segmentation, object detection, facial recognition, and OpenCV/YOLO vision systems.'],
  ['natural-language-processing', 'Natural Language Processing', 'AI & Data', 'MessageSquare', 'Text parsing, semantic embeddings, sentiment analysis, tokenizers, and language models.'],
  ['robotics', 'Robotics', 'Hardware & Systems', 'Bot', 'Kinematics, ROS (Robot Operating System), embedded sensors, motor controls, and automation.'],
  ['iot-smart-systems', 'IoT & Smart Systems', 'Hardware & Systems', 'Wifi', 'Edge sensor networks, MQTT telemetry, microcontrollers (ESP32), and smart automation.'],
  ['embedded-systems', 'Embedded Systems', 'Hardware & Systems', 'Binary', 'Bare-metal C/C++, RTOS, microcontroller firmware, SPI/I2C communication, and memory safety.'],
  ['blockchain-web3', 'Blockchain & Web3', 'Distributed Systems', 'Coins', 'Decentralized ledgers, smart contracts (Solidity), cryptographic verification, and EVM.'],
  ['qa-test-automation', 'QA & Test Automation', 'Quality & Reliability', 'CheckCircle2', 'Automated test frameworks (Playwright, Cypress), unit, integration, and load testing.'],
  ['product-engineering', 'Product Engineering', 'Core Engineering', 'Boxes', 'Translating business requirements into resilient technical architectures and user value.'],
  ['system-design', 'System Design & Architecture', 'Core Engineering', 'Network', 'High-availability distributed architectures, CAP theorem, caching, partitioning, and queues.'],
  ['database-engineering', 'Database Engineering', 'Core Engineering', 'Database', 'Query indexing, WAL internals, replication topologies, transaction isolation, and tuning.'],
  ['business-analytics', 'Business & Data Analytics', 'Analytics & Strategy', 'TrendingUp', 'Data-driven decision making, executive dashboards (Tableau/PowerBI), and growth metrics.'],
  ['fintech-quant', 'FinTech & Quantitative Engineering', 'Domain Verticals', 'DollarSign', 'Algorithmic trading systems, risk analysis, payment gateways, and ledger consistency.'],
  ['product-management', 'Technical Product Management', 'Product & Design', 'Compass', 'Product discovery, PRD authoring, sprint prioritization, unit economics, and launch strategy.'],
  ['ui-ux-design', 'UI/UX Engineering & Design', 'Product & Design', 'Palette', 'User empathy, wireframing, Figma design systems, interaction ergonomics, and WCAG accessibility.'],
  ['technical-communication', 'Technical Communication & Leadership', 'Professional Growth', 'BookOpen', 'Engineering documentation, RFC writing, executive presentation, and engineering leadership.']
];

async function main() {
  console.log('Seeding NexGenAI database with 30 production domains...');

  // Clean old seeds safely
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.candidateShortlist.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.placementDrive.deleteMany();
  await prisma.application.deleteMany();
  await prisma.jobMatch.deleteMany();
  await prisma.job.deleteMany();
  await prisma.recruiterProfile.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.socIncidentAttempt.deleteMany();
  await prisma.socIncident.deleteMany();
  await prisma.systemDesignDiagram.deleteMany();
  await prisma.codingSubmission.deleteMany();
  await prisma.codingProblem.deleteMany();
  await prisma.assessmentAttempt.deleteMany();
  await prisma.assessmentQuestion.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.skillEvidence.deleteMany();
  await prisma.userSkill.deleteMany();
  await prisma.project.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.courseModule.deleteMany();
  await prisma.course.deleteMany();
  await prisma.domainRole.deleteMany();
  await prisma.domainSkill.deleteMany();
  await prisma.userDomain.deleteMany();
  await prisma.domain.deleteMany();
  await prisma.institution.deleteMany();

  // 1. Institution
  const nit = await prisma.institution.create({
    data: {
      name: 'National Institute of Technology',
      code: 'NIT-MAIN',
      city: 'Warangal',
      state: 'Telangana',
      website: 'https://nitw.ac.in',
    },
  });

  // 2. 30 Domains
  for (const [slug, name, category, icon, desc] of domains) {
    const domain = await prisma.domain.create({
      data: {
        slug,
        name,
        category,
        icon,
        description: desc,
      },
    });

    await prisma.domainSkill.createMany({
      data: [
        { domainId: domain.id, name: `${name} Fundamentals`, category: 'Core', level: 'BEGINNER', importance: 'CRITICAL' },
        { domainId: domain.id, name: `Applied ${name}`, category: 'Advanced', level: 'INTERMEDIATE', importance: 'CRITICAL' },
        { domainId: domain.id, name: `Production ${name} Tooling`, category: 'Tool', level: 'ADVANCED', importance: 'RECOMMENDED' },
      ],
    });

    await prisma.domainRole.create({
      data: {
        domainId: domain.id,
        title: `${name} Specialist`,
        description: `Industry role focusing on implementation and scaling within ${name}.`,
        averageSalaryMin: 9.0,
        averageSalaryMax: 20.0,
        requiredSkills: JSON.stringify([`${name} Fundamentals`, 'Git', 'System Design']),
      },
    });
  }

  // 3. Courses
  const seDomain = await prisma.domain.findUnique({ where: { slug: 'software-engineering' } });
  const fsDomain = await prisma.domain.findUnique({ where: { slug: 'full-stack-development' } });
  const sdDomain = await prisma.domain.findUnique({ where: { slug: 'system-design' } });

  if (seDomain) {
    await prisma.course.create({
      data: {
        domainId: seDomain.id,
        title: 'Career Discovery 101: Computational Thinking & The Engineering Landscape',
        slug: 'career-discovery-101',
        summary: 'Designed for Class 11 students to discover engineering domains, understand what tech professionals actually build, and write their first logic scripts.',
        academicStage: 'CLASS_11',
        difficulty: 'BEGINNER',
        estimatedHours: 8,
        modules: {
          create: [
            {
              title: 'Module 1: What Does an Engineer Actually Do?',
              description: 'Deconstructing modern tech roles: AI researchers, frontend builders, cloud architects, and cyber defenders.',
              orderIndex: 1,
              lessons: {
                create: [
                  {
                    title: 'The Modern Digital World: How Software Shapes Everything',
                    orderIndex: 1,
                    contentText: '# Welcome to Career Discovery\n\nIn Class 11, the most critical question is not "what language should I memorize?", but **"what problems do I love solving?"**\n\n### The Engineering Landscape\n1. **Software Developers**: Build the apps and platforms you use daily (Instagram, YouTube, Discord).\n2. **AI Engineers**: Teach computers to recognize patterns, generate art, and automate decisions.\n3. **Cybersecurity Analysts**: Defend systems from attackers, protect privacy, and investigate digital intrusions.\n\nTake your time exploring different fields without premature pressure!',
                    estimatedMinutes: 10,
                  },
                  {
                    title: 'A Day in the Life: AI Engineer vs Cybersecurity Analyst',
                    orderIndex: 2,
                    contentText: '# Comparing Key Paths\n\n### AI Engineer\n- **Daily Work**: Experiments with data, trains neural networks, evaluates prediction accuracy.\n- **Key Skills**: Python, Math, Statistics, Curiosity.\n\n### Cybersecurity Analyst\n- **Daily Work**: Monitors network traffic, investigates alerts, plugs vulnerabilities.\n- **Key Skills**: Networking, Linux, Forensic Logic, Resilience.',
                    estimatedMinutes: 12,
                  }
                ]
              }
            }
          ]
        }
      }
    });

    await prisma.course.create({
      data: {
        domainId: seDomain.id,
        title: 'CS Core Foundations: Data Structures & Algorithmic Thinking',
        slug: 'cs-foundations-dsa',
        summary: 'College Year 1 masterclass on fundamental computer science, algorithms, memory, and complexity.',
        academicStage: 'YEAR_1',
        difficulty: 'BEGINNER',
        estimatedHours: 15,
        modules: {
          create: [
            {
              title: 'Module 1: Complexity & Core Structures',
              description: 'Big-O notation, Arrays, Strings, and Two Pointers.',
              orderIndex: 1,
              lessons: {
                create: [
                  {
                    title: 'Asymptotic Analysis & Big-O Notation',
                    orderIndex: 1,
                    contentText: '# Time & Space Complexity\n\nWriting code that works is only half the battle; writing code that **scales** is engineering.\n\n- **O(1)**: Constant time (Hash table lookup)\n- **O(log N)**: Logarithmic time (Binary Search)\n- **O(N)**: Linear scan\n- **O(N log N)**: Optimal comparison sort (Merge/Quick Sort)\n- **O(N^2)**: Quadratic nested loops (Avoid for N > 10,000)',
                    estimatedMinutes: 20,
                  }
                ]
              }
            }
          ]
        }
      }
    });
  }

  if (fsDomain) {
    await prisma.course.create({
      data: {
        domainId: fsDomain.id,
        title: 'Career Direction: Tech Pathways & Proof of Work Starter',
        slug: 'domain-pathway-explorer',
        summary: 'Designed for Class 12 students to narrow down their stream, set up GitHub, and start their Career Passport early.',
        academicStage: 'CLASS_12',
        difficulty: 'BEGINNER',
        estimatedHours: 10,
        modules: {
          create: [
            {
              title: 'Module 1: Choosing Your Engineering Trajectory',
              description: 'Comparing university degree programs, self-taught skills, and target industries.',
              orderIndex: 1,
              lessons: {
                create: [
                  {
                    title: 'The 30/60/90 Day Direction Framework',
                    orderIndex: 1,
                    contentText: '# Planning Your Transition to College\n\nIn Class 12, entering college with a clear direction gives you an immense competitive advantage.\n\n### The Rule of One:\n- **One Primary Domain**: Focus on Web, AI, or Security first.\n- **One GitHub Account**: Commit your beginner exercises.\n- **One Career Passport**: Track your real progress from day one.',
                    estimatedMinutes: 12,
                  }
                ]
              }
            }
          ]
        }
      }
    });
  }

  if (sdDomain) {
    await prisma.course.create({
      data: {
        domainId: sdDomain.id,
        title: 'System Design & Distributed Architectures for Placements',
        slug: 'system-design-distributed-architectures',
        summary: 'Crucial for College Year 3 & 4 students preparing for high-paying product company technical interviews.',
        academicStage: 'YEAR_3',
        difficulty: 'INTERMEDIATE',
        estimatedHours: 20,
        modules: {
          create: [
            {
              title: 'Module 1: Core Principles of Scalability',
              description: 'Load balancing, caching, database partitioning, and consensus.',
              orderIndex: 1,
              lessons: {
                create: [
                  {
                    title: 'Horizontal Scaling & The Role of Load Balancers',
                    orderIndex: 1,
                    contentText: '# High Scalability Principles\n\n### Vertical vs Horizontal Scaling\n- **Vertical Scaling (Scale-Up)**: Adding more RAM and CPU cores to a single machine. Hard limits and high cost.\n- **Horizontal Scaling (Scale-Out)**: Adding commodity servers behind a Load Balancer (Nginx, AWS ALB, HAProxy).\n\nUse our **System Design Canvas** to construct and analyze live architectures.',
                    estimatedMinutes: 25,
                  }
                ]
              }
            }
          ]
        }
      }
    });
  }

  // 4. Coding Problems
  await prisma.codingProblem.create({
    data: {
      slug: 'two-sum',
      title: 'Two Sum',
      difficulty: 'EASY',
      category: 'Arrays & Hashing',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume each input has exactly one solution.',
      starterCodeJs: 'function twoSum(input) {\n  const { nums, target } = input;\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) {\n      return [map.get(diff), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}',
      starterCodePy: 'def twoSum(nums, target):\n    lookup = {}\n    for i, num in enumerate(nums):\n        if target - num in lookup:\n            return [lookup[target - num], i]\n        lookup[num] = i\n    return []',
      testCasesJson: JSON.stringify([
        { input: { nums: [2, 7, 11, 15], target: 9 }, expectedOutput: [0, 1], isHidden: false },
        { input: { nums: [3, 2, 4], target: 6 }, expectedOutput: [1, 2], isHidden: false },
        { input: { nums: [3, 3], target: 6 }, expectedOutput: [0, 1], isHidden: true },
      ]),
      solutionExplanation: 'Utilize an in-memory hash map to store each number and its index. For every number, verify if (target - num) exists in O(1) time.',
    }
  });

  await prisma.codingProblem.create({
    data: {
      slug: 'valid-parentheses',
      title: 'Valid Parentheses',
      difficulty: 'EASY',
      category: 'Stacks',
      description: 'Given a string s containing just the characters (, ), {, }, [ and ], determine if the input string is valid.',
      starterCodeJs: 'function isValid(input) {\n  const s = typeof input === "string" ? input : input.s;\n  const stack = [];\n  const map = { ")": "(", "}": "{", "]": "[" };\n  for (const char of s) {\n    if (char === "(" || char === "{" || char === "[") {\n      stack.push(char);\n    } else {\n      if (stack.pop() !== map[char]) return false;\n    }\n  }\n  return stack.length === 0;\n}',
      starterCodePy: 'def isValid(s):\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    for char in s:\n        if char in mapping.values():\n            stack.append(char)\n        elif char in mapping:\n            if not stack or stack.pop() != mapping[char]:\n                return False\n    return not stack',
      testCasesJson: JSON.stringify([
        { input: { s: '()' }, expectedOutput: true, isHidden: false },
        { input: { s: '()[]{}' }, expectedOutput: true, isHidden: false },
        { input: { s: '(]' }, expectedOutput: false, isHidden: false },
        { input: { s: '{[]}' }, expectedOutput: true, isHidden: true },
      ]),
      solutionExplanation: 'Use a LIFO Stack. Push opening brackets, and on encountering closing brackets, pop and verify type match.',
    }
  });

  // 5. SOC Incident
  await prisma.socIncident.create({
    data: {
      id: 'incident-ssh-01',
      title: 'SOC Incident 104: SSH Brute-Force & Credential Compromise',
      scenarioType: 'SSH_BRUTE_FORCE',
      difficulty: 'INTERMEDIATE',
      description: 'The security operations center received a high-volume spike in authentication failures on the production bastion host (192.168.10.45) originating from an external IP.',
      rawLogs: 'Sep 04 14:10:01 bastion sshd[24102]: Failed password for invalid user admin from 198.51.100.24 port 44321 ssh2\nSep 04 14:10:03 bastion sshd[24105]: Failed password for invalid user root from 198.51.100.24 port 44322 ssh2\nSep 04 14:10:05 bastion sshd[24108]: Failed password for user deploy from 198.51.100.24 port 44323 ssh2\nSep 04 14:10:09 bastion sshd[24112]: Accepted password for user deploy from 198.51.100.24 port 44324 ssh2\nSep 04 14:10:15 bastion sudo: deploy : TTY=pts/0 ; PWD=/home/deploy ; USER=root ; COMMAND=/bin/bash',
      validIoCsJson: JSON.stringify(['198.51.100.24', 'user deploy', '/bin/bash', 'port 44324']),
      correctSeverity: 'CRITICAL',
      correctContainmentActionsJson: JSON.stringify(['Block IP 198.51.100.24 on Firewall', 'Terminate active session for user deploy', 'Rotate compromised credentials for user deploy']),
      explanation: 'Attacker executed an automated password guessing brute-force dictionary attack against SSH, succeeded in guessing credentials for user deploy, and escalated privileges to root using sudo.',
    }
  });

  // 6. Assessments
  await prisma.assessment.create({
    data: {
      slug: 'class-11-discovery-assessment',
      title: 'Class 11: Computational Logic & Career Aptitude Assessment',
      description: 'Foundational logic, problem-solving mindset, and software domain identification.',
      academicStage: 'CLASS_11',
      difficulty: 'BEGINNER',
      timeLimitMinutes: 20,
      passPercentage: 70,
      questions: {
        create: [
          {
            questionText: 'What is the primary role of a Cloud Engineer in modern technology organizations?',
            optionsJson: JSON.stringify([
              { id: 'A', text: 'Design user interfaces and color schemes' },
              { id: 'B', text: 'Manage scalable infrastructure, virtual networks, and server deployments' },
              { id: 'C', text: 'Write corporate sales proposals' },
              { id: 'D', text: 'Conduct manual physical device repair' }
            ]),
            correctAnswer: 'B',
            explanation: 'Cloud Engineers configure and maintain virtualized infrastructure, compute clusters, and storage in cloud providers like AWS, GCP, or Azure.',
          },
          {
            questionText: 'In Python, what is the type of a decimal number like 42.5?',
            optionsJson: JSON.stringify([
              { id: 'A', text: 'int' },
              { id: 'B', text: 'float' },
              { id: 'C', text: 'str' },
              { id: 'D', text: 'boolean' }
            ]),
            correctAnswer: 'B',
            explanation: 'Numbers containing fractional decimal parts in Python are evaluated as type float.',
          },
          {
            questionText: 'Why is Git version control critical for software engineers?',
            optionsJson: JSON.stringify([
              { id: 'A', text: 'It prevents computer screens from freezing' },
              { id: 'B', text: 'It tracks code history, facilitates collaboration, and serves as tangible proof of work' },
              { id: 'C', text: 'It converts JavaScript into Python automatically' },
              { id: 'D', text: 'It increases internet download speeds' }
            ]),
            correctAnswer: 'B',
            explanation: 'Git allows distributed teams to branch, merge, rollback errors, and transparently document code evolution.',
          }
        ]
      }
    }
  });

  // 7. Organizations & Jobs
  const googleOrg = await prisma.organization.create({
    data: {
      name: 'Google India',
      industry: 'Internet & Cloud Technology',
      website: 'https://careers.google.com',
      verified: true,
    }
  });

  const crowdstrikeOrg = await prisma.organization.create({
    data: {
      name: 'CrowdStrike',
      industry: 'Cybersecurity & Endpoint Protection',
      website: 'https://crowdstrike.com',
      verified: true,
    }
  });

  await prisma.job.create({
    data: {
      organizationId: googleOrg.id,
      title: 'Software Development Engineer - Campus Placement (L3)',
      domainSlug: 'software-engineering',
      roleType: 'FULL_TIME',
      location: 'Bengaluru / Hyderabad',
      workMode: 'HYBRID',
      description: 'We are seeking passionate university graduates to build world-scale distributed systems and core cloud infrastructure.',
      requirements: 'Strong fundamentals in Data Structures, Algorithms, Systems Architecture, and proficiency in C++, Java, or Python.',
      skillsRequiredJson: JSON.stringify(['Data Structures & Algorithms', 'Python', 'System Design & Architecture', 'Git']),
      minCgpa: 7.5,
      salaryMin: 18.0,
      salaryMax: 26.0,
      status: 'ACTIVE',
    }
  });

  await prisma.job.create({
    data: {
      organizationId: crowdstrikeOrg.id,
      title: 'Associate Security Operations Analyst (SOC)',
      domainSlug: 'cybersecurity',
      roleType: 'FULL_TIME',
      location: 'Pune / Remote',
      workMode: 'REMOTE',
      description: 'Investigate live threat telemetry, triage SIEM alerts, and participate in incident response on our global threat defense team.',
      requirements: 'Understanding of TCP/IP, Linux fundamentals, threat intelligence, and defensive incident response.',
      skillsRequiredJson: JSON.stringify(['SOC & Threat Detection', 'Cybersecurity', 'Linux', 'Networking']),
      minCgpa: 6.5,
      salaryMin: 12.0,
      salaryMax: 18.0,
      status: 'ACTIVE',
    }
  });

  // 8. Placement Drive
  await prisma.placementDrive.create({
    data: {
      institutionId: nit.id,
      companyName: 'Google India',
      jobTitle: 'Software Development Engineer - 2026 Batch',
      driveDate: new Date(Date.now() + 14 * 86400000),
      ctcLpa: 24.5,
      minCgpa: 7.5,
      allowedBranchesJson: JSON.stringify(['CSE', 'IT', 'ECE', 'EE']),
      allowedBatchesJson: JSON.stringify(['2026', '2027']),
      maxBacklogs: 0,
      description: 'On-campus placement drive consisting of online coding screening, 2 technical rounds, and Googleyness behavioral interview.',
      status: 'UPCOMING',
    }
  });

  console.log('Database seeded successfully with all 30 domains, courses, labs, and jobs.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });