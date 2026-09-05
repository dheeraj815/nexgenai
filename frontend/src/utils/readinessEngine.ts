/**
 * NexGenAI - Dynamic Career Readiness Calculation Engine
 * 
 * Replaces all hardcoded static scores (such as the legacy 72%) with an authentic,
 * mathematically sound, multi-dimensional evaluation of a student's actual accomplishments.
 * 
 * Formula:
 * Readiness = (Skills * 0.20) + (Projects * 0.20) + (Coding * 0.15) 
 *           + (Assessments * 0.15) + (Interview * 0.15) + (Resume/ATS * 0.15)
 * 
 * Brand new accounts start at 0% and earn points through verified activities.
 */

export interface ReadinessDimension {
  id: string;
  name: string;
  weight: number; // e.g. 0.20 for 20%
  score: number;  // 0 to 100
  weightedScore: number;
  completedItems: number;
  targetItems: number;
  metricLabel: string;
  description: string;
  howToEarn: string;
}

export interface ReadinessBreakdown {
  overallScore: number;
  isNewStudent: boolean;
  statusLabel: 'Getting Started' | 'Developing' | 'Intermediate' | 'Interview Ready' | 'Industry Ready';
  dimensions: {
    skills: ReadinessDimension;
    projects: ReadinessDimension;
    coding: ReadinessDimension;
    assessments: ReadinessDimension;
    interview: ReadinessDimension;
    resume: ReadinessDimension;
  };
  recommendations: string[];
}

export interface StudentActivityData {
  verifiedSkillsCount?: number;
  completedProjectsCount?: number;
  solvedCodingChallenges?: number;
  passedAssessmentsCount?: number;
  completedMockInterviews?: number;
  resumeAtsScore?: number;
  stage?: string;
}

