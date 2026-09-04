import { config } from '../../config/index.js';

export interface AIServiceResponse {
  content: string;
  provider: 'gemini' | 'openai' | 'local_heuristic';
  metadata?: Record<string, any>;
}

export class AIService {
  private hasGeminiKey: boolean;
  private hasOpenAiKey: boolean;

  constructor() {
    this.hasGeminiKey = Boolean(config.geminiApiKey && config.geminiApiKey.length > 10);
    this.hasOpenAiKey = Boolean(config.openaiApiKey && config.openaiApiKey.length > 10);
  }

  getProviderStatus() {
    return {
      activeProvider: this.hasGeminiKey ? 'gemini' : (this.hasOpenAiKey ? 'openai' : 'local_heuristic'),
      geminiConfigured: this.hasGeminiKey,
      openaiConfigured: this.hasOpenAiKey,
      message: this.hasGeminiKey || this.hasOpenAiKey
        ? 'Live LLM API Connected'
        : 'Running on Local Intelligent Heuristics Engine (Set GEMINI_API_KEY for live generative LLM)',
    };
  }

  async mentorChat(params: {
    message: string;
    studentContext: {
      name: string;
      stage: string;
      domain?: string;
      targetRole?: string;
      skills: string[];
      readinessScore: number;
    };
    conversationHistory?: { role: string; content: string }[];
  }): Promise<AIServiceResponse> {
    const { message, studentContext } = params;

    // If Gemini Key is present, call Gemini REST API
    if (this.hasGeminiKey) {
      try {
        const systemPrompt = `You are the NexGenAI Career Mentor, a world-class engineering career advisor.
You are mentoring ${studentContext.name}, who is currently in academic stage ${studentContext.stage}.
Their target role is: ${studentContext.targetRole || 'Software Engineering'}.
Their current skills: ${studentContext.skills.join(', ') || 'Just starting'}.
Their Career Readiness score is ${studentContext.readinessScore}%.
Provide actionable, realistic, encouraging, and technically precise career advice tailored to their exact academic stage.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.geminiApiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: `${systemPrompt}\n\nStudent asks: ${message}` }] }
            ]
          })
        });

        if (response.ok) {
          const data = (await response.json()) as any;
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return { content: text, provider: 'gemini' };
          }
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local heuristic engine:', err);
      }
    }

    // Deterministic, domain-informed local NLP heuristic engine
    const query = message.toLowerCase();
    let reply = '';

    if (query.includes('what should i learn') || query.includes('next') || query.includes('start')) {
      if (studentContext.stage === 'CLASS_11') {
        reply = `Hello ${studentContext.name}! In Class 11, your primary goal is **Career Discovery**. Rather than overwhelming yourself with deep frameworks, focus on building computational intuition:
1. **Core Logic**: Learn basic Python syntax (variables, loops, conditionals, functions).
2. **Web Basics**: Build a simple HTML/CSS personal webpage to understand how the internet works.
3. **Domain Exploration**: Explore our 30 domain guides (especially AI, Cybersecurity, and Cloud) to see what day-to-day work excites you.
Try our introductory course **Career Discovery 101** on your dashboard!`;
      } else if (studentContext.stage === 'CLASS_12') {
        reply = `In Class 12, the focus is **Direction & Foundation**:
1. **Version Control**: Set up Git & GitHub to start creating your proof of work early.
2. **Intermediate Python or JavaScript**: Build a mini-project (e.g., an automated task script or interactive calculator).
3. **Pathway Choice**: Compare computer science vs specialized fields like cybersecurity or data science using the Career Path Explorer.`;
      } else if (studentContext.stage.includes('YEAR_1')) {
        reply = `In College Year 1, focus on **Irreplaceable Fundamentals**:
1. **Data Structures**: Arrays, Linked Lists, Stacks, Queues in C++, Java, or Python.
2. **Coding Lab**: Solve 2 problems per week in our Coding Lab.
3. **Backend Fundamentals**: Learn how HTTP requests, REST APIs, and relational databases (SQL) connect.`;
      } else if (studentContext.stage.includes('YEAR_2')) {
        reply = `In College Year 2, it is time for **Domain Specialization**:
1. Pick one core domain (e.g., Full Stack Engineering or AI/ML).
2. Build 2 end-to-end projects with live deployments and GitHub repositories.
3. Submit your projects as verified evidence in your Career Passport to boost your readiness score!`;
      } else if (studentContext.stage.includes('YEAR_3')) {
        reply = `In College Year 3, your mission is **Industry Preparation & Internships**:
1. Optimize your resume with our **ATS Studio** to match target internship descriptions.
2. Practice mock interviews in our **AI Mock Interview** lab using the STAR method.
3. Complete system design fundamentals in our **System Design Canvas**.`;
      } else {
        reply = `For Placement and final year readiness:
1. Review our **TPO Eligibility Engine** to ensure you meet company cutoff criteria.
2. Tailor your resume for specific job openings with 75%+ ATS alignment.
3. Practice core DSA patterns (Sliding Window, Two Pointers, Dynamic Programming).`;
      }
    } else if (query.includes('ai') && query.includes('cybersecurity')) {
      reply = `Comparing **Artificial Intelligence** vs **Cybersecurity**:
- **Artificial Intelligence**: Focuses on algorithms, model training, data engineering, and generative AI. Best if you love mathematics, pattern recognition, and building predictive software.
- **Cybersecurity**: Focuses on threat modeling, defensive operations (SOC), vulnerability assessment, and network protocols. Best if you enjoy problem solving, systems architecture, and investigative forensics.
Both fields offer exceptional career growth and salaries. You can explore both in our **Domain Intelligence** section.`;
    } else if (query.includes('placement') || query.includes('ready') || query.includes('readiness')) {
      reply = `Your current Career Readiness score is **${studentContext.readinessScore}%**.
To elevate your score:
${studentContext.skills.length < 3 ? '• Claim and take skill assessments for at least 3 core skills.\n' : ''}
• Submit verifiable proof (GitHub links or deployed URLs) for your projects.
• Upload your resume and run an ATS analysis against a target job.
• Solve challenges in the Coding Lab to verify algorithmic problem solving.`;
    } else {
      reply = `Hello ${studentContext.name}! As your NexGenAI Career Mentor, I am tracking your journey in **${studentContext.stage.replace('_', ' ')}**.
You currently have ${studentContext.skills.length} tracked skills with a Career Readiness score of ${studentContext.readinessScore}%.
Feel free to ask about:
- What skills to prioritize for your target role: ${studentContext.targetRole || 'Software Engineering'}
- How to prepare for upcoming campus placements or internships
- Reviewing your project proof of work or resume ATS score
- Comparing different engineering domains`;
    }

    return {
      content: reply,
      provider: 'local_heuristic',
      metadata: { stage: studentContext.stage, readiness: studentContext.readinessScore },
    };
  }

  async generateRoadmap(params: { durationDays: number; targetRole: string; stage: string }): Promise<any> {
    const { durationDays, targetRole, stage } = params;

    const weeks = durationDays === 30 ? 4 : (durationDays === 60 ? 8 : 12);
    const items: any[] = [];

    for (let w = 1; w <= weeks; w++) {
      items.push({
        weekNumber: w,
        dayNumber: (w - 1) * 7 + 1,
        title: `Week ${w}: Foundation & Competency Mastery for ${targetRole}`,
        goalDescription: `Deep dive into week ${w} core objectives for ${targetRole} appropriate for stage ${stage}.`,
        skillName: w === 1 ? 'Core Fundamentals' : (w === 2 ? 'Applied Frameworks' : (w === 3 ? 'Practical Project' : 'Verification & Assessment')),
        actionItem: w === 1 ? 'Study foundational syntax & concepts' : (w === 2 ? 'Build a working module' : (w === 3 ? 'Publish GitHub evidence' : 'Take skill assessment')),
      });
    }

    return {
      title: `${durationDays}-Day Career Roadmap for ${targetRole}`,
      durationDays,
      targetRole,
      stage,
      items,
    };
  }

  async evaluateBehavioral(answer: string, question: string): Promise<any> {
    const text = answer.toLowerCase();
    const hasSituation = text.includes('when') || text.includes('project') || text.includes('team') || text.includes('company');
    const hasTask = text.includes('needed') || text.includes('goal') || text.includes('task') || text.includes('responsible');
    const hasAction = text.includes('i implemented') || text.includes('i created') || text.includes('i built') || text.includes('i decided') || text.includes('i investigated');
    const hasResult = text.includes('result') || text.includes('improved') || text.includes('achieved') || text.includes('successfully') || text.includes('%');

    let starScore = 0;
    if (hasSituation) starScore += 25;
    if (hasTask) starScore += 25;
    if (hasAction) starScore += 25;
    if (hasResult) starScore += 25;

    const feedback = [];
    if (!hasSituation) feedback.push('Clarify the Situation: specify the project, environment, or challenge context.');
    if (!hasTask) feedback.push('Define the Task: clearly explain what was expected and what your exact responsibility was.');
    if (!hasAction) feedback.push('Detail the Action: explain the concrete technical steps YOU took (use "I", not just "we").');
    if (!hasResult) feedback.push('Highlight the Result: quantify the outcome with measurable metrics or team impact.');

    return {
      starScore,
      frameworkBreakdown: {
        situation: hasSituation,
        task: hasTask,
        action: hasAction,
        result: hasResult,
      },
      strengths: starScore >= 75 ? ['Structured response following the STAR framework effectively.'] : ['Good initiative and clear communication.'],
      areasForImprovement: feedback,
    };
  }
}

export const aiService = new AIService();
