import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { VoiceProvider } from './context/VoiceContext';
import { NotificationProvider } from './context/NotificationContext';

import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Onboarding } from './pages/auth/Onboarding';

import { Dashboard } from './pages/student/Dashboard';
import { CareerPassport } from './pages/student/CareerPassport';
import { MyJourney } from './pages/student/MyJourney';

import { Domains } from './pages/learn/Domains';
import { Courses } from './pages/learn/Courses';
import { CoursePlayer } from './pages/learn/CoursePlayer';
import { Assessments } from './pages/learn/Assessments';
import { Projects } from './pages/proof/Projects';
import { CodingLab } from './pages/practice/CodingLab';
import { SystemDesign } from './pages/practice/SystemDesign';
import { SocSimulator } from './pages/practice/SocSimulator';

import { ResumeAts } from './pages/prepare/ResumeAts';
import { AiMentor } from './pages/career-ai/AiMentor';
import { SkillTree } from './pages/career-ai/SkillTree';
import { CareerRoadmap } from './pages/career-ai/CareerRoadmap';
import { SkillsAndProof } from './pages/proof/SkillsAndProof';
import { PortfolioViewer } from './pages/proof/PortfolioViewer';

import { Jobs } from './pages/opportunities/Jobs';
import { Applications } from './pages/opportunities/Applications';
import { TpoDashboard } from './pages/tpo/TpoDashboard';
import { RecruiterPortal } from './pages/recruiter/RecruiterPortal';
import { Settings } from './pages/settings/Settings';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />

      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/passport" element={<CareerPassport />} />
        <Route path="/journey" element={<MyJourney />} />

        {/* Learn */}
        <Route path="/learning-paths" element={<Domains />} />
        <Route path="/domains" element={<Domains />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CoursePlayer />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/assessments" element={<Assessments />} />
        <Route path="/coding-lab" element={<CodingLab />} />

        {/* Career AI */}
        <Route path="/mentor" element={<AiMentor />} />
        <Route path="/path-explorer" element={<Domains />} />
        <Route path="/skill-tree" element={<SkillTree />} />
        <Route path="/roadmap" element={<CareerRoadmap />} />
        <Route path="/readiness" element={<CareerPassport />} />

        {/* Proof */}
        <Route path="/skills" element={<SkillsAndProof />} />
        <Route path="/github" element={<SkillsAndProof />} />
        <Route path="/portfolio" element={<PortfolioViewer />} />
        <Route path="/hall-of-proof" element={<SkillsAndProof />} />

        {/* Prepare */}
        <Route path="/resume" element={<ResumeAts />} />
        <Route path="/interview" element={<AiMentor />} />
        <Route path="/behavioral" element={<AiMentor />} />
        <Route path="/system-design" element={<SystemDesign />} />
        <Route path="/cybersecurity" element={<SocSimulator />} />
        <Route path="/soc" element={<SocSimulator />} />

        {/* Opportunities */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/internships" element={<Applications />} />
        <Route path="/placement" element={<TpoDashboard />} />

        {/* TPO */}
        <Route path="/tpo" element={<TpoDashboard />} />
        <Route path="/tpo/*" element={<TpoDashboard />} />

        {/* Recruiter */}
        <Route path="/recruiter" element={<RecruiterPortal />} />
        <Route path="/recruiter/*" element={<RecruiterPortal />} />

        {/* Settings */}
        <Route path="/settings" element={<Settings />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <VoiceProvider>
        <NotificationProvider>
          <Router>
            <AppRoutes />
          </Router>
        </NotificationProvider>
      </VoiceProvider>
    </AuthProvider>
  );
}