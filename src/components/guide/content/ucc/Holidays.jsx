import React from 'react';
import { Calendar, AlertCircle, Info, ShieldAlert, CheckCircle, GraduationCap } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const Holidays = () => {
    // UCC GUIDE: UNIVERSITY HOLIDAYS (RESTORED GOLD EDITION 2025)

    const sections = [
        {
            title: "University Holidays Explained",
            summary: "Understanding how public holidays affect your academic schedule at UCC.",
            content: (
                <div className="space-y-12">
                    <InfoBlock 
                        title="Not Like High School"
                        icon={Calendar}
                        content="<strong>Holidays at university work differently.</strong> Unlike SHS or JHS where a public holiday meant a guaranteed day off, at UCC, the academic calendar is tight, and learning often continues through national holidays."
                    />

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative">
                            <h4 className="font-black text-primary-900 text-xl mb-4 flex items-center gap-2">
                                <ShieldAlert size={24} /> The "Lecturer's Discretion" Rule
                            </h4>
                            <p className="text-slate-600 font-medium leading-relaxed mb-8">
                                <strong>If your lecturer says you have class, you have class.</strong> Attendance rules still apply, and 'it was a holiday' is not a valid excuse for missing a mandatory session.
                            </p>
                            <div className="grid md:grid-cols-3 gap-6">
                                <ProtocolItem step="1" title="Quizzes & Exams" text="Mid-semester exams and graded quizzes can be scheduled on public holidays." />
                                <ProtocolItem step="2" title="Course Rep Info" text="Always verify holiday status with your Course Rep, who gets direct orders from the lecturer." />
                                <ProtocolItem step="3" title="No Excuses" text="Attendance marks are often given specifically on holidays to encourage participation." />
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100">
                        <h4 className="font-black text-blue-900 text-xl mb-4 flex items-center gap-2">
                           <Info size={20} /> The "Monday" Scenario
                        </h4>
                        <div className="bg-white/60 p-6 rounded-3xl border border-blue-100 font-medium italic text-slate-700">
                           "Good evening class. Dr. X says we will still have our quiz on Monday at 7am at the Large Lecture Theatre. Please be punctual."
                        </div>
                        <p className="mt-4 text-xs text-blue-800 font-black uppercase tracking-widest">Reality Check: You must go.</p>
                    </div>
                </div>
            ),
        }
    ];

    const tabs = [
        { id: 'overview', label: 'Overview' }
    ];

    return { sections, tabs };
};

const ProtocolItem = ({ step, title, text }) => (
    <div className="space-y-2">
        <div className="text-3xl font-black text-primary-100">0{step}</div>
        <h5 className="font-black text-slate-900 leading-tight">{title}</h5>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">{text}</p>
    </div>
);

export default Holidays;
