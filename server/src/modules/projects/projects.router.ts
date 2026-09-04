import { Router, Response } from 'express';
import { prisma } from '../../utils/prisma.js';
import { authenticate, AuthRequest } from '../../middleware/auth.js';

export const projectsRouter = Router();

projectsRouter.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.user!.id },
      orderBy: { updatedAt: 'desc' },
    });
    return res.json({ success: true, projects });
  } catch (error) {
    console.error('List projects error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch projects' });
  }
});

projectsRouter.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, domainSlug, technologies, githubUrl, liveUrl, evidenceNote, status } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, error: 'Title and description are required' });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString().slice(-4);

    const project = await prisma.project.create({
      data: {
        userId: req.user!.id,
        title,
        slug,
        description,
        domainSlug: domainSlug || 'software-engineering',
        technologies: Array.isArray(technologies) ? JSON.stringify(technologies) : (technologies || '[]'),
        githubUrl,
        liveUrl,
        evidenceNote,
        status: status || 'IN_PROGRESS',
      },
    });

    // Auto-link evidence to relevant user skills
    if (githubUrl && Array.isArray(technologies)) {
      for (const tech of technologies) {
        const userSkill = await prisma.userSkill.findUnique({
          where: { userId_skillName: { userId: req.user!.id, skillName: tech } },
        });
        if (userSkill) {
          await prisma.skillEvidence.create({
            data: {
              userSkillId: userSkill.id,
              userId: req.user!.id,
              evidenceType: 'PROJECT',
              title: project.title,
              url: githubUrl,
              description: `Delivered practical project using ${tech}`,
              verificationStatus: 'EVIDENCE_SUBMITTED',
            },
          });
          await prisma.userSkill.update({
            where: { id: userSkill.id },
            data: { status: 'EVIDENCE_SUBMITTED' },
          });
        }
      }
    }

    return res.status(201).json({ success: true, message: 'Project created successfully', project });
  } catch (error) {
    console.error('Create project error:', error);
    return res.status(500).json({ success: false, error: 'Failed to create project' });
  }
});

projectsRouter.put('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: String(req.params.id) },
    });
    if (!project || project.userId !== req.user!.id) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const updated = await prisma.project.update({
      where: { id: String(req.params.id) },
      data: {
        ...req.body,
        technologies: Array.isArray(req.body.technologies) ? JSON.stringify(req.body.technologies) : req.body.technologies,
      },
    });

    return res.json({ success: true, message: 'Project updated', project: updated });
  } catch (error) {
    console.error('Update project error:', error);
    return res.status(500).json({ success: false, error: 'Failed to update project' });
  }
});

projectsRouter.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: String(req.params.id) },
    });
    if (!project || project.userId !== req.user!.id) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    await prisma.project.delete({ where: { id: String(req.params.id) } });
    return res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    console.error('Delete project error:', error);
    return res.status(500).json({ success: false, error: 'Failed to delete project' });
  }
});
