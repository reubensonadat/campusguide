import { Check } from 'lucide-react';
import SocialProofBadge from './SocialProofBadge';

const StepGuidelines = ({ userCount, onNext }) => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
                <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain rounded-2xl shadow-sm" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-4">Quality & Trust Framework</h2>
            <p className="text-lg text-gray-600 mb-6 font-medium leading-relaxed">
                To maintain a premium experience for students, all advertisements are subject to manual review before going live.
            </p>

            <SocialProofBadge userCount={userCount} />

            <div className="space-y-4 mb-10">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex gap-4">
                    <div className="mt-1 text-emerald-500"><Check size={20} /></div>
                    <div>
                        <h4 className="font-bold text-gray-900">100% Student Focus</h4>
                        <p className="text-sm text-gray-500 mt-1">Offers must be relevant to university life (Events, Food, Tech, Transport, etc).</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex gap-4">
                    <div className="mt-1 text-primary-500"><Check size={20} /></div>
                    <div>
                        <h4 className="font-bold text-gray-900">Manual Verification</h4>
                        <p className="text-sm text-gray-500 mt-1">Ads are reviewed within 2 hours. If rejected for violating terms, you receive a 90% refund as a result of paystack charges.</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex gap-4">
                    <div className="mt-1 text-pink-500"><Check size={20} /></div>
                    <div>
                        <h4 className="font-bold text-gray-900">Direct WhatsApp Connections</h4>
                        <p className="text-sm text-gray-500 mt-1">Students will be routed directly to your WhatsApp, Phone or Website to seamlessly complete their purchases.</p>
                    </div>
                </div>
            </div>

            <button
                onClick={onNext}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary-200 transition-all hover:-translate-y-0.5"
            >
                I Agree, Start Setup
            </button>
        </div>
    );
};

export default StepGuidelines;
