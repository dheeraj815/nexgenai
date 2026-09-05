import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateReadinessBreakdown, ReadinessBreakdown } from '../utils/readinessEngine';

export interface VerifiedSkill {
  id: string;
  name: string;
  category: string;
  level: 'Foundational' | 'Intermediate' | 'Advanced';
  verified: boolean;
  score: number; // 0-100
  evidenceCount: number;
  unlockedAt?: string;
}

export interface StudentProject {
  id: string;
  title: string;
  description: string;
  stage: string;
  techStack: string[];
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  githubUrl?: string;
  liveUrl?: string;
  stars?: number;
  completedAt?: string;
}

export interface CompanyPrepPlan {
  companyId: string;
  companyName: string;
  targetRole: string;
  matchScore: number;
  requiredSkills: string[];
  currentMatchedSkills: string[];
  missingSkills: string[];
  weeklyRoadmap: {
    week: number;
    title: string;
    focus: string;
    topics: string[];
    isCompleted: boolean;
  }[];
  isStarted: boolean;
}

interface CareerJourneyContextType {
  targetGoal: string;
  setTargetGoal: (goal: string) => void;
  targetCompany: string;
  setTargetCompany: (company: string) => void;
  skills: VerifiedSkill[];
  projects: StudentProject[];
  xpPoints: number;
  readiness: ReadinessBreakdown;
  activeCompanyPrep: CompanyPrepPlan | null;
  stageProgress: Record<string, { completedCount: number; totalCount: number }>;
  completeStageTopic: (stage: string, topicId: string, xpEarned?: number) => void;
  verifySkillProof: (skillName: string, category: string, level?: 'Foundational' | 'Intermediate' | 'Advanced') => void;
  submitProjectProof: (projectId: string, githubUrl?: string, liveUrl?: string) => void;
  solveCodingProblem: (problemId: string, score?: number) => void;
  recordMockInterview: (score: number, feedback: string) => void;
  startCompanyPreparation: (companyId: string, companyName: string, role: string, requiredSkills: string[]) => void;
  markPrepWeekCompleted: (weekNum: number) => void;
}

const CareerJourneyContext = createContext<CareerJourneyContextType | undefined>(undefined);

const STORAGE_KEY = 'nexgenai_career_journey_v2';

