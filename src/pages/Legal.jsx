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
                            Last updated: May 2026. Learn how we handle your data securely.
                        </p>
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="max-w-3xl mx-auto px-6 py-6 space-y-6">
                <section className="bg-white dark:bg-[#111111] p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800/60 shadow-sm space-y-4">
                    <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">1. Information We Collect</h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">To provide a tailored and secure experience, we collect specific data points when you create an account:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 font-medium">
                        <li><strong>Name:</strong> Collected strictly for identification purposes within the app.</li>
                        <li><strong>Index Number / Student ID:</strong> Collected strictly as a unique identifier for internal platform use. <em>Disclaimer: We do not and cannot verify your academic status with the university; this is purely for internal user account differentiation.</em></li>
                        <li><strong>Phone Number:</strong> Collected strictly for official administrative contact, account recovery, and critical platform updates.</li>
                        <li><strong>Course of Study, Level & Semester:</strong> Collected exclusively for personalization purposes (e.g., tailoring your timetable, GPA calculators, and relevant feeds).</li>
                        <li><strong>Usage Data:</strong> We collect non-identifiable data about how you interact with our app features to improve functionality.</li>
                    </ul>
                </section>
                
                <section className="bg-white dark:bg-[#111111] p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800/60 shadow-sm space-y-4">
                    <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">2. How We Use Information</h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">Your data is strictly compartmentalized and used only for the core functioning of Campus Guide. We use it to:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 font-medium">
                        <li>Generate your customized dashboard, timetable, and academic tools.</li>
                        <li>Maintain a verified, safe, and exclusive campus community environment.</li>
                        <li>Contact you regarding security alerts or important account information.</li>
                    </ul>
                </section>

                <section className="bg-white dark:bg-[#111111] p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800/60 shadow-sm space-y-4">
                    <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">3. Zero Data Selling & Third-Party Sharing</h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium"><strong>We do not sell, rent, or distribute your personal data.</strong> Your phone number, index number, and personal details are encrypted and stored securely. We will never share your contact information with external marketers, third-party companies, or other students without your explicit consent.</p>
                </section>

                <section className="bg-white dark:bg-[#111111] p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800/60 shadow-sm space-y-4">
                    <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">4. Data Security</h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">We implement enterprise-grade security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. By using Campus Guide, you acknowledge and consent to the secure storage of this data for the purposes stated above.</p>
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
                    <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">1. Acceptance of Terms & Data Consent</h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">By accessing or using the Campus Guide app, you explicitly agree to these Terms of Service. You also consent to the collection of your Name, Phone Number, Index Number, Course, and Level as outlined in our Privacy Policy. You acknowledge that this data is required for the app to function properly and personalize your experience.</p>
                </section>
                <section className="bg-white dark:bg-[#111111] p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800/60 shadow-sm space-y-4">
                    <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">2. User Conduct</h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">You agree not to use the app to:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 font-medium">
                        <li>Post any content that is unlawful, harmful, threatening, abusive, or defamatory.</li>
                        <li>Impersonate any person or entity, or provide false registration data.</li>
                        <li>Engage in fraudulent activities on the Community platform or Thrift marketplace.</li>
                        <li>Attempt to extract, scrape, or misuse data belonging to other students.</li>
                    </ul>
                </section>
                <section className="bg-white dark:bg-[#111111] p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800/60 shadow-sm space-y-4">
                    <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">3. Limitation of Liability</h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">The creators and administrators of Campus Guide shall not be held liable for any direct or indirect damages resulting from the use of this app. While we take data security very seriously, users provide their phone numbers and academic data voluntarily. By registering, users waive the right to hold the creators liable for the standard, necessary data collection practices described herein.</p>
                </section>
            </div>
        </div>
    );
};

