import React from 'react';
import { ShieldAlert, AlertTriangle, Users, Heart, CheckCircle, Info, History, ArrowRight, Laptop, Brain, Target } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const CommonMistakesFreshers = () => {
  // UCC GUIDE: FRESHER MISTAKES (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Avoiding The 'Fresher Trap'",
      summary: "Real talk on GPA traps, attendance policies, and campus survival.",
      
      commonMistakes: [
        "Assuming Level 100 grades don't affect your final Class (They heavily weigh down your CGPA).",
        "Copying assignments from seniors (Lecturers often change questions slightly).",
        "Buying handouts but never reading them until 'Revision Week'.",
        "Signing attendance for friends (This is forgery; penalty is rustication).",
        "Not checking the Student Portal for 'IC' rectification (Incomplete Grade) after exams.",
        "Joining 5+ clubs and having no time for sleep or studies."
      ],
      tips: [
        "Aim for a GPA of 3.6+ in Level 100. It gives you a safety buffer for harder levels.",
        "Form a study group with serious people, not just your roommates.",
        "Eat at the market or cook. Buying food everyday is unsustainable.",
        "Visit the Counselling Centre if you feel overwhelmed. It's free and confidential.",
        "Save your Academic Advisor's number. You will need them."
      ],
      resources: [
        { title: "UCC Student Handbook", description: "The official rulebook for grades and conduct.", url: "https://ucc.edu.gh/student-handbook" },
        { title: "Counselling Centre", description: "Mental health and academic advice.", url: "https://portal.ucc.edu.gh/onlineReg/src/coun.php" }
      ],
      checklist: [
        { text: "Read the Student Handbook (Regulation 11.0)", checked: false },
        { text: "Met my Academic Advisor", checked: false },
        { text: "Created a personal study timetable", checked: false },
        { text: "Budgeted allowance for the semester", checked: false }
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="The Freedom Test"
            icon={Brain}
            content="First year at UCC is a test of your new-found freedom. The biggest mistake is thinking <strong>'Level 100 doesn't count.'</strong> In reality, your First Class starts from Semester 1. Recovering a bad GPA is mathematically harder than maintaining a good one."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <ActionCard 
               title="The 'CA' Trap" 
               desc="Continuous Assessment (40%)."
               details={[
                 "Quizzes are not 'just 5 marks'.",
                 "CA is 40% of your total grade.",
                 "You can fail before the final exam.",
                 "Assignments are critical safety nets."
               ]}
            />
            <ActionCard 
               title="The 'IC' Grade" 
               desc="Incomplete Grade (Academic death)."
               details={[
                 "Forget to sign attendance? Get an IC.",
                 "Fail to submit one lab? Get an IC.",
                 "IC stays on record if not fixed.",
                 "Prevents graduation until rectified."
               ]}
            />
            <ActionCard 
               title="The '3-Week' Rule" 
               desc="Attendance Regulation 11.0."
               details={[
                 "Miss 3 weeks? Barred from exams.",
                 "Attendance is taken at every lecture.",
                 "Applies even if you are 'sick'.",
                 "Excuses need valid medical proof."
               ]}
            />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-indigo-900 text-xl mb-4 flex items-center gap-2">
                   <Target size={24} /> Reality Check
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="bg-rose-50/50 p-6 rounded-3xl border border-rose-100">
                      <h5 className="font-black text-rose-700 mb-2 flex items-center gap-2"><Heart size={16} /> Relationship Drama</h5>
                      <p className="text-xs text-slate-600 font-medium italic leading-relaxed">
                         "Don't skip lectures because your partner wants something. It's not worth it. Prioritize your First Class today."
                      </p>
                   </div>
                   <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100">
                      <h5 className="font-black text-emerald-700 mb-2 flex items-center gap-2"><Users size={16} /> Senior Helpers</h5>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                         If a senior wants to 'help' you, always meet in public spaces like the <strong>Library</strong> or <strong>Summer Huts</strong>. Stay safe.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'warnings', label: 'Mistakes' },
    { id: 'resources', label: 'Links' },
  ];

  return { sections, tabs };
};

export default CommonMistakesFreshers;