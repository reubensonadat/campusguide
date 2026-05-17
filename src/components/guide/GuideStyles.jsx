import React from 'react';
import { CheckCircle } from 'lucide-react';

export const ActionCard = ({ step, title, details, desc }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
    <div className="relative">
      <div className="flex items-center mb-4">
        {step && (
          <span className="bg-indigo-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider mr-3 shrink-0">
            Step {step}
          </span>
        )}
        <h4 className="font-black text-xl text-slate-900 tracking-tight">{title}</h4>
      </div>
      {desc && <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">{desc}</p>}
      <ul className="space-y-4">
        {details.map((item, idx) => (
          <li key={idx} className="flex items-start text-sm text-slate-600 font-medium">
            <CheckCircle size={18} className="text-indigo-500 mt-0.5 mr-3 flex-shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const InfoBlock = ({ title, content, icon: Icon }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
    <div className="flex flex-col md:flex-row gap-8 items-start">
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
          <Icon size={32} />
        </div>
      )}
      <div className="space-y-4">
        {title && <h3 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h3>}
        <div className="text-slate-600 leading-relaxed font-medium prose prose-indigo max-w-none">
          {content}
        </div>
      </div>
    </div>
  </div>
);

export const PackingList = ({ title, icon, items }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm h-full">
    <h5 className="font-black text-slate-900 mb-4 flex items-center gap-2">
      {icon} {title}
    </h5>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="text-sm font-medium text-slate-500 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div> {item}
        </li>
      ))}
    </ul>
  </div>
);
