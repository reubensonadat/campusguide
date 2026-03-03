import React from 'react';
import { useCampus } from '../../context/CampusContext';
import { CAMPUSES } from '../../data/campuses';
import { MapPin, CheckCircle, GraduationCap } from 'lucide-react';

const CampusSelectorModal = ({ isOpen, onClose }) => { // onClose might not be needed if forced
    const { setCampus, selectedCampus } = useCampus();

    if (!isOpen) return null;

    const handleSelect = (campusId) => {
        setCampus(campusId);
        if (onClose) onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col relative animate-in slide-in-from-bottom-4 zoom-in-95 duration-300">

                {/* Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <GraduationCap size={32} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-black mb-2">Select Your Campus</h2>
                    <p className="text-gray-300 text-sm max-w-xs mx-auto">
                        Content will be tailored to your specific university. You can change this later in settings.
                    </p>
                </div>

                {/* List */}
                <div className="p-6 space-y-3 bg-gray-50">
                    {CAMPUSES.map((campus) => (
                        <button
                            key={campus.id}
                            onClick={() => handleSelect(campus.id)}
                            className="w-full group relative overflow-hidden bg-white hover:bg-white p-4 rounded-xl border border-gray-200 hover:border-indigo-500 hover:shadow-lg transition-all duration-200 text-left flex items-center gap-4"
                        >
                            {/* Logo/Icon Placeholder - Keeping color for identity but subtle */}
                            <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:scale-105 transition-transform`}>
                                <span className="text-lg font-black text-gray-700 group-hover:text-indigo-600 transition-colors">{campus.shortName[0]}</span>
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                                    {campus.name}
                                </h3>
                                <p className="text-xs text-gray-500 font-medium">
                                    {campus.shortName} Campus Guide
                                </p>
                            </div>

                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <CheckCircle size={16} />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-4 bg-white border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-400">
                        More universities coming soon.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CampusSelectorModal;
