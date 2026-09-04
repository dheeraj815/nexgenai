import { Router, Response } from 'express';
import { prisma } from '../../utils/prisma.js';
import { authenticate, optionalAuth, AuthRequest } from '../../middleware/auth.js';

export const assessmentsRouter = Router();

assessmentsRouter.get('/', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { domain, stage } = req.query;
    const where: any = {};
    if (domain) where.domain = { slug: String(domain) };
    if (stage) where.academicStage = { in: [String(stage), 'ALL'] };

    const assessments = await prisma.assessment.findMany({
      where,
      include: {
        domain: { select: { name: true, slug: true } },
        _count: { select: { questions: true } },
        attempts: req.user ? {
          where: { userId: req.user.id },
          orderBy: { completedAt: 'desc' },
          take: 1,
        } : false,
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ success: true, assessments });
  } catch (error) {
    console.error('List assessments error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch assessments' });
  }
});

assessmentsRouter.get('/:slug', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const assessment = await prisma.assessment.findUnique({
      where: { slug: String(req.params.slug) },
      include: {
        domain: true,
        questions: {
          select: {
            id: true,
            questionText: true,
            questionType: true,
            optionsJson: true,
            // DO NOT expose correctAnswer or explanation before submission
          },
        },
      },
    });

    if (!assessment) {
      return res.status(404).json({ success: false, error: 'Assessment not found' });
    }

    const formattedQuestions = assessment.questions.map(q => ({
      ...q,
      options: JSON.parse(q.optionsJson || '[]'),
    }));

    return res.json({
      success: true,
      assessment: {
        ...assessment,
        questions: formattedQuestions,
      },
    });
  } catch (error) {
    console.error('Get assessment error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch assessment' });
  }
});

assessmentsRouter.post('/:slug/submit', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { answers, timeSpentSeconds } = req.body; // { [questionId]: selectedAnswer }

    const assessment = await prisma.assessment.findUnique({
      where: { slug: String(req.params.slug) },
      include: { questions: true, domain: true },
    });

    if (!assessment) {
      return res.status(404).json({ success: false, error: 'Assessment not found' });
    }

    let score = 0;
    const questionReview = assessment.questions.map(q => {
      const selected = answers ? answers[q.id] : null;
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) score += 1;
      return {
        questionId: q.id,
        questionText: q.questionText,
        selected,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const maxScore = assessment.questions.length;
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    const passed = percentage >= assessment.passPercentage;

    const attempt = await prisma.assessmentAttempt.create({
      data: {
        assessmentId: assessment.id,
        userId,
        score,
        maxScore,
        percentage,
        passed,
        timeSpentSeconds: timeSpentSeconds || 0,
        answersJson: JSON.stringify(answers || {}),
        feedbackJson: JSON.stringify({
          review: questionReview,
          summary: passed ? 'Assessment Passed! Verified competency logged.' : 'Needs review. Revise domain concepts and retry.',
        }),
      },
    });

    // If passed, elevate relevant skills to ASSESSED or VERIFIED
    if (passed && assessment.domain) {
      const domainSkills = await prisma.domainSkill.findMany({
        where: { domainId: assessment.domain.id },
        take: 3,
      });

      for (const ds of domainSkills) {
        const existingSkill = await prisma.userSkill.findUnique({
          where: { userId_skillName: { userId, skillName: ds.name } },
        });

        const newStatus = percentage >= 85 ? 'VERIFIED' : 'ASSESSED';
        if (!existingSkill || existingSkill.status === 'CLAIMED') {
          await prisma.userSkill.upsert({
            where: { userId_skillName: { userId, skillName: ds.name } },
            update: { status: newStatus, confidenceLevel: Math.round(percentage) },
            create: {
              userId,
              skillName: ds.name,
              domainSlug: assessment.domain.slug,
              status: newStatus,
              confidenceLevel: Math.round(percentage),
            },
          });
        }
      }
    }

    return res.json({
      success: true,
      attempt: {
        id: attempt.id,
        score,
        maxScore,
        percentage: Math.round(percentage),
        passed,
        questionReview,
      },
    });
  } catch (error) {
    console.error('Submit assessment error:', error);
    return res.status(500).json({ success: false, error: 'Failed to submit assessment' });
  }
});
