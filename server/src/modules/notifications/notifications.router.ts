import { Router, Response } from 'express';
import { prisma } from '../../utils/prisma.js';
import { authenticate, AuthRequest } from '../../middleware/auth.js';

export const notificationsRouter = Router();

notificationsRouter.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
      take: 30,
    });
    const unreadCount = await prisma.notification.count({
      where: { userId: req.user!.id, isRead: false },
    });
    return res.json({ success: true, notifications, unreadCount });
  } catch (error) {
    console.error('Get notifications error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch notifications' });
  }
});

notificationsRouter.post('/:id/read', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.notification.updateMany({
      where: { id: String(req.params.id), userId: req.user!.id },
      data: { isRead: true },
    });
    return res.json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    console.error('Mark read error:', error);
    return res.status(500).json({ success: false, error: 'Failed to mark read' });
  }
});
