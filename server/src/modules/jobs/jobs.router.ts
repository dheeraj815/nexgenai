import { Router, Response } from 'express';
import { prisma } from '../../utils/prisma.js';
import { authenticate, optionalAuth, AuthRequest } from '../../middleware/auth.js';

export const jobsRouter = Router();

jobsRouter.get('/', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { status: 'ACTIVE' },
      include: {
        organization: true,
        applications: req.user ? { where: { userId: req.user.id } } : false,
      },
      orderBy: { createdAt: 'desc' },
    });

    let userSkillNames: string[] = [];
    if (req.user) {
      const skills = await prisma.userSkill.findMany({
        where: { userId: req.user.id },
        select: { skillName: true },
      });
      userSkillNames = skills.map(s => s.skillName.toLowerCase());
    }

    const formatted = jobs.map(job => {
      const requiredSkills: string[] = JSON.parse(job.skillsRequiredJson || '[]');
      const matchingSkills: string[] = [];
      const missingSkills: string[] = [];

      requiredSkills.forEach(skill => {
        if (userSkillNames.includes(skill.toLowerCase())) {
          matchingSkills.push(skill);
        } else {
          missingSkills.push(skill);
        }
      });

      const matchScore = requiredSkills.length > 0 ? Math.round((matchingSkills.length / requiredSkills.length) * 100) : 50;

      return {
        id: job.id,
        title: job.title,
        domainSlug: job.domainSlug,
        roleType: job.roleType,
        location: job.location,
        workMode: job.workMode,
        description: job.description,
        requirements: job.requirements,
        skillsRequired: requiredSkills,
        minCgpa: job.minCgpa,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        organization: job.organization,
        matchScore,
        matchingSkills,
        missingSkills,
        application: job.applications && job.applications.length > 0 ? job.applications[0] : null,
      };
    });

    return res.json({ success: true, jobs: formatted });
  } catch (error) {
    console.error('List jobs error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch jobs' });
  }
});

jobsRouter.post('/:id/apply', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const jobId = String(req.params.id);
    const { coverNote } = req.body;

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { organization: true },
    });

    if (!job) {
      return res.status(404).json({ success: false, error: 'Job opening not found' });
    }

    const application = await prisma.application.upsert({
      where: { userId_jobId: { userId, jobId } },
      update: {
        currentStage: 'APPLIED',
        coverNote,
        appliedAt: new Date(),
      },
      create: {
        userId,
        jobId,
        currentStage: 'APPLIED',
        coverNote,
      },
    });

    await prisma.notification.create({
      data: {
        userId,
        title: `Application Submitted: ${job.title}`,
        message: `Your application for ${job.title} at ${job.organization.name} has been successfully registered.`,
        category: 'APPLICATION',
        actionUrl: '/applications',
      },
    });

    return res.json({ success: true, message: 'Application submitted successfully', application });
  } catch (error) {
    console.error('Apply job error:', error);
    return res.status(500).json({ success: false, error: 'Failed to submit application' });
  }
});

jobsRouter.get('/applications', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const applications = await prisma.application.findMany({
      where: { userId: req.user!.id },
      include: { job: { include: { organization: true } } },
      orderBy: { updatedAt: 'desc' },
    });
    return res.json({ success: true, applications });
  } catch (error) {
    console.error('Get applications error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch applications' });
  }
});
