import React, { useState } from 'react';
import { 
  Building2, Calendar, Clock, CheckCircle2, AlertCircle, 
  HelpCircle, ArrowRight, Star, FileText, Users, Award
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';

export const PlacementEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'drives' | 'aptitude' | 'notices'>('drives');
  const [aptitudeScore, setAptitudeScore] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleScoreQuiz = () => {
    if (selectedAnswer === 1) {
      setAptitudeScore(100);
    } else {
      setAptitudeScore(0);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-slate-900 border border-blue-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Engine 08 • Campus Operations
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs">
                TPO Synchronized
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Institutional & Off-Campus Placement Engine
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Synchronize your campus drive applications, practice real company aptitude screening tests, and receive verified placement offer letters directly into your Career Passport.
            </p>
          </div>

          <IDontUnderstandDrawer 
            conceptTitle="Placement Engine Operations"
            defaultAnalogy="Think of the Placement Engine as your personal career booking manager. Just like an athlete's agent manages contract offers and tryout schedules, this engine tracks your drive slots, aptitude tests, and offer letters in one unified dashboard!"
          />
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Placement Engine Walkthrough: Navigating Campus Drives Successfully"
            scriptText="Welcome to the Placement Engine. Here you can track scheduled institutional drives, practice company aptitude questions under timed conditions, and monitor TPO broadcasts for sudden drive openings."
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'drives', label: '📅 Active Placement Drives' },
          { id: 'aptitude', label: '📝 Company Aptitude Simulator' },
          { id: 'notices', label: '📢 Official TPO Notice Board' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: DRIVES */}
      {activeTab === 'drives' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { company: 'Microsoft India', role: 'Software Engineer', ctc: '42.0 LPA', date: 'October 12, 2026', stage: 'Round 1: Online Coding Test' },
            { company: 'Atlassian', role: 'Graduate Developer', ctc: '38.0 LPA', date: 'October 18, 2026', stage: 'Resume Shortlisting' },
            { company: 'Goldman Sachs', role: 'Analyst - Engineering', ctc: '28.0 LPA', date: 'October 25, 2026', stage: 'Aptitude & Math Round' },
            { company: 'Flipkart', role: 'SDE-1', ctc: '26.0 LPA', date: 'November 02, 2026', stage: 'Applications Open' }
          ].map((item, idx) => (
            <div key={idx} className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">{item.company}</h3>
                  <p className="text-xs text-slate-400">{item.role}</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold rounded-lg border border-emerald-500/30">
                  {item.ctc}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>Drive Date: {item.date}</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg text-xs text-indigo-300 border border-slate-800 flex items-center justify-between">
                <span>{item.stage}</span>
                <span className="text-emerald-400 font-semibold cursor-pointer hover:underline">View Guidelines →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: APTITUDE SIMULATOR */}
      {activeTab === 'aptitude' && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Diagnostic Aptitude Question</h3>
            <span className="text-xs text-slate-400 font-mono">Time Limit: 60s</span>
          </div>

          <p className="text-sm text-slate-200">
            A train 240 meters long crosses a platform of equal length in 24 seconds. What is the speed of the train in km/hr?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { id: 0, text: '60 km/hr' },
              { id: 1, text: '72 km/hr (Correct)' },
              { id: 2, text: '80 km/hr' },
              { id: 3, text: '90 km/hr' }
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setSelectedAnswer(opt.id)}
                className={`p-3 rounded-xl text-xs text-left transition-all ${
                  selectedAnswer === opt.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {opt.text}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleScoreQuiz}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Submit Answer
            </button>
            {aptitudeScore !== null && (
              <span className="text-xs font-bold text-emerald-400">
                {aptitudeScore === 100 ? '✅ Correct! Speed = 480m / 24s = 20 m/s = 72 km/hr' : '❌ Incorrect. Speed = (240 + 240)/24 = 20 m/s * (18/5) = 72 km/hr'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: TPO NOTICES */}
      {activeTab === 'notices' && (
        <div className="space-y-3">
          {[
            { date: 'Today, 10:30 AM', title: 'Mandatory: Upload Updated Resume before Sept 20', priority: 'HIGH' },
            { date: 'Yesterday', title: 'Dress Code Guidelines for Offline Technical Interviews', priority: 'NORMAL' },
            { date: 'Sept 01', title: 'TCS Digital Shortlist Released (142 Students Selected)', priority: 'NORMAL' }
          ].map((not, idx) => (
            <div key={idx} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-mono">{not.date}</span>
                <h4 className="text-sm font-semibold text-white mt-0.5">{not.title}</h4>
              </div>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                not.priority === 'HIGH' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-slate-800 text-slate-400'
              }`}>
                {not.priority}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
