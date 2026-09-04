import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { apiRequest } from '../../api';
import { VoiceControls } from '../../components/voice/VoiceControls';

export const CoursePlayer: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<any>(null);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);

  const loadCourseData = async () => {
    if (!slug) return;
    const res = await apiRequest(`/learning/courses/${slug}`);
    if (res.success && res.data) {
      const c = res.data.course;
      setCourse(c);

      // Default active lesson to first uncompleted or first overall
      let firstLesson = null;
      for (const m of c.modules || []) {
        for (const l of m.lessons || []) {
          if (!firstLesson) firstLesson = l;
          const isDone = l.progress && l.progress.length > 0 && l.progress[0].isCompleted;
          if (!isDone) {
            setActiveLesson(l);
            return;
          }
        }
      }
      setActiveLesson(firstLesson);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadCourseData().finally(() => setLoading(false));
  }, [slug]);

  const handleCompleteLesson = async () => {
    if (!activeLesson) return;
    setIsCompleting(true);
    await apiRequest(`/learning/lessons/${activeLesson.id}/complete`, { method: 'POST' });
    setIsCompleting(false);
    await loadCourseData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center p-12 text-slate-400">
        Course not found. <Link to="/courses" className="text-brand-400 underline">Return to courses</Link>
      </div>
    );
  }

  const isCurrentCompleted = activeLesson?.progress && activeLesson.progress.length > 0 && activeLesson.progress[0].isCompleted;

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Audio Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <Link to="/courses" className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Courses</span>
          </Link>
          <h1 className="text-xl font-bold text-white">{course.title}</h1>
        </div>

        {activeLesson && (
          <VoiceControls textToRead={activeLesson.contentText} />
        )}
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Module Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-panel rounded-xl p-4 border border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Curriculum Modules
            </h3>

            <div className="space-y-4">
              {course.modules?.map((m: any, mIdx: number) => (
                <div key={m.id} className="space-y-1.5">
                  <div className="text-xs font-semibold text-white px-2">
                    {mIdx + 1}. {m.title}
                  </div>

                  <div className="space-y-1 pl-2">
                    {m.lessons?.map((l: any) => {
                      const isSelected = activeLesson?.id === l.id;
                      const isDone = l.progress && l.progress.length > 0 && l.progress[0].isCompleted;

                      return (
                        <button
                          key={l.id}
                          onClick={() => setActiveLesson(l)}
                          className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition ${
                            isSelected
                              ? 'bg-brand-600 text-white font-medium shadow-sm'
                              : 'text-slate-300 hover:bg-slate-850'
                          }`}
                        >
                          <span className="truncate pr-2">{l.title}</span>
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lesson Content Viewer */}
        <div className="lg:col-span-3">
          {activeLesson ? (
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
                <div>
                  <span className="text-[10px] font-semibold text-brand-400 uppercase tracking-wider">
                    Lesson {activeLesson.orderIndex}
                  </span>
                  <h2 className="text-2xl font-bold text-white tracking-tight mt-0.5">
                    {activeLesson.title}
                  </h2>
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeLesson.estimatedMinutes || 15} mins read</span>
                </div>
              </div>

              {/* Rich Lesson Body */}
              <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
                {activeLesson.contentText.split('\n\n').map((paragraph: string, pIdx: number) => {
                  if (paragraph.startsWith('# ')) {
                    return <h2 key={pIdx} className="text-xl font-bold text-white mt-4 mb-2">{paragraph.replace('# ', '')}</h2>;
                  }
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={pIdx} className="text-base font-semibold text-brand-300 mt-3 mb-1">{paragraph.replace('### ', '')}</h3>;
                  }
                  if (paragraph.startsWith('```')) {
                    const code = paragraph.replace(/```[a-z]*\n?/g, '');
                    return (
                      <pre key={pIdx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                        <code>{code}</code>
                      </pre>
                    );
                  }
                  return <p key={pIdx} className="text-slate-300 leading-relaxed">{paragraph}</p>;
                })}
              </div>

              {/* Lesson Footer Action */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                <div>
                  {isCurrentCompleted ? (
                    <span className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Lesson Completed & Credited to Passport</span>
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">Mark complete to earn passport milestones</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleCompleteLesson}
                  disabled={isCompleting || isCurrentCompleted}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition ${
                    isCurrentCompleted
                      ? 'bg-slate-800 text-slate-400 cursor-default'
                      : 'bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/25'
                  }`}
                >
                  <span>{isCompleting ? 'Saving...' : (isCurrentCompleted ? 'Completed' : 'Mark as Complete')}</span>
                  {!isCurrentCompleted && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-8 text-center text-slate-400 rounded-xl">
              Select a lesson from the curriculum sidebar to begin reading.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};