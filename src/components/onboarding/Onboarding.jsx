import React from "react";
import { X, ChevronLeft, ArrowRight } from "lucide-react";
// replace external images with local SVGs
import Onboard1 from '/welcome.svg';
import Onboard2 from '/guide.svg';
import Onboard3 from '/Campus-map.svg';
import Onboard4 from '/Tools.svg';
import Onboard5 from '/Directory.svg';
import Onboard6 from '/personalized-exp.svg';

const Onboarding = ({ isOpen, onClose, currentStep, onNext, onPrev }) => {
  if (!isOpen) return null;

  const steps = [
    {
      title: "Welcome to UCC\nCampus Guide",
      subtitle: "Your essential companion for university life.\nNavigate UCC with ease and confidence.",
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
      title: "Smart \nAcademic Tools",
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

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const viewProps = {
    steps,
    currentStep,
    currentStepData,
    isLastStep,
    onClose,
    onNext,
    onPrev
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-0 md:p-6 animate-in fade-in duration-200">
      <MobileOnboardingView {...viewProps} />
      <DesktopOnboardingView {...viewProps} />
    </div>
  );
};

const MobileOnboardingView = ({ steps, currentStep, currentStepData, isLastStep, onClose, onNext, onPrev }) => (
  <div className="bg-white w-full h-full flex flex-col relative overflow-hidden shadow-2xl md:hidden">
    {/* Header */}
    <div className="flex items-center justify-between px-6 pt-8 pb-4 shrink-0 relative z-20 bg-white">
      <button
        onClick={currentStep === 0 ? onClose : onPrev}
        className="w-10 h-10 flex items-center justify-start text-primary-900 focus:outline-none hover:opacity-80 transition-opacity"
      >
        {currentStep === 0 ? <X size={28} strokeWidth={2.5} /> : <ChevronLeft size={32} strokeWidth={2.5} />}
      </button>

      <div className="font-bold text-primary-900 text-lg flex-1 text-center">
        {/* No steps indicator */}
      </div>

      <button
        onClick={onClose}
        className="text-primary-600 font-bold text-lg px-2 py-2 focus:outline-none flex-none text-right w-16 hover:opacity-80 transition-opacity"
      >
        Skip
      </button>
    </div>

    {/* Content Area */}
    <div className="flex-1 flex flex-col justify-center overflow-y-auto w-full bg-white relative z-10">

      {/* External Image Area - Full width */}
      <div className="relative w-full flex justify-center mb-6">
        <img
          src={currentStepData.image}
          alt=""
          className="block w-full h-56 sm:h-64 object-contain"
        />
      </div>

      <div className="text-center w-full px-8 flex flex-col justify-center pb-4">
        <h2 className="text-3xl font-black text-primary-900 mb-4 tracking-tight whitespace-pre-line leading-[1.2]">
          {currentStepData.title}
        </h2>
        <p className="text-gray-500 text-base leading-relaxed max-w-[340px] mx-auto font-medium whitespace-pre-line">
          {currentStepData.subtitle}
        </p>
      </div>
    </div>

    {/* Footer Area */}
    <div className="px-8 pb-10 bg-white shrink-0 relative z-20">
      {/* Navigation Dots */}
      <div className="flex justify-center items-center gap-2.5 mb-8">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2.5 rounded-full transition-all duration-300 ${i === currentStep ? "w-8 bg-primary-600" : "w-2.5 bg-primary-100"}`}
          />
        ))}
      </div>

      {/* Primary Action Button */}
      <button
        onClick={isLastStep ? onClose : onNext}
        className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold text-lg shadow-[0_8px_20px_rgba(37,99,235,0.3)] transition-transform active:scale-95 flex items-center justify-center gap-2"
      >
        {isLastStep ? "Get Started" : "Continue"}
        {!isLastStep && <ArrowRight size={22} strokeWidth={2.5} />}
      </button>
    </div>
  </div>
);

const DesktopOnboardingView = ({ steps, currentStep, currentStepData, isLastStep, onClose, onNext, onPrev }) => (
  <div className="hidden md:flex bg-white w-[60%] h-[90vh] max-h-[900px] min-h-[600px] rounded-[2.5rem] flex-col relative overflow-hidden shadow-2xl">
    {/* Header */}
    <div className="flex items-center justify-between px-6 pt-8 pb-4 shrink-0 relative z-10 bg-white">
      <button
        onClick={currentStep === 0 ? onClose : onPrev}
        className="w-10 h-10 flex items-center justify-start text-primary-900 focus:outline-none hover:opacity-80 transition-opacity"
      >
        {currentStep === 0 ? <X size={28} strokeWidth={2.5} /> : <ChevronLeft size={32} strokeWidth={2.5} />}
      </button>

      <div className="font-bold text-primary-900 text-lg flex-1 text-center">
        {/* No steps indicator */}
      </div>

      <button
        onClick={onClose}
        className="text-primary-600 font-bold text-lg px-2 py-2 focus:outline-none flex-none text-right w-16 hover:opacity-80 transition-opacity"
      >
        Skip
      </button>
    </div>

    {/* Content Area */}
    <div className="flex-1 flex flex-row items-center justify-center overflow-y-auto w-full bg-white px-8 gap-8">

      {/* External Image Area - Left side */}
      <div className="relative w-1/2 flex justify-end">
        <img
          src={currentStepData.image}
          alt=""
          className="block w-full h-auto max-h-[60vh] object-contain max-w-[28rem]"
        />
      </div>

      <div className="text-left w-1/2 flex flex-col justify-center">
        <h2 className="text-4xl font-black text-primary-900 mb-6 tracking-tight whitespace-pre-line leading-[1.2]">
          {currentStepData.title}
        </h2>
        <p className="text-gray-500 text-lg leading-relaxed max-w-[400px] font-medium whitespace-pre-line">
          {currentStepData.subtitle}
        </p>
      </div>
    </div>

    {/* Footer Area */}
    <div className="px-8 pb-10 bg-white shrink-0">
      {/* Navigation Dots */}
      <div className="flex justify-center items-center gap-2.5 mb-8">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2.5 rounded-full transition-all duration-300 ${i === currentStep ? "w-8 bg-primary-600" : "w-2.5 bg-primary-100"}`}
          />
        ))}
      </div>

      {/* Primary Action Button */}
      <button
        onClick={isLastStep ? onClose : onNext}
        className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold text-lg shadow-[0_8px_20px_rgba(37,99,235,0.3)] transition-transform active:scale-95 flex items-center justify-center gap-2"
      >
        {isLastStep ? "Get Started" : "Continue"}
        {!isLastStep && <ArrowRight size={22} strokeWidth={2.5} />}
      </button>
    </div>
  </div>
);

export { Onboarding };
export default Onboarding;

