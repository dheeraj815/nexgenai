import { Router, Response } from 'express';
import { prisma } from '../../utils/prisma.js';
import { authenticate, AuthRequest } from '../../middleware/auth.js';

export const systemDesignRouter = Router();

systemDesignRouter.get('/diagrams', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const diagrams = await prisma.systemDesignDiagram.findMany({
      where: { userId: req.user!.id },
      orderBy: { updatedAt: 'desc' },
    });
    return res.json({ success: true, diagrams });
  } catch (error) {
    console.error('Get diagrams error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch diagrams' });
  }
});

systemDesignRouter.post('/analyze', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { title, scenario, nodes, edges } = req.body;
    const nodeList = Array.isArray(nodes) ? nodes : [];
    const edgeList = Array.isArray(edges) ? edges : [];

    // Real architecture rule evaluation
    const bottlenecks: string[] = [];
    const recommendations: string[] = [];
    let score = 50; // base score

    const hasClient = nodeList.some((n: any) => n.type === 'client');
    const hasLB = nodeList.some((n: any) => n.type === 'loadbalancer' || n.type === 'gateway');
    const hasCache = nodeList.some((n: any) => n.type === 'cache' || n.type === 'redis');
    const hasDb = nodeList.some((n: any) => n.type === 'database' || n.type === 'sql' || n.type === 'nosql');
    const hasQueue = nodeList.some((n: any) => n.type === 'queue' || n.type === 'kafka');
    const hasService = nodeList.some((n: any) => n.type === 'service' || n.type === 'api');

    if (!hasLB && nodeList.length > 2) {
      bottlenecks.push('No Load Balancer or API Gateway detected: Single point of entry failure and lack of horizontal traffic distribution.');
      score -= 15;
    } else if (hasLB) {
      score += 15;
      recommendations.push('Load Balancer / Gateway present: Provides traffic distribution and SSL termination.');
    }

    if (hasDb && !hasCache && scenario !== 'Simple CRUD') {
      bottlenecks.push('Direct database reads without in-memory caching layer (Redis/Memcached): Vulnerable to high latency and database read saturation under peak loads.');
      score -= 10;
    } else if (hasCache) {
      score += 15;
      recommendations.push('In-memory Cache included: Drastically reduces database read I/O operations.');
    }

    if (hasQueue) {
      score += 10;
      recommendations.push('Asynchronous Message Broker included: Enables event-driven decoupling and graceful traffic spike absorption.');
    }

    if (!hasService && hasDb && hasClient) {
      bottlenecks.push('Direct client-to-database connection: Severe security and architectural violation. Requires intermediary backend service layer.');
      score -= 25;
    }

    const dbNodes = nodeList.filter((n: any) => n.type === 'database');
    if (dbNodes.length === 1 && score > 60) {
      bottlenecks.push('Single Primary Database without replica: Represents a Single Point of Failure (SPOF) for persistence availability.');
    }

    const finalScore = Math.max(10, Math.min(100, score));

    // Save diagram
    const diagram = await prisma.systemDesignDiagram.create({
      data: {
        userId: req.user!.id,
        title: title || 'Distributed Architecture Analysis',
        scenario: scenario || 'High Concurrency Web Service',
        nodesJson: JSON.stringify(nodeList),
        edgesJson: JSON.stringify(edgeList),
        analysisScore: finalScore,
        bottlenecksJson: JSON.stringify(bottlenecks),
        recommendationsJson: JSON.stringify(recommendations),
      },
    });

    // Update system design skill
    await prisma.userSkill.upsert({
      where: { userId_skillName: { userId: req.user!.id, skillName: 'System Design & Architecture' } },
      update: { status: 'VERIFIED', confidenceLevel: finalScore },
      create: {
        userId: req.user!.id,
        skillName: 'System Design & Architecture',
        domainSlug: 'system-design',
        status: 'VERIFIED',
        confidenceLevel: finalScore,
      },
    });

    return res.json({
      success: true,
      diagramId: diagram.id,
      score: finalScore,
      bottlenecks,
      recommendations,
      metrics: {
        estimatedLatency: hasCache ? '< 35ms' : '~140ms',
        scalabilityRating: finalScore >= 80 ? 'High (Production Ready)' : (finalScore >= 60 ? 'Moderate' : 'Low'),
        availabilityLevel: (hasLB && hasCache) ? '99.95%' : '99.0%',
      },
    });
  } catch (error) {
    console.error('System design analysis error:', error);
    return res.status(500).json({ success: false, error: 'Failed to analyze architecture diagram' });
  }
});
