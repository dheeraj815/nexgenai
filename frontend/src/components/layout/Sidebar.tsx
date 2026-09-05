import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Milestone,
  Route,
  Globe2,
  BookOpen,
  FolderGit2,
  CheckCircle,
  Code2,
  Bot,
  GitFork,
  Network,
  Calendar,
  Gauge,
  Award,
  Github,
  FileCheck2,
  FileText,
  Mic,
  MessageSquare,
  Cpu,
  Shield,
  ShieldAlert,
  Briefcase,
  Layers,
  GraduationCap,
  Building,
  Users,
  Settings,
  Volume2,
  Sparkles,
  Trophy,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { viewRole } = useAuth();

  const studentSections = [
    {
      title: 'HOME',
      items: [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Career Passport', path: '/passport', icon: Compass },
        { label: 'My Journey', path: '/journey', icon: Milestone },
      ],
    },
    {
      title: 'ACADEMIC STAGES',
      items: [
        { label: '01 Class 11 Discover', path: '/stage/class-11', icon: Sparkles },
        { label: '02 Class 12 Direction', path: '/stage/class-12', icon: Route },
        { label: '03 Year 1 Foundation', path: '/stage/year-1', icon: Code2 },
        { label: '04 Year 2 Specialization', path: '/stage/year-2', icon: Layers },
        { label: '05 Year 3 Industry Prep', path: '/stage/year-3', icon: Cpu },
        { label: '06 Year 4 Placements', path: '/stage/year-4', icon: Trophy },
      ],
    },
    {
      title: 'CAREER ENGINES',
      items: [
        { label: '07 Internships', path: '/internships', icon: GraduationCap },
        { label: '08 Placement Hub', path: '/placement', icon: Building },
        { label: '09 Company Intel', path: '/companies', icon: Briefcase },
        { label: '10 Interview Prep', path: '/interview-prep', icon: Mic },
        { label: '11 Offer & Onboarding', path: '/offer-launch', icon: Award },
        { label: '12 Career Growth', path: '/career-growth', icon: TrendingUp },
      ],
    },
    {
      title: 'LEARN',
      items: [
        { label: 'Learning Paths', path: '/learning-paths', icon: Route },
        { label: '30 Domains', path: '/domains', icon: Globe2 },
        { label: 'Courses', path: '/courses', icon: BookOpen },
        { label: 'Projects', path: '/projects', icon: FolderGit2 },
        { label: 'Assessments', path: '/assessments', icon: CheckCircle },
        { label: 'Coding Lab', path: '/coding-lab', icon: Code2 },
      ],
    },
    {
      title: 'CAREER AI',
      items: [
        { label: 'AI Career Mentor', path: '/mentor', icon: Bot },
        { label: 'Path Explorer', path: '/path-explorer', icon: GitFork },
        { label: 'Skill Tree', path: '/skill-tree', icon: Network },
        { label: 'Career Roadmap', path: '/roadmap', icon: Calendar },
        { label: 'Career Readiness', path: '/readiness', icon: Gauge },
      ],
    },
    {
      title: 'PROOF',
      items: [
        { label: 'Skills & Proof', path: '/skills', icon: Award },
        { label: 'GitHub Analyzer', path: '/github', icon: Github },
        { label: 'Portfolio', path: '/portfolio', icon: FileCheck2 },
        { label: 'Hall of Proof', path: '/hall-of-proof', icon: Shield },
      ],
    },
    {
      title: 'PREPARE',
      items: [
        { label: 'Resume & ATS', path: '/resume', icon: FileText },
        { label: 'AI Interview', path: '/interview', icon: Mic },
        { label: 'Behavioral Coach', path: '/behavioral', icon: MessageSquare },
        { label: 'System Design', path: '/system-design', icon: Cpu },
        { label: 'Cybersecurity', path: '/cybersecurity', icon: Shield },
        { label: 'SOC Simulator', path: '/soc', icon: ShieldAlert },
      ],
    },
    {
      title: 'OPPORTUNITIES',
      items: [
        { label: 'Jobs & Matching', path: '/jobs', icon: Briefcase },
        { label: 'Applications', path: '/applications', icon: Layers },
        { label: 'Internships', path: '/internships', icon: GraduationCap },
        { label: 'Placement Command', path: '/placement', icon: Building },
      ],
    },
    {
      title: 'SETTINGS',
      items: [
        { label: 'Profile & Stage', path: '/settings', icon: Settings },
        { label: 'Voice Settings', path: '/settings?tab=voice', icon: Volume2 },
      ],
    },
  ];

  const tpoSections = [
    {
      title: 'COLLEGE / TPO OS',
      items: [
        { label: 'TPO Command Center', path: '/tpo', icon: Building },
        { label: 'Placement Drives', path: '/tpo/drives', icon: Calendar },
        { label: 'Student Directory', path: '/tpo/students', icon: Users },
        { label: 'Eligibility Engine', path: '/tpo/eligibility', icon: CheckCircle },
        { label: 'Placement Analytics', path: '/tpo/analytics', icon: Gauge },
      ],
    },
    {
      title: 'PLATFORM',
      items: [
        { label: 'Student Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Settings', path: '/settings', icon: Settings },
      ],
    },
  ];

  const recruiterSections = [
    {
      title: 'RECRUITER OS',
      items: [
        { label: 'Recruiter Portal', path: '/recruiter', icon: Briefcase },
        { label: 'Talent Search', path: '/recruiter/search', icon: Users },
        { label: 'Job Openings', path: '/recruiter/jobs', icon: Layers },
        { label: 'Pipeline & Offers', path: '/recruiter/pipeline', icon: Award },
      ],
    },
    {
      title: 'PLATFORM',
      items: [
        { label: 'Student Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Settings', path: '/settings', icon: Settings },
      ],
    },
  ];

  const sections = viewRole === 'TPO' ? tpoSections : (viewRole === 'RECRUITER' ? recruiterSections : studentSections);

  return (
    <aside className="fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-60 border-r border-slate-800/80 bg-dark-950/95 backdrop-blur-md overflow-y-auto p-3.5 select-none">
      <div className="space-y-6">
        {sections.map((sec, idx) => (
          <div key={idx}>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
              {sec.title}
            </div>
            <div className="space-y-0.5">
              {sec.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={itemIdx}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg text-xs transition duration-150 ${
                        isActive
                          ? 'bg-brand-600 text-white font-medium shadow-sm shadow-brand-600/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                      }`
                    }
                  >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};