import React from 'react';

export const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pb-20">
            {/* Sticky Top Header with safe area padding */}
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/60 px-6 pt-[calc(1rem_+_env(safe-area-inset-top,0px))] pb-4">
                <div className="max-w-3xl mx-auto flex items-start gap-4">
                    <div>
                        <h1 className="text-xl font-black text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                            Last updated: May 2026. Learn how we handle your data.
                        </p>
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="max-w-3xl mx-auto px-6 py-6 space-y-6">
                <section className="bg-white dark:bg-[#111111] p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800/60 shadow-sm space-y-4">
                    <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">1. Information We Collect</h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">We collect information to provide better services to our users. This includes:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 font-medium">
                        <li><strong>Account Information:</strong> When you create an account, we may collect your name, email, and student ID.</li>
                        <li><strong>Usage Data:</strong> We collect data about how you interact with our app (e.g., features used, time spent).</li>
                        <li><strong>Content:</strong> Information you post on Community feeds, Student Thrift, or Whispers.</li>
                    </ul>
                </section>
                <section className="bg-white dark:bg-[#111111] p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800/60 shadow-sm space-y-4">
                    <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">2. How We Use Information</h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">Your data is primarily used to:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 font-medium">
                        <li>Provide, maintain, and improve the app.</li>
                        <li>Verify student identity to ensure a safe campus community.</li>
                        <li>Respond to your comments, questions, and requests.</li>
                    </ul>
                </section>
                <section className="bg-white dark:bg-[#111111] p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800/60 shadow-sm space-y-4">
                    <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">3. Data Security</h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. We use a secure backend infrastructure.</p>
                </section>
            </div>
        </div>
    );
};

export const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pb-20">
            {/* Sticky Top Header with safe area padding */}
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/60 px-6 pt-[calc(1rem_+_env(safe-area-inset-top,0px))] pb-4">
                <div className="max-w-3xl mx-auto flex items-start gap-4">
                    <div>
                        <h1 className="text-xl font-black text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
                            Terms of Service
                        </h1>
                        <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                            Last updated: May 2026. Rules for using Campus Guide.
                        </p>
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="max-w-3xl mx-auto px-6 py-6 space-y-6">
                <section className="bg-white dark:bg-[#111111] p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800/60 shadow-sm space-y-4">
                    <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">1. Acceptance of Terms</h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">By accessing or using the Campus Guide app, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                </section>
                <section className="bg-white dark:bg-[#111111] p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800/60 shadow-sm space-y-4">
                    <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">2. User Conduct</h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">You agree not to use the app to:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 font-medium">
                        <li>Post any content that is unlawful, harmful, threatening, abusive, or defamatory.</li>
                        <li>Impersonate any person or entity.</li>
                        <li>Engage in fraudulent activities on the Community platform.</li>
                        <li>Post advertisements violating school policies or guidelines.</li>
                    </ul>
                </section>
                <section className="bg-white dark:bg-[#111111] p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800/60 shadow-sm space-y-4">
                    <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">3. Disclaimer of Warranties</h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">The app is provided "as is" and "as available". We do not warrant that the app will be uninterrupted or error-free. We are not responsible for interactions or transactions between users.</p>
                </section>
            </div>
        </div>
    );
};

