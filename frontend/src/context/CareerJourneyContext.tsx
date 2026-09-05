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

export interface AcademicProfile {
  cgpa: number;
  backlogs: number;
  collegeName: string;
  branch: string;
  graduationYear: number;
}

interface CareerJourneyContextType {
  targetGoal: string;
  setTargetGoal: (goal: string) => void;
  targetCompany: string;
  setTargetCompany: (company: string) => void;
  academicProfile: AcademicProfile;
  updateAcademicProfile: (profile: Partial<AcademicProfile>) => void;
  skills: VerifiedSkill[];
  projects: StudentProject[];
  xpPoints: number;
  readiness: ReadinessBreakdown;
  activeCompanyPrep: CompanyPrepPlan | null;
  stageProgress: Record<string, { completedCount: number; totalCount: number }>;
  solvedChallengesCount: number;
  passedAssessmentsCount: number;
  completedMockInterviewsCount: number;
  resumeAtsScore: number;
  setResumeAtsScore: (score: number) => void;
  completeStageTopic: (stage: string, topicId: string, xpEarned?: number) => void;
  verifySkillProof: (skillName: string, category: string, level?: 'Foundational' | 'Intermediate' | 'Advanced') => void;
  submitProjectProof: (projectId: string, githubUrl?: string, liveUrl?: string, title?: string, desc?: string) => void;
  solveCodingProblem: (problemId: string, score?: number) => void;
  recordAssessmentPass: (topicId: string, score: number) => void;
  recordMockInterview: (score: number, feedback: string) => void;
  startCompanyPreparation: (companyId: string, companyName: string, role: string, requiredSkills: string[]) => void;
  markPrepWeekCompleted: (weekNum: number) => void;
  resetToCleanSlate: () => void;
}

const CareerJourneyContext = createContext<CareerJourneyContextType | undefined>(undefined);

const STORAGE_KEY = 'nexgenai_career_journey_v3';

