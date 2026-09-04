import { Router, Response } from 'express';
import { prisma } from '../../utils/prisma.js';
import { authenticate, requireRole, AuthRequest } from '../../middleware/auth.js';

export const recruiterRouter = Router();

recruiterRouter.get('/talent-search', authenticate, requireRole('RECRUITER', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
  try {
    const { skill, domain, minReadiness } = req.query;

    const whereProfile: any = {};
    if (minReadiness) {
      whereProfile.readinessScore = { gte: parseInt(String(minReadiness), 10) };
    }

    const students = await prisma.user.findMany({
      where: {
        role: 'STUDENT',
        portfolioProfile: { isPublic: true },
        profile: whereProfile,
        ...(skill && {
          userSkills: {
            some: {
              skillName: { contains: String(skill) },
              status: { in: ['VERIFIED', 'EVIDENCE_SUBMITTED', 'ASSESSED'] },
            },
          },
        }),
      },
      include: {
        profile: true,
        userSkills: { include: { evidences: true } },
        projects: { where: { status: 'COMPLETED' } },
        resumes: { where: { isPrimary: true }, take: 1 },
      },
      take: 50,
      orderBy: { profile: { readinessScore: 'desc' } },
    });

    const candidates = students.map(s => ({
      id: s.id,
      name: `${s.firstName} ${s.lastName}`,
      email: s.email,
      academicStage: s.profile?.academicStage,
      branch: s.profile?.branch,
      targetRole: s.profile?.targetRole,
      readinessScore: s.profile?.readinessScore,
      githubUrl: s.profile?.githubUrl,
      linkedinUrl: s.profile?.linkedinUrl,
      verifiedSkills: s.userSkills.filter(sk => sk.status === 'VERIFIED').map(sk => sk.skillName),
      projectsCount: s.projects.length,
      hasResume: s.resumes.length > 0,
    }));

    return res.json({ success: true, candidates });
  } catch (error) {
    console.error('Talent search error:', error);
    return res.status(500).json({ success: false, error: 'Failed to search talent pool' });
  }
});

recruiterRouter.post('/jobs', authenticate, requireRole('RECRUITER'), async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      domainSlug,
      roleType,
      location,
      workMode,
      description,
      requirements,
      skillsRequired,
      minCgpa,
      salaryMin,
      salaryMax,
    } = req.body;

    const recruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: req.user!.id },
      include: { organization: true },
    });

    if (!recruiter) {
      return res.status(400).json({ success: false, error: 'Recruiter profile not configured' });
    }

    const job = await prisma.job.create({
      data: {
        organizationId: recruiter.organizationId,
        title,
        domainSlug: domainSlug || 'software-engineering',
        roleType: roleType || 'FULL_TIME',
        location: location || 'Remote / Hybrid',
        workMode: workMode || 'REMOTE',
        description,
        requirements: requirements || '',
        skillsRequiredJson: JSON.stringify(skillsRequired || []),
        minCgpa: minCgpa ? parseFloat(minCgpa) : null,
        salaryMin: salaryMin ? parseFloat(salaryMin) : null,
        salaryMax: salaryMax ? parseFloat(salaryMax) : null,
        status: 'ACTIVE',
      },
    });

    return res.status(201).json({ success: true, message: 'Job posted successfully', job });
  } catch (error) {
    console.error('Post job error:', error);
    return res.status(500).json({ success: false, error: 'Failed to post job' });
  }
});

recruiterRouter.post('/offers', authenticate, requireRole('RECRUITER', 'TPO'), async (req: AuthRequest, res: Response) => {
  try {
    const { userId, role, ctcSalary, companyName } = req.body;
    if (!userId || !role || !ctcSalary) {
      // Handle params
    }

    const offer = await prisma.offer.create({
      data: {
        userId,
        role,
        ctcSalary: parseFloat(ctcSalary) || 10.0,
        companyName: companyName || 'Corporate Partner',
        status: 'OFFERED',
      },
    });

    await prisma.notification.create({
      data: {
        userId,
        title: `Congratulations! Offer Extended for ${role}`,
        message: `You have received a corporate placement offer from ${companyName} with compensation ${ctcSalary} LPA.`,
        category: 'PLACEMENT',
        actionUrl: '/passport',
      },
    });

    return res.status(201).json({ success: true, message: 'Offer extended', offer });
  } catch (error) {
    console.error('Create offer error:', error);
    return res.status(500).json({ success: false, error: 'Failed to issue offer' });
  }
});
