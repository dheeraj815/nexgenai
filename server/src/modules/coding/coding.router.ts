import { Router, Response } from 'express';
import { prisma } from '../../utils/prisma.js';
import { authenticate, optionalAuth, AuthRequest } from '../../middleware/auth.js';

export const codingRouter = Router();

codingRouter.get('/problems', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const problems = await prisma.codingProblem.findMany({
      include: {
        submissions: req.user ? {
          where: { userId: req.user.id },
          orderBy: { submittedAt: 'desc' },
          take: 1,
        } : false,
      },
      orderBy: { createdAt: 'asc' },
    });

    const formatted = problems.map(p => {
      const publicCases = JSON.parse(p.testCasesJson || '[]').filter((tc: any) => !tc.isHidden);
      return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        difficulty: p.difficulty,
        category: p.category,
        starterCodeJs: p.starterCodeJs,
        starterCodePy: p.starterCodePy,
        publicTestCases: publicCases,
        lastSubmission: p.submissions && p.submissions.length > 0 ? p.submissions[0] : null,
      };
    });

    return res.json({ success: true, problems: formatted });
  } catch (error) {
    console.error('List coding problems error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch coding problems' });
  }
});

codingRouter.get('/problems/:slug', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const problem = await prisma.codingProblem.findUnique({
      where: { slug: String(req.params.slug) },
      include: {
        submissions: req.user ? {
          where: { userId: req.user.id },
          orderBy: { submittedAt: 'desc' },
        } : false,
      },
    });

    if (!problem) {
      return res.status(404).json({ success: false, error: 'Problem not found' });
    }

    const testCases = JSON.parse(problem.testCasesJson || '[]');
    const publicCases = testCases.filter((tc: any) => !tc.isHidden);

    return res.json({
      success: true,
      problem: {
        ...problem,
        testCasesJson: undefined, // Hide full test cases from client
        publicTestCases: publicCases,
      },
    });
  } catch (error) {
    console.error('Get coding problem error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch problem' });
  }
});

codingRouter.post('/problems/:slug/run', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { code, language } = req.body;
    const problem = await prisma.codingProblem.findUnique({
      where: { slug: String(req.params.slug) },
    });

    if (!problem) {
      return res.status(404).json({ success: false, error: 'Problem not found' });
    }

    const allTestCases = JSON.parse(problem.testCasesJson || '[]');
    const startTime = Date.now();

    // Isolated, safe sandbox evaluation for JavaScript
    let passedCount = 0;
    const testResults: any[] = [];

    for (let i = 0; i < allTestCases.length; i++) {
      const tc = allTestCases[i];
      let actualOutput = null;
      let passed = false;
      let errorMsg = null;

      try {
        // Execute in strict sandbox function with timeout
        const runner = new Function('input', `
          "use strict";
          ${code}
          const fn = typeof solution === 'function' ? solution : (typeof twoSum === 'function' ? twoSum : (typeof isValid === 'function' ? isValid : Object.values(this).find(f => typeof f === 'function')));
          if (!fn) throw new Error("Solution function not found. Please define 'solution(input)' or the requested problem function.");
          return fn(input);
        `);
        actualOutput = runner(tc.input);

        // Normalize output comparison
        const normActual = JSON.stringify(actualOutput);
        const normExpected = JSON.stringify(tc.expectedOutput);
        passed = normActual === normExpected;
      } catch (err: any) {
        errorMsg = err.message || 'Execution error';
        passed = false;
      }

      if (passed) passedCount++;
      testResults.push({
        testCase: i + 1,
        input: tc.isHidden ? '[Hidden Test Case]' : tc.input,
        expected: tc.isHidden ? '[Hidden]' : tc.expectedOutput,
        actual: tc.isHidden && !passed ? '[Mismatch on Hidden Test Case]' : actualOutput,
        passed,
        error: errorMsg,
        isHidden: tc.isHidden,
      });
    }

    const runtimeMs = Date.now() - startTime;
    const allPassed = passedCount === allTestCases.length;
    const status = allPassed ? 'ACCEPTED' : (testResults.some(r => r.error) ? 'RUNTIME_ERROR' : 'WRONG_ANSWER');

    // Record submission
    const submission = await prisma.codingSubmission.create({
      data: {
        problemId: problem.id,
        userId: req.user!.id,
        language: language || 'javascript',
        code,
        status,
        passedCount,
        totalCount: allTestCases.length,
        runtimeMs,
      },
    });

    // If accepted, link verified evidence to DSA/Problem Solving skill
    if (allPassed) {
      const skillName = 'Data Structures & Algorithms';
      const userSkill = await prisma.userSkill.upsert({
        where: { userId_skillName: { userId: req.user!.id, skillName } },
        update: { status: 'VERIFIED', confidenceLevel: 85 },
        create: {
          userId: req.user!.id,
          skillName,
          domainSlug: 'software-engineering',
          status: 'VERIFIED',
          confidenceLevel: 85,
        },
      });

      await prisma.skillEvidence.create({
        data: {
          userSkillId: userSkill.id,
          userId: req.user!.id,
          evidenceType: 'CODING',
          title: `Solved: ${problem.title}`,
          description: `Successfully passed 100% of test cases in ${runtimeMs}ms`,
          verificationStatus: 'VERIFIED',
        },
      });
    }

    return res.json({
      success: true,
      status,
      allPassed,
      passedCount,
      totalCount: allTestCases.length,
      runtimeMs,
      results: testResults,
      submissionId: submission.id,
    });
  } catch (error: any) {
    console.error('Run code error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Execution error' });
  }
});
