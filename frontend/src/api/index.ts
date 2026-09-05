import {
  CANONICAL_DOMAINS,
  MOCK_COURSES,
  MOCK_SOC_INCIDENTS,
  MOCK_CODING_PROBLEMS,
  MOCK_ASSESSMENTS,
  MOCK_ROADMAPS,
  MOCK_SKILL_TREE_NODES,
  MOCK_JOURNEY_STAGES,
  MOCK_JOBS,
  MOCK_CANDIDATES
} from './mockData';

const API_BASE = (import.meta as any).env?.VITE_API_URL || '';
const BASE_URL = `${API_BASE}/api/v1`;

// Client-side Resilient Mock Request Dispatcher
// Automatically engaged on Vercel static deployments or when backend is unreachable
function handleMockRequest(endpoint: string, options: RequestInit = {}): { success: boolean; data?: any; error?: string } {
  let body: any = {};
  if (options.body && typeof options.body === 'string') {
    try {
      body = JSON.parse(options.body);
    } catch {
      body = {};
    }
  }

  // Helper to get stored user
  const getStoredUser = () => {
    try {
      const raw = localStorage.getItem('nexgenai_user');
      if (raw) return JSON.parse(raw);
    } catch {}
    return null;
  };

  // 1. Auth: Register / Signup
  if (endpoint.includes('/auth/register') || endpoint.includes('/auth/signup')) {
    const fullName = body.full_name || `${body.firstName || ''} ${body.lastName || ''}`.trim() || 'Student';
    const stage = body.academic_stage || body.academicStage || 'CLASS_11';
    const email = body.email || 'student@nexgenai.edu';
    const role = body.role || 'STUDENT';
    const userId = 'usr_' + Math.random().toString(36).substring(2, 9);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + btoa(JSON.stringify({ sub: userId, role })) + '.signature';

    const mockUser = {
      id: userId,
      email,
      role,
      full_name: fullName,
      academic_stage: stage,
      is_onboarded: false,
      profile: {
        id: 'prof_' + userId,
        user_id: userId,
        full_name: fullName,
        academic_stage: stage,
        institution: '',
        department: '',
        graduation_year: 2027,
        cgpa: 0,
        target_role: '',
        is_onboarded: false,
        readiness_score: 72.0,
        backlogs: 0
      }
    };

    localStorage.setItem('nexgenai_user', JSON.stringify(mockUser));
    localStorage.setItem('nexgenai_token', token);

    return {
      success: true,
      data: {
        access_token: token,
        token_type: 'bearer',
        user: mockUser
      }
    };
  }

  // 2. Auth: Login
  if (endpoint.includes('/auth/login')) {
    const email = body.email || '';
    let stored = getStoredUser();

    const user = (stored && stored.email === email) ? stored : {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      email,
      role: 'STUDENT',
      full_name: email ? email.split('@')[0] : 'Student',
      academic_stage: 'CLASS_11',
      is_onboarded: false,
      profile: {
        id: 'prof_active',
        user_id: 'usr_active',
        full_name: email ? email.split('@')[0] : 'Student',
        academic_stage: 'CLASS_11',
        institution: '',
        department: '',
        graduation_year: 2027,
        cgpa: 0,
        target_role: '',
        is_onboarded: false,
        readiness_score: 72.0,
        backlogs: 0
      }
    };

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + btoa(JSON.stringify({ sub: user.id, role: user.role })) + '.signature';
    localStorage.setItem('nexgenai_user', JSON.stringify(user));
    localStorage.setItem('nexgenai_token', token);

    return {
      success: true,
      data: {
        access_token: token,
        token_type: 'bearer',
        user
      }
    };
  }

  // 3. Auth: Current User /me
  if (endpoint.includes('/auth/me')) {
    const user = getStoredUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }
    return { success: true, data: user };
  }

  // 4. Profile: Update / Onboarding
  if (endpoint.includes('/profile') || endpoint.includes('/auth/profile')) {
    let user: any = getStoredUser() || {};
    user.profile = {
      ...(user.profile || {}),
      ...body,
      is_onboarded: true,
      target_role: body.targetRole || body.target_role || user.profile?.target_role || 'Full Stack Engineer',
      institution: body.institutionName || body.institution || user.profile?.institution,
      department: body.branch || body.department || user.profile?.department,
      graduation_year: body.graduationYear || body.graduation_year || user.profile?.graduation_year,
      cgpa: body.cgpa || user.profile?.cgpa,
      readiness_score: 72.0
    };
    user.is_onboarded = true;
    localStorage.setItem('nexgenai_user', JSON.stringify(user));

    return { success: true, data: { user, status: 'SUCCESS' } };
  }

  // 5. Passport
  if (endpoint.includes('/passport')) {
    const user: any = getStoredUser() || {};
    const passportData = {
      profile: user.profile || {
        full_name: user.full_name || 'Dheeraj Muley',
        academic_stage: user.academic_stage || 'CLASS_11',
        institution: 'National Institute of Technology',
        target_role: 'Full Stack Engineer',
        cgpa: 8.5
      },
      readiness: {
        overallScore: user.profile?.readiness_score || 72.0,
        foundations: 85,
        domainSpecialization: 78,
        practicalProof: 70,
        industryReadiness: 68
      },
      skills: [
        { id: 'sk-1', name: 'Python Engineering', verified: true, level: 'Advanced', evidenceCount: 3 },
        { id: 'sk-2', name: 'System Design', verified: true, level: 'Intermediate', evidenceCount: 2 },
        { id: 'sk-3', name: 'Cloud & Docker', verified: true, level: 'Intermediate', evidenceCount: 2 },
        { id: 'sk-4', name: 'FastAPI Microservices', verified: true, level: 'Advanced', evidenceCount: 4 }
      ],
      projects: [
        { id: 'pr-1', title: 'High-Throughput Distributed Cache', role: 'Lead Architect', stars: 42, techStack: ['Python', 'Redis', 'Docker'] },
        { id: 'pr-2', title: 'Enterprise SIEM Log Analyzer', role: 'Security Engineer', stars: 28, techStack: ['Python', 'Elasticsearch', 'Splunk'] }
      ],
      codingSubmissions: [{ problemTitle: 'Two Sum', passed: true, score: 100 }],
      socIncidentAttempts: [{ incidentTitle: 'SSH Brute-Force Triage', score: 95 }],
      systemDesignDiagrams: [{ title: 'Scalable URL Shortener Architecture', approved: true }],
      resumes: [{ ats_score: 88, filename: 'NexGen_Resume_Master.pdf' }],
      offers: []
    };

    return { success: true, data: { passport: passportData } };
  }

  // 6. Domains
  if (endpoint.includes('/domains') || endpoint.includes('/learning/domains')) {
    return { success: true, data: { domains: CANONICAL_DOMAINS } };
  }

  // 7. Courses / Learning Player & Completion
  if (endpoint.includes('/learning/lessons/') && endpoint.includes('/complete')) {
    return { success: true, data: { isCompleted: true, status: 'SUCCESS' } };
  }

  if (endpoint.includes('/courses/') || endpoint.includes('/learning/courses/')) {
    const parts = endpoint.split(/\/courses\//);
    const slug = parts[1]?.split('?')[0]?.split('/')[0];
    const found = MOCK_COURSES.find(c => c.slug === slug) || MOCK_COURSES[0];
    return {
      success: true,
      data: {
        course: found,
        ...found
      }
    };
  }

  if (endpoint.includes('/courses') || endpoint.includes('/learning/courses')) {
    const stageParam = endpoint.includes('stage=') ? endpoint.split('stage=')[1]?.split('&')[0] : null;
    let filtered = MOCK_COURSES;
    if (stageParam) {
      filtered = MOCK_COURSES.filter(c => c.stage === stageParam);
      if (filtered.length === 0) filtered = MOCK_COURSES;
    }
    return { success: true, data: { courses: filtered } };
  }

  // 8. SOC Simulator
  if (endpoint.includes('/soc')) {
    if (endpoint.includes('/investigate') || endpoint.includes('/triage')) {
      return {
        success: true,
        data: {
          score: 95,
          passed: true,
          status: 'RESOLVED',
          feedback: {
            postMortemSummary: 'Perimeter firewall rules successfully mitigated the brute-force traffic. Compromised credentials revoked and rotated.'
          }
        }
      };
    }
    if (endpoint.includes('/soc/incidents/')) {
      const parts = endpoint.split(/\/soc\/incidents\//);
      const incId = parts[1]?.split('?')[0]?.split('/')[0];
      const inc = MOCK_SOC_INCIDENTS.find(i => i.id === incId) || MOCK_SOC_INCIDENTS[0];
      return { success: true, data: { incident: inc, ...inc } };
    }
    return { success: true, data: { incidents: MOCK_SOC_INCIDENTS } };
  }

  // 9. Coding Lab
  if (endpoint.includes('/coding')) {
    if (endpoint.includes('/run') || endpoint.includes('/execute')) {
      return {
        success: true,
        data: {
          allPassed: true,
          status: 'ACCEPTED',
          passedCount: 3,
          totalCount: 3,
          runtimeMs: 24,
          results: [
            { testCase: 1, passed: true },
            { testCase: 2, passed: true },
            { testCase: 3, passed: true }
          ]
        }
      };
    }
    return { success: true, data: { problems: MOCK_CODING_PROBLEMS } };
  }

  // 10. ATS Resume Scanner
  if (endpoint.includes('/resume/create')) {
    return {
      success: true,
      data: {
        resume: {
          id: 'res_' + Math.random().toString(36).substring(2, 8),
          title: body.title || 'Software Engineer Resume'
        }
      }
    };
  }

  if (endpoint.includes('/resume/analyze')) {
    return {
      success: true,
      data: {
        analysis: {
          targetJobTitle: body.targetJobTitle || 'Software Development Engineer',
          atsScore: 88,
          matchedKeywords: ['Python', 'FastAPI', 'React', 'TypeScript', 'Docker', 'PostgreSQL', 'REST APIs', 'System Design'],
          missingKeywords: ['Kubernetes', 'CI/CD Automation', 'Redis Sentinel'],
          recommendations: [
            'Add quantified performance metrics to your top 2 engineering projects.',
            'Highlight your SOC incident containment and defensive logging experience.',
            'Include your verified Career Passport link in the contact header.'
          ]
        }
      }
    };
  }

  if (endpoint.includes('/resume') || endpoint.includes('/resumes')) {
    return {
      success: true,
      data: {
        resumes: [{ id: 'res_default', title: 'NexGenAI Master Resume', ats_score: 88 }]
      }
    };
  }

  // 11. AI Career Mentor & Roadmap
  if (endpoint.includes('/ai/mentor/chat')) {
    return {
      success: true,
      data: {
        reply: {
          content: 'Based on your current academic stage and target goals, focusing on clean modular code, two LeetCode practice problems daily, and completing your verified GitHub evidence will yield the highest return. How can I help you accelerate today?',
          provider: 'gemini'
        }
      }
    };
  }

  if (endpoint.includes('/ai/roadmap/generate')) {
    return {
      success: true,
      data: {
        roadmaps: MOCK_ROADMAPS,
        message: 'Roadmap successfully generated'
      }
    };
  }

  if (endpoint.includes('/ai/roadmap')) {
    return {
      success: true,
      data: {
        roadmaps: MOCK_ROADMAPS
      }
    };
  }

  // 12. System Design Scalability Lab
  if (endpoint.includes('/systemdesign')) {
    return {
      success: true,
      data: {
        score: 92,
        metrics: {
          estimatedLatency: '24 ms',
          availabilityLevel: '99.99% High Availability',
          scalabilityRating: 'Production Grade'
        },
        bottlenecks: [
          'Add Redis caching layer between API Gateway and Backend Services to reduce primary DB read pressure.',
          'Configure automated database read replica failover.'
        ]
      }
    };
  }

  // 13. Assessments Engine
  if (endpoint.includes('/assessments')) {
    if (endpoint.includes('/submit')) {
      return {
        success: true,
        data: {
          attempt: {
            score: 95,
            passed: true,
            answersCount: 4,
            status: 'PASSED'
          }
        }
      };
    }
    const parts = endpoint.split(/\/assessments\//);
    const slug = parts[1]?.split('?')[0]?.split('/')[0];
    if (slug) {
      const ass = MOCK_ASSESSMENTS.find(a => a.slug === slug) || MOCK_ASSESSMENTS[0];
      return { success: true, data: { assessment: ass, ...ass } };
    }
    return { success: true, data: { assessments: MOCK_ASSESSMENTS } };
  }

  // 14. Journey Stages
  if (endpoint.includes('/journey')) {
    if (endpoint.includes('/stages')) {
      return { success: true, data: { stages: MOCK_JOURNEY_STAGES } };
    }
    if (endpoint.includes('/my-stage')) {
      const user = getStoredUser();
      const currentStageId = user?.profile?.academicStage || user?.academic_stage || 'CLASS_11';
      const stageObj = MOCK_JOURNEY_STAGES.find(s => s.id === currentStageId) || MOCK_JOURNEY_STAGES[0];
      return {
        success: true,
        data: {
          currentStage: stageObj,
          milestones: [
            { title: 'Computational Logic Foundation', completed: true },
            { title: 'First Proof of Work Project', completed: false }
          ]
        }
      };
    }
    if (endpoint.includes('/update-stage')) {
      const user = getStoredUser();
      if (user) {
        user.academic_stage = body.stage || user.academic_stage;
        if (user.profile) user.profile.academic_stage = user.academic_stage;
        localStorage.setItem('nexgenai_user', JSON.stringify(user));
      }
      return { success: true, data: { status: 'SUCCESS' } };
    }
  }

  // 15. Skills & Skill Tree & Evidence
  if (endpoint.includes('/skills/tree')) {
    return {
      success: true,
      data: {
        domain: 'Full Stack & AI Systems',
        summary: { verified: 5, claimed: 2, missing: 2 },
        nodes: MOCK_SKILL_TREE_NODES
      }
    };
  }

  if (endpoint.includes('/skills')) {
    if (endpoint.includes('/claim')) {
      return { success: true, data: { status: 'CLAIMED' } };
    }
    if (endpoint.includes('/evidence')) {
      return { success: true, data: { status: 'EVIDENCE_SUBMITTED' } };
    }
    return { success: true, data: { skills: MOCK_SKILL_TREE_NODES } };
  }

  // 16. Projects & Portfolio
  if (endpoint.includes('/projects')) {
    return {
      success: true,
      data: {
        projects: [
          { id: 'pr-1', title: 'High-Throughput Distributed Cache', description: 'Production-grade distributed cache in Python & Redis with consistent hashing.', githubUrl: 'https://github.com/dheeraj815/distributed-cache', verified: true, stars: 34 },
          { id: 'pr-2', title: 'Enterprise SIEM Log Analyzer', description: 'Automated brute-force and threat detection parser with Splunk integration.', githubUrl: 'https://github.com/dheeraj815/siem-analyzer', verified: true, stars: 27 }
        ]
      }
    };
  }

  // 17. Jobs & Opportunities
  if (endpoint.includes('/jobs')) {
    if (endpoint.includes('/applications')) {
      return {
        success: true,
        data: {
          applications: [
            { id: 'app-1', job_id: 'j-1', jobTitle: 'Graduate Software Engineer - AI Platforms', company: 'NextGen Cloud Technologies', status: 'SHORTLISTED', applied_at: new Date().toISOString() }
          ]
        }
      };
    }
    if (endpoint.includes('/apply')) {
      return { success: true, data: { status: 'APPLIED', message: 'Application submitted successfully with verified Career Passport.' } };
    }
    return { success: true, data: { jobs: MOCK_JOBS } };
  }

  // 18. Recruiter OS
  if (endpoint.includes('/recruiter')) {
    if (endpoint.includes('/talent-search')) {
      return { success: true, data: { candidates: MOCK_CANDIDATES } };
    }
    if (endpoint.includes('/offers')) {
      return { success: true, data: { offer: { id: 'off_1', status: 'EXTENDED' } } };
    }
  }

  // 19. TPO Portal
  if (endpoint.includes('/tpo')) {
    return {
      success: true,
      data: {
        drives: [
          { id: 'drv-1', company: 'Google Cloud India', role: 'Software Engineer - Distributed Systems', ctc: '28 LPA', status: 'ACTIVE', eligible_students: 84 },
          { id: 'drv-2', company: 'Microsoft IDC', role: 'Security & Systems Engineer', ctc: '22 LPA', status: 'UPCOMING', eligible_students: 112 }
        ],
        students: MOCK_CANDIDATES,
        analytics: { total_eligible: 142, placed_count: 98, average_ctc: '14.2 LPA', top_ctc: '38 LPA' }
      }
    };
  }

  // 20. Notifications
  if (endpoint.includes('/notifications')) {
    return {
      success: true,
      data: [
        { id: 'notif-1', title: 'NexGenAI Journey Initialized', message: 'Your personalized learning journey is calibrated.', is_read: false, created_at: new Date().toISOString() }
      ]
    };
  }

  // Default successful empty response
  return { success: true, data: { status: 'OK' } };
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: string }> {
  const token = localStorage.getItem('nexgenai_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const contentType = res.headers.get('content-type') || '';
    let data: any = null;

    if (contentType.includes('application/json')) {
      try {
        data = await res.json();
      } catch {
        data = null;
      }
    }

    // 1. Detect Vercel static host 405 Method Not Allowed, or HTML 404/500 pages
    // On Vercel, static index.html cannot respond to POST/PUT/DELETE, returning HTTP 405
    if (res.status === 405 || (res.status === 404 && !data) || res.status >= 502) {
      console.warn(`[NexGenAI Resilience] Received HTTP ${res.status} from static host for ${endpoint}. Seamlessly serving via client-side mock store.`);
      return handleMockRequest(endpoint, options);
    }

    // 2. If non-JSON text response was returned
    if (!data) {
      const text = await res.text().catch(() => '');
      if (!res.ok) {
        // If it looks like an HTML error or unreachable host, gracefully fallback
        if (text.includes('The page could not be found') || text.startsWith('<!DOCTYPE') || text.startsWith('<html')) {
          console.warn(`[NexGenAI Resilience] HTML error returned for ${endpoint}. Activating client-side fallback.`);
          return handleMockRequest(endpoint, options);
        }
        return { success: false, error: `Server returned error (${res.status})` };
      }
      return { success: true, data: text as any };
    }

    // 3. Real server business error (e.g. 400 Bad Request, 401 Unauthorized)
    if (!res.ok) {
      if (res.status === 401 && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/signup') && !endpoint.includes('/auth/register')) {
        localStorage.removeItem('nexgenai_token');
        localStorage.removeItem('nexgenai_user');
      }
      return { success: false, error: data.detail || data.error || `Request failed with status ${res.status}` };
    }

    return { success: true, data };
  } catch (err: any) {
    // If backend is completely offline (ECONNREFUSED or Network Failure on Vercel preview)
    console.warn(`[NexGenAI Resilience] Network error connecting to ${endpoint}. Seamlessly activating offline engine:`, err?.message);
    return handleMockRequest(endpoint, options);
  }
}
