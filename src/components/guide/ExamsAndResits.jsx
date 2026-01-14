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
                                    The 9-Credit Hour Rule (Dismissal)
                                </h4>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    If you fail a total of <strong>more than 9 credit hours</strong> in an academic year (e.g., getting 'E' in four 3-credit courses across Sem 1 & 2), the university <strong>will withdraw (sack) you</strong> regardless of your level (100-400).
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

                    {/* --- PROGRESSION/WITHDRAWAL AFTER 2ND RESIT --- */}
                    <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                        <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center">
                            Progression/Withdrawal After Second Re-sit Examination
                            <span className="ml-3 text-xs font-bold bg-orange-200 text-orange-800 px-2 py-1 rounded uppercase">Policy 9.1.3</span>
                        </h3>

                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded-lg border border-orange-100 shadow-sm">
                                <h4 className="font-bold text-orange-900 mb-3">Core Courses vs University-Wide Courses</h4>
                                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                                    The outcome after your 2nd re-sit exam depends on the type of course you failed:
                                </p>
                                
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-red-50 p-4 rounded border border-red-100">
                                        <h5 className="font-bold text-red-800 mb-2 flex items-center">
                                            <span className="w-2 h-2 rounded-full bg-red-600 mr-2"></span>
                                            Failing a Core Course
                                        </h5>
                                        <p className="text-sm text-gray-700">
                                            <strong>Result:</strong> <span className="text-red-700 font-bold">WITHDRAWAL from the program</span> with no progression to the next level.
                                        </p>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded border border-blue-100">
                                        <h5 className="font-bold text-blue-800 mb-2 flex items-center">
                                            <span className="w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
                                            Failing a University-Wide Course
                                        </h5>
                                        <p className="text-sm text-gray-700">
                                            <strong>Result:</strong> <span className="text-blue-700 font-bold">PROGRESSION to Level 200 ON PROBATION</span> with chances to retake the course.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-lg border border-orange-100 shadow-sm">
                                <h4 className="font-bold text-orange-900 mb-2 flex items-center">
                                    <span className="text-lg mr-2">ℹ️</span>
                                    Level 100 Withdrawal Policy
                                </h4>
                                <p className="text-sm text-gray-700">
                                    If you withdraw at Level 100, you <strong>can reapply for admission the following year</strong>. You may be re-admitted and start fresh, depending on university policies.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- PROGRESSION FROM LEVEL 200 UPWARDS --- */}
                    <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                        <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center">
                            Progression from Level 200 Upwards
                            <span className="ml-3 text-xs font-bold bg-purple-200 text-purple-800 px-2 py-1 rounded uppercase">Policy 9.1.3</span>
                        </h3>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                            To progress from Level 200 → 300 or Level 300 → 400, a student <strong>must meet ALL three conditions</strong>:
                        </p>

                        <div className="space-y-3">
                            <div className="flex gap-4 bg-white p-4 rounded-lg border border-purple-100">
                                <div className="flex-shrink-0">
                                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-600 text-white font-bold text-sm">(A)</span>
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-800">Minimum CGPA of 1.0</h5>
                                    <p className="text-sm text-gray-600">Your cumulative grade point average must be at least 1.0.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 bg-white p-4 rounded-lg border border-purple-100">
                                <div className="flex-shrink-0">
                                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-600 text-white font-bold text-sm">(B)</span>
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-800">Earn at Least 30 Credits for the Current Academic Year</h5>
                                    <p className="text-sm text-gray-600">You must complete at least 30 credit hours during the academic year to show adequate progress.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 bg-white p-4 rounded-lg border border-purple-100">
                                <div className="flex-shrink-0">
                                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-600 text-white font-bold text-sm">(C)</span>
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-800">Not Lose More Than 9 Credits Among Registered Courses</h5>
                                    <p className="text-sm text-gray-600">By the end of the academic year, you cannot have failed (or dropped) more than 9 credit hours from your registered courses.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-900">
                                <strong>Consequence:</strong> Failing any of these conditions leads to <strong>Probation</strong> or <strong>External-Candidate Status</strong>, depending on the severity of the failure.
                            </p>
                        </div>
                    </div>

                </div>
            ),

            keyPoints: [
                "Missing an exam without proof leads to an automatic E (Fail).",
                "Official medical reports are required to appeal for a 'deferred' exam.",
                "Accumulating more than 9 credit hours of failure in one year leads to dismissal.",
                "You must actively register for resits; it is not automatic.",
                "Resits happen at a specific scheduled time of the year - watch the noticeboards.",
                "Failing a core course at Level 100 results in withdrawal; failing a university-wide course allows progression to Level 200 on probation.",
                "To progress from Level 200+, you need: CGPA ≥ 1.0, at least 30 credits earned, and not more than 9 failed credits in the year.",
                "CGPA (Cumulative Grade Point Average) is calculated from ALL semesters, not just the average of semester GPAs."
            ]
        }
    ];

    const tabs = [
        { id: 'overview', label: 'Overview' }
    ];

    return { sections, tabs };
};

export default ExamsAndResits;
