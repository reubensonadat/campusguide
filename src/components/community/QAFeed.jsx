import React from 'react';
import { ArrowUp, MessageCircle, CheckCircle2 } from 'lucide-react';

const QAFeed = () => {
    const dummyQuestions = [
        { id: 1, course: 'MAT101', title: 'How do you solve Question 4 on the assignment?', preview: 'I understand the product rule but when applying it to trigonometric functions...', author: 'Sarah Mensah', time: '1h ago', answers: 3, upvotes: 12, resolved: true },
        { id: 2, course: 'ECO202', title: 'Can someone explain the difference between Micro and Macro elasticity?', preview: 'Dr. Osei mentioned this in class today but I missed the key distinction.', author: 'Anonymous Student', time: '3h ago', answers: 1, upvotes: 5, resolved: false },
        { id: 3, course: 'CS105', title: 'Why is my C++ code giving a segmentation fault?', preview: 'Here is my pointer logic...', author: 'John Doe', time: '1 day ago', answers: 8, upvotes: 24, resolved: true },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-black text-gray-900">Academic Q&A</h2>
                    <p className="text-sm text-gray-500 font-medium">Ask questions, get answers, help others.</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-colors">
                    Ask Question
                </button>
            </div>

            <div className="space-y-4">
                {dummyQuestions.map(q => (
                    <div key={q.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex gap-4 hover:border-blue-200 transition-colors cursor-pointer">
                        {/* Vote Column */}
                        <div className="flex flex-col items-center gap-1 min-w-[50px]">
                            <button className="text-gray-300 hover:text-blue-600 transition-colors">
                                <ArrowUp size={24} strokeWidth={3} />
                            </button>
                            <span className="font-black text-gray-700 text-lg">{q.upvotes}</span>
                            <div className={`mt-2 flex flex-col items-center justify-center p-2 rounded-lg border ${q.resolved ? 'bg-green-50 border-green-200 text-green-700' : q.answers > 0 ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-transparent border-transparent text-gray-400'}`}>
                                {q.resolved ? <CheckCircle2 size={16} className="mb-0.5"/> : <MessageCircle size={16} className="mb-0.5"/>}
                                <span className="text-[10px] font-bold">{q.answers} Ans</span>
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-black tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                                    {q.course}
                                </span>
                                <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                                    Posted by <span className="font-bold text-gray-600">{q.author}</span> • {q.time}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{q.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2">{q.preview}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QAFeed;
