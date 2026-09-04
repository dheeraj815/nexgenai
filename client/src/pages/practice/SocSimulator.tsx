import React, { useEffect, useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Terminal,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { apiRequest } from '../../api';

export const SocSimulator: React.FC = () => {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [severity, setSeverity] = useState('CRITICAL');
  const [selectedIocs, setSelectedIocs] = useState<string[]>([]);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triageResult, setTriageResult] = useState<any>(null);

  useEffect(() => {
    async function loadIncidents() {
      const res = await apiRequest('/soc/incidents');
      if (res.success && res.data) {
        setIncidents(res.data.incidents || []);
        if (res.data.incidents?.length > 0) {
          loadIncidentDetail(res.data.incidents[0].id);
        }
      }
    }
    loadIncidents();
  }, []);

  const loadIncidentDetail = async (id: string) => {
    const res = await apiRequest(`/soc/incidents/${id}`);
    if (res.success && res.data) {
      setSelectedIncident(res.data.incident);
      setTriageResult(null);
      setSelectedIocs([]);
      setSelectedActions([]);
    }
  };

  const iocOptions = [
    '198.51.100.24',
    'user deploy',
    'port 44324',
    '/bin/bash',
    '192.168.1.1',
    'GET /api/v1/ping',
  ];

  const mitigationActions = [
    'Block IP 198.51.100.24 on Firewall',
    'Terminate active session for user deploy',
    'Rotate compromised credentials for user deploy',
    'Restart Web Server',
    'Format Entire Database',
  ];

  const toggleIoc = (ioc: string) => {
    setSelectedIocs(
      selectedIocs.includes(ioc)
        ? selectedIocs.filter((i) => i !== ioc)
        : [...selectedIocs, ioc]
    );
  };

  const toggleAction = (act: string) => {
    setSelectedActions(
      selectedActions.includes(act)
        ? selectedActions.filter((a) => a !== act)
        : [...selectedActions, act]
    );
  };

  const handleTriageSubmit = async () => {
    if (!selectedIncident) return;
    setIsSubmitting(true);
    const res = await apiRequest(`/soc/incidents/${selectedIncident.id}/investigate`, {
      method: 'POST',
      body: JSON.stringify({
        submittedSeverity: severity,
        submittedIocs: selectedIocs,
        submittedContainment: selectedActions,
        reportNotes: notes,
      }),
    });
    setIsSubmitting(false);
    if (res.success && res.data) {
      setTriageResult(res.data);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Defensive Security Operations Lab</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">SOC Incident Simulator</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Analyze synthetic security logs, identify Indicators of Compromise (IoCs), classify threat severity, and execute mitigation containment workflows.
          </p>
        </div>

        {/* Incident Selector */}
        <select
          value={selectedIncident?.id || ''}
          onChange={(e) => loadIncidentDetail(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
        >
          {incidents.map((inc) => (
            <option key={inc.id} value={inc.id}>
              {inc.title} ({inc.attemptStatus})
            </option>
          ))}
        </select>
      </div>

      {selectedIncident && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Raw Logs & Description (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <h2 className="text-sm font-bold text-white">{selectedIncident.title}</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                  {selectedIncident.difficulty}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedIncident.description}
              </p>

              {/* Raw Syslog Console */}
              <div>
                <div className="flex items-center space-x-2 mb-1.5 text-xs text-slate-400 font-mono">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>/var/log/auth.log & SIEM Telemetry</span>
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed max-h-[300px]">
                  {selectedIncident.rawLogs}
                </pre>
              </div>
            </div>
          </div>

          {/* Right: Triage & Response Controls (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
                Incident Triage & Mitigation Form
              </h3>

              {/* 1. Severity */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  1. Classify Threat Severity Level
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].map((sev) => (
                    <button
                      key={sev}
                      type="button"
                      onClick={() => setSeverity(sev)}
                      className={`p-2 rounded-lg text-xs font-bold transition ${
                        severity === sev
                          ? (sev === 'CRITICAL' ? 'bg-rose-600 text-white' : 'bg-brand-600 text-white')
                          : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Indicators of Compromise */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  2. Select Discovered Indicators of Compromise (IoCs)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {iocOptions.map((ioc) => (
                    <button
                      key={ioc}
                      type="button"
                      onClick={() => toggleIoc(ioc)}
                      className={`p-2 rounded-lg border text-left text-xs font-mono transition flex justify-between items-center ${
                        selectedIocs.includes(ioc)
                          ? 'bg-rose-950/40 border-rose-500/60 text-rose-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850'
                      }`}
                    >
                      <span className="truncate">{ioc}</span>
                      {selectedIocs.includes(ioc) && <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Containment Actions */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  3. Select Containment & Remediation Actions
                </label>
                <div className="space-y-1.5">
                  {mitigationActions.map((act) => (
                    <button
                      key={act}
                      type="button"
                      onClick={() => toggleAction(act)}
                      className={`w-full p-2 rounded-lg border text-left text-xs transition flex justify-between items-center ${
                        selectedActions.includes(act)
                          ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 font-semibold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850'
                      }`}
                    >
                      <span>{act}</span>
                      {selectedActions.includes(act) && <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleTriageSubmit}
                disabled={isSubmitting || selectedIocs.length === 0}
                className="w-full py-2.5 px-4 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md shadow-rose-600/30 flex items-center justify-center space-x-2 transition disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting Triage Report...' : 'Submit Incident Containment Report'}</span>
              </button>
            </div>

            {/* Post Mortem Result */}
            {triageResult && (
              <div className={`glass-panel rounded-2xl p-5 border ${
                triageResult.passed ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-rose-500/40 bg-rose-950/10'
              }`}>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    {triageResult.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    )}
                    <h4 className="text-xs font-bold text-white">
                      Investigation Score: {triageResult.score} / 100
                    </h4>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    triageResult.passed ? 'bg-emerald-900 text-emerald-200' : 'bg-rose-900 text-rose-200'
                  }`}>
                    {triageResult.passed ? 'INCIDENT RESOLVED' : 'CONTAINMENT FAILED'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {triageResult.feedback?.postMortemSummary}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};