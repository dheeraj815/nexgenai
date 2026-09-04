import { Router, Response } from 'express';
import { prisma } from '../../utils/prisma.js';
import { authenticate, AuthRequest } from '../../middleware/auth.js';

export const journeyRouter = Router();

const STAGES = [
  {
    id: 'CLASS_11',
    name: 'Class 11',
    subtitle: 'Career Discovery & Aptitude',
    description: 'Explore domains, understand what industry roles actually do, discover your innate interests, and take your first steps in foundational logic and beginner projects.',
    keyObjectives: [
      'Take the Career Aptitude & Interest Questionnaire',
      'Explore 30 technology & engineering domains',
      'Learn beginner programming logic with Python & Web basics',
      'Build a simple beginner project (Personal Website or Logic Game)',
      'Consult the AI Career Mentor on pathway possibilities'
    ],
    recommendedCourses: ['career-discovery-101', 'logic-and-python-foundations'],
    isCollege: false,
  },
  {
    id: 'CLASS_12',
    name: 'Class 12',
    subtitle: 'Career Direction & Pathways',
    description: 'Narrow down your trajectory, compare engineering streams, build a personalized roadmap, learn Git & GitHub fundamentals, and create your initial Career Passport.',
    keyObjectives: [
      'Compare career pathways: AI vs Cybersecurity vs Software Engineering',
      'Establish a 30/60/90-day learning roadmap for target domain',
      'Set up Git, GitHub, and your foundational portfolio',
      'Build intermediate project demonstrating real problem solving',
      'Take entry-level domain skill assessments'
    ],
    recommendedCourses: ['domain-pathway-explorer', 'git-github-portfolio-starter'],
    isCollege: false,
  },
  {
    id: 'YEAR_1',
    name: 'College Year 1',
    subtitle: 'Core CS & Technical Foundations',
    description: 'Master foundational programming (Python, Java, C++, JS), core data structures, web & API fundamentals, database basics, and technical communication.',
    keyObjectives: [
      'Master Data Structures and Algorithmic problem solving in Coding Lab',
      'Learn Backend & Database fundamentals (Node.js, SQL, REST APIs)',
      'Build full-stack web application and connect GitHub evidence',
      'Participate in college coding competitions and earn verified skills'
    ],
    recommendedCourses: ['cs-foundations-dsa', 'web-backend-databases-101'],
    isCollege: true,
  },
  {
    id: 'YEAR_2',
    name: 'College Year 2',
    subtitle: 'Domain Specialization',
    description: 'Deep-dive into your chosen specialization (AI/ML, Cloud/DevOps, Full Stack, Cybersecurity), build substantial portfolio projects, and prepare for summer internships.',
    keyObjectives: [
      'Complete advanced domain-specific curriculum and practical labs',
      'Build 2 production-grade projects with live deployments and README evidence',
      'Solve medium-level Coding Lab challenges and master algorithms',
      'Prepare technical resume and benchmark ATS score'
    ],
    recommendedCourses: ['applied-ai-ml-systems', 'modern-cloud-devops-mastery'],
    isCollege: true,
  },
  {
    id: 'YEAR_3',
    name: 'College Year 3',
    subtitle: 'Industry Preparation & Internships',
    description: 'Transition from learning to professional proof of work. Apply for internships, refine ATS-optimized resumes, practice AI technical & behavioral interviews, and design distributed systems.',
    keyObjectives: [
      'Secure and complete a verified summer internship',
      'Practice mock AI technical, behavioral (STAR), and system design interviews',
      'Optimize resume with ATS Studio for target job descriptions',
      'Engage in System Design Canvas architecture analysis and SOC simulations'
    ],
    recommendedCourses: ['system-design-distributed-architectures', 'interview-cracking-bootcamp'],
    isCollege: true,
  },
  {
    id: 'YEAR_4',
    name: 'College Year 4',
    subtitle: 'Placement Command Center',
    description: 'The definitive hiring launchpad. Access college placement drives, evaluate automatic eligibility, match with top hiring partners, ace campus interviews, and secure offers.',
    keyObjectives: [
      'Participate in on-campus placement drives via TPO Portal',
      'Verify placement eligibility across CGPA, backlogs, and branch criteria',
      'Submit tailored ATS resumes to active recruiter job postings',
      'Receive, compare, and accept corporate employment offers'
    ],
    recommendedCourses: ['placement-readiness-masterclass', 'executive-communication-negotiation'],
    isCollege: true,
  },
  {
    id: 'INTERNSHIP',
    name: 'Internship Stage',
    subtitle: 'Workplace Execution & Delivery',
    description: 'Log real-world corporate deliverables, record skills acquired on the job, gather manager feedback, and auto-sync accomplishments into your Career Passport.',
    keyObjectives: [
      'Document deliverables, technologies used, and business impact',
      'Acquire verified work-experience credentials',
      'Convert summer internship into a Pre-Placement Offer (PPO)'
    ],
    recommendedCourses: ['corporate-delivery-excellence'],
    isCollege: true,
  },
  {
    id: 'PLACEMENT',
    name: 'Placement Command',
    subtitle: 'Offer Realization & Transition',
    description: 'Connect directly with TPO officers and corporate recruiters. Finalize contracts, complete documentation, and prepare for day-one corporate impact.',
    keyObjectives: [
      'Lock in placement offers and verify compensation packages',
      'Complete pre-joining upskilling modules'
    ],
    recommendedCourses: ['day-one-engineering-readiness'],
    isCollege: true,
  },
  {
    id: 'CAREER',
    name: 'First Job & Career Growth',
    subtitle: 'Continuous Upskilling & Leadership',
    description: 'Your Career Passport lives on beyond graduation. Track career promotions, bridge senior engineering skill gaps, explore lateral transitions, and achieve lifelong mastery.',
    keyObjectives: [
      'Track 1-year and 3-year career promotion goals',
      'Identify skill gaps for Senior Engineer / Tech Lead roles',
      'Maintain an active verified proof-of-work public portfolio'
    ],
    recommendedCourses: ['senior-engineer-transition-playbook'],
    isCollege: false,
  },
];

