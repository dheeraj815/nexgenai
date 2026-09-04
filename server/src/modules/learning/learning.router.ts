import { Router, Response } from 'express';
import { prisma } from '../../utils/prisma.js';
import { authenticate, optionalAuth, AuthRequest } from '../../middleware/auth.js';

export const learningRouter = Router();

learningRouter.get('/domains', async (req, res: Response) => {
  try {
    const domains = await prisma.domain.findMany({
      include: {
        _count: {
          select: { skills: true, roles: true, courses: true, assessments: true },
        },
      },
      orderBy: { name: 'asc' },
    });
    return res.json({ success: true, domains });
  } catch (error) {
    console.error('List domains error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch domains' });
  }
});

learningRouter.get('/domains/:slug', async (req, res: Response) => {
  try {
    const domain = await prisma.domain.findUnique({
      where: { slug: String(req.params.slug) },
      include: {
        skills: true,
        roles: true,
        courses: {
          include: {
            modules: { include: { lessons: { select: { id: true, title: true, estimatedMinutes: true, orderIndex: true } } } },
          },
        },
        assessments: true,
      },
    });

    if (!domain) {
      return res.status(404).json({ success: false, error: 'Domain not found' });
    }

    return res.json({ success: true, domain });
  } catch (error) {
    console.error('Get domain error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch domain details' });
  }
});

learningRouter.get('/courses', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { domain, stage } = req.query;
    const where: any = {};
    if (domain) {
      where.domain = { slug: String(domain) };
    }
    if (stage) {
      where.academicStage = { in: [String(stage), 'ALL'] };
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        domain: { select: { name: true, slug: true, icon: true } },
        modules: {
          include: {
            lessons: {
              include: {
                progress: req.user ? { where: { userId: req.user.id } } : false,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const coursesWithProgress = courses.map(c => {
      let totalLessons = 0;
      let completedLessons = 0;
      c.modules.forEach(m => {
        m.lessons.forEach(l => {
          totalLessons++;
          if (l.progress && l.progress.length > 0 && l.progress[0].isCompleted) {
            completedLessons++;
          }
        });
      });
      const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
      return {
        ...c,
        totalLessons,
        completedLessons,
        progressPercent,
      };
    });

    return res.json({ success: true, courses: coursesWithProgress });
  } catch (error) {
    console.error('List courses error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch courses' });
  }
});

learningRouter.get('/courses/:slug', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const course = await prisma.course.findUnique({
      where: { slug: String(req.params.slug) },
      include: {
        domain: true,
        modules: {
          orderBy: { orderIndex: 'asc' },
          include: {
            lessons: {
              orderBy: { orderIndex: 'asc' },
              include: {
                progress: req.user ? { where: { userId: req.user.id } } : false,
              },
            },
          },
        },
      },
    });

    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }

    return res.json({ success: true, course });
  } catch (error) {
    console.error('Get course error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch course details' });
  }
});

learningRouter.get('/lessons/:id', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: String(req.params.id) },
      include: {
        module: {
          include: {
            course: {
              include: {
                domain: true,
                modules: {
                  orderBy: { orderIndex: 'asc' },
                  include: {
                    lessons: {
                      orderBy: { orderIndex: 'asc' },
                      select: { id: true, title: true, orderIndex: true },
                    },
                  },
                },
              },
            },
          },
        },
        progress: req.user ? { where: { userId: req.user.id } } : false,
      },
    });

    if (!lesson) {
      return res.status(404).json({ success: false, error: 'Lesson not found' });
    }

    return res.json({ success: true, lesson });
  } catch (error) {
    console.error('Get lesson error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch lesson' });
  }
});

learningRouter.post('/lessons/:id/complete', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const lessonId = String(req.params.id);

    const progress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      update: {
        isCompleted: true,
        completedAt: new Date(),
      },
      create: {
        userId,
        lessonId,
        isCompleted: true,
        completedAt: new Date(),
      },
    });

    return res.json({ success: true, message: 'Lesson marked as complete', progress });
  } catch (error) {
    console.error('Complete lesson error:', error);
    return res.status(500).json({ success: false, error: 'Failed to complete lesson' });
  }
});

learningRouter.post('/domains/:id/enroll', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const domainId = String(req.params.id);

    const enrollment = await prisma.userDomain.upsert({
      where: {
        userId_domainId: { userId, domainId },
      },
      update: { isPrimary: true },
      create: {
        userId,
        domainId,
        isPrimary: true,
      },
    });

    return res.json({ success: true, message: 'Enrolled in domain successfully', enrollment });
  } catch (error) {
    console.error('Enroll domain error:', error);
    return res.status(500).json({ success: false, error: 'Failed to enroll in domain' });
  }
});
