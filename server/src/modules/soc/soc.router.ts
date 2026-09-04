import { Router, Response } from 'express';
import { prisma } from '../../utils/prisma.js';
import { authenticate, optionalAuth, AuthRequest } from '../../middleware/auth.js';

export const socRouter = Router();

socRouter.get('/incidents', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const incidents = await prisma.socIncident.findMany({
      include: {
        attempts: req.user ? {
          where: { userId: req.user.id },
          orderBy: { completedAt: 'desc' },
          take: 1,
        } : false,
      },
      orderBy: { createdAt: 'asc' },
    });

    const formatted = incidents.map(inc => ({
      id: inc.id,
      title: inc.title,
      scenarioType: inc.scenarioType,
      difficulty: inc.difficulty,
      description: inc.description,
      attemptStatus: inc.attempts && inc.attempts.length > 0 ? (inc.attempts[0].passed ? 'RESOLVED' : 'FAILED') : 'UNRESOLVED',
      lastScore: inc.attempts && inc.attempts.length > 0 ? inc.attempts[0].score : null,
    }));

    return res.json({ success: true, incidents: formatted });
  } catch (error) {
    console.error('List incidents error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch SOC incidents' });
  }
});

socRouter.get('/incidents/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const incident = await prisma.socIncident.findUnique({
      where: { id: String(req.params.id) },
      include: {
        attempts: {
          where: { userId: req.user!.id },
          orderBy: { completedAt: 'desc' },
        },
      },
    });

    if (!incident) {
      return res.status(404).json({ success: false, error: 'Incident scenario not found' });
    }

    return res.json({
      success: true,
      incident: {
        id: incident.id,
        title: incident.title,
        scenarioType: incident.scenarioType,
        difficulty: incident.difficulty,
        description: incident.description,
        rawLogs: incident.rawLogs,
        attempts: incident.attempts,
      },
    });
  } catch (error) {
    console.error('Get incident error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch incident details' });
  }
});

socRouter.post('/incidents/:id/investigate', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { submittedSeverity, submittedIocs, submittedContainment, reportNotes } = req.body;
    const incident = await prisma.socIncident.findUnique({
      where: { id: String(req.params.id) },
    });

    if (!incident) {
      return res.status(404).json({ success: false, error: 'Incident not found' });
    }

    const validIocs = JSON.parse(incident.validIoCsJson || '[]');
    const correctContainment = JSON.parse(incident.correctContainmentActionsJson || '[]');
    const userIocs = Array.isArray(submittedIocs) ? submittedIocs : [];
    const userContainment = Array.isArray(submittedContainment) ? submittedContainment : [];

    let score = 0;
    // 1. Severity check (30 pts)
    const severityMatch = submittedSeverity?.toUpperCase() === incident.correctSeverity.toUpperCase();
    if (severityMatch) score += 30;

    // 2. IoC detection (40 pts)
    let iocMatches = 0;
    for (const userIoc of userIocs) {
      if (validIocs.some((vi: string) => vi.toLowerCase().includes(userIoc.trim().toLowerCase()) || userIoc.trim().toLowerCase().includes(vi.toLowerCase()))) {
        iocMatches++;
      }
    }
    const iocScore = validIocs.length > 0 ? Math.min(40, Math.round((iocMatches / validIocs.length) * 40)) : 40;
    score += iocScore;

    // 3. Containment actions (30 pts)
    let containmentMatches = 0;
    for (const action of userContainment) {
      if (correctContainment.includes(action)) containmentMatches++;
    }
    const containmentScore = correctContainment.length > 0 ? Math.min(30, Math.round((containmentMatches / correctContainment.length) * 30)) : 30;
    score += containmentScore;

    const passed = score >= 70;

    const feedback = {
      severityAssessment: severityMatch ? 'Accurate severity classification.' : `Incorrect severity. Expected ${incident.correctSeverity}.`,
      iocDiscoveryRate: `${iocMatches}/${validIocs.length} key Indicators of Compromise identified.`,
      containmentEffectiveness: `${containmentMatches}/${correctContainment.length} proper mitigation actions applied.`,
      postMortemSummary: incident.explanation,
    };

    const attempt = await prisma.socIncidentAttempt.create({
      data: {
        incidentId: incident.id,
        userId: req.user!.id,
        submittedSeverity: submittedSeverity || 'UNKNOWN',
        submittedIocs: JSON.stringify(userIocs),
        submittedContainment: JSON.stringify(userContainment),
        reportNotes,
        score,
        passed,
        feedbackJson: JSON.stringify(feedback),
      },
    });

    // Update Cybersecurity skill
    if (passed) {
      await prisma.userSkill.upsert({
        where: { userId_skillName: { userId: req.user!.id, skillName: 'SOC & Threat Detection' } },
        update: { status: 'VERIFIED', confidenceLevel: score },
        create: {
          userId: req.user!.id,
          skillName: 'SOC & Threat Detection',
          domainSlug: 'cybersecurity',
          status: 'VERIFIED',
          confidenceLevel: score,
        },
      });
    }

    return res.json({
      success: true,
      score,
      passed,
      feedback,
      attemptId: attempt.id,
    });
  } catch (error) {
    console.error('Investigate incident error:', error);
    return res.status(500).json({ success: false, error: 'Failed to process SOC investigation' });
  }
});
