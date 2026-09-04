import { Router, Response } from 'express';
import { prisma } from '../../utils/prisma.js';
import { authenticate, requireRole, AuthRequest } from '../../middleware/auth.js';

export const tpoRouter = Router();

tpoRouter.get('/drives', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const drives = await prisma.placementDrive.findMany({
      include: {
        institution: true,
        shortlists: { where: { userId: req.user!.id } },
      },
      orderBy: { driveDate: 'asc' },
    });

    // Check eligibility for current user if student
    let userProfile = null;
    if (req.user?.role === 'STUDENT') {
      userProfile = await prisma.profile.findUnique({ where: { userId: req.user.id } });
    }

    const formatted = drives.map(drive => {
      const allowedBranches = JSON.parse(drive.allowedBranchesJson || '[]');
      const allowedBatches = JSON.parse(drive.allowedBatchesJson || '[]');

      let isEligible = true;
      const reasons: string[] = [];

      if (userProfile) {
        if (userProfile.cgpa !== null && userProfile.cgpa < drive.minCgpa) {
          isEligible = false;
          reasons.push(`CGPA (${userProfile.cgpa}) is below minimum requirement (${drive.minCgpa})`);
        }
        if (userProfile.backlogs > drive.maxBacklogs) {
          isEligible = false;
          reasons.push(`Active backlogs (${userProfile.backlogs}) exceeds maximum permitted (${drive.maxBacklogs})`);
        }
        if (userProfile.branch && allowedBranches.length > 0 && !allowedBranches.includes(userProfile.branch)) {
          isEligible = false;
          reasons.push(`Branch ${userProfile.branch} is not eligible. Permitted: ${allowedBranches.join(', ')}`);
        }
        if (userProfile.graduationYear && allowedBatches.length > 0 && !allowedBatches.includes(String(userProfile.graduationYear))) {
          isEligible = false;
          reasons.push(`Graduation batch ${userProfile.graduationYear} is not eligible. Permitted: ${allowedBatches.join(', ')}`);
        }
      }

      return {
        ...drive,
        allowedBranches,
        allowedBatches,
        isEligible,
        eligibilityReasons: reasons,
        isShortlisted: drive.shortlists && drive.shortlists.length > 0,
      };
    });

    return res.json({ success: true, drives: formatted });
  } catch (error) {
    console.error('List placement drives error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch placement drives' });
  }
});

tpoRouter.post('/drives', authenticate, requireRole('TPO', 'COLLEGE_ADMIN'), async (req: AuthRequest, res: Response) => {
  try {
    const {
      companyName,
      jobTitle,
      driveDate,
      ctcLpa,
      minCgpa,
      allowedBranches,
      allowedBatches,
      maxBacklogs,
      description,
    } = req.body;

    const drive = await prisma.placementDrive.create({
      data: {
        companyName,
        jobTitle,
        driveDate: new Date(driveDate || Date.now() + 7 * 86400000),
        ctcLpa: parseFloat(ctcLpa) || 12.0,
        minCgpa: parseFloat(minCgpa) || 6.5,
        allowedBranchesJson: JSON.stringify(allowedBranches || ['CSE', 'IT', 'ECE']),
        allowedBatchesJson: JSON.stringify(allowedBatches || ['2026', '2027']),
        maxBacklogs: parseInt(maxBacklogs, 10) || 0,
        description: description || 'Campus placement drive for engineering graduates.',
      },
    });

    return res.status(201).json({ success: true, message: 'Placement drive created', drive });
  } catch (error) {
    console.error('Create drive error:', error);
    return res.status(500).json({ success: false, error: 'Failed to create placement drive' });
  }
});

tpoRouter.get('/students', authenticate, requireRole('TPO', 'COLLEGE_ADMIN', 'FACULTY'), async (req: AuthRequest, res: Response) => {
  try {
    const students = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      include: {
        profile: true,
        userSkills: { select: { skillName: true, status: true } },
        projects: { select: { id: true, title: true, status: true } },
        assessmentAttempts: { select: { id: true, passed: true } },
        offers: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const formatted = students.map(s => ({
      id: s.id,
      name: `${s.firstName} ${s.lastName}`,
      email: s.email,
      academicStage: s.profile?.academicStage,
      branch: s.profile?.branch,
      graduationYear: s.profile?.graduationYear,
      cgpa: s.profile?.cgpa,
      backlogs: s.profile?.backlogs,
      readinessScore: s.profile?.readinessScore,
      skillsCount: s.userSkills.length,
      verifiedSkillsCount: s.userSkills.filter(sk => sk.status === 'VERIFIED').length,
      projectsCount: s.projects.length,
      offersCount: s.offers.length,
      isPlaced: s.offers.length > 0,
    }));

    return res.json({ success: true, students: formatted });
  } catch (error) {
    console.error('TPO students directory error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch student directory' });
  }
});

tpoRouter.get('/analytics', authenticate, requireRole('TPO', 'COLLEGE_ADMIN', 'FACULTY'), async (req: AuthRequest, res: Response) => {
  try {
    const totalStudents = await prisma.user.count({ where: { role: 'STUDENT' } });
    const placedStudents = await prisma.offer.groupBy({ by: ['userId'] });
    const totalDrives = await prisma.placementDrive.count();
    const offers = await prisma.offer.findMany({ select: { ctcSalary: true } });

    const avgSalary = offers.length > 0 ? (offers.reduce((acc, o) => acc + o.ctcSalary, 0) / offers.length).toFixed(2) : '0';
    const highestSalary = offers.length > 0 ? Math.max(...offers.map(o => o.ctcSalary)).toFixed(2) : '0';

    return res.json({
      success: true,
      analytics: {
        totalStudents,
        placedCount: placedStudents.length,
        placementPercentage: totalStudents > 0 ? Math.round((placedStudents.length / totalStudents) * 100) : 0,
        totalDrives,
        averageCtcLpa: avgSalary,
        highestCtcLpa: highestSalary,
      },
    });
  } catch (error) {
    console.error('TPO analytics error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch analytics' });
  }
});
