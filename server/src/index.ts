import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/index.js';
import { errorHandler } from './middleware/errorHandler.js';

// Route imports
import { authRouter } from './modules/auth/auth.router.js';
import { passportRouter } from './modules/passport/passport.router.js';
import { journeyRouter } from './modules/journey/journey.router.js';
import { learningRouter } from './modules/learning/learning.router.js';
import { skillsRouter } from './modules/skills/skills.router.js';
import { projectsRouter } from './modules/projects/projects.router.js';
import { assessmentsRouter } from './modules/assessments/assessments.router.js';
import { codingRouter } from './modules/coding/coding.router.js';
import { systemDesignRouter } from './modules/systemdesign/systemdesign.router.js';
import { socRouter } from './modules/soc/soc.router.js';
import { resumeRouter } from './modules/resume/resume.router.js';
import { aiRouter } from './modules/ai/ai.router.js';
import { voiceRouter } from './modules/voice/voice.router.js';
import { jobsRouter } from './modules/jobs/jobs.router.js';
import { tpoRouter } from './modules/tpo/tpo.router.js';
import { recruiterRouter } from './modules/recruiter/recruiter.router.js';
import { notificationsRouter } from './modules/notifications/notifications.router.js';

const app = express();

// Security and middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(cors({
  origin: [config.corsOrigin, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging in development
if (config.nodeEnv === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// System Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    system: 'NexGenAI Campus to Career AI Operating System',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    services: {
      database: 'connected (SQLite/Prisma)',
      ai: 'active (Gemini / Heuristic Engine)',
      voice: 'active (Web Speech API)',
    }
  });
});

// Mount modular API routes
app.use('/api/auth', authRouter);
app.use('/api/passport', passportRouter);
app.use('/api/journey', journeyRouter);
app.use('/api/learning', learningRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/assessments', assessmentsRouter);
app.use('/api/coding', codingRouter);
app.use('/api/systemdesign', systemDesignRouter);
app.use('/api/soc', socRouter);
app.use('/api/resume', resumeRouter);
app.use('/api/ai', aiRouter);
app.use('/api/voice', voiceRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/tpo', tpoRouter);
app.use('/api/recruiter', recruiterRouter);
app.use('/api/notifications', notificationsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// Centralized error handling
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`============================================================`);
    console.log(`🚀 NexGenAI Campus→Career AI Backend Online`);
    console.log(`📡 Server Port: ${config.port}`);
    console.log(`🌐 Health Check: http://localhost:${config.port}/api/health`);
    console.log(`============================================================`);
  });
}

export default app;
