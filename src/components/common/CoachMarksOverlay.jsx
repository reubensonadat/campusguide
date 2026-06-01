import React, { useState, useEffect } from 'react';
import { ChevronRight, X } from 'lucide-react';

export function CoachMarksOverlay({ steps, storageKey, condition = true, forceShow }) {
    const [isVisible, setIsVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (forceShow) {
            const timer = setTimeout(() => setIsVisible(true), 300);
            return () => clearTimeout(timer);
        }
        if (condition) {
            const completed = localStorage.getItem(storageKey);
            if (!completed) {
                // Small delay so the page renders first
                const timer = setTimeout(() => setIsVisible(true), 800);
                return () => clearTimeout(timer);
            }
        }
    }, [condition, forceShow, storageKey]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            handleDismiss();
        }
    };

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem(storageKey, 'true');
    };

    if (!isVisible) return null;

    const step = steps[currentStep];
    const isLastStep = currentStep === steps.length - 1;

    return (
        <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleDismiss}
            />

            {/* Coach Card */}
            <div className="relative w-full max-w-md bg-white border border-gray-100 rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden z-10 animate-in slide-in-from-bottom-8 duration-300">
                {/* Close button */}
                <button
                    onClick={handleDismiss}
                    className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 hover:text-gray-950 transition-all active:scale-95 border border-gray-100 z-20"
                >
                    <X className="w-4 h-4 text-gray-500" />
                </button>

                <div className="p-8 pt-10">
                    {/* Step indicator */}
                    <div className="flex gap-2 mb-8">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 rounded-full transition-all duration-300 ${i === currentStep
                                    ? 'w-8 bg-primary-950'
                                    : i < currentStep
                                        ? 'w-4 bg-primary-950/40'
                                        : 'w-4 bg-gray-200'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-primary-950/10 text-primary-950 flex items-center justify-center mb-6 border border-primary-950/10 animate-in zoom-in-90 duration-200">
                        {step.icon}
                    </div>

                    {/* Content */}
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-[22px] font-black text-gray-900 tracking-tight mb-3 leading-tight">
                            {step.title}
                        </h3>
                        <p className="text-[14px] text-gray-500 font-medium leading-relaxed">
                            {step.description}
                        </p>
                    </div>

                    {/* Action */}
                    <div className="mt-8 flex items-center gap-3">
                        <button
                            onClick={handleNext}
                            className="flex-1 py-4 bg-primary-950 text-white font-bold rounded-2xl text-[14px] uppercase tracking-wider shadow-md hover:bg-primary-950 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {isLastStep ? 'Got it' : 'Next'}
                            <ChevronRight className="w-4 h-4" />
                        </button>
                        {!isLastStep && (
                            <button
                                onClick={handleDismiss}
                                className="px-6 py-4 text-[13px] font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-wider"
                            >
                                Skip
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
