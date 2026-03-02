import React from "react";
import { X, ChevronLeft, ArrowRight } from "lucide-react";

const Onboarding = ({ isOpen, onClose, currentStep, onNext, onPrev }) => {
  if (!isOpen) return null;

  const steps = [
    {
      title: "Welcome to UCC\nCampus Guide",
      subtitle: "Your essential companion for university life.\nNavigate UCC with ease and confidence.",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Comprehensive\nStudent Guides",
      subtitle: "Access essential resources, rules, academic\nprocedures, and tips for student life.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Interactive\nCampus Map",
      subtitle: "Never get lost. Find lecture halls,\nlibraries, and facilities effortlessly.",
      image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Smart \nAcademic Tools",
      subtitle: "Build your timetable, calculate your GPA,\nand manage your schedule efficiently.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Contact\nDirectory",
      subtitle: "Quickly find and reach out to university\ndepartments and essential services.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Personalized\nExperience",
      subtitle: "Customize your settings, report issues,\nand get support whenever you need it.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-0 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full h-full md:w-[60%] md:h-[90vh] md:max-h-[900px] md:min-h-[600px] md:rounded-[2.5rem] flex flex-col relative overflow-hidden shadow-2xl">

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
        <div className="flex-1 flex flex-col justify-start overflow-y-auto w-full bg-white">

          {/* External Image Area - Full width */}
          <div className="w-full flex-shrink-0 min-h-[350px] h-[55%] max-h-[500px] mb-8 bg-gray-100 relative">
            <img
              src={currentStepData.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Subtle gradient overlay at the bottom of the image for better text transition */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
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
        <div className="px-8 pb-10 bg-white shrink-0">
          {/* Navigation Dots */}
          <div className="flex justify-center items-center gap-2.5 mb-8">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-2.5 rounded-full transition-all duration-300 ${i === currentStep ? "w-8 bg-primary-600" : "w-2.5 bg-primary-100"
                  }`}
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
    </div>
  );
};

export { Onboarding };
export default Onboarding;

