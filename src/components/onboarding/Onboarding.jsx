import React from 'react';
import { Button } from '../common/Button';
import { ChevronLeft, ChevronRight, X, BookOpen, Wrench, Heart, Phone } from 'lucide-react';

const Onboarding = ({ isOpen, onClose, currentStep, onNext, onPrev }) => {
  const steps = [
    {
      title: "Welcome to UCC Campus Guide",
      content: (
        <div className="text-center">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen size={40} className="text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Your Complete UCC Companion</h2>
          <p className="text-gray-600 mb-6">
            Everything you need to navigate University of Cape Coast successfully.
            From registration to graduation, we've got you covered.
          </p>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="bg-gray-50 p-3 rounded">
              <h3 className="font-semibold mb-1">30+ Guide Topics</h3>
              <p className="text-sm text-gray-600">Step-by-step help for everything</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <h3 className="font-semibold mb-1">Essential Tools</h3>
              <p className="text-sm text-gray-600">Timetable, Budget, GPA & more</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Navigate with Ease",
      content: (
        <div className="text-center">
          <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wrench size={40} className="text-accent-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Smart Tools for Students</h2>
          <p className="text-gray-600 mb-6">
            Our tools are designed to make student life easier:
          </p>
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                📅
              </div>
              <div>
                <h3 className="font-semibold">Timetable Builder</h3>
                <p className="text-sm text-gray-600">Create and manage your class schedule</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                💰
              </div>
              <div>
                <h3 className="font-semibold">Budget Tracker</h3>
                <p className="text-sm text-gray-600">Track income and expenses</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                📊
              </div>
              <div>
                <h3 className="font-semibold">GPA Calculator</h3>
                <p className="text-sm text-gray-600">Calculate and track your GPA</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Comprehensive Guide",
      content: (
        <div className="text-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen size={40} className="text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Everything UCC in One Place</h2>
          <p className="text-gray-600 mb-6">
            From arrival to graduation, find answers to all your questions:
          </p>
          <div className="grid grid-cols-2 gap-2 text-left text-sm">
            <div className="bg-gray-50 p-2 rounded">✓ Campus Map</div>
            <div className="bg-gray-50 p-2 rounded">✓ Course Registration</div>
            <div className="bg-gray-50 p-2 rounded">✓ Student Portal Help</div>
            <div className="bg-gray-50 p-2 rounded">✓ Fee Payment Guide</div>
            <div className="bg-gray-50 p-2 rounded">✓ Accommodation Tips</div>
            <div className="bg-gray-50 p-2 rounded">✓ Transportation Info</div>
            <div className="bg-gray-50 p-2 rounded">✓ Food & Dining</div>
            <div className="bg-gray-50 p-2 rounded">✓ Wi-Fi & Email</div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            And many more topics with step-by-step guides!
          </p>
        </div>
      )
    },
    {
      title: "Stay Connected",
      content: (
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart size={40} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Free for All Students</h2>
          <p className="text-gray-600 mb-6">
            This app is completely free thanks to supporters like you. 
            Consider supporting us to help keep it free and add new features.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Supporter Benefits:</h3>
            <div className="text-sm text-left space-y-1">
              <div>🏅 Special supporter badge</div>
              <div>🚀 Early access to new features</div>
              <div>💝 Help thousands of students</div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            No obligation - app will always be free!
          </p>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center onboarding-backdrop p-4"
      onClick={handleBackgroundClick}
    >
      <div
        className="onboarding-content bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
        onClick={handleContentClick}
      >
        <div className="flex justify-between items-start mb-4 p-6">
          <div className="flex-1" />
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {currentStepData.content}
        </div>

        <div className="flex items-center justify-between mt-6 p-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onPrev}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={16} className="mr-1" />
            Previous
          </Button>

          <div className="flex gap-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            variant="primary"
            onClick={currentStep === steps.length - 1 ? onClose : onNext}
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            {currentStep < steps.length - 1 && <ChevronRight size={16} className="ml-1" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Onboarding };
export default Onboarding;