export function calculateReadinessBreakdown(data: StudentActivityData = {}): ReadinessBreakdown {
  const verifiedSkills = Math.max(0, data.verifiedSkillsCount || 0);
  const completedProjects = Math.max(0, data.completedProjectsCount || 0);
  const solvedChallenges = Math.max(0, data.solvedCodingChallenges || 0);
  const passedAssessments = Math.max(0, data.passedAssessmentsCount || 0);
  const mockInterviews = Math.max(0, data.completedMockInterviews || 0);
  const resumeAts = Math.max(0, Math.min(100, data.resumeAtsScore || 0));

  // 1. Skills & Proof (Target: 5 verified skills)
  const skillsScore = Math.min(100, Math.round((verifiedSkills / 5) * 100));

  // 2. Real Projects (Target: 3 production / deployed projects)
  const projectsScore = Math.min(100, Math.round((completedProjects / 3) * 100));

  // 3. Coding Lab & Problem Solving (Target: 10 challenges passed)
  const codingScore = Math.min(100, Math.round((solvedChallenges / 10) * 100));

  // 4. Assessments & Quizzes (Target: 4 topic assessments passed > 70%)
  const assessmentsScore = Math.min(100, Math.round((passedAssessments / 4) * 100));

  // 5. Mock Interview & Voice Practice (Target: 3 AI mock interview sessions)
  const interviewScore = Math.min(100, Math.round((mockInterviews / 3) * 100));

  // 6. Resume & ATS Optimization (Direct percentage score)
  const resumeScore = resumeAts;

  const dims = {
    skills: {
      id: 'skills',
      name: 'Verified Skills & Proof',
      weight: 0.20,
      score: skillsScore,
      weightedScore: +(skillsScore * 0.20).toFixed(1),
      completedItems: verifiedSkills,
      targetItems: 5,
      metricLabel: `${verifiedSkills}/5 Badges`,
      description: 'Proof-backed skills with verified repository or assessment evidence.',
      howToEarn: 'Complete lessons and submit practical proof to earn skill badges.',
    },
    projects: {
      id: 'projects',
      name: 'Real Projects & Repositories',
      weight: 0.20,
      score: projectsScore,
      weightedScore: +(projectsScore * 0.20).toFixed(1),
      completedItems: completedProjects,
      targetItems: 3,
      metricLabel: `${completedProjects}/3 Projects`,
      description: 'Deployed applications with public GitHub repositories and live URLs.',
      howToEarn: 'Build and submit milestone projects from your stage curriculum.',
    },
    coding: {
      id: 'coding',
      name: 'Coding Lab & DSA Mastery',
      weight: 0.15,
      score: codingScore,
      weightedScore: +(codingScore * 0.15).toFixed(1),
      completedItems: solvedChallenges,
      targetItems: 10,
      metricLabel: `${solvedChallenges}/10 Solved`,
      description: 'Algorithmic problems and system debugging challenges passed.',
      howToEarn: 'Solve coding challenges in the Coding Lab and pass all test cases.',
    },
    assessments: {
      id: 'assessments',
      name: 'Assessments & Concept Quizzes',
      weight: 0.15,
      score: assessmentsScore,
      weightedScore: +(assessmentsScore * 0.15).toFixed(1),
      completedItems: passedAssessments,
      targetItems: 4,
      metricLabel: `${passedAssessments}/4 Passed`,
      description: 'Curriculum quizzes and diagnostic assessments scored over 70%.',
      howToEarn: 'Take chapter quizzes and stage benchmark assessments.',
    },
    interview: {
      id: 'interview',
      name: 'Mock Interviews & Voice AI',
      weight: 0.15,
      score: interviewScore,
      weightedScore: +(interviewScore * 0.15).toFixed(1),
      completedItems: mockInterviews,
      targetItems: 3,
      metricLabel: `${mockInterviews}/3 Sessions`,
      description: 'Two-way voice mock interview sessions evaluated on STAR method and technical accuracy.',
      howToEarn: 'Complete an interactive voice interview in the Interview Prep Engine.',
    },
    resume: {
      id: 'resume',
      name: 'ATS Resume & Career Profile',
      weight: 0.15,
      score: resumeScore,
      weightedScore: +(resumeScore * 0.15).toFixed(1),
      completedItems: resumeAts > 0 ? 1 : 0,
      targetItems: 1,
      metricLabel: `${resumeAts}% Match`,
      description: 'Resume compatibility with industry job descriptions and verified LinkedIn/GitHub links.',
      howToEarn: 'Upload your resume to the ATS Scanner and apply keyword recommendations.',
    },
  };

  const totalRaw = 
    dims.skills.weightedScore +
    dims.projects.weightedScore +
    dims.coding.weightedScore +
    dims.assessments.weightedScore +
    dims.interview.weightedScore +
    dims.resume.weightedScore;

  const overallScore = Math.min(100, Math.max(0, Math.round(totalRaw)));
  const isNewStudent = overallScore === 0 && verifiedSkills === 0 && completedProjects === 0;

  let statusLabel: ReadinessBreakdown['statusLabel'] = 'Getting Started';
  if (overallScore >= 85) statusLabel = 'Industry Ready';
  else if (overallScore >= 70) statusLabel = 'Interview Ready';
  else if (overallScore >= 45) statusLabel = 'Intermediate';
  else if (overallScore >= 20) statusLabel = 'Developing';

  const recommendations: string[] = [];
  if (verifiedSkills < 3) recommendations.push('Earn your first verified skill badge by completing a stage mini-lab.');
  if (solvedChallenges < 5) recommendations.push('Solve 2 coding challenges in the Coding Lab to boost your problem-solving score.');
  if (completedProjects === 0) recommendations.push('Initialize your first milestone project repository to unlock 20% project readiness.');
  if (mockInterviews === 0) recommendations.push('Complete a 5-minute AI Voice Mock Interview to practice technical communication.');
  if (resumeAts < 60) recommendations.push('Run your resume through the ATS scanner to fix missing industry keywords.');

  return {
    overallScore,
    isNewStudent,
    statusLabel,
    dimensions: dims,
    recommendations,
  };
}
