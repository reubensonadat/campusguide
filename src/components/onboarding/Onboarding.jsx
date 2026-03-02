import React, { useState, useEffect } from "react";
import { Button } from "../common/Button";
import {
  ChevronRight,
  X,
  BookOpen,
  Wrench,
  Heart,
  Download,
  CheckCircle,
  MapPin,
  Calendar,
  Calculator,
  Phone,
  MessageCircle,
  Zap,
  Shield,
  TrendingUp,
  Sparkles
} from "lucide-react";

const Onboarding = ({ isOpen, onClose, currentStep, onNext, onPrev }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installTriggered, setInstallTriggered] = useState(false);

  useEffect(() => {
    // Capture the PWA install prompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log("PWA install prompt captured");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      setInstallTriggered(true);
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
    } else {
      alert("To install:\n\n📱 iOS: Tap Share → Add to Home Screen\n🤖 Android: Tap menu → Install App");
    }
  };

  const steps = [
    {
      title: "Welcome to UCC Guide",
      content: (
        <div className="text-center animate-in fade-in zoom-in duration-300">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Sparkles size={48} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
            Your Essential <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Campus Companion</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-sm mx-auto">
            Everything you need to navigate university life at UCC, all in one place.
          </p>
          <div className="grid grid-cols-1 gap-3 text-left max-w-xs mx-auto">
            <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                <BookOpen size={20} className="text-indigo-600" />
              </div>
              <div className="text-sm font-bold text-indigo-900">
                Comprehensive Student Guides
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                <Wrench size={20} className="text-purple-600" />
              </div>
              <div className="text-sm font-bold text-purple-900">
                Powerful Academic Tools
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-xl border border-pink-100">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center shrink-0">
                <Heart size={20} className="text-pink-600" />
              </div>
              <div className="text-sm font-bold text-pink-900">
                24/7 Support & Resources
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Student Guide",
      content: (
        <div className="text-center animate-in slide-in-from-right duration-300">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <BookOpen size={48} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
            Everything You Need <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">To Succeed</span>
          </h2>
          <p className="text-gray-600 mb-6 max-w-xs mx-auto">
            Access comprehensive guides for every aspect of campus life
          </p>
          <div className="space-y-3 text-left max-w-sm mx-auto">
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                <MapPin size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Interactive Campus Map</h3>
                <p className="text-xs text-gray-600 font-medium mt-0.5">
                  Navigate campus with ease, find buildings and facilities
                </p>
              </div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                <Phone size={24} className="text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Contact Directory</h3>
                <p className="text-xs text-gray-600 font-medium mt-0.5">
                  Quick access to university departments and services
                </p>
              </div>
            </div>
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                <CheckCircle size={24} className="text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Registration Guides</h3>
                <p className="text-xs text-gray-600 font-medium mt-0.5">
                  Step-by-step course registration and enrollment help
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Academic Tools",
      content: (
        <div className="text-center animate-in slide-in-from-right duration-300">
          <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Wrench size={48} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
            Smart Tools <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">For Success</span>
          </h2>
          <p className="text-gray-600 mb-6 max-w-xs mx-auto">
            Manage your academic life with powerful tools
          </p>
          <div className="space-y-3 text-left max-w-sm mx-auto">
            <div className="p-4 bg-violet-50 rounded-2xl border border-violet-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                <Calendar size={24} className="text-violet-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Timetable Builder</h3>
                <p className="text-xs text-gray-600 font-medium mt-0.5">
                  Create and manage your class schedule effortlessly
                </p>
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                <Calculator size={24} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">GPA Calculator</h3>
                <p className="text-xs text-gray-600 font-medium mt-0.5">
                  Track your grades and calculate your GPA instantly
                </p>
              </div>
            </div>
            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                <TrendingUp size={24} className="text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Progress Tracking</h3>
                <p className="text-xs text-gray-600 font-medium mt-0.5">
                  Monitor your academic progress throughout the semester
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Support & Community",
      content: (
        <div className="text-center animate-in slide-in-from-right duration-300">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <MessageCircle size={48} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
            We're Here <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">To Help You</span>
          </h2>
          <p className="text-gray-600 mb-6 max-w-xs mx-auto">
            Get support whenever you need it
          </p>
          <div className="space-y-3 text-left max-w-sm mx-auto">
            <div className="p-4 bg-green-50 rounded-2xl border border-green-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                <MessageCircle size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">WhatsApp Support</h3>
                <p className="text-xs text-gray-600 font-medium mt-0.5">
                  Quick answers to your questions via WhatsApp
                </p>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                <Shield size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Privacy First</h3>
                <p className="text-xs text-gray-600 font-medium mt-0.5">
                  All data stored securely on your device
                </p>
              </div>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                <Zap size={24} className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Regular Updates</h3>
                <p className="text-xs text-gray-600 font-medium mt-0.5">
                  New features and improvements added frequently
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Download App",
      content: (
        <div className="text-center animate-in slide-in-from-right duration-300">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Download size={48} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
            Install the App <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">For Best Experience</span>
          </h2>
          <p className="text-gray-600 mb-6 max-w-xs mx-auto font-medium">
            Get offline access, faster performance, and a native app experience
          </p>

          <div className="space-y-3 mb-6 max-w-xs mx-auto">
            <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
              <CheckCircle size={20} className="text-indigo-600 shrink-0" />
              <span className="text-sm font-bold text-indigo-900">Works offline</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
              <CheckCircle size={20} className="text-blue-600 shrink-0" />
              <span className="text-sm font-bold text-blue-900">Faster loading</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
              <CheckCircle size={20} className="text-purple-600 shrink-0" />
              <span className="text-sm font-bold text-purple-900">Home screen access</span>
            </div>
          </div>

          <Button
            onClick={handleInstallClick}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2 mb-4"
          >
            <Download size={20} />
            {installTriggered ? "Installation Started!" : deferredPrompt ? "Install Now" : "View Install Guide"}
          </Button>

          <p className="text-xs text-gray-400">
            *Works on Chrome, Edge, Safari, and other modern browsers
          </p>
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col relative h-[600px] max-h-[85vh] border border-gray-100">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex gap-2 z-10">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${i <= currentStep
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                  : "bg-gray-100"
                }`}
            />
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-300 hover:text-gray-600 transition-colors z-20"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center px-8 pt-12 pb-6 overflow-y-auto">
          {currentStepData.content}
        </div>

        {/* Footer Navigation */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              onClick={onPrev}
              disabled={currentStep === 0}
              className={`text-gray-500 font-bold hover:bg-gray-100 ${currentStep === 0 ? "invisible" : ""
                }`}
            >
              Back
            </Button>

            <Button
              variant="primary"
              onClick={currentStep === steps.length - 1 ? onClose : onNext}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95"
            >
              {currentStep === steps.length - 1 ? "Get Started" : "Next"}
              {currentStep < steps.length - 1 && (
                <ChevronRight size={18} className="ml-1 inline" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Onboarding };
export default Onboarding;
