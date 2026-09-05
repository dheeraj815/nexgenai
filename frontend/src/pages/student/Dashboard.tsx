import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Code2,
  Cpu,
  Shield,
  Briefcase,
  Play,
  Volume2,
  CheckCircle2,
  TrendingUp,
  Compass,
  Building,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useVoice } from '../../context/VoiceContext';
import { apiRequest } from '../../api';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { speak } = useVoice();

  const [passport, setPassport] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [drives, setDrives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [pRes, cRes, jRes, dRes] = await Promise.all([
        apiRequest('/passport'),
        apiRequest(`/courses?stage=${user?.profile?.academicStage || 'CLASS_11'}`),
        apiRequest('/jobs'),
        apiRequest('/tpo/drives'),
      ]);

      if (pRes.success) setPassport(pRes.data.passport);
      if (cRes.success) setCourses(cRes.data.courses || []);
      if (jRes.success) setJobs(jRes.data.jobs || []);
      if (dRes.success) setDrives(dRes.data.drives || []);
      setLoading(false);
    }
    loadData();
  }, [user]);

  const stage = user?.profile?.academicStage || 'CLASS_11';
  const readiness = passport?.readiness?.overallScore || user?.profile?.readinessScore || 0;

  const stageTitles: Record<string, { title: string; subtitle: string; action: string; link: string }> = {
    CLASS_11: {
      title: 'Class 11: Career Discovery & Logic',
      subtitle: 'Explore 30 technology domains, find your aptitude, and write your first logic code.',
      action: 'Start Career Discovery Course',
      link: '/courses/comp-thinking-11',
    },
    CLASS_12: {
      title: 'Class 12: Career Direction & Pathways',
      subtitle: 'Compare engineering branches, set up Git & GitHub, and establish early proof of work.',
      action: 'Explore Career Pathways',
      link: '/path-explorer',
    },
    YEAR_1: {
      title: 'College Year 1: CS Core Foundations',
      subtitle: 'Master Data Structures, Algorithms, Web fundamentals, and Relational Databases.',
      action: 'Open Coding Lab Challenge',
      link: '/coding-lab',
    },
    YEAR_2: {
      title: 'College Year 2: Domain Specialization',
      subtitle: 'Build production full-stack systems, publish GitHub evidence, and pass technical assessments.',
      action: 'Create Verified Project',
      link: '/projects',
    },
    YEAR_3: {
      title: 'College Year 3: Industry Preparation',
      subtitle: 'Prepare for high-paying internships, design distributed systems, and optimize resume ATS.',
      action: 'Run Resume ATS Studio',
      link: '/resume',
    },
    YEAR_4: {
      title: 'College Year 4: Placement Command Center',
      subtitle: 'Ace campus recruitment drives, verify eligibility rules, and convert placement offers.',
      action: 'View Campus Placement Drives',
      link: '/placement',
    },
    INTERNSHIP: {
      title: 'Internship Stage: Workplace Execution',
      subtitle: 'Log corporate deliverables, acquire verified skills, and work towards a PPO.',
      action: 'Log Internship Evidence',
      link: '/internships',
    },
    PLACEMENT: {
      title: 'Placement Command: Offer Realization',
      subtitle: 'Track corporate shortlists, complete final interviews, and accept verified offers.',
      action: 'Review Placement Status',
      link: '/placement',
    },
    CAREER: {
      title: 'First Job & Career Growth',
      subtitle: 'Track promotions, bridge senior engineering skill gaps, and maintain your lifelong passport.',
      action: 'View Career Skill Tree',
      link: '/skill-tree',
    },
  };

  const currentStageInfo = stageTitles[stage] || stageTitles['CLASS_11'];

  const primaryCourse = courses[0];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl glass-panel p-6 sm:p-8 border border-slate-800">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentStageInfo.title}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome, {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Candidate'}
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {currentStageInfo.subtitle}
            </p>
          </div>

          {/* Quick Readiness Score Gauge */}
          <div className="flex items-center space-x-4 bg-dark-900/80 border border-slate-800 rounded-xl p-4 flex-shrink-0">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-brand-500"
                  strokeDasharray={`${readiness}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-sm font-bold text-white">{readiness}%</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Career Readiness</div>
              <div className="text-xs text-brand-400 font-semibold mt-0.5">
                {readiness >= 75 ? 'Placement Ready' : (readiness >= 40 ? 'Industry In Progress' : 'Foundational Stage')}
              </div>
              <Link to="/readiness" className="text-[11px] text-slate-500 hover:text-slate-300 underline mt-1 block">
                View Score Breakdown →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Next Best Action Card */}
      <div className="glass-panel rounded-xl p-4 sm:p-5 border border-brand-500/20 bg-gradient-to-r from-brand-950/30 to-dark-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400 flex-shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider font-bold text-brand-400">Next Best Action</div>
            <div className="text-sm font-semibold text-white">
              {passport?.readiness?.nextActions?.[0] || 'Take a skill assessment to verify your competencies.'}
            </div>
          </div>
        </div>
        <Link
          to={currentStageInfo.link}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md shadow-brand-600/25 transition whitespace-nowrap"
        >
          <span>{currentStageInfo.action}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Learning & Courses */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Course */}
          <div className="glass-panel rounded-xl p-5 border border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-400" />
                <span>Continue Your Journey</span>
              </h2>
              <Link to="/courses" className="text-xs text-brand-400 hover:underline">
                View All Courses
              </Link>
            </div>

            {primaryCourse ? (
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-semibold text-brand-400 uppercase bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                      {primaryCourse.domain?.name}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5">{primaryCourse.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl line-clamp-2">{primaryCourse.summary}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    Progress: <span className="text-white font-semibold">{primaryCourse.progressPercent || 0}%</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => speak(primaryCourse.summary)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center space-x-1.5 transition"
                      title="Audio narration"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-brand-400" />
                      <span className="hidden sm:inline">Listen</span>
                    </button>
                    <Link
                      to={`/courses/${primaryCourse.slug}`}
                      className="px-3.5 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Continue Lesson</span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-400">
                No active courses enrolled. <Link to="/courses" className="text-brand-400 underline">Browse courses</Link>
              </div>
            )}
          </div>

          {/* Practice & Verification Quick Launch */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              to="/coding-lab"
              className="glass-panel glass-panel-hover p-4 rounded-xl flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-white">Coding Lab</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Solve Problems</span>
            </Link>

            <Link
              to="/system-design"
              className="glass-panel glass-panel-hover p-4 rounded-xl flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-purple/20 text-purple-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-white">System Design</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Build Canvas</span>
            </Link>

            <Link
              to="/soc"
              className="glass-panel glass-panel-hover p-4 rounded-xl flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-white">SOC Simulator</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Incident Triage</span>
            </Link>

            <Link
              to="/resume"
              className="glass-panel glass-panel-hover p-4 rounded-xl flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-white">ATS Studio</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Score Resume</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Passport Snapshot & Jobs */}
        <div className="space-y-6">
          {/* Career Passport Snapshot */}
          <div className="glass-panel rounded-xl p-5 border border-slate-800">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-brand-400" />
                <span>Career Passport Proof</span>
              </h2>
              <Link to="/passport" className="text-xs text-brand-400 hover:underline">
                Full Passport
              </Link>
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs">
                <span className="text-slate-400">Target Role</span>
                <span className="text-white font-semibold">{user?.profile?.targetRole || 'Not Set'}</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs">
                <span className="text-slate-400">Verified Skills</span>
                <span className="text-emerald-400 font-semibold">{passport?.skills?.filter((s: any) => s.status === 'VERIFIED' || s.verified === true).length || 0}</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs">
                <span className="text-slate-400">Completed Projects</span>
                <span className="text-white font-semibold">{passport?.projects?.filter((p: any) => p.status === 'COMPLETED' || p.completed === true || p.id).length || 0}</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs">
                <span className="text-slate-400">Coding Lab Solved</span>
                <span className="text-white font-semibold">{passport?.codingSubmissions?.filter((c: any) => c.status === 'ACCEPTED' || c.passed === true).length || 0}</span>
              </div>
            </div>
          </div>

          {/* Placement Drives / Live Opportunities */}
          <div className="glass-panel rounded-xl p-5 border border-slate-800">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Building className="w-4 h-4 text-accent-purple" />
                <span>Placement Drives</span>
              </h2>
              <Link to="/placement" className="text-xs text-accent-purple hover:underline">
                View All
              </Link>
            </div>

            {drives.length > 0 ? (
              <div className="space-y-2.5">
                {drives.slice(0, 2).map((drive: any) => (
                  <div key={drive.id} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-white">{drive.companyName}</span>
                      <span className="text-emerald-400 font-mono font-semibold">{drive.ctcLpa} LPA</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{drive.jobTitle}</p>
                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className={drive.isEligible ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}>
                        {drive.isEligible ? '● Eligible' : '○ Criteria Review'}
                      </span>
                      <span className="text-slate-500">Min CGPA: {drive.minCgpa}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 p-2 text-center">No active placement drives scheduled.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};