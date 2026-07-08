import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

const CourseGradeForm = ({ showAddForm, setShowAddForm, newCourse, setNewCourse, handleAddCourse }) => {
  if (!showAddForm) return null;

  return (
    <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)} title="Edit Grade" size="lg">
      <div className="flex justify-end mb-4">
        <button className="text-xs font-bold bg-primary-100 text-primary-700 px-3 py-1.5 rounded-full hover:bg-primary-200 transition-colors"
          onClick={() => setNewCourse({ ...newCourse, isDetailed: !newCourse.isDetailed })}>
          {newCourse.isDetailed ? 'Simple Score' : 'Detailed Breakdown'}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 border border-gray-100 bg-gray-50 rounded-xl font-bold text-gray-900">{newCourse.name || 'Untitled Course'}</div>
        <div className="p-3 border border-gray-100 bg-gray-50 rounded-xl font-bold text-gray-900 text-sm flex items-center">{newCourse.creditHours} Credit Hours</div>

        {!newCourse.isDetailed ? (
          <input type="number" placeholder="Total Score (0-100)" value={newCourse.score} onChange={(e) => setNewCourse({ ...newCourse, score: e.target.value })} min="0" max="100"
            className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all md:col-span-2" />
        ) : (
          <div className="md:col-span-2 space-y-4 pt-4 pb-4 border-t border-gray-100 mt-2">
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center bg-gray-900/5 p-3 rounded-xl border border-primary-100 gap-3">
              <p className="text-xs font-bold text-primary-700 uppercase tracking-widest flex items-center gap-2">Scheme</p>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="text-xs font-bold text-gray-500 whitespace-nowrap">Exam Weight:</label>
                <select value={newCourse.examWeight || 60} onChange={(e) => setNewCourse({ ...newCourse, examWeight: Number(e.target.value) })}
                  className="w-full sm:w-auto p-1.5 rounded-lg bg-white text-xs border border-primary-200 font-bold text-primary-700 outline-none focus:ring-2 focus:ring-primary-500">
                  <option value={40}>40% Exam / 60% CA</option>
                  <option value={50}>50% Exam / 50% CA</option>
                  <option value={60}>60% Exam / 40% CA</option>
                  <option value={70}>70% Exam / 30% CA</option>
                </select>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <p className="text-xs font-bold text-primary-500 uppercase tracking-widest">Continuous Assessment ({100 - (parseFloat(newCourse.examWeight) || 60)}%)</p>
              {newCourse.assessments.map((ca, index) => (
                <div key={ca.id} className="flex flex-wrap sm:flex-nowrap gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100 items-center">
                  <input type="text" placeholder="Name" value={ca.name}
                    onChange={(e) => { const arr = [...newCourse.assessments]; arr[index].name = e.target.value; setNewCourse({ ...newCourse, assessments: arr }); }}
                    className="w-full sm:flex-1 p-2 bg-white rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none border border-gray-200" />
                  <div className="flex flex-1 sm:flex-none items-center gap-2">
                    <input type="number" placeholder="Score" value={ca.score}
                      onChange={(e) => { const arr = [...newCourse.assessments]; arr[index].score = e.target.value; setNewCourse({ ...newCourse, assessments: arr }); }}
                      className="w-[4.5rem] p-2 bg-white rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none border border-gray-200 text-center font-bold" />
                    <span className="text-gray-400 font-bold text-sm">/</span>
                    <input type="number" placeholder="Max" value={ca.max}
                      onChange={(e) => { const arr = [...newCourse.assessments]; arr[index].max = e.target.value; setNewCourse({ ...newCourse, assessments: arr }); }}
                      className="w-[4.5rem] p-2 bg-white rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none border border-gray-200 text-center text-gray-500" />
                    <button onClick={() => setNewCourse({ ...newCourse, assessments: newCourse.assessments.filter((_, i) => i !== index) })}
                      className="p-2 ml-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setNewCourse({ ...newCourse, assessments: [...newCourse.assessments, { id: Date.now(), name: `Assessment ${newCourse.assessments.length + 1}`, score: '', max: 20 }] })}
                className="w-full text-primary-600 border-primary-100 hover:bg-primary-50 py-3 border-dashed">
                <Plus size={14} className="mr-1" /> Add Component
              </Button>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-3">Final Exam ({newCourse.examWeight}%)</p>
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 bg-green-50 p-2 rounded-xl border border-green-100">
                <div className="w-full sm:flex-1 px-2 font-bold text-green-700 text-sm mb-2 sm:mb-0">Exam Score</div>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Score" value={newCourse.examScore}
                    onChange={(e) => setNewCourse({ ...newCourse, examScore: e.target.value })}
                    className="w-[5.5rem] p-2 bg-white rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none border border-green-200 text-center font-bold text-green-700" />
                  <span className="text-gray-400 font-bold text-sm">/</span>
                  <div className="w-[4.5rem] p-2 bg-green-100/50 rounded-lg text-sm font-bold text-green-600 text-center flex items-center justify-center border border-green-200/50">{newCourse.examWeight}</div>
                  <div className="w-[2.2rem] hidden sm:block"></div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-900 text-white rounded-xl flex justify-between items-center shadow-lg">
              <div className="text-sm font-medium text-gray-300">Total Expected Score</div>
              <div className="text-2xl font-black text-primary-400 flex items-baseline gap-1">
                {(() => {
                  const examW = parseFloat(newCourse.examWeight) || 60;
                  const caW = 100 - examW;
                  let tCAScore = 0; let tCAMax = 0;
                  newCourse.assessments.forEach(a => { tCAScore += (parseFloat(a.score) || 0); tCAMax += (parseFloat(a.max) || 0); });
                  const caAchieved = tCAMax > 0 ? (tCAScore / tCAMax) * caW : tCAScore;
                  return (caAchieved + (parseFloat(newCourse.examScore) || 0)).toFixed(1);
                })()} <span className="text-sm text-gray-500 font-medium">/ 100</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        <Button onClick={handleAddCourse} className="bg-primary-600 text-white">{newCourse.id ? 'Save Changes' : 'Add Grade'}</Button>
        <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default CourseGradeForm;
