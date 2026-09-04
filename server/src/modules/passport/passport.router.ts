import { Router, Response } from 'express';
import { prisma } from '../../utils/prisma.js';
import { authenticate, AuthRequest } from '../../middleware/auth.js';

export const passportRouter = Router();

passportRouter.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        userDomains: { include: { domain: true } },
        userSkills: { include: { evidences: true } },
        projects: true,
        assessmentAttempts: { include: { assessment: true } },
        codingSubmissions: { include: { problem: true } },
        systemDesignDiagrams: true,
        socIncidentAttempts: { include: { incident: true } },
        resumes: { include: { analyses: true } },
        internships: true,
        offers: true,
        portfolioProfile: true,
        applications: { include: { job: { include: { organization: true } } } },
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Calculate dynamic, genuine Career Readiness Score based on real data
    const skillsCount = user.userSkills.length;
    const verifiedSkillsCount = user.userSkills.filter(s => s.status === 'VERIFIED' || s.status === 'EVIDENCE_SUBMITTED').length;
    const assessedSkillsCount = user.userSkills.filter(s => s.status === 'ASSESSED').length;
    const projectsCount = user.projects.length;
    const completedProjectsCount = user.projects.filter(p => p.status === 'COMPLETED').length;
    const passedAssessmentsCount = user.assessmentAttempts.filter(a => a.passed).length;
    const acceptedCodeCount = user.codingSubmissions.filter(c => c.status === 'ACCEPTED').length;
    const hasResume = user.resumes.length > 0;
    const bestAtsScore = user.resumes.reduce((max, r) => {
      const top = r.analyses.reduce((m, a) => Math.max(m, a.atsScore), 0);
      return Math.max(max, top);
    }, 0);
    const hasInternship = user.internships.length > 0;
    const hasSocPassed = user.socIncidentAttempts.some(s => s.passed);
    const hasSystemDesign = user.systemDesignDiagrams.length > 0;

    // Component weights
    let score = 0;
    // 1. Skills: up to 25 points
    const skillScore = Math.min(25, (verifiedSkillsCount * 6) + (assessedSkillsCount * 3) + ((skillsCount - verifiedSkillsCount - assessedSkillsCount) * 1));
    score += skillScore;

    // 2. Projects & Evidence: up to 25 points
    const projectScore = Math.min(25, (completedProjectsCount * 10) + ((projectsCount - completedProjectsCount) * 4));
    score += projectScore;

    // 3. Assessments & Practical Labs: up to 25 points
    const labScore = Math.min(25, (passedAssessmentsCount * 5) + (acceptedCodeCount * 3) + (hasSocPassed ? 6 : 0) + (hasSystemDesign ? 5 : 0));
    score += labScore;

    // 4. Career Tools & Resume: up to 15 points
    const resumeScore = hasResume ? Math.min(15, Math.round((bestAtsScore / 100) * 15)) : 0;
    score += resumeScore;

    // 5. Work Experience: up to 10 points
    const expScore = hasInternship ? 10 : 0;
    score += expScore;

    const readinessScore = Math.min(100, Math.round(score));

    // Update readiness score in profile
    await prisma.profile.update({
      where: { userId },
      data: { readinessScore },
    });

    const breakdown = {
      overallScore: readinessScore,
      skills: { score: skillScore, max: 25, total: skillsCount, verified: verifiedSkillsCount, assessed: assessedSkillsCount },
      projects: { score: projectScore, max: 25, total: projectsCount, completed: completedProjectsCount },
      assessmentsAndLabs: { score: labScore, max: 25, passedAssessments: passedAssessmentsCount, acceptedCodeProblems: acceptedCodeCount, socPassed: hasSocPassed, systemDesignCount: user.systemDesignDiagrams.length },
      resumeAts: { score: resumeScore, max: 15, hasResume, bestAtsScore },
      experience: { score: expScore, max: 10, hasInternship },
      strengths: [] as string[],
      nextActions: [] as string[],
    };

    if (verifiedSkillsCount > 2) breakdown.strengths.push('Strong verified skill portfolio with tangible proof.');
    if (completedProjectsCount >= 2) breakdown.strengths.push('Proven project execution with delivered deliverables.');
    if (bestAtsScore >= 70) breakdown.strengths.push('ATS-optimized resume ready for applicant tracking filters.');
    if (acceptedCodeCount >= 3) breakdown.strengths.push('Demonstrated algorithmic problem solving in Coding Lab.');

    if (verifiedSkillsCount === 0) breakdown.nextActions.push('Submit project or GitHub evidence to verify your claimed skills.');
    if (projectsCount === 0) breakdown.nextActions.push('Create and publish your first domain-aligned project.');
    if (passedAssessmentsCount === 0) breakdown.nextActions.push('Take a skill assessment to evaluate your knowledge.');
    if (!hasResume) breakdown.nextActions.push('Build or upload your resume in the Resume & ATS Studio.');
    if (acceptedCodeCount === 0) breakdown.nextActions.push('Solve your first problem in the Coding Lab.');

    return res.json({
      success: true,
      passport: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          phone: user.phone,
          avatarUrl: user.avatarUrl,
        },
        profile: user.profile,
        domains: user.userDomains.map(ud => ud.domain),
        skills: user.userSkills,
        projects: user.projects,
        assessmentAttempts: user.assessmentAttempts,
        codingSubmissions: user.codingSubmissions,
        systemDesignDiagrams: user.systemDesignDiagrams,
        socIncidentAttempts: user.socIncidentAttempts,
        resumes: user.resumes,
        internships: user.internships,
        offers: user.offers,
        applications: user.applications,
        portfolioProfile: user.portfolioProfile,
        readiness: breakdown,
      },
    });
  } catch (error) {
    console.error('Passport error:', error);
    return res.status(500).json({ success: false, error: 'Failed to retrieve Career Passport' });
  }
});
