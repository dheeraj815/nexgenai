import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../../utils/prisma.js';
import { config } from '../../config/index.js';
import { authenticate, AuthRequest } from '../../middleware/auth.js';

export const authRouter = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.enum(['STUDENT', 'COLLEGE_ADMIN', 'TPO', 'FACULTY', 'RECRUITER', 'SUPER_ADMIN']).default('STUDENT'),
  academicStage: z.enum(['CLASS_11', 'CLASS_12', 'YEAR_1', 'YEAR_2', 'YEAR_3', 'YEAR_4', 'INTERNSHIP', 'PLACEMENT', 'CAREER']).default('CLASS_11'),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

authRouter.post('/register', async (req, res: Response) => {
  try {
    const validated = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email.toLowerCase() },
    });

    if (existingUser) {
      return res.status(400).json({ success: false, error: 'An account with this email address already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(validated.password, salt);

    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: validated.email.toLowerCase(),
          passwordHash,
          firstName: validated.firstName,
          lastName: validated.lastName,
          role: validated.role,
          phone: validated.phone,
        },
      });

      await tx.profile.create({
        data: {
          userId: newUser.id,
          academicStage: validated.academicStage,
          readinessScore: 5, // initial baseline
          onboardingCompleted: false,
        },
      });

      await tx.portfolioProfile.create({
        data: {
          userId: newUser.id,
          isPublic: true,
          theme: 'dark',
        },
      });

      await tx.notification.create({
        data: {
          userId: newUser.id,
          title: 'Welcome to NexGenAI!',
          message: 'Your personal Career Passport has been initialized. Complete your onboarding to unlock personalized roadmaps.',
          category: 'GENERAL',
          actionUrl: '/onboarding',
        },
      });

      await tx.auditLog.create({
        data: {
          userId: newUser.id,
          action: 'USER_REGISTERED',
          entity: 'User',
          entityId: newUser.id,
          detailsJson: JSON.stringify({ email: newUser.email, role: newUser.role, stage: validated.academicStage }),
        },
      });

      return newUser;
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        profile: true,
        portfolioProfile: true,
        recruiterProfile: { include: { organization: true } },
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: fullUser,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, error: error.errors[0]?.message || 'Invalid input data' });
    }
    console.error('Registration error:', error);
    return res.status(500).json({ success: false, error: 'Registration failed due to server error' });
  }
});

authRouter.post('/login', async (req, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        profile: true,
        portfolioProfile: true,
        recruiterProfile: { include: { organization: true } },
      },
    });

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, error: 'Your account has been deactivated. Please contact administration.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'USER_LOGGED_IN',
        entity: 'User',
        entityId: user.id,
      },
    });

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatarUrl: user.avatarUrl,
        phone: user.phone,
        createdAt: user.createdAt,
        profile: user.profile,
        portfolioProfile: user.portfolioProfile,
        recruiterProfile: user.recruiterProfile,
      },
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, error: error.errors[0]?.message || 'Invalid input' });
    }
    console.error('Login error:', error);
    return res.status(500).json({ success: false, error: 'Login failed due to an internal error' });
  }
});

authRouter.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: {
        profile: true,
        portfolioProfile: true,
        userDomains: { include: { domain: true } },
        userSkills: { include: { evidences: true } },
        projects: true,
        recruiterProfile: { include: { organization: true } },
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatarUrl: user.avatarUrl,
        phone: user.phone,
        createdAt: user.createdAt,
        profile: user.profile,
        portfolioProfile: user.portfolioProfile,
        recruiterProfile: user.recruiterProfile,
        userDomains: user.userDomains,
        skillsCount: user.userSkills.length,
        projectsCount: user.projects.length,
      },
    });
  } catch (error) {
    console.error('Get me error:', error);
    return res.status(500).json({ success: false, error: 'Failed to retrieve user profile' });
  }
});

authRouter.put('/profile', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      academicStage,
      institutionName,
      degree,
      branch,
      graduationYear,
      cgpa,
      backlogs,
      location,
      bio,
      githubUrl,
      githubUsername,
      linkedinUrl,
      portfolioUrl,
      targetRole,
      targetSalaryMin,
      targetSalaryMax,
      onboardingCompleted,
      domainSlugs,
    } = req.body;

    await prisma.$transaction(async (tx) => {
      if (firstName || lastName) {
        await tx.user.update({
          where: { id: req.user!.id },
          data: {
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
          },
        });
      }

      await tx.profile.upsert({
        where: { userId: req.user!.id },
        update: {
          ...(academicStage && { academicStage }),
          ...(institutionName !== undefined && { institutionName }),
          ...(degree !== undefined && { degree }),
          ...(branch !== undefined && { branch }),
          ...(graduationYear !== undefined && { graduationYear: graduationYear ? parseInt(graduationYear, 10) : null }),
          ...(cgpa !== undefined && { cgpa: cgpa ? parseFloat(cgpa) : null }),
          ...(backlogs !== undefined && { backlogs: parseInt(backlogs, 10) }),
          ...(location !== undefined && { location }),
          ...(bio !== undefined && { bio }),
          ...(githubUrl !== undefined && { githubUrl }),
          ...(githubUsername !== undefined && { githubUsername }),
          ...(linkedinUrl !== undefined && { linkedinUrl }),
          ...(portfolioUrl !== undefined && { portfolioUrl }),
          ...(targetRole !== undefined && { targetRole }),
          ...(targetSalaryMin !== undefined && { targetSalaryMin: parseFloat(targetSalaryMin) }),
          ...(targetSalaryMax !== undefined && { targetSalaryMax: parseFloat(targetSalaryMax) }),
          ...(onboardingCompleted !== undefined && { onboardingCompleted }),
        },
        create: {
          userId: req.user!.id,
          academicStage: academicStage || 'CLASS_11',
          institutionName,
          degree,
          branch,
          graduationYear: graduationYear ? parseInt(graduationYear, 10) : null,
          cgpa: cgpa ? parseFloat(cgpa) : null,
          backlogs: backlogs ? parseInt(backlogs, 10) : 0,
          location,
          bio,
          githubUrl,
          githubUsername,
          linkedinUrl,
          portfolioUrl,
          targetRole,
          onboardingCompleted: onboardingCompleted ?? true,
        },
      });

      if (Array.isArray(domainSlugs) && domainSlugs.length > 0) {
        const domains = await tx.domain.findMany({
          where: { slug: { in: domainSlugs } },
        });

        for (let i = 0; i < domains.length; i++) {
          await tx.userDomain.upsert({
            where: {
              userId_domainId: {
                userId: req.user!.id,
                domainId: domains[i].id,
              },
            },
            update: { isPrimary: i === 0 },
            create: {
              userId: req.user!.id,
              domainId: domains[i].id,
              isPrimary: i === 0,
            },
          });
        }
      }
    });

    const updated = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: { profile: true, userDomains: { include: { domain: true } } },
    });

    return res.json({ success: true, message: 'Profile updated successfully', user: updated });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
});
