import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe2, Search, ArrowRight, BookOpen, Layers, Bot, Shield, Cpu, Code } from 'lucide-react';
import { apiRequest } from '../../api';

export const Domains: React.FC = () => {
  const [domains, setDomains] = useState<any[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDomains() {
      setLoading(true);
      const res = await apiRequest('/learning/domains');
      if (res.success && res.data) {
        setDomains(res.data.domains || []);
      }
      setLoading(false);
    }
    loadDomains();
  }, []);

  const categories = ['ALL', 'AI & Data', 'Core Engineering', 'Security', 'Web & Applications', 'Infrastructure', 'Product & Design'];

  const filtered = domains.filter((d) => {
    const matchesCat = categoryFilter === 'ALL' || d.category === categoryFilter;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-2">
          <Globe2 className="w-3.5 h-3.5" />
          <span>Multi-Domain Engineering Engine</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">30 Technology & Engineering Domains</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Explore specialized engineering domains, discover career trajectories, analyze compensation benchmarks, and enroll in stage-aligned curricula.
        </p>

        {/* Filter Toolbar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search domains by name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-xs"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  categoryFilter === cat
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-900/70 text-slate-400 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((dom) => (
          <div
            key={dom.id}
            className="glass-panel glass-panel-hover rounded-xl p-5 border border-slate-800/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-semibold text-brand-400 uppercase bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                  {dom.category}
                </span>
                <span className="text-[10px] text-slate-500">{dom._count?.courses || 0} Courses</span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">{dom.name}</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-3">{dom.description}</p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">{dom._count?.skills || 3} Core Skills</span>
              <Link
                to={`/courses?domain=${dom.slug}`}
                className="inline-flex items-center space-x-1 text-brand-400 hover:text-brand-300 font-semibold"
              >
                <span>View Courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};