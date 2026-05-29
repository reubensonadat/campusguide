import React from 'react';
import { Shield, Lock, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';

export const PrivacyPolicy = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="max-w-3xl mx-auto px-4 pt-[calc(3rem_+_env(safe-area-inset-top,0px))]">
                <PageHeader
                    title="Privacy Policy"
                    subtitle="Last updated: May 2026. Learn how we handle your data."
                    onBack={true}
                />
            </div>
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
                <section className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <h2 className="text-xl font-black text-gray-900">1. Information We Collect</h2>
                    <p className="text-gray-600 leading-relaxed font-medium">We collect information to provide better services to our users. This includes:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 font-medium">
                        <li><strong>Account Information:</strong> When you create an account, we may collect your name, email, and student ID.</li>
                        <li><strong>Usage Data:</strong> We collect data about how you interact with our app (e.g., features used, time spent).</li>
                        <li><strong>Content:</strong> Information you post on Community feeds, Student Thrift, or Whispers.</li>
                    </ul>
                </section>
                <section className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <h2 className="text-xl font-black text-gray-900">2. How We Use Information</h2>
                    <p className="text-gray-600 leading-relaxed font-medium">Your data is primarily used to:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 font-medium">
                        <li>Provide, maintain, and improve the app.</li>
                        <li>Verify student identity to ensure a safe campus community.</li>
                        <li>Respond to your comments, questions, and requests.</li>
                    </ul>
                </section>
                <section className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <h2 className="text-xl font-black text-gray-900">3. Data Security</h2>
                    <p className="text-gray-600 leading-relaxed font-medium">We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. We use a secure backend infrastructure.</p>
                </section>
            </div>
        </div>
    );
};

export const TermsOfService = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="max-w-3xl mx-auto px-4 pt-[calc(3rem_+_env(safe-area-inset-top,0px))]">
                <PageHeader
                    title="Terms of Service"
                    subtitle="Last updated: May 2026. Rules for using Campus Guide."
                    onBack={true}
                />
            </div>
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
                <section className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <h2 className="text-xl font-black text-gray-900">1. Acceptance of Terms</h2>
                    <p className="text-gray-600 leading-relaxed font-medium">By accessing or using the Campus Guide app, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                </section>
                <section className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <h2 className="text-xl font-black text-gray-900">2. User Conduct</h2>
                    <p className="text-gray-600 leading-relaxed font-medium">You agree not to use the app to:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 font-medium">
                        <li>Post any content that is unlawful, harmful, threatening, abusive, or defamatory.</li>
                        <li>Impersonate any person or entity.</li>
                        <li>Engage in fraudulent activities on the Community platform.</li>
                    </ul>
                </section>
                <section className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <h2 className="text-xl font-black text-gray-900">3. Disclaimer of Warranties</h2>
                    <p className="text-gray-600 leading-relaxed font-medium">The app is provided "as is" and "as available". We do not warrant that the app will be uninterrupted or error-free. We are not responsible for interactions or transactions between users.</p>
                </section>
            </div>
        </div>
    );
};
