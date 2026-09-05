import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Lock, Mail, AlertCircle, CheckCircle2, GraduationCap, Building, Briefcase, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DEFAULT_SEED_ACCOUNTS } from '../../api';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const handleSelectPreset = (preset: any) => {
    setEmail(preset.email);
    setPassword(preset.password);
    setActivePreset(preset.id);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center space-x-2.5 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-purple flex items-center justify-center shadow-lg shadow-brand-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">NexGenAI</span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Sign in to your account</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Access your Career Passport, personalized stage curriculum, and corporate placement center.
          </p>
        </div>

        {/* Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6">
          {error && (
            <div className="flex items-center space-x-2.5 p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs leading-relaxed">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            {/* Decoy hidden inputs */}
            <div style={{ position: 'absolute', top: -9999, left: -9999, opacity: 0, height: 0, width: 0, pointerEvents: 'none' }} aria-hidden="true">
              <input type="text" name="decoy_user_login" tabIndex={-1} autoComplete="off" />
              <input type="password" name="decoy_pass_login" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  name="nexgen_login_email"
                  autoComplete="new-password"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setActivePreset(null); }}
                  placeholder="name@nexgenai.edu"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-brand-500 transition placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <span className="text-[11px] text-slate-500 font-mono">Min 6 characters</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  name="nexgen_login_password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setActivePreset(null); }}
                  placeholder="Enter password"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-brand-500 transition placeholder:text-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-2.5 px-4 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold shadow-lg shadow-brand-600/30 flex items-center justify-center space-x-2 transition disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Verifying Credentials...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Verified Persona Selector */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Select Stage Persona to Explore
              </span>
              <span className="text-[10px] text-brand-400 font-medium">1-Click Credentials</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSelectPreset(DEFAULT_SEED_ACCOUNTS[0])}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  activePreset === 'usr_c11'
                    ? 'bg-brand-600/20 border-brand-500 text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <GraduationCap className="w-3.5 h-3.5 text-brand-400" />
                  <span className="text-xs font-bold truncate">Class 11 Student</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">Dheeraj Muley</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset(DEFAULT_SEED_ACCOUNTS[1])}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  activePreset === 'usr_c12'
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-xs font-bold truncate">Class 12 Student</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">Aarav Sharma</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset(DEFAULT_SEED_ACCOUNTS[5])}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  activePreset === 'usr_y4'
                    ? 'bg-amber-600/20 border-amber-500 text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-bold truncate">Year 4 Placement</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">Vikram Malhotra</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset(DEFAULT_SEED_ACCOUNTS[6])}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  activePreset === 'usr_tpo'
                    ? 'bg-purple-600/20 border-purple-500 text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <Building className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs font-bold truncate">College TPO</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">Dr. R. Kulkarni</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset(DEFAULT_SEED_ACCOUNTS[7])}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  activePreset === 'usr_recruiter'
                    ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-bold truncate">Corporate Recruiter</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">Sarah Jenkins (Google)</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset(DEFAULT_SEED_ACCOUNTS[8])}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  activePreset === 'usr_admin'
                    ? 'bg-rose-600/20 border-rose-500 text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-xs font-bold truncate">Platform Admin</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">System Console</div>
              </button>
            </div>
          </div>

          <div className="pt-2 text-center">
            <p className="text-xs text-slate-400">
              Don't have an account yet?{' '}
              <Link to="/register" className="text-brand-400 hover:text-brand-300 font-semibold underline">
                Create new account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
