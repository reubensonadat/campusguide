import React from 'react';
import { AlertCircle, FileText, ShieldAlert, GraduationCap, ArrowRight, Info, CheckCircle } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const ExamsAndResits = () => {
    // UCC GUIDE: EXAMS AND RESITS (RESTORED GOLD EDITION 2025)

    const sections = [
        {
            title: "Exams & Resits",
            summary: "Critical information on handling missed exams and understanding the resit policy.",

            keyPoints: [
                "Missing an exam without proof leads to an automatic E (Fail).",
                "Official medical reports are required to appeal for a 'deferred' exam.",
                "Accumulating more than 9 credit hours of failure in one year leads to dismissal.",
                "You must actively register for resits; it is not automatic.",
                "Resits happen at a specific scheduled time of the year - watch the noticeboards.",
                "Failing a core course at Level 100 results in withdrawal; failing a university-wide course allows progression to Level 200 on probation.",
                "To progress from Level 200+, you need: CGPA ≥ 1.0, at least 30 credits earned, and not more than 9 failed credits in the year."
            ],

            content: (
                <div className="space-y-12">
                    <InfoBlock 
                        title="The Golden Rule"
                        icon={ShieldAlert}
                        content="We beg you: <strong>Try your absolute best not to miss an exam.</strong> However, unforeseen circumstances like severe illness may occur. In such cases, the University provides a specific appeal protocol."
                    />

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative">
                            <h4 className="font-black text-primary-900 text-xl mb-4 flex items-center gap-2">
                                <FileText size={24} /> Protocol for Valid Absence
                            </h4>
                            <p className="text-slate-600 font-medium leading-relaxed mb-8">
                                If you miss an exam for a genuine reason (e.g., hospital admission), you must formally notify the university within 48 hours.
                            </p>
                            <div className="grid md:grid-cols-3 gap-6">
                                <StepItem step="1" title="Write Letter" text="Submit an official letter to your Department explaining the absence." />
                                <StepItem step="2" title="Attach Proof" text="Provide strict medical reports or official hospital admission letters." />
                                <StepItem step="3" title="Dept Appeal" text="Your Department will appeal to the Examination Board for a deferred grade." />
                            </div>
                            <div className="mt-8 bg-primary-50 p-6 rounded-3xl border border-primary-100">
                                <p className="text-sm text-primary-900 font-bold leading-relaxed">
                                    <strong>Outcome:</strong> If approved, you will write the paper during the Resit period, but you will be graded as a <strong>regular candidate</strong> (no grade penalty).
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <ActionCard 
                            title="The 9-Credit Hour Rule" 
                            desc="The threshold for University dismissal."
                            details={[
                                "Fail > 9 credits in a year = Dismissal.",
                                "Applies to all levels (100-400).",
                                "E.g. Four 3-credit courses failed.",
                                "<strong>Action</strong>: Register for resits immediately."
                            ]}
                        />
                        <ActionCard 
                            title="Resit Reality" 
                            desc="How resits impact your CGPA."
                            details={[
                                "Failure remains on your transcript history.",
                                "Resit grade averages with the 'E'.",
                                "Registration is <strong>Mandatory</strong> on portal.",
                                "Grades are rarely higher than B."
                            ]}
                        />
                    </div>

                    <div className="bg-orange-50/50 p-8 rounded-[2.5rem] border border-orange-100">
                        <h4 className="font-black text-orange-900 text-xl mb-6 flex items-center gap-2">
                            <GraduationCap size={24} /> Policy 9.1.3 (Level 100)
                        </h4>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-3xl border border-orange-100">
                                <h5 className="font-bold text-red-700 mb-2">Fail Core Course</h5>
                                <p className="text-sm text-slate-600 font-medium"><strong>Result:</strong> Withdrawal from the program with no progression.</p>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-orange-100">
                                <h5 className="font-bold text-primary-700 mb-2">Fail Uni-Wide Course</h5>
                                <p className="text-sm text-slate-600 font-medium"><strong>Result:</strong> Progression to Level 200 on <strong>Probation</strong>.</p>
                            </div>
                        </div>
                        <p className="mt-6 text-xs text-orange-800 font-bold italic">* Withdrawn students can reapply for admission the following year.</p>
                    </div>

                    <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
                        <div className="relative space-y-8">
                            <h4 className="text-2xl font-black tracking-tight">Progression Protocol (Level 200+)</h4>
                            <p className="text-slate-400 font-medium">To progress to the next level, you must satisfy ALL three conditions:</p>
                            <div className="space-y-4">
                                <ConditionItem label="A" title="Minimum CGPA of 1.0" text="Your cumulative grade point average must be at least 1.0." />
                                <ConditionItem label="B" title="30 Credits Minimum" text="Earn at least 30 credit hours during the academic year." />
                                <ConditionItem label="C" title="Max 9 Failed Credits" text="Cannot lose more than 9 credit hours from registered courses." />
                            </div>
                            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-xs text-slate-300">
                                <strong>Consequence:</strong> Failing any of these leads to Probation or External-Candidate Status.
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    const tabs = [
        { id: 'overview', label: 'Overview' }
    ];

    return { sections, tabs };
};

const StepItem = ({ step, title, text }) => (
    <div className="space-y-2">
        <div className="text-3xl font-black text-primary-100">0{step}</div>
        <h5 className="font-black text-slate-900 leading-tight">{title}</h5>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">{text}</p>
    </div>
);

const ConditionItem = ({ label, title, text }) => (
    <div className="flex gap-4 bg-white/5 p-5 rounded-2xl border border-white/10">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-black text-sm">{label}</div>
        <div>
            <h5 className="font-bold text-white text-sm">{title}</h5>
            <p className="text-xs text-slate-400 mt-1">{text}</p>
        </div>
    </div>
);

export default ExamsAndResits;
