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
                    <div className="bg-[var(--accent-50)] p-5 rounded-xl border border-[var(--accent-100)] transition-colors duration-300">
                        <h4 className="font-bold text-[var(--accent-900)] text-lg mb-2 flex items-center">
                            <Info size={20} className="mr-2" />
                            Not Like High School
                        </h4>
                        <p className="text-[var(--gray-700)] leading-relaxed">
                            <strong>Holidays at university work differently.</strong> Unlike SHS or JHS where a public holiday meant a guaranteed day off, at UCC, the academic calendar is tight, and learning continues.
                        </p>
                    </div>

                    {/* --- THE GOLDEN RULE --- */}
                    <div className="bg-[var(--primary-50)] p-6 rounded-xl border border-[var(--primary-100)] shadow-sm transition-colors duration-300">
                        <h4 className="font-bold text-[var(--primary-900)] text-lg mb-3 flex items-center">
                            <AlertCircle size={20} className="mr-2" />
                            The "Lecturer's Discretion" Rule
                        </h4>
                        <p className="text-[var(--gray-800)] mb-4">
                            <strong>If your lecturer says you have class, you have class.</strong>
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <span className="bg-[var(--primary-200)] text-[var(--primary-800)] rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                                <span className="text-[var(--gray-700)] text-sm">Classes, quizzes, and even mid-semester exams can be scheduled on public holidays.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-[var(--primary-200)] text-[var(--primary-800)] rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                                <span className="text-[var(--gray-700)] text-sm">Info will come from your <strong>Course Rep</strong> (who gets it from the lecturer).</span>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-[var(--primary-200)] text-[var(--primary-800)] rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                                <span className="text-[var(--gray-700)] text-sm">Attendance rules still apply. "It was a holiday" is not a valid excuse for missing a quiz.</span>
                            </li>
                        </ul>
                    </div>

                    {/* --- SCENARIO --- */}
                    <div className="bg-[var(--gray-100-soft)] p-5 rounded-xl border border-[var(--gray-200)] transition-colors duration-300">
                        <h4 className="font-bold text-[var(--gray-900)] text-lg mb-2 flex items-center">
                            <Calendar size={20} className="mr-2" />
                            The "Monday" Scenario
                        </h4>
                        <p className="text-sm text-[var(--gray-700)] mb-2">
                            <em>Example:</em> Next Monday is a national holiday.
                        </p>
                        <div className="p-3 bg-[var(--white)] rounded-lg border border-[var(--gray-200)] text-sm text-[var(--gray-800)] italic transition-colors duration-300">
                            "Course Rep: Good evening class. Dr. X says we will still have our quiz on Monday at 7am at the Large Lecture Theatre. Please be punctual."
                        </div>
                        <p className="text-xs text-[var(--gray-600)] mt-2 font-medium">
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
