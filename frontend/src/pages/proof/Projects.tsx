import React, { useEffect, useState } from 'react';
import { FolderGit2, Plus, ExternalLink, Github, CheckCircle2, Trash2 } from 'lucide-react';
import { apiRequest } from '../../api';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [status, setStatus] = useState('IN_PROGRESS');
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    setLoading(true);
    const res = await apiRequest('/projects');
    if (res.success && res.data) {
      setProjects(res.data.projects || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = technologies.split(',').map((t) => t.trim()).filter(Boolean);

    await apiRequest('/projects', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        technologies: techArray,
        githubUrl,
        liveUrl,
        status,
      }),
    });

    setIsCreating(false);
    setTitle('');
    setDescription('');
    setGithubUrl('');
    setLiveUrl('');
    await loadProjects();
  };

  const handleDelete = async (id: string) => {
    await apiRequest(`/projects/${id}`, { method: 'DELETE' });
    await loadProjects();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Applied Proof of Work</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Projects & GitHub Deliverables</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Build and publish real-world technical projects. Linking public repositories attaches verified evidence to your Career Passport.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md shadow-brand-600/25 flex items-center space-x-1.5 transition whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((proj) => {
          let techs: string[] = [];
          try {
            techs = JSON.parse(proj.technologies || '[]');
          } catch (e) {
            techs = [];
          }

          return (
            <div
              key={proj.id}
              className="glass-panel rounded-xl p-5 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold text-white">{proj.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    proj.status === 'COMPLETED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {proj.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-3 leading-relaxed">{proj.description}</p>

                <div className="flex flex-wrap gap-1 mt-3">
                  {techs.map((tech: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-slate-300 hover:text-white"
                    >
                      <Github className="w-3.5 h-3.5 text-brand-400" />
                      <span>Code</span>
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-slate-300 hover:text-white"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Demo</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(proj.id)}
                  className="p-1 rounded text-slate-500 hover:text-rose-400 transition"
                  title="Delete project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateProject} className="w-full max-w-md glass-panel rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Create New Project Artifact</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-300 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed In-Memory Cache"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Explain the architectural challenge and results..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">GitHub Repository URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/username/repo"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                >
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="PLANNED">Planned</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="flex-1 py-2 rounded-lg border border-slate-800 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md shadow-brand-600/30 transition"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};