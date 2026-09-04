import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Check, Compass, Bot, Code2, Globe2, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Onboarding: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [targetRole, setTargetRole] = useState('Full Stack Engineer');
  const [selectedDomains, setSelectedDomains] = useState<string[]>(['software-engineering', 'full-stack-development']);
  const [institutionName, setInstitutionName] = useState('National Institute of Technology');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [graduationYear, setGraduationYear] = useState('2026');
  const [cgpa, setCgpa] = useState('8.5');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const domainOptions = [
    { slug: 'artificial-intelligence', name: 'Artificial Intelligence' },
    { slug: 'machine-learning', name: 'Machine Learning' },
    { slug: 'generative-ai-llm', name: 'Generative AI & LLM' },
    { slug: 'software-engineering', name: 'Software Engineering' },
    { slug: 'full-stack-development', name: 'Full Stack Development' },
    { slug: 'backend-engineering', name: 'Backend Engineering' },
    { slug: 'cloud-computing', name: 'Cloud Computing' },
    { slug: 'devops-sre', name: 'DevOps & SRE' },
    { slug: 'cybersecurity', name: 'Cybersecurity' },
    { slug: 'soc-operations', name: 'SOC & Threat Detection' },
    { slug: 'system-design', name: 'System Design & Architecture' },
    { slug: 'data-engineering', name: 'Data Engineering' },
  ];

  const toggleDomain = (slug: string) => {
    if (selectedDomains.includes(slug)) {
      setSelectedDomains(selectedDomains.filter(s => s !== slug));
    } else {
      setSelectedDomains([...selectedDomains, slug]);
    }
  };

  const handleFinish = async () => {
    setIsSaving(true);
    await updateProfile({
      targetRole,
      institutionName,
      branch,
      graduationYear: parseInt(graduationYear, 10),
      cgpa: parseFloat(cgpa) || null,
      githubUrl,
      linkedinUrl,
      onboardingCompleted: true,
      domainSlugs: selectedDomains,
    });
    setIsSaving(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#07090e] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-2 font-medium">
            <span>Step {step} of 4</span>
            <span>Career Passport Setup</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-accent-purple transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Cards */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl">
          {step === 1 && (
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Welcome, {user?.firstName}! What is your target career?</h2>
              <p className="text-xs text-slate-400 mt-1 mb-5">
                NexGenAI tailors your curriculum, projects, and interview questions to your target industry role.
              </p>

              <div className="space-y-2 mb-6">
                {[
                  'Full Stack Engineer',
                  'AI / ML Engineer',
                  'Cloud & DevOps Engineer',
                  'Cybersecurity / SOC Analyst',
                  'Backend Systems Engineer',
                  'Product Engineer',
                ].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setTargetRole(role)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-medium flex justify-between items-center transition ${
                      targetRole === role
                        ? 'bg-brand-600/20 border-brand-500 text-white'
                        : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-850'
                    }`}
                  >
                    <span>{role}</span>
                    {targetRole === role && <Check className="w-4 h-4 text-brand-400" />}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-2.5 px-4 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold flex items-center justify-center space-x-2 transition"
              >
                <span>Continue to Domains</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent-purple/20 text-purple-400 flex items-center justify-center mb-4">
                <Globe2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Select Your Interest Domains</h2>
              <p className="text-xs text-slate-400 mt-1 mb-5">
                Choose the domains you want to explore and master. You can update these anytime.
              </p>

              <div className="grid grid-cols-2 gap-2.5 mb-6 max-h-64 overflow-y-auto p-1">
                {domainOptions.map((dom) => {
                  const isSelected = selectedDomains.includes(dom.slug);
                  return (
                    <button
                      key={dom.slug}
                      type="button"
                      onClick={() => toggleDomain(dom.slug)}
                      className={`p-3 rounded-xl border text-xs font-medium text-left flex justify-between items-center transition ${
                        isSelected
                          ? 'bg-brand-600/20 border-brand-500 text-brand-200'
                          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-850'
                      }`}
                    >
                      <span className="truncate">{dom.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-brand-400 flex-shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-white"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={selectedDomains.length === 0}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold flex items-center justify-center space-x-2 transition disabled:opacity-50"
                >
                  <span>Continue to Academic Info</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Academic Details</h2>
              <p className="text-xs text-slate-400 mt-1 mb-5">
                Used by the Placement & Eligibility Engine for campus recruitment drives.
              </p>

              <div className="space-y-3.5 mb-6">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Institution / School Name</label>
                  <input
                    type="text"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Branch / Stream</label>
                    <input
                      type="text"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Graduation Batch Year</label>
                    <input
                      type="number"
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Current CGPA / Percentage</label>
                  <input
                    type="text"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    placeholder="e.g. 8.5"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-white"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold flex items-center justify-center space-x-2 transition"
                >
                  <span>Continue to Proof & Social</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent-purple/20 text-purple-400 flex items-center justify-center mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Proof of Work Connections</h2>
              <p className="text-xs text-slate-400 mt-1 mb-5">
                Connect your developer footprints. Recruiters prioritize candidates with tangible evidence.
              </p>

              <div className="space-y-3.5 mb-6">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">GitHub Profile URL</label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2.5 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-white"
                >
                  Back
                </button>
                <button
                  onClick={handleFinish}
                  disabled={isSaving}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-gradient-to-r from-brand-600 to-accent-purple hover:from-brand-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-brand-500/25 transition disabled:opacity-50"
                >
                  <span>{isSaving ? 'Building Career Passport...' : 'Launch NexGenAI Dashboard'}</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};