import React from 'react';

const ExamsAndResits = () => {
    // UCC GUIDE: EXAMS AND RESITS
    // Detailed information on exam conduct, missing exams, and the resit policy.

    const sections = [
        {
            title: "Exams & Resits",
            summary: "Critical information on handling missed exams and understanding the resit policy.",

            content: (
                <div className="space-y-8">

                    {/* --- MISSING AN EXAM --- */}
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                            Missed Exams
                            <span className="ml-3 text-xs font-bold bg-slate-200 text-slate-700 px-2 py-1 rounded uppercase">Guidance</span>
                        </h3>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We beg you: <strong>Try your absolute best not to miss an exam.</strong> However, unforeseen circumstances like severe illness may occur.
                        </p>

                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                            <h4 className="font-bold text-slate-900 text-base mb-2">Protocol for Valid Absence</h4>
                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                If you miss an exam for a genuine reason (e.g., hospital admission), you must formally notify the university.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start text-sm">
                                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-bold mr-2 mt-0.5">STEP 1</span>
                                    <span className="text-gray-700">Write an <strong>official letter</strong> to your Department explaining why you missed the paper.</span>
                                </li>
                                <li className="flex items-start text-sm">
                                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-bold mr-2 mt-0.5">STEP 2</span>
                                    <span className="text-gray-700">Attach strict <strong>proof</strong> (e.g., medical reports, admission letters).</span>
                                </li>
                                <li className="flex items-start text-sm">
                                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-bold mr-2 mt-0.5">STEP 3</span>
                                    <span className="text-gray-700">Your Department will appeal to the <strong>Examination Board</strong> on your behalf.</span>
                                </li>
                            </ul>
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded text-sm text-blue-900">
                                <strong>Outcome:</strong> If approved, you will write the paper during the Resit period, but you will be graded as a <strong>regular exam candidate</strong> (your grade is not capped/penalized). This is the only way to "escape" the resit penalty.
                            </div>
                        </div>
                    </div>

                    {/* --- THE REALITY OF RESITS --- */}
                    <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                        <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center">
                            Resit Policy
                            <span className="ml-3 text-xs font-bold bg-red-200 text-red-800 px-2 py-1 rounded uppercase">Important</span>
                        </h3>

                        <p className="text-gray-700 mb-6 leading-relaxed">
                            If you fail a course (Grade E), that failure remains on your transcript. You must register for and pass a <strong>Resit Examination</strong> to rectify your CGPA.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Rule Warning */}
                            <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm md:col-span-2">
                                <h4 className="font-bold text-red-800 flex items-center mb-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                                    The 12-Credit Hour Rule (Dismissal)
                                </h4>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    If you fail a total of <strong>12 credit hours</strong> in an academic year (e.g., getting 'E' in four 3-credit courses across Sem 1 & 2), the university <strong>will withdraw (sack) you</strong> regardless of your level (100-400).
                                    <br />
                                    <span className="text-red-600 font-bold mt-1 block">Always register for resits immediately to avoid this.</span>
                                </p>
                            </div>

                            {/* Registration Process */}
                            <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                                <h4 className="font-bold text-gray-800 mb-2">Registration is Mandatory</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    When resit registration opens (usually at a specific time of year):
                                </p>
                                <ul className="list-disc list-inside mt-2 text-sm text-gray-600 space-y-1">
                                    <li>You <strong>must</strong> register online.</li>
                                    <li>If you appear at the exam hall without registering, submitting a paper is impossible.</li>
                                    <li>Effectively, you will "fail" again by absence.</li>
                                </ul>
                            </div>

                            {/* Grading Reality */}
                            <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                                <h4 className="font-bold text-gray-800 mb-2">Grading Reality</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    It is extremely difficult to obtain an 'A' in a resit paper.
                                </p>
                                <ul className="list-disc list-inside mt-2 text-sm text-gray-600 space-y-1">
                                    <li><strong>Likely Grades:</strong> C+, B (if lucky).</li>
                                    <li><strong>Unlikely Grades:</strong> B+, A.</li>
                                    <li>The resit grade will "salvage" your CGPA by averaging with the previous fail, lifting your score.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-red-100/50 rounded-lg text-sm text-red-900 italic text-center">
                            "The 'E' will still be visible in your portal history, but the Resit grade comes to save your current CGPA."
                        </div>
                    </div>

                </div>
            ),

            keyPoints: [
                "Missing an exam without proof leads to an automatic E (Fail).",
                "Official medical reports are required to appeal for a 'deferred' exam.",
                "Accumulating 12 credit hours of failure in one year leads to dismissal.",
                "You must actively register for resits; it is not automatic.",
                "Resits happen at a specific scheduled time of the year - watch the noticeboards."
            ]
        }
    ];

    const tabs = [
        { id: 'overview', label: 'Overview' }
    ];

    return { sections, tabs };
};

export default ExamsAndResits;
