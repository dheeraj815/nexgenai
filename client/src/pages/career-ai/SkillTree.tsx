import React, { useEffect, useState } from 'react';
import { Network, Award, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { apiRequest } from '../../api';

export const SkillTree: React.FC = () => {
  const [treeData, setTreeData] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTree() {
      setLoading(true);
      const res = await apiRequest('/skills/tree');
      if (res.success && res.data) {
        setTreeData(res.data);
      }
      setLoading(false);
    }
    loadTree();
  }, []);

  const nodes = treeData?.nodes || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-2">
            <Network className="w-3.5 h-3.5" />
            <span>Interactive Competency Graph</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Career Skill Tree</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Visual matrix mapping your verified competencies, evidence submissions, and missing prerequisites for target roles in {treeData?.domain || 'Engineering'}.
          </p>
        </div>

        {treeData?.summary && (
          <div className="flex items-center space-x-3 text-xs">
            <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300">
              {treeData.summary.verified} Verified
            </div>
            <div className="p-2 rounded-lg bg-brand-950/60 border border-brand-800 text-brand-300">
              {treeData.summary.claimed} Claimed
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
              {treeData.summary.missing} Missing
            </div>
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Nodes Grid (8 cols) */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              {treeData?.domain || 'Domain'} Skill Graph
            </h3>
            <span className="text-[11px] text-slate-400">Click any competency to inspect proof requirements</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {nodes.map((node: any) => {
              const isSelected = selectedNode?.id === node.id;
              const isVerified = node.status === 'VERIFIED';
              const isMissing = node.status === 'MISSING';

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-xl border text-left transition duration-150 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-brand-600/25 border-brand-500 shadow-md shadow-brand-500/20'
                      : (isVerified
                          ? 'bg-emerald-950/20 border-emerald-800/40 hover:bg-emerald-950/30'
                          : (isMissing
                              ? 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-850'
                              : 'bg-brand-950/20 border-brand-800/40 hover:bg-brand-950/30'))
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-semibold uppercase text-slate-400">
                        {node.category} • {node.level}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1">{node.name}</h4>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isVerified
                        ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/60'
                        : (isMissing
                            ? 'bg-slate-800 text-slate-400 border border-slate-700'
                            : 'bg-brand-900/60 text-brand-300 border border-brand-700/60')
                    }`}>
                      {node.status}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Importance: <strong className="text-slate-200">{node.importance}</strong></span>
                    <span className="text-brand-400">Inspect →</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Node Inspector (4 cols) */}
        <div className="lg:col-span-4">
          {selectedNode ? (
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="pb-3 border-b border-slate-800">
                <span className="text-[10px] uppercase font-bold text-brand-400">Competency Inspection</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{selectedNode.name}</h3>
                <span className="text-xs text-slate-400">{selectedNode.category} • Level: {selectedNode.level}</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400">Verification Status:</span>
                  <div className="text-sm font-bold text-white">{selectedNode.status}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400">Why It Matters:</span>
                  <p className="text-slate-300 leading-relaxed">
                    This skill is critical for clearing technical screening and system architecture rounds in top hiring organizations.
                  </p>
                </div>

                <div className="pt-2">
                  <h4 className="font-semibold text-white mb-2">Recommended Next Step:</h4>
                  {selectedNode.status === 'MISSING' ? (
                    <div className="p-3 rounded-xl bg-brand-950/30 border border-brand-800/40 text-brand-300">
                      Take the domain assessment or build a project using this skill to submit proof of work.
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300">
                      Competency verified and visible on your public Career Passport.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-8 border border-slate-800 text-center text-slate-400 text-xs">
              Select a node from the skill graph to view verification criteria and learning steps.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};