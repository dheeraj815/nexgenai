import React, { useState } from 'react';
import { 
  Sparkles, Briefcase, Mail, Send, CheckCircle2, 
  DollarSign, MapPin, Calendar, ArrowRight, ExternalLink, 
  FileText, Copy, BookOpen
} from 'lucide-react';
import { IDontUnderstandDrawer } from '../../components/learn/IDontUnderstandDrawer';
import { AudioLessonBar } from '../../components/voice/AudioLessonBar';

export const InternshipEngine: React.FC = () => {
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Frontend Engineer');

  const internships = [
    {
      id: 'int-1',
      company: 'Razorpay Technologies',
      role: 'Backend Engineering Intern',
      stipend: '₹55,000 / month',
      duration: '6 Months (Jan - June 2027)',
      location: 'Bengaluru / Hybrid',
      tags: ['Python', 'PostgreSQL', 'FastAPI'],
      deadline: 'In 5 Days'
    },
    {
      id: 'int-2',
      company: 'CRED',
      role: 'Frontend UI/UX Intern',
      stipend: '₹60,000 / month',
      duration: '3 Months (Summer 2027)',
      location: 'Bengaluru / In-Office',
      tags: ['React', 'TypeScript', 'Tailwind'],
      deadline: 'In 9 Days'
    },
    {
      id: 'int-3',
      company: 'Postman',
      role: 'API Platform Intern',
      stipend: '₹75,000 / month',
      duration: '6 Months',
      location: 'Remote / Bengaluru',
      tags: ['Node.js', 'APIs', 'Docker'],
      deadline: 'In 12 Days'
    },
    {
      id: 'int-4',
      company: 'Harness.io',
      role: 'DevOps & SRE Intern',
      stipend: '₹65,000 / month',
      duration: '6 Months',
      location: 'Bengaluru / Hybrid',
      tags: ['Kubernetes', 'CI/CD', 'Go'],
      deadline: 'In 14 Days'
    }
  ];

  const coldOutreachTemplate = `Subject: Passionate ${selectedRole} Candidate | Project: Distributed Microservices Architecture

Hi [Hiring Manager / Recruiter Name],

I came across the ${selectedRole} internship at [Company Name] and was inspired by how your engineering team solves high-concurrency workflows.

As a Computer Science student at National Institute of Technology, I have built and deployed a production-grade Distributed Microservices platform using Python FastAPI, PostgreSQL, and Redis (Handling 5,000+ simulated requests/sec). My code, test coverage, and live demo are publicly verifiable here:
• GitHub Repository: github.com/candidate/microservices-demo
• Live Production App: microservices-demo.vercel.app

I would love to contribute to your engineering sprints. Would you be open to a quick 10-minute technical chat this week?

Best regards,
Candidate Name | candidate@demo.edu`;

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(coldOutreachTemplate);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950/60 via-teal-950/40 to-slate-900 border border-emerald-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
                Engine 07 • Career Launch
              </span>
              <span className="px-2.5 py-0.5 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full text-xs">
                Verified Stipends
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Internship Discovery & Cold-Outreach Engine
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Find high-stipend engineering internships, generate AI-tailored cold outreach messages directly to hiring managers, and log weekly credit hours for your college degree.
            </p>
          </div>

          <IDontUnderstandDrawer 
            conceptTitle="Internship Strategy & Cold Outreach"
            defaultAnalogy="Applying to internships through standard job boards is like throwing a message in a bottle into the ocean. Cold outreach with a verified, working project demo is like handing your business card directly to the captain!"
          />
        </div>

        {/* Audio Lesson Bar */}
        <div className="mt-6">
          <AudioLessonBar
            title="Internship Engine Audio Walkthrough: How to Land Your First Paid Role"
            scriptText="Welcome to the Internship Engine. Most students apply with generic resumes and get ignored. Here, you discover verified openings with clear stipends, and use our cold outreach generator to pitch your actual projects directly to engineering managers."
          />
        </div>
      </div>

      {/* AI Cold-Outreach Message Generator */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>AI Personalized Cold-Outreach Generator</span>
            </h2>
            <p className="text-xs text-slate-400">Generate high-conversion messages customized to your verified portfolio.</p>
          </div>

          <button
            onClick={handleCopyPitch}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 cursor-pointer"
          >
            {copiedPitch ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedPitch ? 'Copied to Clipboard!' : 'Copy Cold Email Pitch'}</span>
          </button>
        </div>

        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-emerald-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
          {coldOutreachTemplate}
        </pre>
      </div>

      {/* Verified Internship Opportunities */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-400" />
            <span>Verified High-Stipend Internships</span>
          </h2>
          <p className="text-xs text-slate-400">Curated opportunities requiring verified skills from your NexGenAI Career Passport.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {internships.map(item => (
            <div key={item.id} className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4 hover:border-slate-700 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{item.company}</h3>
                  <p className="text-xs text-slate-300 mt-0.5">{item.role}</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold rounded-lg border border-emerald-500/30">
                  {item.stipend}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-md">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
                <span>{item.location}</span>
                <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors cursor-pointer">
                  Apply via Career Passport →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
