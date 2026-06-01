import React, { useState } from 'react';
import { Copy, FileText, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateLetter } from '../services/aiService';
import { toast } from 'react-hot-toast';
import PageHeader from '../components/common/PageHeader';

export const LetterGenerator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  
  const [formData, setFormData] = useState({
    letterType: 'Missing Grade',
    studentName: '',
    studentId: '',
    courseInfo: '',
    department: '',
    reason: ''
  });

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.studentId || !formData.department) {
      toast.error('Please fill in your Name, ID, and Department.');
      return;
    }

    // Rate limiting: 2 per hour
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;
    let timestamps = [];
    try {
      const stored = localStorage.getItem('ucc_letter_gen_timestamps');
      if (stored) {
        timestamps = JSON.parse(stored).filter(t => t > oneHourAgo);
      }
    } catch (err) {
      console.error('Failed to read generation limit', err);
    }

    if (timestamps.length >= 2) {
      const oldestRemaining = timestamps[0];
      const timeRemainingMs = (oldestRemaining + 60 * 60 * 1000) - now;
      const minutesRemaining = Math.ceil(timeRemainingMs / (60 * 1000));
      toast.error(`Rate limit reached: You can only generate 2 letters per hour. Please try again in ${minutesRemaining} minutes.`);
      return;
    }
    
    setLoading(true);
    setGeneratedLetter('');
    try {
      const result = await generateLetter(formData);
      setGeneratedLetter(result);
      toast.success('Letter generated successfully!');
      
      // Save new timestamp
      timestamps.push(now);
      localStorage.setItem('ucc_letter_gen_timestamps', JSON.stringify(timestamps));
    } catch (err) {
      toast.error('Failed to generate letter. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 font-sans selection:bg-gray-900/20 selection:text-gray-900">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 pt-[calc(3rem_+_env(safe-area-inset-top,0px))]">
        <PageHeader
          title="Letter Generator"
          subtitle="Draft formal academic letters instantly"
          onBack={true}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-5 mb-8 lg:mb-0">
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 h-full flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Letter Details</h2>
              
              <form onSubmit={handleGenerate} className="space-y-4 flex-1">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Letter Type</label>
                  <select 
                    value={formData.letterType}
                    onChange={(e) => setFormData({...formData, letterType: e.target.value})}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all appearance-none"
                  >
                    <option>Missing Grade Request</option>
                    <option>Excuse of Absence</option>
                    <option>Course Deferment</option>
                    <option>Change of Programme</option>
                    <option>Recommendation Request</option>
                    <option>General Petition</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      value={formData.studentName}
                      onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Student ID</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. PS/CSC/20/0001"
                      value={formData.studentId}
                      onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Department Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Computer Science"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Course Info (If applicable)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. CSC301 - Data Structures"
                    value={formData.courseInfo}
                    onChange={(e) => setFormData({...formData, courseInfo: e.target.value})}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Brief Reason / Context</label>
                  <textarea 
                    rows="3"
                    required
                    placeholder="e.g. I was sick with malaria on the day of the exam and have a medical report."
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all resize-none"
                  />
                </div>

                <div className="pt-4 mt-auto">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-900 transition-colors active:scale-95 shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100"
                  >
                    {loading ? 'Generating...' : 'Generate Letter'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Result Section */}
          <div className="lg:col-span-7 h-full min-h-[500px] flex flex-col">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex-1 flex flex-col overflow-hidden">
              
              <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-100 bg-white">
                <h2 className="text-xl font-bold text-gray-900">Output Document</h2>
                {generatedLetter && (
                  <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-900 border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors active:scale-95"
                  >
                    <Copy size={16} /> Copy Text
                  </button>
                )}
              </div>
              
              {generatedLetter ? (
                <div className="flex-1 p-4 md:p-6 bg-gray-50/30 overflow-y-auto">
                  <div className="bg-white p-6 md:p-10 rounded-2xl border border-gray-200 shadow-sm min-h-full">
                    <textarea
                      className="w-full h-full min-h-[400px] bg-transparent resize-none outline-none text-gray-800 leading-relaxed font-serif text-sm md:text-base"
                      value={generatedLetter}
                      onChange={(e) => setGeneratedLetter(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gray-50/30">
                  <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-center mb-4">
                    <FileText size={32} className="text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No Letter Generated</h3>
                  <p className="text-sm font-medium text-gray-500 max-w-sm">
                    Fill out the form to the left and click "Generate Letter" to draft your formal document.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LetterGenerator;
