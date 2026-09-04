import { Router, Response } from 'express';
import { prisma } from '../../utils/prisma.js';
import { authenticate, AuthRequest } from '../../middleware/auth.js';

export const skillsRouter = Router();

skillsRouter.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const skills = await prisma.userSkill.findMany({
      where: { userId: req.user!.id },
      include: { evidences: true },
      orderBy: { updatedAt: 'desc' },
    });
    return res.json({ success: true, skills });
  } catch (error) {
    console.error('Get skills error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch user skills' });
  }
});

skillsRouter.post('/claim', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { skillName, domainSlug, confidenceLevel } = req.body;
    if (!skillName) {
      return res.status(400).json({ success: false, error: 'Skill name is required' });
    }

    const skill = await prisma.userSkill.upsert({
      where: {
        userId_skillName: {
          userId: req.user!.id,
          skillName: skillName.trim(),
        },
      },
      update: {
        domainSlug,
        confidenceLevel: confidenceLevel || 50,
      },
      create: {
        userId: req.user!.id,
        skillName: skillName.trim(),
        domainSlug,
        status: 'CLAIMED',
        confidenceLevel: confidenceLevel || 50,
      },
    });

    return res.json({ success: true, message: 'Skill claimed successfully', skill });
  } catch (error) {
    console.error('Claim skill error:', error);
    return res.status(500).json({ success: false, error: 'Failed to claim skill' });
  }
});

skillsRouter.post('/:id/evidence', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { evidenceType, title, url, description } = req.body;
    const userSkillId = String(req.params.id);

    const skill = await prisma.userSkill.findUnique({
      where: { id: String(userSkillId) },
    });

    if (!skill || skill.userId !== req.user!.id) {
      return res.status(404).json({ success: false, error: 'Skill not found or unauthorized' });
    }

    const evidence = await prisma.skillEvidence.create({
      data: {
        userSkillId,
        userId: req.user!.id,
        evidenceType: evidenceType || 'PROJECT',
        title,
        url,
        description,
        verificationStatus: 'EVIDENCE_SUBMITTED',
      },
    });

    // Update skill status to EVIDENCE_SUBMITTED
    await prisma.userSkill.update({
      where: { id: String(userSkillId) },
      data: { status: 'EVIDENCE_SUBMITTED' },
    });

    return res.status(201).json({ success: true, message: 'Evidence submitted successfully', evidence });
  } catch (error) {
    console.error('Submit evidence error:', error);
    return res.status(500).json({ success: false, error: 'Failed to submit evidence' });
  }
});

skillsRouter.get('/tree', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const profile = await prisma.profile.findUnique({ where: { userId } });
    const userSkills = await prisma.userSkill.findMany({ where: { userId } });
    const userDomains = await prisma.userDomain.findMany({
      where: { userId },
      include: { domain: { include: { skills: true, roles: true } } },
    });

    // Build skill tree data structure
    const primaryDomain = userDomains.find(d => d.isPrimary) || userDomains[0];
    const domainSkills = primaryDomain?.domain.skills || [];

    const nodes = domainSkills.map(ds => {
      const existing = userSkills.find(us => us.skillName.toLowerCase() === ds.name.toLowerCase());
      return {
        id: ds.id,
        name: ds.name,
        category: ds.category,
        level: ds.level,
        importance: ds.importance,
        status: existing ? existing.status : 'MISSING',
        confidence: existing ? existing.confidenceLevel : 0,
      };
    });

    return res.json({
      success: true,
      domain: primaryDomain ? primaryDomain.domain.name : 'All Domains',
      nodes,
      summary: {
        total: nodes.length,
        verified: nodes.filter(n => n.status === 'VERIFIED').length,
        evidenceSubmitted: nodes.filter(n => n.status === 'EVIDENCE_SUBMITTED').length,
        assessed: nodes.filter(n => n.status === 'ASSESSED').length,
        claimed: nodes.filter(n => n.status === 'CLAIMED').length,
        missing: nodes.filter(n => n.status === 'MISSING').length,
      },
    });
  } catch (error) {
    console.error('Skill tree error:', error);
    return res.status(500).json({ success: false, error: 'Failed to generate skill tree' });
  }
});
