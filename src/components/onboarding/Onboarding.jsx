import React from "react";
import { X, ChevronLeft, ArrowRight, CheckCircle, MapPin } from "lucide-react";
import { useCampus } from "../../context/CampusContext";
import { CAMPUSES } from "../../data/campuses";
import Onboard1 from '/welcome.svg';
import Onboard2 from '/guide.svg';
import Onboard3 from '/Campus-map.svg';
import Onboard4 from '/Tools.svg';
import Onboard5 from '/Directory.svg';
import Onboard6 from '/personalized-exp.svg';



const steps = [
  {
    title: "Welcome to\nCampus Guide",
    subtitle: "Your essential companion for university life.\nNavigate with ease and confidence.",
    image: Onboard1
  },
  {
    title: "Comprehensive\nStudent Guides",
    subtitle: "Access essential resources, rules, academic\nprocedures, and tips for student life.",
    image: Onboard2
  },
  {
    title: "Interactive\nCampus Map",
    subtitle: "Never get lost. Find lecture halls,\nlibraries, and facilities effortlessly.",
    image: Onboard3
  },
  {
    title: "Smart\nAcademic Tools",
    subtitle: "Build your timetable, calculate your GPA,\nand manage your schedule efficiently.",
    image: Onboard4
  },
  {
    title: "Contact\nDirectory",
    subtitle: "Quickly find and reach out to university\ndepartments and essential services.",
    image: Onboard5
  },
  {
    title: "Personalized\nExperience",
    subtitle: "Customize your settings, report issues,\nand get support whenever you need it.",
    image: Onboard6
  }
];

const CampusStep = () => {
  const { setCampus, selectedCampus } = useCampus();

  return (
    <div className="flex-1 flex flex-col px-6 pb-4 pt-2 overflow-y-auto">
      <h2 className="text-[24px] font-black text-gray-900 text-center tracking-tight leading-tight mb-1">
        Select Your Campus
      </h2>
      <p className="text-gray-400 text-xs font-semibold text-center mb-4">
        Content will be tailored to your university. You can change this later.
      </p>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {CAMPUSES.map((campus) => {
          const isSelected = selectedCampus?.id === campus.id;

          return (
            <button
              key={campus.id}
              onClick={() => setCampus(campus.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                isSelected
                  ? 'bg-primary-50 border-primary-200'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              {campus.logo ? (
                <img src={campus.logo} alt={campus.shortName} className="w-10 h-10 rounded-lg object-cover shrink-0" />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <span className="text-sm font-black text-gray-600">{campus.shortName[0]}</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <span className="block font-bold text-sm text-gray-900 truncate">{campus.shortName}</span>
                <span className="block text-[11px] text-gray-400 truncate flex items-center gap-1">
                  <MapPin size={9} /> {campus.location}
                </span>
              </div>
              {isSelected && (
                <CheckCircle size={18} className="text-primary-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Onboarding = ({ isOpen, onClose, currentStep, onNext, onPrev }) => {
  if (!isOpen) return null;

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;
  const isCampusStep = currentStep === steps.length;

  const progress = ((currentStep + 1) / (steps.length + 1)) * 100;

  return (
    <div className="fixed inset-0 z-[10001] bg-white md:bg-gray-900/50 md:flex md:items-center md:justify-center md:p-6">
      <div className="w-full h-full md:h-auto md:max-h-[90vh] md:w-[640px] md:rounded-[2.5rem] bg-white flex flex-col relative overflow-y-auto shadow-2xl md:border md:border-gray-100">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-gray-100">
          <div className="h-full bg-gradient-to-r from-primary-600 to-primary-400 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2 shrink-0 relative z-20">
          <button onClick={currentStep === 0 ? onClose : onPrev} className="w-10 h-10 flex items-center justify-center text-primary-900 hover:bg-gray-100 rounded-xl transition-colors focus:outline-none">
            {currentStep === 0 ? <X size={22} strokeWidth={2} /> : <ChevronLeft size={24} strokeWidth={2} />}
          </button>
          <button onClick={onClose} className="text-primary-600 font-bold text-sm px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors focus:outline-none">
            Skip
          </button>
        </div>

        {isCampusStep ? (
          <CampusStep />
        ) : (
          <>
            {/* Image */}
            <div className="flex-1 flex items-center justify-center px-8 pt-4 pb-2">
              <div className="relative w-full max-w-[320px] mx-auto aspect-square flex items-center justify-center">
                <div className="absolute inset-4 bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-[2rem] blur-2xl opacity-60" />
                <img src={step.image} alt="" className="relative w-full h-full object-contain drop-shadow-sm" />
              </div>
            </div>

            {/* Text */}
            <div className="px-8 pb-4 shrink-0">
              <h2 className="text-[28px] font-black text-primary-950 text-center tracking-tight whitespace-pre-line leading-[1.15] mb-2">
                {step.title}
              </h2>
              <p className="text-gray-400 text-sm font-semibold text-center leading-relaxed max-w-[300px] mx-auto whitespace-pre-line">
                {step.subtitle}
              </p>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="px-8 pb-8 pt-4 shrink-0">
          {!isCampusStep && (
            <div className="flex items-center justify-center gap-2 mb-6">
              {[...steps, { isCampus: true }].map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all duration-500 ${i === currentStep ? "w-8 bg-primary-600" : i < currentStep ? "w-2 bg-primary-300" : "w-2 bg-gray-200"}`} />
              ))}
            </div>
          )}
          <button
            onClick={isCampusStep ? onClose : (isLast ? onNext : onNext)}
            className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold text-base shadow-lg shadow-primary-600/20 transition-all active:scale-[0.97] flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
          >
            {isCampusStep ? "Get Started" : "Continue"}
            {!isCampusStep && <ArrowRight size={20} strokeWidth={2.5} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export { Onboarding };
export default Onboarding;
