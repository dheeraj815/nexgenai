import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Settings as SettingsIcon, User, Volume2, Shield, Save, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useVoice } from '../../context/VoiceContext';

export const Settings: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'voice' ? 'VOICE' : 'PROFILE';

  const { user, updateProfile, refreshUser } = useAuth();
  const {
    voices,
    selectedVoice,
    setSelectedVoice,
    speechRate,
    setSpeechRate,
    speak,
    isTtsSupported,
  } = useVoice();

  const [activeTab, setActiveTab] = useState<'PROFILE' | 'VOICE'>(initialTab);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [academicStage, setAcademicStage] = useState(user?.profile?.academicStage || 'CLASS_11');
  const [targetRole, setTargetRole] = useState(user?.profile?.targetRole || '');
  const [institutionName, setInstitutionName] = useState(user?.profile?.institutionName || '');
  const [branch, setBranch] = useState(user?.profile?.branch || '');
  const [cgpa, setCgpa] = useState(user?.profile?.cgpa?.toString() || '');
  const [githubUrl, setGithubUrl] = useState(user?.profile?.githubUrl || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setAcademicStage(user.profile?.academicStage || 'CLASS_11');
      setTargetRole(user.profile?.targetRole || '');
      setInstitutionName(user.profile?.institutionName || '');
      setBranch(user.profile?.branch || '');
      setCgpa(user.profile?.cgpa?.toString() || '');
      setGithubUrl(user.profile?.githubUrl || '');
    }
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateProfile({
      firstName,
      lastName,
      academicStage,
      targetRole,
      institutionName,
      branch,
      cgpa: parseFloat(cgpa) || null,
      githubUrl,
    });
    await refreshUser();
    setIsSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-2">
          <SettingsIcon className="w-3.5 h-3.5" />
          <span>User & Platform Configuration</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Account & Platform Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your personal details, academic stage continuum, and AI voice preferences.
        </p>

        {/* Tab Buttons */}
        <div className="flex space-x-2 mt-5">
          <button
            type="button"
            onClick={() => setActiveTab('PROFILE')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'PROFILE' ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            Profile & Academic Stage
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('VOICE')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'VOICE' ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            Voice & Audio Preferences
          </button>
        </div>
      </div>

      {/* Tab: Profile */}
      {activeTab === 'PROFILE' && (
        <form onSubmit={handleSaveProfile} className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white">Student & Career Passport Profile</h2>
              <p className="text-xs text-slate-400">Update your academic details and career target.</p>
            </div>

            {savedSuccess && (
              <span className="flex items-center space-x-1 text-xs text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
                <Check className="w-3.5 h-3.5" />
                <span>Changes Persisted</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-slate-300 mb-1">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-300 mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Current Academic Stage</label>
              <select
                value={academicStage}
                onChange={(e) => setAcademicStage(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-medium"
              >
                <option value="CLASS_11">Class 11 (Career Discovery)</option>
                <option value="CLASS_12">Class 12 (Career Direction)</option>
                <option value="YEAR_1">College Year 1 (Foundations)</option>
                <option value="YEAR_2">College Year 2 (Specialization)</option>
                <option value="YEAR_3">College Year 3 (Industry Prep)</option>
                <option value="YEAR_4">College Year 4 (Placement Command)</option>
                <option value="INTERNSHIP">Internship</option>
                <option value="PLACEMENT">Placement</option>
                <option value="CAREER">First Job & Growth</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Target Industry Role</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Institution Name</label>
              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Branch / Degree</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Cumulative CGPA</label>
              <input
                type="text"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">GitHub Profile URL</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="py-2.5 px-6 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md shadow-brand-600/25 flex items-center space-x-2 transition disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving Changes...' : 'Save Settings'}</span>
          </button>
        </form>
      )}

      {/* Tab: Voice Settings */}
      {activeTab === 'VOICE' && (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-base font-bold text-white">AI Voice Engine Configuration</h2>
            <p className="text-xs text-slate-400">
              Customize speech synthesis voice profiles and audio playback speeds.
            </p>
          </div>

          <div className="space-y-4 max-w-lg text-xs">
            <div>
              <label className="block font-medium text-slate-300 mb-1.5">Speech Synthesis Voice</label>
              <select
                value={selectedVoice?.name || ''}
                onChange={(e) => {
                  const v = voices.find((item) => item.name === e.target.value);
                  if (v) setSelectedVoice(v);
                }}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              >
                {voices.map((v, i) => (
                  <option key={i} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="font-medium text-slate-300">Speech Rate Speed</label>
                <span className="font-mono text-brand-400">{speechRate.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={speechRate}
                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0.5x (Slow)</span>
                <span>1.0x (Normal)</span>
                <span>2.0x (Fast)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => speak('Hello! This is your NexGenAI voice synthesizer running with full fidelity.')}
              className="py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center space-x-2 transition"
            >
              <Volume2 className="w-3.5 h-3.5 text-brand-400" />
              <span>Test Audio Playback</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};