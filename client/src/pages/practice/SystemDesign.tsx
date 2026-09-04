import React, { useState } from 'react';
import {
  Cpu,
  Plus,
  Trash2,
  Play,
  CheckCircle2,
  AlertTriangle,
  Server,
  Database,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';
import { apiRequest } from '../../api';

interface SystemNode {
  id: string;
  type: string;
  label: string;
}

export const SystemDesign: React.FC = () => {
  const [nodes, setNodes] = useState<SystemNode[]>([
    { id: '1', type: 'client', label: 'Web & Mobile Clients' },
    { id: '2', type: 'loadbalancer', label: 'Nginx Load Balancer' },
    { id: '3', type: 'service', label: 'Order Microservice' },
    { id: '4', type: 'cache', label: 'Redis Cache' },
    { id: '5', type: 'database', label: 'PostgreSQL Primary DB' },
  ]);

  const [scenario, setScenario] = useState('High Concurrency E-Commerce');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const componentLibrary = [
    { type: 'gateway', label: 'API Gateway', icon: Server },
    { type: 'loadbalancer', label: 'Load Balancer (ALB)', icon: Layers },
    { type: 'service', label: 'Backend Microservice', icon: Cpu },
    { type: 'cache', label: 'Redis Cache Cluster', icon: Zap },
    { type: 'database', label: 'PostgreSQL Primary DB', icon: Database },
    { type: 'queue', label: 'Kafka Message Queue', icon: Layers },
  ];

  const handleAddComponent = (comp: any) => {
    const newNode: SystemNode = {
      id: Date.now().toString(),
      type: comp.type,
      label: comp.label,
    };
    setNodes([...nodes, newNode]);
  };

  const handleRemoveNode = (id: string) => {
    setNodes(nodes.filter((n) => n.id !== id));
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const res = await apiRequest('/systemdesign/analyze', {
      method: 'POST',
      body: JSON.stringify({
        title: `${scenario} Architecture`,
        scenario,
        nodes,
        edges: [],
      }),
    });
    setIsAnalyzing(false);
    if (res.success && res.data) {
      setAnalysisResult(res.data);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Distributed Architecture Canvas</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Design & Scalability Lab</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Design high-availability distributed systems. The automated Architecture Engine evaluates Single Points of Failure (SPOF), caching topologies, and latency metrics.
          </p>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md shadow-brand-600/25 flex items-center space-x-1.5 transition disabled:opacity-50 whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isAnalyzing ? 'Evaluating Scalability...' : 'Analyze Architecture'}</span>
        </button>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Component Palette (3 cols) */}
        <div className="lg:col-span-3 glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Component Palette</h3>
          <p className="text-[11px] text-slate-400">Click to add infrastructure nodes to your active canvas:</p>

          <div className="space-y-2">
            {componentLibrary.map((comp, idx) => {
              const Icon = comp.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddComponent(comp)}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-xs text-slate-200 transition"
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-3.5 h-3.5 text-brand-400" />
                    <span>{comp.label}</span>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-slate-400" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Canvas (9 cols) */}
        <div className="lg:col-span-9 space-y-4">
          {/* Canvas Area */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 min-h-[380px] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs text-slate-400">
                Active Architecture Nodes: <strong className="text-white">{nodes.length}</strong>
              </span>
              <span className="text-xs text-brand-400 font-mono">Scenario: {scenario}</span>
            </div>

            {/* Visual Nodes Grid */}
            <div className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-between shadow-md"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-brand-600/20 flex items-center justify-center text-brand-400">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">{node.label}</div>
                      <div className="text-[10px] text-slate-400 capitalize">{node.type} node</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveNode(node.id)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center text-[11px] text-slate-500 pt-3 border-t border-slate-800">
              Connections flow automatically through Gateway → Load Balancer → Backend Services → Caches → Databases.
            </div>
          </div>

          {/* Analysis Report */}
          {analysisResult && (
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-white">Scalability & Architecture Report</h4>
                  <p className="text-xs text-slate-400">Evaluated against cloud production benchmarks</p>
                </div>
                <div className="text-xl font-bold text-brand-400">
                  {analysisResult.score} / 100
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                  <div className="text-slate-400">Latency Estimate</div>
                  <div className="text-white font-bold mt-0.5">{analysisResult.metrics?.estimatedLatency}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                  <div className="text-slate-400">Availability Level</div>
                  <div className="text-emerald-400 font-bold mt-0.5">{analysisResult.metrics?.availabilityLevel}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                  <div className="text-slate-400">Rating</div>
                  <div className="text-purple-400 font-bold mt-0.5">{analysisResult.metrics?.scalabilityRating}</div>
                </div>
              </div>

              {analysisResult.bottlenecks?.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-300 space-y-1">
                  <strong className="flex items-center gap-1.5 font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Architectural Bottlenecks Detected:</span>
                  </strong>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-200">
                    {analysisResult.bottlenecks.map((b: string, i: number) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};