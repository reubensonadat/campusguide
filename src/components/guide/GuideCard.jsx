import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const GuideCard = ({ id, title, description, icon: Icon, onClick }) => {
  const { state, actions } = useAppContext();
  const isCompleted = state.guideCompletion[id];

  const handleCardClick = () => {
    onClick(id);
  };

  const handleMarkComplete = (e) => {
    e.stopPropagation();
    actions.markGuideComplete(id);
    actions.showToast(`Marked "${title}" as complete`, 'success');
  };

  return (
    <div 
      className={`card-hover bg-white rounded-xl p-5 border border-gray-200 shadow-soft ${
        isCompleted ? 'bg-green-50 border-green-200' : ''
      }`}
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isCompleted ? 'bg-green-100' : 'bg-primary-100'
          }`}>
            <Icon 
              size={24} 
              className={isCompleted ? 'text-green-600' : 'text-primary-600'} 
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-base mb-1 ${
              isCompleted ? 'text-green-800' : 'text-gray-900'
            }`}>
              {title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleMarkComplete}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
            isCompleted 
              ? 'bg-green-500 text-white shadow-medium hover:bg-green-600' 
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
          }`}
          aria-label={isCompleted ? 'Completed' : 'Mark as complete'}
        >
          <Check size={18} />
        </button>
      </div>
      
      <div className="flex items-center justify-center mt-3">
        <span className="text-xs text-gray-500 flex items-center">
          Click to explore
          <ChevronRight size={14} className="ml-1" />
        </span>
      </div>
    </div>
  );
};

export { GuideCard };
export default GuideCard;