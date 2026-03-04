import React from 'react';
import { Calendar, AlertCircle, Info } from 'lucide-react';

const Holidays = () => {
    // UCC GUIDE: UNIVERSITY HOLIDAYS
    // "Pastel Edition" styling

    const sections = [
        {
            title: "University Holidays Explained",
            summary: "Understanding how public holidays affect your academic schedule at UCC.",
            content: (
                <div className="space-y-6">
                    {/* --- INTRO --- */}
                    <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                        <h4 className="font-bold text-purple-900 text-lg mb-2 flex items-center">
                            <Info size={20} className="mr-2" />
                            Not Like High School
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                            <strong>Holidays at university work differently.</strong> Unlike SHS or JHS where a public holiday meant a guaranteed day off, at UCC, the academic calendar is tight, and learning continues.
                        </p>
                    </div>

                    {/* --- THE GOLDEN RULE --- */}
                    <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 shadow-sm">
                        <h4 className="font-bold text-orange-900 text-lg mb-3 flex items-center">
                            <AlertCircle size={20} className="mr-2" />
                            The "Lecturer's Discretion" Rule
                        </h4>
                        <p className="text-gray-800 mb-4">
                            <strong>If your lecturer says you have class, you have class.</strong>
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <span className="bg-orange-200 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                                <span className="text-gray-700 text-sm">Classes, quizzes, and even mid-semester exams can be scheduled on public holidays.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-orange-200 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                                <span className="text-gray-700 text-sm">Info will come from your <strong>Course Rep</strong> (who gets it from the lecturer).</span>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-orange-200 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                                <span className="text-gray-700 text-sm">Attendance rules still apply. "It was a holiday" is not a valid excuse for missing a quiz.</span>
                            </li>
                        </ul>
                    </div>

                    {/* --- SCENARIO --- */}
                    <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-blue-900 text-lg mb-2 flex items-center">
                            <Calendar size={20} className="mr-2" />
                            The "Monday" Scenario
                        </h4>
                        <p className="text-sm text-gray-700 mb-2">
                            <em>Example:</em> Next Monday is a national holiday.
                        </p>
                        <div className="p-3 bg-white/60 rounded-lg border border-blue-100/50 text-sm text-gray-800 italic">
                            "Course Rep: Good evening class. Dr. X says we will still have our quiz on Monday at 7am at the Large Lecture Theatre. Please be punctual."
                        </div>
                        <p className="text-xs text-blue-800 mt-2 font-medium">
                            Outcome: You must go.
                        </p>
                    </div>
                </div>
            ),
        }
    ];

    // ONLY OVERVIEW TAB as requested
    const tabs = [
        { id: 'overview', label: 'Overview' }
    ];

    return { sections, tabs };
};

export default Holidays;