export const CareerJourneyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state or defaults
  const [targetGoal, setTargetGoalInternal] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).targetGoal || 'Software Engineer - AI Platforms'; } catch (e) {}
    }
    return 'Software Engineer - AI Platforms';
  });

  const [targetCompany, setTargetCompanyInternal] = useState<string>('Google India');

  const [skills, setSkills] = useState<VerifiedSkill[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.skills && Array.isArray(parsed.skills)) return parsed.skills;
      } catch (e) {}
    }
    return [
      { id: 'sk-1', name: 'Computational Thinking', category: 'Foundations', level: 'Foundational', verified: true, score: 95, evidenceCount: 2 },
      { id: 'sk-2', name: 'Python 3.12 Core', category: 'Programming', level: 'Intermediate', verified: true, score: 88, evidenceCount: 3 },
      { id: 'sk-3', name: 'Git & GitHub Version Control', category: 'Tools', level: 'Foundational', verified: true, score: 90, evidenceCount: 2 },
    ];
  });

  const [projects, setProjects] = useState<StudentProject[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.projects && Array.isArray(parsed.projects)) return parsed.projects;
      } catch (e) {}
    }
    return [
      {
        id: 'proj-1',
        title: 'Interactive Algorithmic Logic Sandbox',
        description: 'In-browser logic gates and computational decomposition simulator.',
        stage: 'CLASS_11',
        techStack: ['Python', 'Logic Gates'],
        status: 'COMPLETED',
        githubUrl: 'https://github.com/candidate/algorithmic-sandbox',
        stars: 18,
        completedAt: '2026-08-15'
      }
    ];
  });

  const [xpPoints, setXpPoints] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).xpPoints || 180; } catch (e) {}
    }
    return 180;
  });

  const [stageProgress, setStageProgress] = useState<Record<string, { completedCount: number; totalCount: number }>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).stageProgress || {}; } catch (e) {}
    }
    return {
      class11: { completedCount: 3, totalCount: 6 },
      class12: { completedCount: 2, totalCount: 5 },
      year1: { completedCount: 3, totalCount: 6 },
      year2: { completedCount: 2, totalCount: 6 },
      year3: { completedCount: 2, totalCount: 6 },
      year4: { completedCount: 1, totalCount: 5 },
    };
  });

  const [activeCompanyPrep, setActiveCompanyPrep] = useState<CompanyPrepPlan | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).activeCompanyPrep || null; } catch (e) {}
    }
    return null;
  });

  // Calculate dynamic readiness whenever skills/projects update
  const verifiedCount = skills.filter(s => s.verified).length;
  const completedProjectsCount = projects.filter(p => p.status === 'COMPLETED').length;
  const readiness = calculateReadinessBreakdown({
    verifiedSkillsCount: verifiedCount,
    completedProjectsCount: completedProjectsCount,
    solvedCodingChallenges: 4,
    passedAssessmentsCount: 3,
    completedMockInterviews: 1,
    resumeAtsScore: 84
  });

  // Save to localStorage on any state change
  useEffect(() => {
    const stateToSave = {
      targetGoal,
      targetCompany,
      skills,
      projects,
      xpPoints,
      stageProgress,
      activeCompanyPrep
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [targetGoal, targetCompany, skills, projects, xpPoints, stageProgress, activeCompanyPrep]);

  const setTargetGoal = (goal: string) => {
    setTargetGoalInternal(goal);
  };

  const setTargetCompany = (company: string) => {
    setTargetCompanyInternal(company);
  };

  const completeStageTopic = (stage: string, topicId: string, xpEarned = 25) => {
    setXpPoints(prev => prev + xpEarned);
    setStageProgress(prev => {
      const current = prev[stage] || { completedCount: 0, totalCount: 6 };
      return {
        ...prev,
        [stage]: {
          ...current,
          completedCount: Math.min(current.totalCount, current.completedCount + 1)
        }
      };
    });
  };

  const verifySkillProof = (skillName: string, category: string, level: 'Foundational' | 'Intermediate' | 'Advanced' = 'Intermediate') => {
    setSkills(prev => {
      const existing = prev.find(s => s.name.toLowerCase() === skillName.toLowerCase());
      if (existing) {
        return prev.map(s => s.id === existing.id ? { ...s, verified: true, score: Math.min(100, s.score + 10), evidenceCount: s.evidenceCount + 1 } : s);
      }
      const newSkill: VerifiedSkill = {
        id: 'sk_' + Math.random().toString(36).substring(2, 8),
        name: skillName,
        category,
        level,
        verified: true,
        score: 90,
        evidenceCount: 1,
        unlockedAt: new Date().toISOString().split('T')[0]
      };
      return [...prev, newSkill];
    });
    setXpPoints(prev => prev + 35);
  };

  const submitProjectProof = (projectId: string, githubUrl?: string, liveUrl?: string) => {
    setProjects(prev => {
      const existing = prev.find(p => p.id === projectId);
      if (existing) {
        return prev.map(p => p.id === projectId ? {
          ...p,
          status: 'COMPLETED',
          githubUrl: githubUrl || p.githubUrl,
          liveUrl: liveUrl || p.liveUrl,
          completedAt: new Date().toISOString().split('T')[0]
        } : p);
      }
      return [
        ...prev,
        {
          id: projectId,
          title: projectId.replace(/-/g, ' ').toUpperCase(),
          description: 'Production-ready software milestone project with full verification.',
          stage: 'COLLEGE',
          techStack: ['Python', 'PostgreSQL', 'FastAPI'],
          status: 'COMPLETED',
          githubUrl: githubUrl || 'https://github.com/candidate/' + projectId,
          liveUrl: liveUrl || 'https://demo.nexgenai.edu/' + projectId,
          completedAt: new Date().toISOString().split('T')[0]
        }
      ];
    });
    setXpPoints(prev => prev + 50);
  };

  const solveCodingProblem = (problemId: string, score = 100) => {
    setXpPoints(prev => prev + 20);
    verifySkillProof('Algorithmic Problem Solving', 'DSA', 'Intermediate');
  };

  const recordMockInterview = (score: number, feedback: string) => {
    setXpPoints(prev => prev + 40);
    verifySkillProof('Technical Communication & STAR Method', 'Interviewing', 'Intermediate');
  };

  const startCompanyPreparation = (companyId: string, companyName: string, role: string, requiredSkills: string[]) => {
    const verifiedSkillNames = skills.filter(s => s.verified).map(s => s.name.toLowerCase());
    const matched = requiredSkills.filter(req => verifiedSkillNames.some(vs => vs.includes(req.toLowerCase()) || req.toLowerCase().includes(vs)));
    const missing = requiredSkills.filter(req => !matched.includes(req));
    const matchScore = Math.round((matched.length / Math.max(1, requiredSkills.length)) * 100);

    const newPlan: CompanyPrepPlan = {
      companyId,
      companyName,
      targetRole: role,
      matchScore,
      requiredSkills,
      currentMatchedSkills: matched,
      missingSkills: missing,
      weeklyRoadmap: [
        {
          week: 1,
          title: 'Week 1: Core DSA & Algorithmic Patterns',
          focus: 'Master Arrays, Two Pointers, Sliding Window, and Hash Maps.',
          topics: ['Two Pointers Technique', 'Sliding Window Substrings', 'Hash Map Lookup O(1)'],
          isCompleted: false
        },
        {
          week: 2,
          title: 'Week 2: Advanced Coding & Trees/Graphs',
          focus: 'Solve LeetCode Medium binary search trees and graph traversals.',
          topics: ['Binary Search on Answers', 'BFS/DFS Graph Traversal', 'Dynamic Programming Subproblems'],
          isCompleted: false
        },
        {
          week: 3,
          title: 'Week 3: High-Level System Design & Architecture',
          focus: 'Master distributed caching, database indexing, and microservices.',
          topics: ['Redis Cache-Aside Pattern', 'Database Sharding & Replication', 'Rate Limiting Algorithms'],
          isCompleted: false
        },
        {
          week: 4,
          title: 'Week 4: AI Voice Mock Interviews & STAR Stories',
          focus: 'Simulate full rounds with company-specific questions and vocal grading.',
          topics: ['Behavioral Leadership Principles', 'Past Sourced Tech Questions', 'Live Bar Raiser Simulation'],
          isCompleted: false
        }
      ],
      isStarted: true
    };

    setActiveCompanyPrep(newPlan);
  };

  const markPrepWeekCompleted = (weekNum: number) => {
    if (!activeCompanyPrep) return;
    setActiveCompanyPrep(prev => {
      if (!prev) return null;
      return {
        ...prev,
        weeklyRoadmap: prev.weeklyRoadmap.map(w => w.week === weekNum ? { ...w, isCompleted: true } : w)
      };
    });
    setXpPoints(prev => prev + 30);
  };

  return (
    <CareerJourneyContext.Provider
      value={{
        targetGoal,
        setTargetGoal,
        targetCompany,
        setTargetCompany,
        skills,
        projects,
        xpPoints,
        readiness,
        activeCompanyPrep,
        stageProgress,
        completeStageTopic,
        verifySkillProof,
        submitProjectProof,
        solveCodingProblem,
        recordMockInterview,
        startCompanyPreparation,
        markPrepWeekCompleted,
      }}
    >
      {children}
    </CareerJourneyContext.Provider>
  );
};

export const useCareerJourney = () => {
  const context = useContext(CareerJourneyContext);
  if (!context) {
    throw new Error('useCareerJourney must be used within a CareerJourneyProvider');
  }
  return context;
};
