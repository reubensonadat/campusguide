import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { CheckCircle, Star } from 'lucide-react';
import { submitToGoogleSheet } from '../../utils/googleSheets';
import { LS_KEYS } from '../../utils/constants';

// Replace with your actual Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

const FeedbackModal = ({ isOpen, onClose }) => {
    const [page, setPage] = useState(0); // 0: Intro, 1: Finance, 2: Academics, 3: Life, 4: Value, 5: Success
    const [isSubmitting, setIsSubmitting] = useState(false); // Submission state

    // Form State
    const [answers, setAnswers] = useState({
        // Finance
        finance_tracking: '',
        finance_quick_add: '',
        finance_budget_alert: '',
        finance_export: '',
        finance_pain: '',
        // Academics
        academic_gpa_calc: '',
        academic_target_gpa: '',
        academic_reminders: '',
        academic_offline: '',
        academic_share: '',
        // Campus Life
        life_tickets: '',
        life_wallet: '',
        life_friends: '',
        life_map_freq: '',
        life_amenities: '',
        // Value
        value_price: '',
        value_current_app: '',
        value_ads: '',
        value_notify_style: '',
        value_open_feedback: '',
        email: ''
    });

    const updateAnswer = (key, value) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        if (!GOOGLE_SCRIPT_URL) {
            alert("No Script URL found in .env!");
            return;
        }
        setIsSubmitting(true);
        try {
            await submitToGoogleSheet(GOOGLE_SCRIPT_URL, {
                timestamp: new Date().toISOString(),
                ...answers,
                source: 'web_v1_revised_survey'
            });
            localStorage.setItem(LS_KEYS.FEEDBACK_SUBMITTED, 'true');
            setPage(5); // Success page
        } catch (error) {
            console.error("Error", error);
            alert("Submission failed. Please check your connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => { onClose(); };

    // --- Render Helpers ---
    const Question = ({ label, children }) => (
        <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <label className="block text-sm font-bold text-gray-900 mb-3 leading-relaxed">{label}</label>
            {children}
        </div>
    );

    const RadioGroup = ({ qKey, options }) => (
        <div className="grid gap-2">
            {options.map(opt => (
                <label key={opt} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${answers[qKey] === opt ? 'border-indigo-600 bg-indigo-50 shadow-sm' : 'border-white bg-white hover:border-indigo-100'}`}>
                    <input
                        type="radio"
                        name={qKey}
                        value={opt}
                        checked={answers[qKey] === opt}
                        onChange={(e) => updateAnswer(qKey, e.target.value)}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                    />
                    <span className={`ml-3 text-sm font-medium ${answers[qKey] === opt ? 'text-indigo-900' : 'text-gray-600'}`}>{opt}</span>
                </label>
            ))}
        </div>
    );

    const TextInput = ({ qKey, placeholder }) => (
        <input
            type="text"
            value={answers[qKey]}
            onChange={(e) => updateAnswer(qKey, e.target.value)}
            className="w-full p-3 border-2 border-white focus:border-indigo-500 bg-white rounded-lg text-sm outline-none transition-all placeholder:text-gray-400"
            placeholder={placeholder}
        />
    );

    // --- Pages ---

    // Page 0: Intro
    const renderIntro = () => (
        <div className="text-center space-y-8 py-8 px-4">
            <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 bg-indigo-600 opacity-20 blur-xl rounded-full"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl rotate-3">
                    <Star className="w-10 h-10 text-white" fill="white" />
                </div>
            </div>
            <div>
                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Help Shape Version 2.0</h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                    We're building the ultimate student super-app. <br />
                    Answer <span className="font-bold text-indigo-600 bg-indigo-50 px-2 rounded">20 questions</span> to help us prioritize features.
                </p>
            </div>
            <Button onClick={() => setPage(1)} className="w-full py-4 text-lg font-bold bg-gray-900 hover:bg-black text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 rounded-2xl">
                Start Survey →
            </Button>
            <p className="text-xs font-medium text-gray-400 tracking-wide uppercase">Time to complete: ~2 mins</p>
        </div>
    );

    // Page 1: Finance
    const renderFinance = () => (
        <div className="space-y-4">
            <div className="flex items-center gap-4 mb-2 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-700 font-black text-xl shadow-inner">1</div>
                <div>
                    <h3 className="font-bold text-xl text-gray-900">Money & Budgeting</h3>
                    <p className="text-xs text-green-600 font-bold uppercase tracking-wider">Financial Tools</p>
                </div>
            </div>

            <Question label="1. Do you currently track your daily spending?">
                <RadioGroup qKey="finance_tracking" options={['Yes, religiously', 'Sometimes / Mental note', 'No, never']} />
            </Question>

            {/* UPDATED Q2 */}
            <Question label="2. Would you use a 'Quick Add' widget for fast manual tracking?">
                <RadioGroup qKey="finance_quick_add" options={['Yes, if it takes <5s', 'Maybe', 'No, I\'ll forget']} />
            </Question>

            <Question label="3. Is a 'Daily Budget Limit' alert useful?">
                <RadioGroup qKey="finance_budget_alert" options={['Essential', 'Nice to have', 'Not needed']} />
            </Question>

            <Question label="4. Would you pay to export expense reports (PDF/Excel)?">
                <RadioGroup qKey="finance_export" options={['Yes', 'No, should be free']} />
            </Question>

            <Question label="5. What is your biggest financial pain point?">
                <TextInput qKey="finance_pain" placeholder="e.g. Overspending on food..." />
            </Question>

            <Button onClick={() => setPage(2)} className="w-full py-4 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg mt-4">Next Step: Academics →</Button>
        </div>
    );

    // Page 2: Academics
    const renderAcademics = () => (
        <div className="space-y-4">
            <div className="flex items-center gap-4 mb-2 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 font-black text-xl shadow-inner">2</div>
                <div>
                    <h3 className="font-bold text-xl text-gray-900">Academics & Tools</h3>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Productivity</p>
                </div>
            </div>

            <Question label="6. How do you calculate your GPA currently?">
                <RadioGroup qKey="academic_gpa_calc" options={['Manual (Pen & Paper)', 'Another App', 'I don\'t track it']} />
            </Question>

            <Question label="7. Would a 'Dynamic What-If GPA Manager' be helpful?">
                <RadioGroup qKey="academic_target_gpa" options={['Game changer!', 'Useful', 'Not really']} />
            </Question>

            {/* UPDATED Q8 */}
            <Question label="8. Do you want class reminders sent as Push Notifications?">
                <RadioGroup qKey="academic_reminders" options={['Yes, 15 min before', 'Yes, 30 min before', 'No, I\'ll check manually']} />
            </Question>

            <Question label="9. Is OFFLINE access to your timetable essential?">
                <RadioGroup qKey="academic_offline" options={['Critical (Data is expensive)', 'Preferred', 'I always have data']} />
            </Question>

            <Question label="10. Would you share your schedule with friends?">
                <RadioGroup qKey="academic_share" options={['Yes, definitely', 'Maybe', 'No, private']} />
            </Question>

            <div className="flex gap-4 mt-6">
                <Button variant="outline" onClick={() => setPage(1)} className="flex-1 py-3 rounded-xl font-bold">Back</Button>
                <Button onClick={() => setPage(3)} className="flex-[2] py-3 rounded-xl font-bold bg-indigo-600 text-white shadow-lg">Next: Campus Life →</Button>
            </div>
        </div>
    );

    // Page 3: Campus Life
    const renderLife = () => (
        <div className="space-y-4">
            <div className="flex items-center gap-4 mb-2 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-700 font-black text-xl shadow-inner">3</div>
                <div>
                    <h3 className="font-bold text-xl text-gray-900">Events & Navigation</h3>
                    <p className="text-xs text-purple-600 font-bold uppercase tracking-wider">Social Life</p>
                </div>
            </div>

            <Question label="11. How do you buy event tickets usually?">
                <RadioGroup qKey="life_tickets" options={['Physical Agents', 'Shortcode/Mobile Money', 'Online Website']} />
            </Question>

            <Question label="12. Would you trust an in-app Ticket Wallet (QR Code)?">
                <RadioGroup qKey="life_wallet" options={['Yes, more convenient', 'Maybe', 'I prefer printed/SMS']} />
            </Question>

            <Question label="13. Do you want to see which friends are attending an event?">
                <RadioGroup qKey="life_friends" options={['Yes, social is key', 'Don\'t care']} />
            </Question>

            <Question label="14. How often do you get lost on campus?">
                <RadioGroup qKey="life_map_freq" options={['Often (I\'m new)', 'Rarely', 'Never']} />
            </Question>

            {/* UPDATED Q15 */}
            <Question label="15. Would you use the map to find Food spots & Amenities?">
                <RadioGroup qKey="life_amenities" options={['Yes, very useful', 'Sometimes', 'No, I know places']} />
            </Question>

            <div className="flex gap-4 mt-6">
                <Button variant="outline" onClick={() => setPage(2)} className="flex-1 py-3 rounded-xl font-bold">Back</Button>
                <Button onClick={() => setPage(4)} className="flex-[2] py-3 rounded-xl font-bold bg-indigo-600 text-white shadow-lg">Next: The App →</Button>
            </div>
        </div>
    );

    // Page 4: Value
    const renderValue = () => (
        <div className="space-y-4">
            <div className="flex items-center gap-4 mb-2 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-700 font-black text-xl shadow-inner">4</div>
                <div>
                    <h3 className="font-bold text-xl text-gray-900">Value & Pricing</h3>
                    <p className="text-xs text-yellow-600 font-bold uppercase tracking-wider">Final Thoughts</p>
                </div>
            </div>

            {/* UPDATED Q16 with PRO features from screenshot */}
            <Question label="16. For PRO features (What-If GPA, Smart Slides, Digital Library & Skill Courses, Course Notes & Slides Manager), what is a fair semester Price?">
                <RadioGroup qKey="value_price" options={['GH₵ 25 / semester', 'GH₵ 30 / semester', 'GH₵ 40 / semester', 'GH₵ 50 / semester']} />
            </Question>

            <Question label="17. What is the ONE app you use most for school right now?">
                <TextInput qKey="value_current_app" placeholder="e.g. WhatsApp, Portal..." />
            </Question>

            {/* UPDATED Q18 */}
            <Question label="18. Would you like to see Verified Student Ads (Safety First)?">
                <RadioGroup qKey="value_ads" options={['Yes, to buy/sell safely', 'Maybe', 'No, no ads please']} />
            </Question>

            {/* UPDATED Q19 */}
            <Question label="19. Preferred In-App Notification Style?">
                <RadioGroup qKey="value_notify_style" options={['Push Notifications (Lock screen)', 'Silent In-App Badge', 'None']} />
            </Question>

            <Question label="20. Any final advice for us?">
                <TextInput qKey="value_open_feedback" placeholder="Be honest..." />
            </Question>

            <div className="mt-8 pt-6 border-t border-gray-100">
                <label className="block text-sm font-bold text-gray-900 mb-2">Email for Beta Access (Optional)</label>
                <input
                    type="email"
                    value={answers.email}
                    onChange={(e) => updateAnswer('email', e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 focus:border-indigo-500 rounded-xl text-sm outline-none transition-all"
                    placeholder="you@student.ucc.edu.gh"
                />
            </div>

            <div className="flex gap-4 mt-6">
                <Button variant="outline" onClick={() => setPage(3)} className="flex-1 py-3 rounded-xl font-bold">Back</Button>
                <Button onClick={handleSubmit} className="flex-[2] py-3 rounded-xl font-bold bg-green-600 hover:bg-green-700 text-white shadow-xl shadow-green-200">
                    {isSubmitting ? 'Submitting...' : 'Submit Survey'}
                </Button>
            </div>
        </div>
    );

    // Page 5: Success
    const renderSuccess = () => (
        <div className="text-center py-12 px-4">
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4">You're Amazing!</h3>
            <p className="text-gray-600 mb-8 max-w-sm mx-auto text-lg leading-relaxed">
                Thank you for answering all <span className="font-bold text-green-600">20 questions</span>. Your input is directly shaping Version 2.0.
            </p>
            <Button onClick={onClose} className="bg-gray-900 text-white px-12 py-4 rounded-xl font-bold shadow-xl hover:transform hover:scale-105 transition-all">
                Close
            </Button>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={page === 6 ? "" : page === 0 ? "" : `Section ${page}/4`}
            size="lg"
        >
            <div className="max-h-[75vh] overflow-y-auto px-2 pb-4 custom-scrollbar">
                {page === 0 && renderIntro()}
                {page === 1 && renderFinance()}
                {page === 2 && renderAcademics()}
                {page === 3 && renderLife()}
                {page === 4 && renderValue()}
                {page === 5 && renderSuccess()}
            </div>
        </Modal>
    );
};

export default FeedbackModal;
