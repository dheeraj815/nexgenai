import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Bell,
  User,
  LogOut,
  ChevronDown,
  Volume2,
  GraduationCap,
  Building,
  Briefcase,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useVoice } from '../../context/VoiceContext';
import { useNotifications } from '../../context/NotificationContext';
import { useCareerJourney } from '../../context/CareerJourneyContext';

export const Navbar: React.FC = () => {
  const { user, logout, viewRole, setViewRole } = useAuth();
  const { readiness } = useCareerJourney();
  const { isPlaying, stop } = useVoice();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const navigate = useNavigate();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const stageDisplayNames: Record<string, string> = {
    CLASS_11: 'Class 11',
    CLASS_12: 'Class 12',
    YEAR_1: 'College Year 1',
    YEAR_2: 'College Year 2',
    YEAR_3: 'College Year 3',
    YEAR_4: 'College Year 4',
    INTERNSHIP: 'Internship',
    PLACEMENT: 'Placement',
    CAREER: 'First Job & Career',
  };

  const currentStage = user?.profile?.academicStage || 'CLASS_11';

  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b border-slate-800/80 bg-dark-950/80 backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-accent-purple flex items-center justify-center shadow-lg shadow-brand-500/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                NexGenAI
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
                  Campus→Career OS
                </span>
              </span>
            </div>
          </Link>

          {/* Academic Stage Badge */}
          {user && (
            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <GraduationCap className="w-3.5 h-3.5 text-brand-400" />
              <span className="font-medium text-white">{stageDisplayNames[currentStage] || currentStage}</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/40">
                Readiness: {readiness.overallScore}%
              </span>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          {/* Audio active indicator */}
          {isPlaying && (
            <button
              onClick={stop}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-brand-950 border border-brand-700/60 text-brand-300 text-xs animate-pulse"
              title="Click to stop audio narration"
            >
              <Volume2 className="w-3.5 h-3.5 text-brand-400" />
              <span>Playing Audio</span>
            </button>
          )}

          {/* Surface Switcher (Student / TPO / Recruiter) */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-700/70 text-xs font-medium text-slate-200 hover:bg-slate-800 transition"
            >
              {viewRole === 'STUDENT' && <GraduationCap className="w-3.5 h-3.5 text-brand-400" />}
              {viewRole === 'TPO' && <Building className="w-3.5 h-3.5 text-accent-purple" />}
              {viewRole === 'RECRUITER' && <Briefcase className="w-3.5 h-3.5 text-emerald-400" />}
              <span>
                {viewRole === 'STUDENT' ? 'Student OS' : (viewRole === 'TPO' ? 'College TPO OS' : 'Recruiter OS')}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-dark-900 border border-slate-700/80 shadow-2xl p-1.5 z-50">
                <div className="text-[10px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                  Product Surfaces
                </div>
                <button
                  onClick={() => { setViewRole('STUDENT'); setShowRoleMenu(false); navigate('/dashboard'); }}
                  className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs text-left transition ${
                    viewRole === 'STUDENT' ? 'bg-brand-600 text-white font-medium' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Student OS</span>
                </button>
                <button
                  onClick={() => { setViewRole('TPO'); setShowRoleMenu(false); navigate('/tpo'); }}
                  className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs text-left transition ${
                    viewRole === 'TPO' ? 'bg-accent-purple text-white font-medium' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>College / TPO OS</span>
                </button>
                <button
                  onClick={() => { setViewRole('RECRUITER'); setShowRoleMenu(false); navigate('/recruiter'); }}
                  className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs text-left transition ${
                    viewRole === 'RECRUITER' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Recruiter OS</span>
                </button>
              </div>
            )}
          </div>

          {/* Notifications */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-dark-900 border border-slate-700/80 shadow-2xl p-2 z-50">
                  <div className="flex justify-between items-center px-2 py-1.5 border-b border-slate-800 mb-1">
                    <span className="text-xs font-semibold text-white">Notifications</span>
                    <span className="text-[10px] text-brand-400">{unreadCount} unread</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto space-y-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-500 p-3 text-center">No notifications yet</p>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            if (!n.isRead) markAsRead(n.id);
                            if (n.actionUrl) {
                              setShowNotifMenu(false);
                              navigate(n.actionUrl);
                            }
                          }}
                          className={`p-2 rounded-lg text-xs cursor-pointer transition ${
                            n.isRead ? 'bg-transparent text-slate-400 hover:bg-slate-800/40' : 'bg-brand-950/40 text-slate-200 border border-brand-900/40'
                          }`}
                        >
                          <div className="font-medium text-white">{n.title}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{n.message}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User Profile */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 pl-2 pr-1 py-1 rounded-lg hover:bg-slate-800/60 transition"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                  {user.firstName[0]}
                </div>
                <span className="hidden md:inline text-xs font-medium text-slate-200">
                  {user.firstName}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-dark-900 border border-slate-700/80 shadow-2xl p-2 z-50">
                  <div className="px-2 py-2 border-b border-slate-800 mb-1">
                    <p className="text-xs font-semibold text-white">{user.firstName} {user.lastName}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 transition"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Profile & Settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                      navigate('/login');
                    }}
                    className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs text-rose-400 hover:bg-rose-950/30 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-xs font-medium text-white shadow-md shadow-brand-600/20 transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};