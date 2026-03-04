import React from 'react';

const ExamsAssessmentRules = () => {
  // UCC GUIDE: EXAMS & ASSESSMENT
  // Verified Data: 2025 Full Grading System & Strict Prohibited Items List.
  // Updates: Added "GPA Calculation" section in a unique Dark Mode style.

  const sections = [
    {
      title: "Examination Rules",
      summary: "Grading System, GPA Calculation, and Exam Hall Etiquette.",

      // --- OVERVIEW CONTENT ---
      content: (
        <div className="space-y-8">
          {/* --- INTRO CARD --- */}
          <div className="bg-[var(--gray-100-soft)] p-5 rounded-xl border border-[var(--gray-200)] transition-colors duration-300 shadow-sm">
            <p className="text-[var(--gray-700)] leading-relaxed">
              Examinations at UCC are strictly regulated. The pass mark is <strong>50% (Grade D)</strong>.
              The University operates a <strong>"Zero Tolerance"</strong> policy. Ignorance of the dress code or prohibited items rules is never an excuse.
            </p>
          </div>

          {/* --- GRADING SCALE & CONTRABAND GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* 1. Grading Scale */}
            <div className="bg-[var(--primary-50)] p-6 rounded-xl border border-[var(--primary-200)] hover:shadow-md transition-all">
              <h4 className="font-bold text-[var(--primary-900)] text-lg mb-3 flex items-center">
                <span className="bg-[var(--primary-200)] text-[var(--primary-800)] text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Full Scale</span>
                Grading System
              </h4>
              <div className="space-y-1.5 text-sm text-[var(--gray-700)]">
                <div className="flex justify-between bg-[var(--white)] p-1.5 rounded transition-colors duration-300"><span>80 - 100</span> <span className="font-bold text-[var(--primary-600)]">A (4.0) - Excellent</span></div>
                <div className="flex justify-between bg-[var(--white)] p-1.5 rounded transition-colors duration-300"><span>75 - 79</span> <span className="font-bold text-[var(--primary-600)]">B+ (3.5) - Very Good</span></div>
                <div className="flex justify-between bg-[var(--white)] p-1.5 rounded transition-colors duration-300"><span>70 - 74</span> <span className="font-bold text-[var(--primary-600)]">B (3.0) - Good</span></div>
                <div className="flex justify-between bg-[var(--white)] p-1.5 rounded transition-colors duration-300"><span>65 - 69</span> <span className="font-bold text-[var(--primary-600)]">C+ (2.5) - Average</span></div>
                <div className="flex justify-between bg-[var(--white)] p-1.5 rounded transition-colors duration-300"><span>60 - 64</span> <span className="font-bold text-[var(--primary-600)]">C (2.0) - Fair</span></div>
                <div className="flex justify-between bg-[var(--white)] p-1.5 rounded transition-colors duration-300"><span>55 - 59</span> <span className="font-bold text-yellow-600 dark:text-yellow-400">D+ (1.5) - Barely Pass</span></div>
                <div className="flex justify-between bg-[var(--white)] p-1.5 rounded transition-colors duration-300"><span>50 - 54</span> <span className="font-bold text-green-600 dark:text-green-400">D (1.0) - Weak Pass</span></div>
                <div className="flex justify-between bg-red-100 dark:bg-red-900/40 p-1.5 rounded transition-colors duration-300"><span>Below 50</span> <span className="font-bold text-red-600 dark:text-red-400">E (0.0) - Fail</span></div>
              </div>
            </div>

            {/* 2. Contraband & Dress Code */}
            <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-100 dark:border-red-900/20 hover:shadow-md transition-all">
              <h4 className="font-bold text-red-900 dark:text-red-400 text-lg mb-3 flex items-center">
                <span className="bg-red-200 dark:bg-red-900/40 text-red-800 dark:text-red-200 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Banned</span>
                Hall Regulations
              </h4>
              <div className="space-y-3 text-[var(--gray-700)]">
                <div className="bg-[var(--white)] p-3 rounded border border-red-100 dark:border-red-900/20 transition-colors duration-300">
                  <p className="text-xs font-bold text-red-800 dark:text-red-400 uppercase mb-1">Strictly Prohibited Items</p>
                  <ul className="text-sm list-disc pl-4 space-y-1">
                    <li><strong>Smart Watches</strong> & Smart Rings (Must be removed).</li>
                    <li><strong>Mobile Phones</strong> (Even if switched off).</li>
                    <li><strong>Programmable Calculators</strong> (Unless authorized).</li>
                    <li><strong>Opaque Pencil Cases</strong> (Use transparent ones).</li>
                    <li><strong>Correction Fluid</strong> (Liquid Paper is banned).</li>
                  </ul>
                </div>

                <div className="bg-[var(--white)] p-3 rounded border border-red-100 dark:border-red-900/20 transition-colors duration-300">
                  <p className="text-xs font-bold text-red-800 dark:text-red-400 uppercase mb-1">Dress Code & Appearance</p>
                  <ul className="text-sm list-disc pl-4 space-y-1">
                    <li><strong>No Headgear:</strong> Hats, Caps, and Berets are forbidden (Religious veils permit required).</li>
                    <li><strong>No Sunglasses</strong> (Unless on medical grounds).</li>
                    <li><strong>Decency:</strong> Sleeveless tops and revealing attire are often turned away by invigilators.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* --- GPA CALCULATION (Theme Responsive Style) --- */}
          <div className="bg-[var(--gray-100-soft)] p-6 rounded-xl border border-[var(--gray-200)] shadow-sm relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 opacity-10 bg-[var(--primary-500)] rounded-full blur-xl"></div>

            <h4 className="font-bold text-[var(--gray-900)] text-xl mb-4 flex items-center relative z-10 transition-colors duration-300">
              <span className="bg-[var(--primary-100)] text-[var(--primary-700)] dark:bg-[var(--primary-900)] dark:text-[var(--primary-300)] p-2 rounded-lg mr-3 text-sm font-mono transition-colors duration-300">∑</span>
              How to Calculate Your GPA & CGPA
            </h4>

            <div className="space-y-4 relative z-10">
              {/* Key Definitions */}
              <div className="bg-[var(--white)] p-4 rounded-lg border border-[var(--gray-200)] space-y-2 transition-colors duration-300">
                <p className="text-[var(--gray-700)] text-sm transition-colors duration-300"><strong className="text-[var(--primary-600)] dark:text-[var(--primary-400)]">CP</strong> = Course Weighting (Course Credit)</p>
                <p className="text-[var(--gray-700)] text-sm transition-colors duration-300"><strong className="text-[var(--primary-600)] dark:text-[var(--primary-400)]">GP</strong> = Grade Point (your grade converted to 4.0 scale)</p>
                <p className="text-[var(--gray-700)] text-sm transition-colors duration-300"><strong className="text-[var(--primary-600)] dark:text-[var(--primary-400)]">GPA</strong> = Grade Point Average (for current semester)</p>
                <p className="text-[var(--gray-700)] text-sm transition-colors duration-300"><strong className="text-[var(--primary-600)] dark:text-[var(--primary-400)]">CGPA</strong> = Cumulative Grade Point Average (all semesters)</p>
              </div>

              {/* Concrete Example from Flyer */}
              <div className="bg-[var(--white)] p-4 rounded-lg text-sm border border-[var(--gray-200)] transition-colors duration-300">
                <p className="font-bold mb-3 border-b border-[var(--gray-200)] pb-2 text-xs uppercase tracking-wide text-[var(--gray-600)] transition-colors duration-300 ">Example: GPA = 3.2 for the Semester</p>

                <div className="space-y-2 mb-4 font-mono text-xs">
                  <div className="flex items-center justify-between p-2 bg-[var(--primary-50)] rounded border border-[var(--primary-100)] transition-colors duration-300">
                    <span className="text-[var(--gray-700)]">ECO 101: 3 Credits, B (3 GP)</span>
                    <span className="text-[var(--primary-700)] font-bold">CP × GP = 9</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/10 rounded border border-blue-100 dark:border-blue-900/30 transition-colors duration-300">
                    <span className="text-[var(--gray-700)]">ISB 104: 3 Credits, A (4 GP)</span>
                    <span className="text-blue-700 dark:text-blue-400 font-bold">CP × GP = 12</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-purple-50 dark:bg-purple-900/10 rounded border border-purple-100 dark:border-purple-900/30 transition-colors duration-300">
                    <span className="text-[var(--gray-700)]">EPS 111: 3 Credits, C (2 GP)</span>
                    <span className="text-purple-700 dark:text-purple-400 font-bold">CP × GP = 6</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-pink-50 dark:bg-pink-900/10 rounded border border-pink-100 dark:border-pink-900/30 transition-colors duration-300">
                    <span className="text-[var(--gray-700)]">CMS 107: 3 Credits, B (3 GP)</span>
                    <span className="text-pink-700 dark:text-pink-400 font-bold">CP × GP = 9</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[var(--accent-50)] rounded border border-[var(--accent-100)] transition-colors duration-300">
                    <span className="text-[var(--gray-700)]">ASP 102A: 3 Credits, A (4 GP)</span>
                    <span className="text-[var(--accent-700)] font-bold">CP × GP = 12</span>
                  </div>
                </div>

                <div className="border-t border-[var(--gray-200)] pt-3 mt-2 transition-colors duration-300">
                  <div className="text-right mb-2 text-[var(--gray-700)]">
                    <span className="text-[var(--gray-600)]">Total CP × GP = </span>
                    <span className="font-bold text-[var(--gray-900)] transition-colors duration-300">48</span>
                  </div>
                  <div className="text-right mb-2 text-[var(--gray-700)]">
                    <span className="text-[var(--gray-600)]">Total Credits = </span>
                    <span className="font-bold text-[var(--gray-900)] transition-colors duration-300">15</span>
                  </div>
                </div>

                <div className="mt-3 bg-[var(--primary-50)] p-3 rounded border border-[var(--primary-200)] text-center transition-colors duration-300">
                  <div className="text-xs text-[var(--primary-800)] dark:text-[var(--primary-400)] mb-1">GPA = Σ Grade Points / Σ Credits</div>
                  <span className="text-[var(--primary-900)] dark:text-[var(--primary-300)] font-bold text-base">GPA = 48 ÷ 15 = 3.2</span>
                </div>
              </div>

              {/* CGPA Note */}
              <div className="bg-[var(--primary-50)] border border-[var(--primary-200)] p-4 rounded-lg text-sm transition-colors duration-300">
                <p className="text-[var(--gray-700)]"><strong className="text-[var(--primary-700)]">Important:</strong> CGPA treats all completed courses as if taken in one semester. It is calculated by summing all grade points from ALL semesters divided by total credits from ALL semesters. CGPA ≠ Average of semester GPAs.</p>
              </div>
            </div>
          </div>
        </div>
      ),

      // --- STEPS TAB DATA ---
      steps: [
        {
          title: "Check Exam Timetable",
          description: "Timetables are released 2 weeks prior. Check your specific Course Codes carefully (e.g., ASP 102 vs ASP 102A)."
        },
        {
          title: "Locate Venue Early",
          description: "If your exam is at 'NEA', 'Ellen K', or 'G-Block', go there the day before to know the exact location."
        },
        {
          title: "Enter Exam Hall",
          description: "Arrive 30 minutes early. You will be searched. Remove all watches and empty your pockets."
        },
        {
          title: "Fill Answer Booklet",
          description: "Write ONLY your Index Number. Do NOT write your name anywhere on the booklet. Do NOT tear any part of the booklet."
        },
        {
          title: "Sign Attendance Sheet",
          description: "This is your only proof of presence. If you forget to sign, you will be marked 'Absent' (IC/Fail)."
        }
      ],

      // --- WARNINGS TAB DATA ---
      commonMistakes: [
        "Wearing a Smart Watch (Instant seizure and malpractice case).",
        "Writing your name on the answer booklet (Your script may be rejected).",
        "Bringing a phone into the hall even if it's switched off (Still counts as malpractice).",
        "Using 'liquid paper' (correction fluid) on OMR sheets (It ruins the scanner).",
        "Entering the exam hall 30 minutes after the start time (You will be denied entry)."
      ],
      consequences: "Examination malpractice leads to rustication (suspension for one year) or dismissal. A grade of 'E' (Fail) requires you to resit the course the next time it is offered (usually a full year later).",

      // --- RESOURCES TAB DATA ---
      resources: [
        {
          title: "Student Handbook (Exams)",
          description: "Official rules on assessment.",
          url: "https://elearning.ucc.edu.gh/"
        },
        {
          title: "Past Questions Portal",
          description: "Access previous exam papers.",
          url: ""
        }
      ],

      // --- CHECKLIST TAB DATA ---
      checklist: [
        { text: "Printed Exam Permit (Colour)", checked: false },
        { text: "Checked Seat Number on Notice Board", checked: false },
        { text: "Bought 2 Blue/Black Pens", checked: false },
        { text: "Removed Smart Watch", checked: false },
        { text: "Phone left at home/hostel", checked: false },
        { text: "Dressed appropriately (No cap)", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'steps', label: 'Procedure' },
    { id: 'warnings', label: 'Malpractice' },
    { id: 'resources', label: 'Resources' },
  ];

  return { sections, tabs };
};

export default ExamsAssessmentRules;