export const CareerJourneyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state or completely clean defaults (zero dummy data)
  const [targetGoal, setTargetGoalInternal] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).targetGoal || 'Software Engineer'; } catch (e) {}
    }
    return 'Software Engineer';
  });

  const [targetCompany, setTargetCompanyInternal] = useState<string>('Google India');

  const [academicProfile, setAcademicProfile] = useState<AcademicProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.academicProfile) return parsed.academicProfile;
      } catch (e) {}
    }
    return {
      cgpa: 0,
      backlogs: 0,
      collegeName: '',
      branch: '',
      graduationYear: 2027
    };
  });

  const [skills, setSkills] = useState<VerifiedSkill[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.skills && Array.isArray(parsed.skills)) return parsed.skills;
      } catch (e) {}
    }
    return []; // Clean slate: starts with 0 dummy skills
  });

  const [projects, setProjects] = useState<StudentProject[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.projects && Array.isArray(parsed.projects)) return parsed.projects;
      } catch (e) {}
    }
    return []; // Clean slate: starts with 0 dummy projects
  });

  const [xpPoints, setXpPoints] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).xpPoints || 0; } catch (e) {}
    }
    return 0; // Starts with 0 XP
  });

  const [stageProgress, setStageProgress] = useState<Record<string, { completedCount: number; totalCount: number }>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).stageProgress || {}; } catch (e) {}
    }
    return {
      class11: { completedCount: 0, totalCount: 6 },
      class12: { completedCount: 0, totalCount: 5 },
      year1: { completedCount: 0, totalCount: 6 },
      year2: { completedCount: 0, totalCount: 6 },
      year3: { completedCount: 0, totalCount: 6 },
      year4: { completedCount: 0, totalCount: 5 },
    };
  });

  const [activeCompanyPrep, setActiveCompanyPrep] = useState<CompanyPrepPlan | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).activeCompanyPrep || null; } catch (e) {}
    }
    return null;
  });

  const [solvedChallengesCount, setSolvedChallengesCount] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).solvedChallengesCount || 0; } catch (e) {}
    }
    return 0;
  });

  const [passedAssessmentsCount, setPassedAssessmentsCount] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).passedAssessmentsCount || 0; } catch (e) {}
    }
    return 0;
  });

  const [completedMockInterviewsCount, setCompletedMockInterviewsCount] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).completedMockInterviewsCount || 0; } catch (e) {}
    }
    return 0;
  });

  const [resumeAtsScore, setResumeAtsScoreState] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).resumeAtsScore || 0; } catch (e) {}
    }
    return 0;
  });

  // Calculate dynamic readiness strictly from real user accomplishments
  const verifiedCount = skills.filter(s => s.verified).length;
  const completedProjectsCount = projects.filter(p => p.status === 'COMPLETED').length;
  const readiness = calculateReadinessBreakdown({
    verifiedSkillsCount: verifiedCount,
    completedProjectsCount: completedProjectsCount,
    solvedCodingChallenges: solvedChallengesCount,
    passedAssessmentsCount: passedAssessmentsCount,
    completedMockInterviews: completedMockInterviewsCount,
    resumeAtsScore: resumeAtsScore
  });

  // Save to localStorage on any state change
  useEffect(() => {
    const stateToSave = {
      targetGoal,
      targetCompany,
      academicProfile,
      skills,
      projects,
      xpPoints,
      stageProgress,
      activeCompanyPrep,
      solvedChallengesCount,
      passedAssessmentsCount,
      completedMockInterviewsCount,
      resumeAtsScore
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));

    // Also sync the readiness score back to user profile in nexgenai_user if logged in
    try {
      const userStr = localStorage.getItem('nexgenai_user');
      if (userStr) {
        const u = JSON.parse(userStr);
        if (u && u.profile) {
          u.profile.readinessScore = readiness.overallScore;
          localStorage.setItem('nexgenai_user', JSON.stringify(u));
        }
      }
    } catch (e) {}
  }, [
    targetGoal, targetCompany, academicProfile, skills, projects, xpPoints,
    stageProgress, activeCompanyPrep, solvedChallengesCount,
    passedAssessmentsCount, completedMockInterviewsCount, resumeAtsScore,
    readiness.overallScore
  ]);

  const setTargetGoal = (goal: string) => {
    setTargetGoalInternal(goal);
  };

  const setTargetCompany = (company: string) => {
    setTargetCompanyInternal(company);
  };

  const updateAcademicProfile = (updated: Partial<AcademicProfile>) => {
    setAcademicProfile(prev => ({ ...prev, ...updated }));
  };

  const setResumeAtsScore = (score: number) => {
    setResumeAtsScoreState(score);
    setXpPoints(prev => prev + 25);
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

  const submitProjectProof = (projectId: string, githubUrl?: string, liveUrl?: string, title?: string, desc?: string) => {
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
          title: title || projectId.replace(/-/g, ' ').toUpperCase(),
          description: desc || 'Production-ready software milestone project with full verification.',
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
    setSolvedChallengesCount(prev => prev + 1);
    setXpPoints(prev => prev + 20);
    verifySkillProof('Algorithmic Problem Solving', 'DSA', 'Intermediate');
  };

  const recordAssessmentPass = (topicId: string, score: number) => {
    setPassedAssessmentsCount(prev => prev + 1);
    setXpPoints(prev => prev + 25);
  };

  const recordMockInterview = (score: number, feedback: string) => {
    setCompletedMockInterviewsCount(prev => prev + 1);
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

  const resetToCleanSlate = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSkills([]);
    setProjects([]);
    setXpPoints(0);
    setSolvedChallengesCount(0);
    setPassedAssessmentsCount(0);
    setCompletedMockInterviewsCount(0);
    setResumeAtsScoreState(0);
    setActiveCompanyPrep(null);
    setAcademicProfile({
      cgpa: 0,
      backlogs: 0,
      collegeName: '',
      branch: 'Computer Science & Engineering',
      graduationYear: 2027
    });
    setStageProgress({
      class11: { completedCount: 0, totalCount: 6 },
      class12: { completedCount: 0, totalCount: 5 },
      year1: { completedCount: 0, totalCount: 6 },
      year2: { completedCount: 0, totalCount: 6 },
      year3: { completedCount: 0, totalCount: 6 },
      year4: { completedCount: 0, totalCount: 5 },
    });
  };

  return (
    <CareerJourneyContext.Provider
      value={{
        targetGoal,
        setTargetGoal,
        targetCompany,
        setTargetCompany,
        academicProfile,
        updateAcademicProfile,
        skills,
        projects,
        xpPoints,
        readiness,
        activeCompanyPrep,
        stageProgress,
        solvedChallengesCount,
        passedAssessmentsCount,
        completedMockInterviewsCount,
        resumeAtsScore,
        setResumeAtsScore,
        completeStageTopic,
        verifySkillProof,
        submitProjectProof,
        solveCodingProblem,
        recordAssessmentPass,
        recordMockInterview,
        startCompanyPreparation,
        markPrepWeekCompleted,
        resetToCleanSlate,
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
