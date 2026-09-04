import React, { useEffect, useState } from 'react';
import { Building, Users, Calendar, CheckCircle2, XCircle, AlertCircle, BarChart3, Plus } from 'lucide-react';
import { apiRequest } from '../../api';

export const TpoDashboard: React.FC = () => {
  const [drives, setDrives] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'DRIVES' | 'STUDENTS' | 'ANALYTICS'>('DRIVES');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTpoData() {
      setLoading(true);
      const [dRes, sRes, aRes] = await Promise.all([
        apiRequest('/tpo/drives'),
        apiRequest('/tpo/students'),
        apiRequest('/tpo/analytics'),
      ]);

      if (dRes.success) setDrives(dRes.data.drives || []);
      if (sRes.success) setStudents(sRes.data.students || []);
      if (aRes.success) setAnalytics(aRes.data.analytics || null);
      setLoading(false);
    }
    loadTpoData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-2">
          <Building className="w-3.5 h-3.5" />
          <span>College / Training & Placement Operating System</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">TPO Command Center</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Coordinate on-campus recruitment drives, audit automated batch eligibility criteria, track shortlists, and analyze department placement rates.
        </p>

        {/* Stats Row */}
        {analytics && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400">Total Registered</span>
              <div className="text-xl font-bold text-white mt-1">{analytics.totalStudents} Students</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400">Placed Percentage</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">{analytics.placementPercentage}%</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400">Average Compensation</span>
              <div className="text-xl font-bold text-brand-400 mt-1">{analytics.averageCtcLpa} LPA</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400">Active Placement Drives</span>
              <div className="text-xl font-bold text-purple-400 mt-1">{analytics.totalDrives}</div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-2 mt-6">
          <button
            onClick={() => setActiveTab('DRIVES')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'DRIVES' ? 'bg-accent-purple text-white shadow-sm' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            Placement Drives ({drives.length})
          </button>
          <button
            onClick={() => setActiveTab('STUDENTS')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'STUDENTS' ? 'bg-accent-purple text-white shadow-sm' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            Batch Students ({students.length})
          </button>
        </div>
      </div>

      {/* Drives Tab */}
      {activeTab === 'DRIVES' && (
        <div className="space-y-4">
          {drives.map((drive) => (
            <div
              key={drive.id}
              className="glass-panel rounded-xl p-5 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-purple-400">{drive.companyName}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-400">Drive Date: {new Date(drive.driveDate).toLocaleDateString()}</span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">{drive.jobTitle}</h3>
                <p className="text-xs text-slate-400 mt-1">{drive.description}</p>

                {/* Eligibility Criteria Breakdown */}
                <div className="flex flex-wrap gap-2 mt-3 text-[11px] text-slate-300">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    Min CGPA: <strong className="text-white">{drive.minCgpa}</strong>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    Allowed Branches: <strong className="text-white">{drive.allowedBranches?.join(', ')}</strong>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    Max Backlogs: <strong className="text-white">{drive.maxBacklogs}</strong>
                  </span>
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between gap-2 flex-shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                <span className="text-lg font-bold text-emerald-400 font-mono">{drive.ctcLpa} LPA</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  drive.isEligible
                    ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                    : 'bg-rose-950/60 border border-rose-800 text-rose-300'
                }`}>
                  {drive.isEligible ? 'Candidate Eligible' : 'Eligibility Review'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Students Directory Tab */}
      {activeTab === 'STUDENTS' && (
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Verified Students Directory
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase font-semibold text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Branch & Batch</th>
                  <th className="p-3">CGPA</th>
                  <th className="p-3">Readiness Score</th>
                  <th className="p-3">Verified Skills</th>
                  <th className="p-3">Placement Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-900/40 transition">
                    <td className="p-3 font-semibold text-white">{s.name}</td>
                    <td className="p-3 text-slate-400">{s.branch || 'Engineering'} ({s.graduationYear || '2026'})</td>
                    <td className="p-3 font-mono text-emerald-400">{s.cgpa || 'N/A'}</td>
                    <td className="p-3 font-mono text-brand-400">{s.readinessScore}%</td>
                    <td className="p-3 text-slate-300">{s.verifiedSkillsCount} verified</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        s.isPlaced ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {s.isPlaced ? 'PLACED' : 'SEEKING'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};