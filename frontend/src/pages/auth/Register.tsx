import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight, Lock, Mail, User, GraduationCap, AlertCircle, Building, Briefcase, Target } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialStage = queryParams.get('stage') || 'CLASS_11';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'STUDENT' | 'TPO' | 'RECRUITER'>('STUDENT');
  const [academicStage, setAcademicStage] = useState(initialStage);
  const [targetRole, setTargetRole] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!firstName.trim() || !lastName.trim()) {
      setError('Please provide both first and last name.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    const res = await register({
      email,
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      full_name: `${firstName.trim()} ${lastName.trim()}`,
      role,
      academicStage: role === 'STUDENT' ? academicStage : 'YEAR_4',
      targetRole: targetRole.trim() || 'Software Engineering',
    });
    setIsSubmitting(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center space-x-2.5 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-purple flex items-center justify-center shadow-lg shadow-brand-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">NexGenAI</span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Create your NexGenAI Account</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            One passport. One skill graph. Complete guidance from Class 11 all the way to Tier-1 placement.
          </p>
        </div>

        {/* Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-800">
          {error && (
            <div className="mb-5 flex items-center space-x-2.5 p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            {/* Decoy hidden inputs */}
            <div style={{ position: 'absolute', top: -9999, left: -9999, opacity: 0, height: 0, width: 0, pointerEvents: 'none' }} aria-hidden="true">
              <input type="text" name="decoy_user" tabIndex={-1} autoComplete="off" />
              <input type="password" name="decoy_pass" tabIndex={-1} autoComplete="off" />
            </div>

            {/* Role Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Account Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('STUDENT')}
                  className={`flex flex-col items-center p-2.5 rounded-xl border text-xs font-medium transition ${
                    role === 'STUDENT'
                      ? 'bg-brand-600/20 border-brand-500 text-brand-300'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 mb-1 text-brand-400" />
                  <span>Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('TPO')}
                  className={`flex flex-col items-center p-2.5 rounded-xl border text-xs font-medium transition ${
                    role === 'TPO'
                      ? 'bg-accent-purple/20 border-purple-500 text-purple-300'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <Building className="w-4 h-4 mb-1 text-accent-purple" />
                  <span>College / TPO</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('RECRUITER')}
                  className={`flex flex-col items-center p-2.5 rounded-xl border text-xs font-medium transition ${
                    role === 'RECRUITER'
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <Briefcase className="w-4 h-4 mb-1 text-emerald-400" />
                  <span>Recruiter</span>
                </button>
              </div>
            </div>

            {/* Names */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">First Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    name="nexgen_first_name"
                    autoComplete="off"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder=""
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-brand-500 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Last Name</label>
                <input
                  type="text"
                  required
                  name="nexgen_last_name"
                  autoComplete="off"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder=""
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-brand-500 transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  name="nexgen_account_email"
                  autoComplete="new-password"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=""
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-brand-500 transition"
                />
              </div>
            </div>

            {/* Academic Stage (If student) */}
            {role === 'STUDENT' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Academic Stage (Journey Starting Point)
                </label>
                <select
                  value={academicStage}
                  onChange={(e) => setAcademicStage(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-brand-500 transition"
                >
                  <option value="CLASS_11">Class 11 (Career Discovery & Aptitude)</option>
                  <option value="CLASS_12">Class 12 (Career Direction & Pathways)</option>
                  <option value="YEAR_1">College Year 1 (Core CS Foundations)</option>
                  <option value="YEAR_2">College Year 2 (Domain Specialization)</option>
                  <option value="YEAR_3">College Year 3 (Industry Prep & Internships)</option>
                  <option value="YEAR_4">College Year 4 (Placement Command Center)</option>
                  <option value="INTERNSHIP">Currently in Internship</option>
                  <option value="PLACEMENT">Actively in Campus Placements</option>
                  <option value="CAREER">First Job & Early Career Growth</option>
                </select>
              </div>
            )}

            {/* Target Role */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Target Role / Aspiring Career Track
                </label>
                <span className="text-[10px] text-slate-500">Pick or type custom</span>
              </div>
              <div className="relative">
                <Target className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  list="suggested-target-roles"
                  name="nexgen_target_role"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Software Engineer, AI Engineer, Cloud DevOps..."
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-brand-500 transition"
                />
                <datalist id="suggested-target-roles">
                  <option value="Software Development Engineer (SDE)" />
                  <option value="AI & Machine Learning Engineer" />
                  <option value="Full Stack Web Developer" />
                  <option value="Cloud & DevOps Engineer" />
                  <option value="Cybersecurity / SOC Analyst" />
                  <option value="Data Scientist / Data Engineer" />
                  <option value="Mobile App Developer (iOS / Android)" />
                  <option value="Backend Systems Architect" />
                  <option value="Product Engineer" />
                </datalist>
              </div>

              {/* Quick Select Chips */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[
                  'Software Engineer (SDE)',
                  'AI / ML Engineer',
                  'Full Stack Developer',
                  'Cybersecurity / SOC',
                  'Cloud & DevOps',
                  'Data Scientist'
                ].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setTargetRole(role)}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition ${
                      targetRole === role
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">
                NexGenAI tailors your 16-step curriculum, coding challenges, company roadmaps, and mock interviews directly to this target track.
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  name="nexgen_account_password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=""
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-brand-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-3 py-2.5 px-4 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold shadow-lg shadow-brand-600/30 flex items-center justify-center space-x-2 transition disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Creating Secure Account...' : 'Start Campus→Career Journey'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-400 hover:text-brand-300 font-semibold underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
