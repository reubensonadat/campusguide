import React from 'react';
import { Brain, Pencil, Target, CheckCircle, Info, ShieldAlert, History, Users, ArrowRight, Laptop, Sparkles } from 'lucide-react';
import { CustomGuide } from '../../../common/CustomIcons';

import { ActionCard, InfoBlock } from '../../GuideStyles';

const StudyTechniques = () => {
  // UCC GUIDE: EFFECTIVE STUDY TECHNIQUES (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Effective Study Techniques",
      summary: "Learn proven methods to improve your studying and information retention.",
      
      steps: [
        { title: "Identify Your Learning Style", description: "Determine if you're a visual, auditory, or kinesthetic learner to choose appropriate techniques." },
        { title: "Set Clear Study Goals", description: "Define specific, measurable objectives for each study session to maintain focus." },
        { title: "Create a Study Schedule", description: "Plan regular study sessions with specific subjects and techniques for each time block." },
        { title: "Use Active Recall Methods", description: "Test yourself regularly instead of just re-reading to strengthen memory pathways." },
        { title: "Implement Spaced Repetition", description: "Review material at increasing intervals to move information to long-term memory." },
        { title: "Optimize Your Study Environment", description: "Create a distraction-free space with proper lighting, temperature, and ergonomics." }
      ],
      keyPoints: [
        "Active learning beats passive reading for better retention.",
        "Regular review improves long-term memory significantly.",
        "Study environment impacts focus and learning effectiveness.",
        "Breaks improve concentration and prevent burnout."
      ],
      tips: [
        "Use the Pomodoro technique (25 min study, 5 min break) for focus.",
        "Teach concepts to others to reinforce your own understanding.",
        "Use mnemonics and visualization for memorization.",
        "Review notes within 24 hours to maximize retention."
      ],
      resources: [
        { title: "Study Skills Workshops", description: "Free workshops at the Academic Support Center.", url: "https://ucc.edu.gh/study-workshops" },
        { title: "ChatGPT for Study Help", description: "AI-powered study assistant for explaining concepts.", url: "https://chat.openai.com" },
        { title: "Perplexity AI", description: "AI research assistant for finding sources.", url: "https://www.perplexity.ai" }
      ],
      checklist: [
        { text: "Identify your learning style", checked: false },
        { text: "Create study schedule", checked: false },
        { text: "Set up optimal study space", checked: false },
        { text: "Try active recall techniques", checked: false }
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Work Smarter, Not Harder"
            icon={Brain}
            content="Effective studying is about the quality of engagement, not just the quantity of hours. At UCC, we've identified proven techniques that help students retain complex information and perform better in high-stakes exams."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Active Learning" 
               desc="Engage with material rather than passive reading."
               details={[
                 "<strong>Self-Testing</strong>: Immediate recall practice.",
                 "<strong>Teaching Others</strong>: Explaining concepts aloud.",
                 "<strong>Concept Mapping</strong>: Visual connection diagrams.",
                 "<strong>Active Recall</strong>: Testing before you feel 'ready'."
               ]}
            />
            <ActionCard 
               title="Study Spaces" 
               desc="Optimize your physical surroundings."
               details={[
                 "<strong>SJL Reading Rooms</strong>: Strictly quiet zones.",
                 "<strong>Collaborative Pods</strong>: For group study sessions.",
                 "<strong>Distraction-Free</strong>: No phones or social media.",
                 "<strong>Lighting</strong>: Ensure proper white light for focus."
               ]}
            />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-indigo-900 text-xl mb-4 flex items-center gap-2">
                   <Target size={24} /> Proven Methods
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                   Switching between these methods prevents cognitive fatigue and builds multiple memory pathways.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <MethodTile step="01" title="Pomodoro" text="25-minute focused sessions with 5-minute restorative breaks." />
                   <MethodTile step="02" title="Cornell Notes" text="Divide pages into notes, cues, and summary for active review." />
                   <MethodTile step="03" title="Spaced Repetition" text="Review material at 1 day, 3 days, and 1 week intervals." />
                </div>
             </div>
          </div>

          <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
             <div className="relative">
                <h4 className="text-2xl font-black mb-4 flex items-center gap-2"><Sparkles size={24} className="text-indigo-400" /> AI Study Assistants</h4>
                <p className="text-indigo-100 text-xs font-medium leading-relaxed mb-6 max-w-md">
                   Modern study involves using AI as a tutor, not a shortcut. Use these tools to clarify complex lectures.
                </p>
                <div className="flex flex-wrap gap-4">
                   <a href="https://chat.openai.com" target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest transition-all">ChatGPT</a>
                   <a href="https://www.perplexity.ai" target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest transition-all">Perplexity</a>
                </div>
             </div>
          </div>
        </div>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Study Process' },
    { id: 'resources', label: 'AI Tools' },
  ];

  return { sections, tabs };
};

const MethodTile = ({ step, title, text }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
     <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">Method {step}</div>
     <h5 className="font-black text-slate-900 mb-2">{title}</h5>
     <p className="text-xs text-slate-500 leading-relaxed font-medium">{text}</p>
  </div>
);

export default StudyTechniques;