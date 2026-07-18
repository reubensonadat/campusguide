import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useCampus } from '../../context/CampusContext';
import { CAMPUSES } from '../../data/campuses';
import { MapPin, CheckCircle, Search, X } from 'lucide-react';

const CampusSelectorModal = ({ isOpen, onClose, title = 'Select Your Campus', subtitle = 'Pick your university to get started.' }) => {
    const { setCampus, selectedCampus } = useCampus();
    const [search, setSearch] = useState('');

    const filtered = useMemo(() => {
        if (!search.trim()) return CAMPUSES;
        const q = search.toLowerCase();
        return CAMPUSES.filter(c => c.name.toLowerCase().includes(q) || c.shortName.toLowerCase().includes(q));
    }, [search]);

    if (!isOpen) return null;

    const handleSelect = (campusId) => {
        setCampus(campusId);
        if (onClose) onClose();
    };

    return createPortal(
        <div className="fixed inset-0 z-[100]">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />
            <div className="absolute inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
                <div className="w-full sm:w-[90vw] sm:max-w-md max-h-[90vh] flex flex-col bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-4 duration-300 pb-[env(safe-area-inset-bottom)] pointer-events-auto">
                    <div className="flex items-center justify-between p-5 border-b border-gray-100 flex-shrink-0">
                        <div>
                            <h2 className="text-lg font-black text-gray-900">{title}</h2>
                            <p className="text-sm text-gray-500 font-medium mt-0.5">{subtitle}</p>
                        </div>
                        {onClose && (
                            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        )}
                    </div>

                    <div className="p-4 pb-2">
                        <div className="relative">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search universities..."
                                className="w-full h-12 pl-11 pr-4 bg-gray-100 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 pt-2 pb-6 space-y-1.5">
                        {filtered.map((campus) => {
                            const isSelected = selectedCampus?.id === campus.id;
                            return (
                                <button
                                    key={campus.id}
                                    onClick={() => handleSelect(campus.id)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left active:scale-[0.98] ${
                                        isSelected
                                            ? 'bg-primary-50 border-2 border-primary-200'
                                            : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                                    }`}
                                >
                                    {campus.logo ? (
                                        <img src={import.meta.env.BASE_URL + campus.logo.replace(/^\//, '')} alt={campus.shortName} className="w-12 h-12 rounded-2xl object-cover shrink-0" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-gray-200/70">
                                            <span className="text-sm font-black text-gray-600">{campus.shortName[0]}</span>
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <span className={`block text-sm font-bold truncate ${isSelected ? 'text-primary-900' : 'text-gray-900'}`}>
                                            {campus.shortName}
                                        </span>
                                        <span className="block text-xs text-gray-400 truncate mt-0.5 flex items-center gap-1">
                                            <MapPin size={10} /> {campus.location}
                                        </span>
                                    </div>
                                    {isSelected && <CheckCircle size={22} className="text-primary-600 shrink-0" />}
                                </button>
                            );
                        })}
                        {filtered.length === 0 && (
                            <div className="text-center py-12 text-sm text-gray-400 font-medium">
                                No universities match "{search}"
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default CampusSelectorModal;
