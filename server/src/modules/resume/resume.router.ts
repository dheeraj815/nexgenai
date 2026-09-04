import { Router, Response } from 'express';
import { prisma } from '../../utils/prisma.js';
import { authenticate, AuthRequest } from '../../middleware/auth.js';

export const resumeRouter = Router();

resumeRouter.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const resumes = await prisma.resume.findMany({
      where: { userId: req.user!.id },
      include: { analyses: { orderBy: { createdAt: 'desc' } } },
      orderBy: { updatedAt: 'desc' },
    });
    return res.json({ success: true, resumes });
  } catch (error) {
    console.error('Get resumes error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch resumes' });
  }
});

resumeRouter.post('/create', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { title, textContent, extractedData } = req.body;
    if (!textContent) {
      return res.status(400).json({ success: false, error: 'Resume text content is required' });
    }

    const resume = await prisma.resume.create({
      data: {
        userId: req.user!.id,
        title: title || 'Primary Technical Resume',
        parsedText: textContent,
        extractedDataJson: JSON.stringify(extractedData || {}),
        isPrimary: true,
      },
    });

    return res.status(201).json({ success: true, message: 'Resume created successfully', resume });
  } catch (error) {
    console.error('Create resume error:', error);
    return res.status(500).json({ success: false, error: 'Failed to create resume' });
  }
});

resumeRouter.post('/analyze', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { resumeId, targetJobTitle, targetJobDescription } = req.body;
    if (!targetJobTitle || !targetJobDescription) {
      return res.status(400).json({ success: false, error: 'Job title and description are required for ATS evaluation' });
    }

    let resumeText = '';
    let resume = null;

    if (resumeId) {
      resume = await prisma.resume.findUnique({ where: { id: resumeId } });
      if (resume) resumeText = resume.parsedText;
    } else {
      // Find latest primary resume
      resume = await prisma.resume.findFirst({
        where: { userId: req.user!.id, isPrimary: true },
        orderBy: { updatedAt: 'desc' },
      });
      if (resume) resumeText = resume.parsedText;
    }

    if (!resumeText) {
      return res.status(400).json({ success: false, error: 'No resume found. Please build or upload a resume first.' });
    }

    // Real keyword extraction & ATS matching algorithm
    const jdTokens = targetJobDescription
      .toLowerCase()
      .replace(/[^a-z0-9#+.s]/g, ' ')
      .split(/s+/)
      .filter((w: string) => w.length > 2);

    const commonTechKeywords = [
      'python', 'javascript', 'typescript', 'react', 'node.js', 'sql', 'postgresql', 'mongodb',
      'docker', 'kubernetes', 'aws', 'cloud', 'ci/cd', 'git', 'github', 'rest', 'api',
      'graphql', 'microservices', 'linux', 'cybersecurity', 'machine learning', 'pytorch',
      'tensorflow', 'nlp', 'redis', 'kafka', 'testing', 'jest', 'agile', 'scrum',
      'system design', 'distributed systems', 'security', 'owasp', 'penetration testing'
    ];

    const jdKeywords = new Set<string>();
    commonTechKeywords.forEach(kw => {
      if (targetJobDescription.toLowerCase().includes(kw)) {
        jdKeywords.add(kw);
      }
    });

    // Also extract important capitalized or repeated words from JD
    jdTokens.forEach((token: string) => {
      if (['engineer', 'developer', 'architecture', 'scalability', 'performance', 'monitoring', 'debugging'].includes(token)) {
        jdKeywords.add(token);
      }
    });

    const resumeLower = resumeText.toLowerCase();
    const matchedKeywords: string[] = [];
    const missingKeywords: string[] = [];

    jdKeywords.forEach(kw => {
      if (resumeLower.includes(kw)) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });

    const totalKeywords = jdKeywords.size;
    const matchPercentage = totalKeywords > 0 ? Math.round((matchedKeywords.length / totalKeywords) * 100) : 75;

    // Structural checks
    const recommendations: string[] = [];
    let formatScore = 20;

    const hasMetrics = /d+([%kKmM]|s*percent|s*users|s*requests)/i.test(resumeText);
    if (hasMetrics) {
      formatScore += 10;
    } else {
      recommendations.push('Include quantifiable business metrics (e.g., "improved latency by 35%", "scaled to 10k users").');
    }

    const hasActionVerbs = /(engineered|architected|developed|optimized|implemented|deployed|spearheaded|streamlined)/i.test(resumeText);
    if (hasActionVerbs) {
      formatScore += 10;
    } else {
      recommendations.push('Use strong action verbs (Engineered, Architected, Optimized, Deployed) at the start of bullet points.');
    }

    if (missingKeywords.length > 0) {
      recommendations.push(`Add missing high-priority keywords where relevant: ${missingKeywords.slice(0, 5).join(', ')}.`);
    }

    const finalAtsScore = Math.min(100, Math.round((matchPercentage * 0.6) + formatScore));

    const analysis = await prisma.resumeAnalysis.create({
      data: {
        resumeId: resume!.id,
        targetJobTitle,
        targetJobDescription: targetJobDescription.slice(0, 1000),
        atsScore: finalAtsScore,
        matchedKeywordsJson: JSON.stringify(matchedKeywords),
        missingKeywordsJson: JSON.stringify(missingKeywords),
        recommendationsJson: JSON.stringify(recommendations),
      },
    });

    return res.json({
      success: true,
      analysis: {
        id: analysis.id,
        targetJobTitle,
        atsScore: finalAtsScore,
        matchPercentage,
        matchedKeywords,
        missingKeywords,
        recommendations,
        hasMetrics,
        hasActionVerbs,
      },
    });
  } catch (error) {
    console.error('Resume ATS analysis error:', error);
    return res.status(500).json({ success: false, error: 'Failed to analyze resume' });
  }
});