journeyRouter.get('/stages', (req, res) => {
  return res.json({ success: true, stages: STAGES });
});

journeyRouter.get('/my-stage', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: req.user!.id },
    });

    const currentStageId = profile?.academicStage || 'CLASS_11';
    const currentStageIndex = STAGES.findIndex(s => s.id === currentStageId);
    const stageInfo = STAGES[currentStageIndex] || STAGES[0];

    // Compute progress metrics
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: {
        userSkills: true,
        projects: true,
        assessmentAttempts: true,
        resumes: true,
        internships: true,
        offers: true,
      },
    });

    return res.json({
      success: true,
      currentStage: stageInfo,
      currentStageIndex,
      totalStages: STAGES.length,
      isCollege: stageInfo.isCollege,
      profile,
      summary: {
        skillsCount: user?.userSkills.length || 0,
        projectsCount: user?.projects.length || 0,
        assessmentsCount: user?.assessmentAttempts.length || 0,
        resumesCount: user?.resumes.length || 0,
        internshipsCount: user?.internships.length || 0,
        offersCount: user?.offers.length || 0,
      }
    });
  } catch (error) {
    console.error('My stage error:', error);
    return res.status(500).json({ success: false, error: 'Failed to retrieve journey status' });
  }
});

journeyRouter.post('/update-stage', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { stage } = req.body;
    if (!STAGES.some(s => s.id === stage)) {
      return res.status(400).json({ success: false, error: 'Invalid academic stage identifier' });
    }

    const updatedProfile = await prisma.profile.update({
      where: { userId: req.user!.id },
      data: { academicStage: stage },
    });

    await prisma.notification.create({
      data: {
        userId: req.user!.id,
        title: `Academic Stage Advanced to ${stage.replace('_', ' ')}`,
        message: 'Your curriculum, recommended courses, and Career Passport view have been updated to reflect your new stage.',
        category: 'ROADMAP',
      },
    });

    return res.json({ success: true, message: 'Academic stage updated', profile: updatedProfile });
  } catch (error) {
    console.error('Update stage error:', error);
    return res.status(500).json({ success: false, error: 'Failed to update academic stage' });
  }
});
