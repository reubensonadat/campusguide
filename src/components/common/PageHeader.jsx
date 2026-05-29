import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * PageHeader — standardized page header matching the Profile page style.
 *
 * A large, bold title with an optional subtitle line and optional left/right buttons.
 * It scrolls naturally with the page (NOT sticky) and sits inside the page container.
 *
 * Props:
 *   title     {string|ReactNode}  — Main heading (required)
 *   subtitle  {string}            — Smaller line under title (optional)
 *   onBack    {function|boolean}  — Show back button. Pass `true` for navigate(-1), or a function.
 *   right     {ReactNode}         — Optional slot for icon/action button on the right
 */
const PageHeader = ({ title, subtitle, onBack, right }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (typeof onBack === 'function') {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-start gap-4 min-w-0">
        {onBack !== undefined && onBack !== false && (
          <button
            onClick={handleBack}
            className="p-2 -ml-2 mt-1 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0 animate-in fade-in"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="text-[28px] md:text-[32px] font-black text-gray-900 tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-500 font-medium mt-1 leading-normal">{subtitle}</p>
          )}
        </div>
      </div>

      {right && (
        <div className="flex items-center gap-2 flex-shrink-0">
          {right}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
