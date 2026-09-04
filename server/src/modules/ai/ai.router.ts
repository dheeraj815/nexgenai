import { Router, Response } from 'express';
import { prisma } from '../../utils/prisma.js';
import { authenticate, AuthRequest } from '../../middleware/auth.js';
import { aiService } from './ai.service.js';

export const aiRouter = Router();

aiRouter.get('/status', (req, res) => {
  return res.json({ success: true, status: aiService.getProviderStatus() });
});

aiRouter.post('/mentor/chat', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { message, conversationHistory } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: {
        profile: true,
        userSkills: true,
      },
    });

    const studentContext = {
      name: user?.firstName || 'Student',
      stage: user?.profile?.academicStage || 'CLASS_11',
      domain: user?.profile?.branch || undefined,
      targetRole: user?.profile?.targetRole || undefined,
      skills: user?.userSkills.map(s => s.skillName) || [],
      readinessScore: user?.profile?.readinessScore || 0,
    };

    const reply = await aiService.mentorChat({
      message,
      studentContext,
      conversationHistory,
    });

    return res.json({ success: true, reply });
  } catch (error) {
    console.error('Mentor chat error:', error);
    return res.status(500).json({ success: false, error: 'Failed to generate mentor response' });
  }
});

aiRouter.post('/roadmap/generate', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { durationDays, targetRole } = req.body;
    const duration = [30, 60, 90].includes(Number(durationDays)) ? Number(durationDays) : 30;

    const profile = await prisma.profile.findUnique({ where: { userId: req.user!.id } });
    const role = targetRole || profile?.targetRole || 'Full Stack Engineer';
    const stage = profile?.academicStage || 'YEAR_2';

    const generated = await aiService.generateRoadmap({ durationDays: duration, targetRole: role, stage });

    // Persist roadmap
    const roadmap = await prisma.careerRoadmap.create({
      data: {
        userId: req.user!.id,
        title: generated.title,
        durationDays: duration,
        targetRole: role,
        currentStage: stage,
        items: {
          create: generated.items.map((item: any) => ({
            dayNumber: item.dayNumber,
            weekNumber: item.weekNumber,
            title: item.title,
            goalDescription: item.goalDescription,
            skillName: item.skillName,
            actionItem: item.actionItem,
          })),
        },
      },
      include: { items: true },
    });

    return res.json({ success: true, roadmap });
  } catch (error) {
    console.error('Generate roadmap error:', error);
    return res.status(500).json({ success: false, error: 'Failed to generate roadmap' });
  }
});

aiRouter.get('/roadmap', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const roadmaps = await prisma.careerRoadmap.findMany({
      where: { userId: req.user!.id },
      include: { items: { orderBy: { dayNumber: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    });
    return res.json({ success: true, roadmaps });
  } catch (error) {
    console.error('Get roadmap error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch roadmaps' });
  }
});

aiRouter.post('/behavioral-coach/evaluate', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { question, answer } = req.body;
    if (!answer) {
      return res.status(400).json({ success: false, error: 'Answer is required' });
    }

    const evaluation = await aiService.evaluateBehavioral(answer, question || 'Behavioral Question');
    return res.json({ success: true, evaluation });
  } catch (error) {
    console.error('Behavioral evaluation error:', error);
    return res.status(500).json({ success: false, error: 'Failed to evaluate behavioral answer' });
  }
});
