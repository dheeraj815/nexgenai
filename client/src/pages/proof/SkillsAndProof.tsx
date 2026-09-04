import React, { useEffect, useState } from 'react';
import { Award, Plus, CheckCircle2, FileCheck2, ExternalLink, Sparkles } from 'lucide-react';
import { apiRequest } from '../../api';

export const SkillsAndProof: React.FC = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [newSkillName, setNewSkillName] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedSkillForEvidence, setSelectedSkillForEvidence] = useState<any>(null);
  const [evidenceTitle, setEvidenceTitle] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [evidenceDesc, setEvidenceDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadSkills = async () => {
    setLoading(true);
    const res = await apiRequest('/skills');
    if (res.success && res.data) {
      setSkills(res.data.skills || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleClaimSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    await apiRequest('/skills/claim', {
      method: 'POST',
      body: JSON.stringify({ skillName: newSkillName.trim() }),
    });
    setNewSkillName('');
    await loadSkills();
  };

  const handleSubmitEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSkillForEvidence) return;
    setIsSubmitting(true);
    await apiRequest(`/skills/${selectedSkillForEvidence.id}/evidence`, {
      method: 'POST',
      body: JSON.stringify({
        title: evidenceTitle,
        url: evidenceUrl,
        description: evidenceDesc,
        evidenceType: 'PROJECT',
      }),
    });
    setIsSubmitting(false);
    setSelectedSkillForEvidence(null);
    setEvidenceTitle('');
    setEvidenceUrl('');
    setEvidenceDesc('');
    await loadSkills();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>Proof of Work Layer</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Skills & Proof of Work Ledger</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Claim competencies and attach tangible deliverables (GitHub repositories, live deployments, certificates). Verification upgrades your Career Readiness score.
        </p>

        {/* Claim Form */}
        <form onSubmit={handleClaimSkill} className="mt-5 flex gap-2 max-w-md">
          <input
            type="text"
            placeholder="Add new skill (e.g. Docker, TypeScript, PyTorch)..."
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-sm transition whitespace-nowrap"
          >
            Claim Skill
          </button>
        </form>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="glass-panel rounded-xl p-5 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-bold text-white">{skill.skillName}</h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  skill.status === 'VERIFIED'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  {skill.status}
                </span>
              </div>

              {/* Evidences list */}
              <div className="space-y-1.5 mt-3">
                {skill.evidences?.length > 0 ? (
                  skill.evidences.map((ev: any) => (
                    <div key={ev.id} className="p-2 rounded bg-slate-900/80 text-[11px] text-slate-300 flex items-center justify-between">
                      <span className="truncate">{ev.title}</span>
                      {ev.url && (
                        <a href={ev.url} target="_blank" rel="noopener noreferrer" className="text-brand-400 ml-1">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] text-slate-500 italic">No evidence attached yet</p>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedSkillForEvidence(skill)}
                className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
              >
                + Submit Evidence Artifact
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Evidence Modal */}
      {selectedSkillForEvidence && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSubmitEvidence} className="w-full max-w-md glass-panel rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">
              Attach Evidence for {selectedSkillForEvidence.skillName}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-300 mb-1">Deliverable / Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Task Queue Repo"
                  value={evidenceTitle}
                  onChange={(e) => setEvidenceTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-300 mb-1">URL (GitHub / Live Demo)</label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={evidenceUrl}
                  onChange={(e) => setEvidenceUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-300 mb-1">Evidence Description</label>
                <textarea
                  placeholder="Explain how this deliverable proves competency..."
                  value={evidenceDesc}
                  onChange={(e) => setEvidenceDesc(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedSkillForEvidence(null)}
                className="flex-1 py-2 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md shadow-brand-600/30 transition"
              >
                <span>{isSubmitting ? 'Saving...' : 'Submit Evidence'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};