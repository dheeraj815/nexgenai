# NexGenAI Deployment Guide

## Production Deployment (Vercel / Node.js Host)
1. **Frontend (Vercel)**:
   - Build Command: `npm run build --workspace=client`
   - Output Directory: `client/dist`
   - Root Directory: `client`
2. **Backend (Node.js / Render / Railway / Docker)**:
   - Build Command: `npm run build --workspace=server`
   - Start Command: `node server/dist/index.js`
   - Environment Variables: `DATABASE_URL`, `JWT_SECRET`, `PORT=5000`, `CORS_ORIGIN`