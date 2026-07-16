import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, FileText, ChevronLeft, Mail } from 'lucide-react';

const LegalLayout = ({ title, subtitle, lastUpdated, icon: Icon, children, contactEmail = "uccguide25@gmail.com" }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] pb-24 font-sans selection:bg-[#cce1eb] selection:text-gray-900">
      <div className="max-w-3xl mx-auto px-6 pt-[calc(2rem_+_env(safe-area-inset-top,0px))] pb-24">
        
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-bold text-xs uppercase tracking-widest mb-12 transition-all group border-none bg-transparent cursor-pointer"
        >
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
        
        <header className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center border border-primary-100/50 dark:border-primary-800/30">
              <Icon size={16} className="text-primary-600 dark:text-primary-400" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">{subtitle}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-gray-100 tracking-tight leading-[1.15] mb-4">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500">
              Last updated: {lastUpdated}
            </p>
          )}
        </header>

        {/* Intro */}
        <div className="bg-primary-50/30 dark:bg-primary-900/10 rounded-2xl p-6 md:p-8 mb-14 border border-primary-100/30 dark:border-primary-800/20">
          <div className="flex gap-4 items-start">
            <Icon size={18} className="text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight">
                {title === "Privacy Policy" ? "Your Privacy Matters" : "Agreement to Terms"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                {title === "Terms of Service"
                  ? "Welcome to Campus Guide. These Terms of Service constitute a legally binding agreement between you and Campus Guide regarding your use of our academic planning platform, community features, and related services. By accessing or using Campus Guide, you agree to be bound by these terms. Please read them carefully."
                  : "At Campus Guide, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our academic planning and community platform. By using Campus Guide, you consent to the practices described in this policy."}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-16">
          {children}

          {/* CTA Contact */}
          <section className="p-10 md:p-14 text-center bg-gray-900 dark:bg-gray-800 rounded-[28px] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-3 tracking-tight">
                Legal Inquiry?
              </h2>
              <p className="text-white/70 font-medium leading-relaxed mb-8 max-w-md mx-auto text-sm">
                For any questions regarding these terms, privacy practices, or institutional policies, please reach out to our team directly.
              </p>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-white text-gray-900 font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all active:scale-95 shadow-lg shadow-black/20 border-none cursor-pointer"
              >
                <Mail size={14} />
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const SectionBlock = ({ title, content }) => (
  <section>
    <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-gray-100 mb-8 tracking-tight">
      {title}
    </h2>
    <div className="space-y-8">
      {content.map((item, cIdx) => (
        <div key={cIdx} className="space-y-3">
          <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wider">
            {item.label}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-sm">
            {item.text}
          </p>
        </div>
      ))}
    </div>
    <hr className="mt-12 border-gray-100 dark:border-gray-800" />
  </section>
);

const IntroBlock = ({ icon: Icon, text }) => (
  <div className="bg-primary-50/30 dark:bg-primary-900/10 rounded-2xl p-6 md:p-8 mb-14 border border-primary-100/30 dark:border-primary-800/20">
    <div className="flex gap-4 items-start">
      <Icon size={18} className="text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
        {text}
      </p>
    </div>
  </div>
);

export const TermsOfService = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: [
        {
          label: "1.1 Binding Agreement",
          text: "By accessing, browsing, or using the Campus Guide mobile application, website, or any related services (collectively, the 'Platform'), you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service ('Terms'). If you do not agree to any portion of these Terms, you must immediately cease use of the Platform and delete your account. These Terms constitute a binding contract between you and Campus Guide ('we,' 'our,' or 'us'), regardless of whether you are a registered user or a casual visitor."
        },
        {
          label: "1.2 Electronic Acceptance",
          text: "By creating an account, logging in, or continuing to use the Platform after any updates to these Terms, you provide your electronic signature confirming acceptance. You agree that electronic signatures, agreements, and records are legally equivalent to handwritten signatures and paper-based records. You waive any objection to the validity of electronic documents to the fullest extent permitted by applicable law."
        },
        {
          label: "1.3 Updates to Terms",
          text: "We reserve the exclusive right to modify, amend, or replace these Terms at any time and for any reason, effective upon posting the updated version on the Platform. Material changes will be communicated via email to the address associated with your account, through an in-app notification, or by posting a prominent notice on the Platform at least fourteen (14) days before the changes take effect. Your continued use of the Platform after any modifications constitutes acceptance of the revised Terms. If you do not agree to the changes, you must discontinue use and delete your account before the effective date. It is your responsibility to review these Terms periodically."
        },
        {
          label: "1.4 Severability of Acceptance",
          text: "Each provision of these Terms is severable. If any court or regulatory authority determines that any provision is invalid or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be deemed modified to the minimum extent necessary to make it enforceable while preserving the original intent."
        },
        {
          label: "1.5 Language and Interpretation",
          text: "These Terms are originally drafted in English. Any translations are provided for convenience only and do not modify the English version. In the event of any conflict between a translated version and the English version, the English version shall prevail. Headings and section titles are for convenience only and do not affect the interpretation of these Terms."
        }
      ]
    },
    {
      title: "2. Eligibility and Account Registration",
      content: [
        {
          label: "2.1 Age Requirement",
          text: "You must be at least sixteen (16) years of age to use the Platform. By registering for an account, you represent and warrant that you meet this age requirement. If we discover that you are under sixteen (16) and have registered without parental consent, we will immediately terminate your account and delete your personal data in accordance with our Privacy Policy and applicable data protection laws, including the Children's Online Privacy Protection Act (COPPA) where applicable."
        },
        {
          label: "2.2 Student Status",
          text: "Campus Guide is designed for tertiary-level students enrolled at universities, colleges, and higher education institutions. While we encourage student email verification, you may use the Platform regardless of your student status. However, certain features such as the Community Hub, Thrift Market, and Campus Whispers may require verification of student status. You represent that any student information you provide is truthful and accurate."
        },
        {
          label: "2.3 Accurate Registration Information",
          text: "When creating an account, you agree to provide accurate, current, and complete information, including your full legal name, a valid phone number, your email address, your institution of study, course of study, academic level, and current semester. You agree to update this information promptly if it changes. Providing false or misleading information constitutes a material breach of these Terms and may result in immediate account termination without notice."
        },
        {
          label: "2.4 One User Per Account",
          text: "Each account is strictly personal and may only be used by the individual who registered it. You may not create multiple accounts, share your account with any other person, or use another user's account. You are fully responsible for all activities that occur under your account, regardless of whether such activities are authorized by you. Any attempt to circumvent this restriction by creating multiple accounts may result in the termination of all associated accounts."
        },
        {
          label: "2.5 Account Security",
          text: "You are solely responsible for maintaining the confidentiality and security of your login credentials, including your password, App ID, and Recovery PIN. You must not share your password or credentials with anyone. You agree to notify us immediately of any unauthorized use of your account or any other breach of security by contacting uccguide25@gmail.com. We are not liable for any loss or damage arising from your failure to protect your account information. If you suspect your account has been compromised, you should immediately update your credentials and contact our support team."
        },
        {
          label: "2.6 Account Types and Features",
          text: "Campus Guide offers different account types, including standard user accounts and potentially premium or enhanced access tiers in the future. The features available to you depend on your account type, your institution, and the current version of the Platform. We reserve the right to modify, add, or remove features at any time without prior notice. No guarantee is made that any specific feature will remain available or that new features will be introduced."
        },
        {
          label: "2.7 Prohibited Account Activities",
          text: "You are expressly prohibited from: (a) using automated scripts, bots, crawlers, or any other automated means to access, scrape, or interact with the Platform; (b) creating accounts through unauthorized means, including using false or temporary email addresses; (c) selling, trading, renting, or otherwise transferring your account to any third party; (d) accessing or attempting to access another user's account without authorization; (e) using the Platform for any illegal or unauthorized purpose; and (f) interfering with or disrupting the integrity or performance of the Platform."
        },
        {
          label: "2.8 Account Verification",
          text: "We reserve the right to verify your identity, student status, and the accuracy of the information you provide at any time. You agree to cooperate with any verification requests and provide additional documentation as reasonably requested. Failure to complete verification within a reasonable timeframe may result in restricted access or account suspension. Verification methods may include, but are not limited to, email verification, SMS verification, student ID verification, and institution email domain verification."
        }
      ]
    },
    {
      title: "3. User Conduct and Prohibited Activities",
      content: [
        {
          label: "3.1 General Conduct Standards",
          text: "You agree to use the Platform in a manner that is lawful, respectful, and considerate of other users. You must not engage in any conduct that violates any applicable local, national, or international law or regulation, including but not limited to Ghanaian cybercrime laws, data protection regulations, and intellectual property laws. You must not use the Platform to transmit any viruses, malware, trojan horses, worms, time bombs, cancelbots, or any other technologically harmful material."
        },
        {
          label: "3.2 Prohibited Communications",
          text: "You must not post, transmit, or share any content that: (a) is defamatory, libelous, slanderous, or otherwise damaging to any person's reputation; (b) is obscene, pornographic, sexually explicit, or contains depictions of sexual violence; (c) incites hatred, violence, discrimination, or harassment against any individual or group based on race, ethnicity, religion, gender, sexual orientation, disability, or any other protected characteristic; (d) contains threats, intimidation, or stalking of any person; (e) constitutes spam, unsolicited advertising, or commercial solicitation; (f) impersonates any person or entity, including any Campus Guide employee or representative; (g) contains false or misleading information; or (h) violates any third-party right, including copyright, trademark, privacy, or publicity rights."
        },
        {
          label: "3.3 Thrift Market Conduct",
          text: "When using the Thrift Market feature, you agree to: (a) list only items that you legally own and have the right to sell; (b) provide accurate descriptions, prices, and condition assessments of all listed items; (c) not list prohibited items including, but not limited to, illegal substances, weapons, counterfeit goods, stolen property, hazardous materials, prescription medications, alcohol, tobacco products, or any items whose sale is restricted by law; (d) honor all sales agreements and complete transactions as described; (e) respond to inquiries in a timely manner; (f) not engage in price manipulation, shill bidding, or any other deceptive practice; and (g) comply with all applicable consumer protection laws and regulations. Campus Guide acts solely as a platform connecting buyers and sellers and is not a party to any transaction between users."
        },
        {
          label: "3.4 Campus Whispers Conduct",
          text: "Campus Whispers is designed for anonymous campus-related conversations. By using this feature, you agree to: (a) not use the anonymity to engage in harassment, bullying, or targeted attacks; (b) not post content that violates any other provision of these Terms; (c) not post personally identifiable information about yourself or others ('doxxing'); (d) not use the feature to spread false information, rumors, or malicious content; (e) not attempt to circumvent the anonymity protections or identify other anonymous users; and (f) not use the feature for commercial purposes, advertising, or solicitation. We reserve the right to moderate, remove, or report anonymous content that violates these Terms, and to disclose user identity to law enforcement when required by law."
        },
        {
          label: "3.5 Community Feed Conduct",
          text: "The Community General Feed is intended for campus news, announcements, and constructive discussions. You agree to post only content relevant to the campus community and to engage in respectful dialogue. Prohibited activities include: (a) posting off-topic or irrelevant content; (b) flooding or spamming the feed; (c) engaging in arguments, personal attacks, or inflammatory behavior ('trolling'); (d) posting the same content repeatedly; and (e) using the feed for political campaigning, religious proselytizing, or commercial advertising."
        },
        {
          label: "3.6 Data Scraping and Automated Access",
          text: "You are strictly prohibited from using any manual or automated means, including but not limited to robots, spiders, scrapers, crawlers, or data mining tools, to access, collect, extract, copy, download, or monitor any portion of the Platform, any data, content, or information available through the Platform, or any user personal information. Any such use is a material breach of these Terms and may violate applicable laws, including computer fraud and abuse statutes. We reserve the right to pursue all available legal remedies, including injunctive relief and damages."
        },
        {
          label: "3.7 Reverse Engineering and Security Breaches",
          text: "You must not: (a) reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code, underlying algorithms, or structure of the Platform; (b) bypass, disable, or circumvent any security measures, authentication systems, rate-limiting mechanisms, or access controls; (c) attempt to probe, scan, or test the vulnerability of any system or network; (d) interfere with the operation of the Platform through denial-of-service attacks, overloading, flooding, or any other means; (e) use the Platform to distribute malware or engage in any activity that could damage, disable, or impair the Platform; or (f) attempt to gain unauthorized access to any user accounts, systems, or networks connected to the Platform."
        },
        {
          label: "3.8 Reporting Violations",
          text: "If you encounter any content, conduct, or activity that violates these Terms, you should report it to our moderation team by emailing uccguide25@gmail.com or using any in-app reporting features provided. We will review all reports within a reasonable timeframe and take appropriate action, which may include content removal, account warnings, temporary suspension, permanent termination, or referral to law enforcement. We encourage you to report violations promptly to help maintain a safe community. You agree not to submit false, frivolous, or malicious reports."
        },
        {
          label: "3.9 Consequences of Violations",
          text: "Violation of any provision of this Section 3 or any other provision of these Terms may result in, at our sole discretion: (a) removal of offending content; (b) issuance of a written warning; (c) temporary suspension of account access; (d) permanent termination of account and deletion of associated data; (e) restriction of access to specific features; (f) reporting to appropriate law enforcement or regulatory authorities; and (g) pursuit of civil or criminal legal remedies. The severity of consequences will be determined based on the nature, frequency, and impact of the violation. We reserve the right to take any action we deem appropriate without prior notice."
        }
      ]
    },
    {
      title: "4. User Content and Intellectual Property",
      content: [
        {
          label: "4.1 User Content Ownership",
          text: "You retain all ownership rights and intellectual property rights in the content you create, upload, post, submit, or otherwise make available through the Platform ('User Content'). Nothing in these Terms transfers ownership of your User Content to us. However, you grant us the licenses described below to enable us to operate, provide, and improve the Platform."
        },
        {
          label: "4.2 License to Campus Guide",
          text: "By submitting User Content to the Platform, you grant Campus Guide a non-exclusive, worldwide, royalty-free, sub-licensable, transferable, and perpetual license to use, reproduce, modify, adapt, publish, publicly display, publicly perform, distribute, and create derivative works of your User Content solely for the purpose of operating, providing, improving, and promoting the Platform. This license includes the right to display your User Content to other users of the Platform in accordance with your privacy settings and our Privacy Policy. This license survives termination of your account to the extent reasonably necessary for us to fulfill our obligations, enforce our rights, and maintain proper records."
        },
        {
          label: "4.3 User Content Representations and Warranties",
          text: "You represent and warrant that: (a) you own your User Content or have all necessary licenses, rights, consents, and permissions to submit it and grant the licenses described in these Terms; (b) your User Content does not and will not infringe, misappropriate, or violate any third-party intellectual property rights, privacy rights, publicity rights, or other proprietary rights; (c) your User Content complies with all applicable laws and regulations; (d) your User Content is not false, misleading, or deceptive; (e) your User Content does not contain any viruses, malware, or other harmful code; and (f) your User Content does not violate any provision of these Terms."
        },
        {
          label: "4.4 Platform Intellectual Property",
          text: "The Platform, including all software, code, algorithms, databases, designs, text, graphics, logos, icons, images, audio clips, video clips, data compilations, and the selection and arrangement thereof, is the exclusive property of Campus Guide or its licensors and is protected by Ghanaian and international copyright, trademark, patent, trade secret, and other intellectual property laws. All rights not expressly granted to you in these Terms are reserved by Campus Guide. You must not reproduce, distribute, modify, create derivative works from, publicly display, publicly perform, republish, download, store, or transmit any of the Platform's proprietary material without our prior written consent."
        },
        {
          label: "4.5 Trademarks",
          text: "The Campus Guide name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Campus Guide or its affiliates or licensors. You must not use such marks without our prior written permission. All other names, logos, product and service names, designs, and slogans displayed on the Platform are the trademarks of their respective owners. Nothing in these Terms grants you any right to use any trademark, service mark, logo, or trade name of Campus Guide or any third party."
        },
        {
          label: "4.6 Feedback and Suggestions",
          text: "If you provide us with any suggestions, enhancement requests, recommendations, corrections, or other feedback regarding the Platform ('Feedback'), you grant us an unrestricted, irrevocable, perpetual, royalty-free, fully-paid, transferable, and sub-licensable right to use, reproduce, modify, create derivative works from, distribute, and otherwise exploit such Feedback for any purpose, commercial or otherwise, without any obligation to compensate you. You agree that we are not required to treat any Feedback as confidential and that we may use Feedback without restriction. You waive any moral rights or similar rights you may have in such Feedback."
        },
        {
          label: "4.7 Copyright Infringement Claims",
          text: "We respect the intellectual property rights of others and expect our users to do the same. If you believe that any content on the Platform infringes your copyright, please notify us at uccguide25@gmail.com with the following information: (a) your physical or electronic signature; (b) identification of the copyrighted work claimed to be infringed; (c) identification of the infringing material and its location on the Platform; (d) your contact information, including address, telephone number, and email address; (e) a statement that you have a good-faith belief that the use is not authorized by the copyright owner, its agent, or the law; and (f) a statement, made under penalty of perjury, that the information in the notification is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf. We will respond to all valid copyright infringement notices in accordance with applicable law."
        },
        {
          label: "4.8 Content Moderation Rights",
          text: "We reserve the right, but have no obligation, to: (a) monitor, review, screen, or moderate all User Content before or after it is posted; (b) refuse, reject, move, edit, or remove any User Content for any reason or no reason, at any time, without prior notice; (c) establish general practices and limits concerning the use of the Platform, including limits on file size, storage space, and data retention; and (d) suspend or terminate any user's access to the Platform for violating these Terms. We are not responsible for any failure or delay in removing User Content. You acknowledge that you may be exposed to User Content that is inaccurate, offensive, indecent, or objectionable, and you agree to waive any legal or equitable rights or remedies you have or may have against us with respect thereto."
        }
      ]
    },
    {
      title: "5. Third-Party Services and Links",
      content: [
        {
          label: "5.1 Payment Processing",
          text: "The Platform integrates with Paystack for processing financial transactions, including donations and any future premium features. Paystack is a third-party payment processor, and all payment transactions are subject to Paystack's terms of service and privacy policy. We do not store, process, or have access to your full payment card details, bank account numbers, or financial institution credentials. We store only transaction references, confirmation status, timestamps, and amounts for record-keeping and dispute resolution purposes. We are not liable for any losses, damages, or issues arising from your use of Paystack's services."
        },
        {
          label: "5.2 Push Notification Services",
          text: "The Platform uses OneSignal for delivering push notifications to your mobile device. OneSignal's collection and use of device identifiers and notification interaction data is governed by OneSignal's privacy policy. By enabling push notifications, you consent to the transmission of data to OneSignal for this purpose. You may opt out of push notifications at any time through your device settings or in-app notification preferences."
        },
        {
          label: "5.3 Cloud Infrastructure",
          text: "The Platform is hosted and operated using Supabase, a third-party cloud infrastructure provider. Your data may be stored and processed on Supabase's servers, which may be located in jurisdictions different from your own. Supabase's security practices and compliance certifications are available at supabase.com/security. We implement appropriate safeguards to protect your data but are not liable for any breach, outage, or data loss caused by Supabase or any other infrastructure provider."
        },
        {
          label: "5.4 Weather Data",
          text: "The Live Weather feature displays weather information obtained from third-party weather data providers. Weather data is provided for general informational purposes only and should not be relied upon for critical decisions. We do not guarantee the accuracy, completeness, or timeliness of weather information. You acknowledge that weather forecasts are inherently uncertain and may differ from actual conditions."
        },
        {
          label: "5.5 External Links",
          text: "The Platform may contain links to third-party websites, applications, or resources that are not owned or controlled by Campus Guide. We provide these links for your convenience only and do not endorse, control, or assume any responsibility for the content, privacy policies, terms of service, or practices of any third-party websites or services. You access such third-party resources at your own risk and should review their applicable terms and policies before engaging with them. We are not responsible or liable for any loss, damage, or harm caused by your use of third-party websites or services."
        },
        {
          label: "5.6 Third-Party Integrations",
          text: "The Platform may offer integrations with third-party services, including but not limited to social media platforms, cloud storage providers, or other educational tools. Your use of any third-party service through such integrations is governed by that third party's terms and policies. We do not warrant or support any third-party integrations and may modify or discontinue integrations at any time without notice. We are not responsible for any data loss, privacy breach, or other harm resulting from your use of third-party integrations."
        },
        {
          label: "5.7 App Stores",
          text: "If you access the Platform through a mobile application distributed through Apple App Store, Google Play Store, or any other app distribution platform, you acknowledge that these Terms are between you and Campus Guide only, not with the app store provider. Each app store provider has no obligation to furnish any maintenance or support services for the Platform. In the event of any failure of the Platform to conform to any applicable warranty, you may notify the app store provider, and the app store provider's maximum liability is governed by its own terms. The app store provider is not responsible for addressing any claims relating to the Platform or your possession or use thereof."
        }
      ]
    },
    {
      title: "6. Disclaimer of Warranties",
      content: [
        {
          label: "6.1 As-Is and As-Available Basis",
          text: "THE PLATFORM, INCLUDING ALL CONTENT, FEATURES, AND FUNCTIONALITY PROVIDED THEREIN, IS PROVIDED ON AN 'AS IS' AND 'AS AVAILABLE' BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, CAMPUS GUIDE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, ACCURACY, COMPLETENESS, AND COURSE OF DEALING OR USAGE OF TRADE."
        },
        {
          label: "6.2 No Guarantee of Academic Results",
          text: "Campus Guide provides academic planning tools including but not limited to GPA forecasting, assignment tracking, timetable organization, formula calculation, and study planning. THESE TOOLS ARE PROVIDED FOR GENERAL PLANNING AND REFERENCE PURPOSES ONLY AND ARE NOT A SUBSTITUTE FOR PROFESSIONAL ACADEMIC ADVICE. WE MAKE NO GUARANTEE, WARRANTY, OR REPRESENTATION REGARDING: (a) the accuracy of GPA forecasts or grade calculations; (b) the correctness of formula calculations or step-by-step solutions; (c) the completeness or timeliness of academic calendar or timetable data; (d) the effectiveness of study plans or focus tracking; or (e) any academic outcomes resulting from your use of the Platform. You are solely responsible for verifying all calculations, deadlines, and academic information against official institutional sources."
        },
        {
          label: "6.3 No Guarantee of Platform Availability",
          text: "We do not warrant that the Platform will be uninterrupted, timely, secure, error-free, or free of viruses, bugs, or other harmful components. We may suspend, withdraw, discontinue, or change all or any part of the Platform without notice. We will not be liable to you for any loss, damage, or inconvenience caused by any unavailability, downtime, or interruption of the Platform, whether scheduled or unscheduled, or for any loss of data, content, or functionality resulting from such unavailability."
        },
        {
          label: "6.4 No Guarantee of Community Conduct",
          text: "We do not warrant, guarantee, or represent that other users will comply with these Terms or applicable law. We are not responsible for the conduct of any user, whether online or offline. You assume all risks associated with interacting with other users, including but not limited to: (a) meeting other users in person; (b) engaging in transactions through the Thrift Market; (c) relying on information posted in the Community Hub or Campus Whispers; and (d) any offline interactions or arrangements resulting from Platform use. You are solely responsible for your interactions with other users and should exercise appropriate caution and judgment."
        },
        {
          label: "6.5 No Guarantee of Data Accuracy",
          text: "While we strive to maintain accurate and up-to-date information on the Platform, we do not warrant the accuracy, completeness, timeliness, or reliability of any content, data, or information available through the Platform, including but not limited to: (a) academic calendar dates; (b) formula library contents; (c) community-generated content; (d) weather data; (e) budget calculations; (f) assignment deadlines and grade entries; and (g) any other user-generated or third-party sourced content. You should independently verify all critical information through official sources."
        },
        {
          label: "6.6 Beta Features",
          text: "From time to time, we may offer new features, tools, or functionality that are not yet fully tested or released ('Beta Features'). Beta Features are provided 'as is' without any warranty and may contain bugs, errors, or other defects. We may modify, suspend, or discontinue Beta Features at any time without notice. You use Beta Features at your sole risk and agree to provide feedback regarding your experience. We are not liable for any damages arising from your use of Beta Features."
        }
      ]
    },
    {
      title: "7. Limitation of Liability",
      content: [
        {
          label: "7.1 No Indirect Damages",
          text: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, UNDER NO CIRCUMSTANCES SHALL CAMPUS GUIDE, ITS FOUNDERS, DEVELOPERS, EMPLOYEES, AGENTS, AFFILIATES, SUCCESSORS, OR ASSIGNS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF OR INABILITY TO USE THE PLATFORM, INCLUDING BUT NOT LIMITED TO: (a) LOSS OF PROFITS, REVENUE, BUSINESS, OR GOODWILL; (b) LOSS OF DATA, CONTENT, OR INFORMATION; (c) LOSS OF ACADEMIC OPPORTUNITIES OR EDUCATIONAL OUTCOMES; (d) PERSONAL INJURY OR PROPERTY DAMAGE; (e) COSTS OF PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; (f) DAMAGES RESULTING FROM INTERACTIONS WITH OTHER USERS; (g) DAMAGES RESULTING FROM TRANSACTIONS CONDUCTED THROUGH THE THRIFT MARKET; (h) DAMAGES RESULTING FROM RELIANCE ON PLATFORM CONTENT OR CALCULATIONS; AND (i) ANY OTHER LOSS OR DAMAGE OF ANY KIND, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STATUTE, STRICT LIABILITY, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES."
        },
        {
          label: "7.2 Cap on Liability",
          text: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR AGGREGATE LIABILITY TO YOU OR ANY THIRD PARTY FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF THE PLATFORM SHALL NOT EXCEED THE GREATER OF: (a) THE TOTAL AMOUNT YOU HAVE PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM; OR (b) ONE HUNDRED GHANA CEDIS (GH\u00a2100). IF YOU HAVE NOT MADE ANY PAYMENTS TO US, YOUR SOLE REMEDY IS TO DISCONTINUE USE OF THE PLATFORM."
        },
        {
          label: "7.3 Exclusions and Limitations",
          text: "Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for incidental or consequential damages. Accordingly, some of the limitations set forth in Sections 6 and 7 may not apply to you. In such jurisdictions, our liability is limited to the maximum extent permitted by applicable law. Nothing in these Terms excludes or limits our liability for: (a) death or personal injury caused by our negligence; (b) fraud or fraudulent misrepresentation; (c) gross negligence or willful misconduct; or (d) any liability that cannot be excluded or limited by applicable law."
        },
        {
          label: "7.4 Essential Basis",
          text: "You acknowledge and agree that the disclaimers, exclusions, and limitations of liability set forth in Sections 6 and 7 of these Terms form an essential basis of the bargain between you and Campus Guide and that, absent such disclaimers, exclusions, and limitations, the economic and operational terms of providing the Platform would be substantially different. You agree that the limitations of liability in these Terms reflect a fair allocation of risk and constitute an independent allocation of risk independent of any failure of essential purpose of any limited remedy."
        }
      ]
    },
    {
      title: "8. Indemnification",
      content: [
        {
          label: "8.1 Indemnity Obligation",
          text: "You agree to defend, indemnify, and hold harmless Campus Guide, its founders, developers, employees, agents, affiliates, licensors, service providers, successors, and assigns from and against any and all claims, demands, actions, proceedings, liabilities, losses, damages, judgments, settlements, costs, and expenses (including reasonable attorneys' fees, court costs, investigation costs, and expert witness fees) arising out of or relating to: (a) your use of or access to the Platform; (b) your violation of any provision of these Terms; (c) your violation of any applicable law, regulation, or third-party right; (d) your User Content, including any claim that your User Content infringes, misappropriates, or violates any intellectual property right, privacy right, or other right of any third party; (e) your interactions, transactions, or disputes with other users; (f) any fraudulent, misleading, or deceptive conduct on your part; and (g) any breach of your representations and warranties set forth in these Terms."
        },
        {
          label: "8.2 Indemnification Process",
          text: "We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which case you agree to cooperate fully with our defense. You agree not to settle any claim subject to indemnification without our prior written consent. Your indemnification obligations survive the termination of your account and these Terms."
        },
        {
          label: "8.3 Legal Costs",
          text: "In addition to the indemnification obligations above, you agree to pay all reasonable attorneys' fees, costs, and expenses incurred by us in successfully enforcing any provision of these Terms, including collecting any amounts due from you, or in defending against any claim brought by you that is determined to be without merit."
        }
      ]
    },
    {
      title: "9. Termination and Suspension",
      content: [
        {
          label: "9.1 Termination by You",
          text: "You may terminate your account at any time by deleting your account through the Settings page or by contacting us at uccguide25@gmail.com with a deletion request. Upon termination, your access to the Platform will be immediately revoked. We will process your account deletion request within a reasonable timeframe, after which your account and associated data will be removed from our active systems as described in our Privacy Policy."
        },
        {
          label: "9.2 Termination by Us",
          text: "We reserve the right, in our sole discretion and without prior notice, to suspend, limit, or terminate your account and access to the Platform at any time for any reason, including but not limited to: (a) violation of any provision of these Terms; (b) conduct that we believe is harmful to other users, third parties, or the Platform; (c) fraudulent, abusive, or illegal activity; (d) extended period of inactivity; (e) creation of multiple accounts; (f) failure to pay any applicable fees; (g) upon request by law enforcement or government agency; (h) unexpected technical or security issues; or (i) discontinuation or material modification of the Platform. We will endeavor to provide you with notice of termination where reasonably practicable, but may terminate immediately without notice in cases of serious violations."
        },
        {
          label: "9.3 Effect of Termination",
          text: "Upon termination of your account: (a) all rights and licenses granted to you under these Terms immediately cease; (b) you must immediately discontinue all use of the Platform; (c) we may delete your account, profile, User Content, and associated data from our active systems in accordance with our data retention practices; (d) your obligations under these Terms that by their nature should survive termination, including but not limited to Sections 4 (Intellectual Property), 6 (Disclaimer of Warranties), 7 (Limitation of Liability), 8 (Indemnification), 10 (Dispute Resolution), and this Section 9, shall survive and continue in full force and effect; and (e) any fees paid prior to termination are non-refundable."
        },
        {
          label: "9.4 Data Retention After Termination",
          text: "After account termination, we may retain certain data as required by law, for legitimate business purposes, or in anonymized or aggregated form. Residual copies of your data may remain in our backup systems for a period of time. We are not obligated to return or provide you with copies of any User Content after termination. You are encouraged to export or back up any data you wish to retain before requesting account deletion."
        },
        {
          label: "9.5 Appeal of Termination",
          text: "If your account is suspended or terminated and you believe the action was taken in error, you may appeal by contacting us at uccguide25@gmail.com with a detailed explanation of the circumstances. We will review your appeal in good faith and respond within a reasonable timeframe. We reserve the right to make the final decision regarding account reinstatement and are not obligated to provide a detailed explanation for our decision."
        }
      ]
    },
    {
      title: "10. Dispute Resolution and Governing Law",
      content: [
        {
          label: "10.1 Governing Law",
          text: "These Terms and any disputes arising out of or relating to these Terms or your use of the Platform shall be governed by and construed in accordance with the laws of the Republic of Ghana, without regard to its conflict of laws principles. The United Nations Convention on Contracts for the International Sale of Goods does not apply to these Terms."
        },
        {
          label: "10.2 Informal Dispute Resolution",
          text: "Before filing any legal proceeding, you agree to attempt to resolve any dispute, claim, or controversy arising out of or relating to these Terms or your use of the Platform informally by contacting us at uccguide25@gmail.com. We will work with you in good faith to resolve the dispute. You agree that this informal dispute resolution process is a condition precedent to initiating any legal action. If the dispute cannot be resolved within sixty (60) days of your initial notice, either party may pursue formal resolution."
        },
        {
          label: "10.3 Binding Arbitration",
          text: "TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, ANY DISPUTE, CLAIM, OR CONTROVERSY ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF THE PLATFORM THAT CANNOT BE RESOLVED INFORMALLY SHALL BE FINALLY SETTLED BY BINDING ARBITRATION IN ACCORDANCE WITH THE GHANA ARBITRATION ACT, 2010 (ACT 798). The arbitration shall be conducted in English by a single arbitrator appointed by mutual agreement of the parties, or failing agreement within thirty (30) days, by the Alternative Dispute Resolution Centre in Accra, Ghana. The seat of arbitration shall be Accra, Ghana. The award rendered by the arbitrator shall be final and binding on both parties, and judgment upon the award may be entered in any court having jurisdiction thereof."
        },
        {
          label: "10.4 Class Action Waiver",
          text: "TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, YOU AGREE THAT ANY DISPUTE RESOLUTION PROCEEDINGS, WHETHER IN ARBITRATION OR COURT, SHALL BE CONDUCTED SOLELY ON AN INDIVIDUAL BASIS AND NOT AS A CLASS, CONSOLIDATED, MASS, OR REPRESENTATIVE ACTION. YOU WAIVE YOUR RIGHT TO PARTICIPATE IN ANY CLASS ACTION, CLASS ARBITRATION, OR SIMILAR PROCEEDING AGAINST CAMPUS GUIDE. IF FOR ANY REASON A COURT OR ARBITRATOR DETERMINES THAT THIS CLASS ACTION WAIVER IS UNENFORCEABLE, THEN THE DISPUTE SHALL PROCEED IN COURT RATHER THAN ARBITRATION."
        },
        {
          label: "10.5 Jurisdiction and Venue",
          text: "In the event that the class action waiver in Section 10.4 is found to be unenforceable, or if the agreement to arbitrate is found to be invalid or unenforceable for any reason, you agree that any legal action arising out of or relating to these Terms or your use of the Platform shall be brought exclusively in the courts of the Republic of Ghana located in Accra, Ghana. You irrevocably consent and submit to the personal jurisdiction of such courts for the purpose of any such action."
        },
        {
          label: "10.6 Time Limit for Claims",
          text: "TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF THE PLATFORM MUST BE COMMENCED WITHIN ONE (1) YEAR AFTER THE ACCRUAL OF SUCH CAUSE OF ACTION OR CLAIM, OR SUCH CAUSE OF ACTION OR CLAIM SHALL BE PERMANENTLY BARRED."
        }
      ]
    },
    {
      title: "11. General Provisions",
      content: [
        {
          label: "11.1 Entire Agreement",
          text: "These Terms, together with our Privacy Policy and any other policies or notices incorporated by reference, constitute the entire and exclusive agreement between you and Campus Guide regarding your use of the Platform, and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, whether written or oral, regarding such subject matter. In the event of any conflict between these Terms and any other policy or notice, these Terms shall prevail unless expressly stated otherwise."
        },
        {
          label: "11.2 Severability",
          text: "If any provision, or portion thereof, of these Terms is found by a court of competent jurisdiction or arbitrator to be invalid, illegal, or unenforceable, such provision shall be deemed modified to the minimum extent necessary to make it enforceable while preserving the original intent, and the remaining provisions of these Terms shall continue in full force and effect. If modification is not possible, the unenforceable provision shall be severed, and the remaining provisions shall remain in effect."
        },
        {
          label: "11.3 Waiver",
          text: "No waiver of any provision of these Terms shall be effective unless in writing and signed by an authorized representative of Campus Guide. Our failure or delay in enforcing any provision of these Terms shall not be deemed a waiver of our right to enforce such provision or any other provision in the future. No single or partial exercise of any right or remedy shall preclude or restrict the further exercise of such right or remedy or the exercise of any other right or remedy."
        },
        {
          label: "11.4 Assignment",
          text: "You may not assign, transfer, or delegate these Terms or any of your rights or obligations hereunder, by operation of law or otherwise, without our prior written consent. Any attempted assignment in violation of this provision shall be null and void. We may freely assign, transfer, or delegate these Terms or any of our rights and obligations hereunder without your consent, including in connection with a merger, acquisition, reorganization, sale of assets, change of control, or operation of law."
        },
        {
          label: "11.5 Force Majeure",
          text: "We shall not be liable for any failure or delay in performing our obligations under these Terms where such failure or delay results from any cause beyond our reasonable control, including but not limited to: acts of God, natural disasters, war, terrorism, civil unrest, strikes, labor disputes, government actions, pandemic, epidemic, public health emergencies, internet service disruptions, power outages, telecommunications failures, hardware or software failures, cyberattacks, denial-of-service attacks, or failure of third-party services or infrastructure. Our performance shall be suspended for the duration of such force majeure event, and we shall be entitled to an equitable extension of performance deadlines."
        },
        {
          label: "11.6 No Third-Party Beneficiaries",
          text: "These Terms are for the benefit of you and Campus Guide and are not intended to confer any rights or remedies upon any third party, except as expressly provided herein. Nothing in these Terms shall create a third-party beneficiary relationship or give any third party the right to enforce any provision of these Terms."
        },
        {
          label: "11.7 Notices",
          text: "All notices under these Terms shall be in writing and deemed given when: (a) delivered personally; (b) sent by email to the address provided by you in your account information; (c) posted on the Platform; or (d) sent by registered or certified mail, return receipt requested, to the respective addresses of the parties. You consent to receive communications from us electronically and agree that such electronic communications satisfy any legal requirement that communications be in writing."
        },
        {
          label: "11.8 Relationship of Parties",
          text: "Nothing in these Terms shall be construed as creating a joint venture, partnership, employment, agency, franchise, or fiduciary relationship between you and Campus Guide. You acknowledge that no joint venture, partnership, employment, or agency relationship exists between you and Campus Guide as a result of these Terms or your use of the Platform."
        }
      ]
    },
    {
      title: "12. Contact Information",
      content: [
        {
          label: "12.1 General Inquiries",
          text: "For general questions, comments, or requests regarding these Terms or the Platform, you may contact us at: Email: uccguide25@gmail.com. We will make reasonable efforts to respond to your inquiry within a reasonable timeframe."
        },
        {
          label: "12.2 Legal Notices",
          text: "All legal notices, including but not limited to subpoenas, court orders, and cease and desist letters, shall be sent to: Email: uccguide25@gmail.com. Legal notices must clearly indicate that they are legal correspondence in the subject line."
        },
        {
          label: "12.3 DMCA/Copyright Notices",
          text: "All copyright infringement notices should be sent to: Email: uccguide25@gmail.com with the subject line 'COPYRIGHT NOTICE.' Please include all information required by Section 4.7 of these Terms."
        },
        {
          label: "12.4 Support Requests",
          text: "For technical support, account issues, bug reports, or feature suggestions, please use the in-app Support and Suggestions feature available within the Platform, or email uccguide25@gmail.com. For urgent security concerns regarding your account, please mark your email with 'SECURITY URGENT' in the subject line."
        }
      ]
    }
  ];

  return (
    <LegalLayout title="Terms of Service" subtitle="Legal Documentation" lastUpdated="July 16, 2026" icon={FileText}>
      <IntroBlock icon={FileText} text="Welcome to Campus Guide. These Terms of Service constitute a legally binding agreement between you and Campus Guide ('we,' 'our,' or 'us') regarding your use of our academic planning platform, community features, and related services (collectively, the 'Platform'). By accessing, browsing, registering for, or using the Platform in any manner, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to any portion of these Terms, you must immediately cease use of the Platform and delete your account. These Terms incorporate by reference our Privacy Policy, which governs our collection and use of your personal information. Capitalized terms used but not defined in these Terms have the meanings assigned to them in our Privacy Policy." />
      
      <div className="space-y-16">
        {sections.map((section, sIdx) => (
          <section key={sIdx}>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-gray-100 mb-8 tracking-tight">
              {section.title}
            </h2>
            <div className="space-y-8">
              {section.content.map((item, cIdx) => (
                <div key={cIdx} className="space-y-3">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wider">
                    {item.label}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-sm">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            {sIdx < sections.length - 1 && <hr className="mt-12 border-gray-100 dark:border-gray-800" />}
          </section>
        ))}
      </div>
    </LegalLayout>
  );
};

export const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      content: [
        {
          label: "1.1 Personal Identification Information",
          text: "When you register for a Campus Guide account, we collect the following personal identification information: your full legal name, a valid phone number (required for account recovery and critical notifications), your email address (required for account verification and communication), your student index number or institutional ID (collected as a unique internal identifier, not for university verification), your course of study, your academic level and current semester, and your institution name. We collect this information to create and maintain your account, personalize your experience, and provide the Platform's core functionality."
        },
        {
          label: "1.2 Account Credentials and Security Information",
          text: "We collect and store authentication credentials necessary for account access, including your hashed password (we do not store passwords in plaintext), your App ID (a unique identifier assigned to your account), and your Recovery PIN (a security code used for account recovery and cross-device data restoration). We use industry-standard hashing algorithms to protect your credentials. You are responsible for safeguarding your credentials and should not share them with anyone."
        },
        {
          label: "1.3 Academic and Usage Data",
          text: "We collect information related to your use of Platform features, including: courses added to your timetable; GPA entries and grade information; assignments, exams, and their deadlines; formula calculations and bookmarked formulas; daily planner entries and schedule data; focus timer sessions and productivity logs; budget entries (income, expenses, and categories); notes created through the Quick Notes feature; academic calendar selections; and feature interaction data (which features you use, how often, and for how long). This data is used exclusively to provide and improve the Platform's academic planning and productivity features."
        },
        {
          label: "1.4 Community and Content Data",
          text: "When you use community features, we collect: content you post to the Community Feed, including text, images, and attachments; content you post to Campus Whispers (stored anonymously, separated from your account identifier); Thrift Market listings, including product descriptions, prices, images, and contact preferences; your community interactions, including likes, comments, shares, and reports; and your feature suggestions, upvotes, and feedback submitted through the Platform."
        },
        {
          label: "1.5 Donation and Payment Information",
          text: "When you make a donation through the Platform, we collect: the donation amount; your name (if provided); your phone number (if provided); your email address (if provided); your message (if provided). We do not collect or store your payment card details, bank account numbers, or financial institution credentials. All payment transactions are processed by Paystack, a third-party payment processor, and are subject to Paystack's privacy policy and terms of service. We store only the transaction reference, confirmation status, timestamp, and donation amount for record-keeping purposes."
        },
        {
          label: "1.6 Device and Technical Information",
          text: "We may automatically collect certain technical information when you use the Platform, including: device type, model, and operating system version; unique device identifiers (such as OneSignal player ID for push notifications); mobile network information; app version and build number; crash reports and error logs; performance and usage statistics; browser type and version (if accessing via web); IP address (anonymized where possible); and approximate location derived from IP address (no precise location tracking). This information helps us troubleshoot issues, optimize performance, and improve the Platform."
        },
        {
          label: "1.7 Communications Data",
          text: "We collect information related to communications between you and Campus Guide, including: email correspondence sent to uccguide25@gmail.com; in-app support messages and suggestions; responses to any surveys or feedback requests; and notification preferences and delivery status. We may retain records of communications for training, quality assurance, and dispute resolution purposes."
        },
        {
          label: "1.8 Information We Do NOT Collect",
          text: "We want to be transparent about information we do NOT collect: we do not collect precise real-time geolocation data; we do not collect contacts from your device address book; we do not collect photos, videos, or media from your device unless you explicitly upload them through Platform features; we do not collect browsing history outside the Platform; we do not collect social media account information unless you choose to link an account; we do not collect biometric data; we do not collect health or medical information; and we do not collect government-issued identification numbers beyond student IDs. We also do not collect or store payment card details as all payments are processed by Paystack."
        }
      ]
    },
    {
      title: "2. How We Collect Information",
      content: [
        {
          label: "2.1 Information You Provide Directly",
          text: "We collect information that you voluntarily provide when you: register for an account; complete your profile; add courses, grades, assignments, or other academic data; post content to the Community Hub, Thrift Market, or Campus Whispers; create budget entries or notes; contact our support team; submit suggestions or feedback; make a donation; participate in surveys or research; configure your settings and preferences; or otherwise interact with Platform features that require data input. You are under no obligation to provide any information, but certain features may be unavailable if you choose not to provide required information."
        },
        {
          label: "2.2 Information Collected Automatically",
          text: "We automatically collect certain technical and usage information when you access or use the Platform, as described in Section 1.6. This collection is necessary for the proper functioning of the Platform, security monitoring, performance optimization, and analytics. We use this information to understand how the Platform is used, identify and fix issues, improve user experience, and ensure platform security. Where possible, we aggregate or anonymize this data to minimize privacy impact."
        },
        {
          label: "2.3 Information from Third-Party Sources",
          text: "We may receive information about you from third-party sources in limited circumstances, including: Paystack (payment confirmation status only, not financial details); OneSignal (push notification delivery status and device interaction data); and Supabase (infrastructure-level logs and performance data). We do not purchase or acquire personal information from data brokers, marketers, or other commercial data sources. Any information received from third parties is subject to the privacy practices of those third parties and is used only as necessary to provide the Platform."
        }
      ]
    },
    {
      title: "3. How We Use Your Information",
      content: [
        {
          label: "3.1 Service Provision and Personalization",
          text: "We use your information to provide, maintain, and personalize the Platform's features, including: generating and displaying your customized timetable; calculating GPA forecasts and running what-if scenarios; tracking assignments, exams, and deadlines; providing step-by-step formula solutions; building and displaying your daily planner; logging focus sessions and productivity metrics; tracking budget income and expenses; displaying personalized community content; storing and organizing your notes; remembering your preferences and settings across sessions; and synchronizing your data across devices when you use your App ID and Recovery PIN."
        },
        {
          label: "3.2 Communication Purposes",
          text: "We use your contact information to communicate with you regarding: account-related notifications, including security alerts and important updates; responses to your support inquiries, suggestions, or feedback; confirmation of actions taken on the Platform (such as account deletion or data export); and, with your consent, push notifications for class reminders, assignment deadlines, daily digests, and community activity. We will not use your contact information for marketing, advertising, or promotional purposes without your explicit consent."
        },
        {
          label: "3.3 Platform Improvement and Analytics",
          text: "We use aggregated, anonymized usage data to: analyze how users interact with the Platform to improve functionality and user experience; identify bugs, errors, and performance issues; prioritize feature development based on usage patterns; measure the effectiveness of Platform features; and conduct research and analysis to inform product decisions. We do not use personal information for automated decision-making that produces legal effects concerning you."
        },
        {
          label: "3.4 Security and Fraud Prevention",
          text: "We use information to: monitor and protect the Platform against unauthorized access, abuse, fraud, and other prohibited activities; investigate security incidents and breaches; enforce our Terms of Service; verify the accuracy of information provided during registration; detect and prevent spam, harassment, and other prohibited content; and maintain the integrity and security of our systems and user data."
        },
        {
          label: "3.5 Legal Compliance",
          text: "We may use your information to: comply with applicable laws, regulations, legal processes, and government requests; respond to subpoenas, court orders, or other legal processes; establish, exercise, or defend legal claims; and protect our rights, property, or safety, and that of our users and the public. We will notify you of such requests where permitted by law."
        }
      ]
    },
    {
      title: "4. How We Share Your Information",
      content: [
        {
          label: "4.1 Our Commitment Not to Sell Your Data",
          text: "WE DO NOT SELL, RENT, TRADE, LEASE, OR OTHERWISE TRANSFER YOUR PERSONAL INFORMATION TO THIRD PARTIES FOR MONETARY OR OTHER CONSIDERATION. We do not share your personal information with third parties for their direct marketing purposes. We do not use advertising networks, ad exchanges, or similar services that would involve sharing your personal information for targeted advertising. This commitment is central to our mission of providing a safe, ad-free platform for students."
        },
        {
          label: "4.2 Sharing with Service Providers",
          text: "We share limited information with trusted third-party service providers who assist us in operating and maintaining the Platform. These providers include: Supabase (cloud infrastructure provider) - stores all user data on encrypted servers, with access limited to what is necessary to provide database and hosting services; OneSignal (push notification provider) - receives device identifiers and notification content solely for the purpose of delivering push notifications; Paystack (payment processor) - processes donation transactions. We do not share payment card or financial details. These service providers are contractually bound to use your information only as necessary to provide services to us and to protect your information with appropriate security measures."
        },
        {
          label: "4.3 Sharing with Other Users",
          text: "Certain information is shared with other users as an inherent part of Platform functionality: (a) Your display name, course of study, academic level, and institution are visible to other users in community features, such as the Community Feed and Thrift Market. (b) Your Thrift Market listings, including product descriptions, prices, and images, are visible to all users. (c) Campus Whispers posts are displayed anonymously to all users. (d) Community Feed posts are visible to all users along with the display name of the poster. We do not share your phone number, email address, index number, or other private contact information with other users."
        },
        {
          label: "4.4 Sharing for Legal Reasons",
          text: "We may disclose your information if required to do so by law or in the good-faith belief that such disclosure is necessary to: (a) comply with a legal obligation, subpoena, court order, or government request; (b) protect and defend our rights, property, or safety, or that of our users, employees, or the public; (c) enforce our Terms of Service; (d) investigate, prevent, or take action regarding suspected illegal activities, fraud, or security issues; or (e) respond to an emergency that poses a threat to the safety of any person. Where permitted by law, we will attempt to notify you before disclosing your information in response to a legal request."
        },
        {
          label: "4.5 Business Transfers",
          text: "In the event of a merger, acquisition, reorganization, bankruptcy, sale of assets, or similar corporate transaction involving Campus Guide, your information may be transferred as part of that transaction. We will provide you with notice of such transfer and any resulting changes to this Privacy Policy. The transferee will be bound by the commitments in this Privacy Policy or will provide you with notice and an opportunity to opt out."
        },
        {
          label: "4.6 Aggregated and De-identified Data",
          text: "We may share aggregated, anonymized, or de-identified information that cannot reasonably be used to identify you for: research purposes; product improvement and analytics; reporting to educational institutions or partners (with appropriate safeguards); and public-facing statistics about Platform usage. Such data is stripped of all identifiers and cannot be linked back to you."
        }
      ]
    },
    {
      title: "5. Data Security",
      content: [
        {
          label: "5.1 Security Measures",
          text: "We implement a comprehensive set of technical, organizational, and administrative security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include: encryption of data in transit using TLS/SSL protocols; encryption of data at rest using industry-standard encryption algorithms; hashing and salting of passwords using bcrypt or equivalent algorithms; role-level security policies at the database level to enforce data access controls; regular security assessments and vulnerability scanning; secure software development practices; access controls limiting internal access to personal information on a need-to-know basis; and monitoring and logging of system access for anomaly detection."
        },
        {
          label: "5.2 No Absolute Guarantee",
          text: "While we take data security seriously and implement measures we believe are appropriate, no method of transmission over the internet, method of electronic storage, or security system is 100% secure. We cannot guarantee the absolute security of your information against all threats, including but not limited to: sophisticated cyberattacks, advanced persistent threats, zero-day exploits, physical theft of devices, insider threats, or human error. We encourage you to take steps to protect your account, including using a strong, unique password, enabling any available security features, keeping your device and app updated, and not sharing your credentials with anyone."
        },
        {
          label: "5.3 Data Breach Response",
          text: "In the event of a data breach that compromises your personal information, we will: promptly investigate the incident and take steps to contain and mitigate the breach; notify you without undue delay if the breach poses a risk to your rights and freedoms; provide information about the nature of the breach, the categories of data affected, and recommended protective measures; and notify relevant data protection authorities as required by applicable law. Our notification methods may include email, in-app notification, or public posting depending on the circumstances."
        },
        {
          label: "5.4 User Responsibilities",
          text: "You play an important role in protecting your information. You are responsible for: maintaining the confidentiality of your account credentials, App ID, and Recovery PIN; using a strong, unique password that you do not use for other services; logging out of your account on shared or public devices; keeping your device's operating system and the Campus Guide app updated; promptly notifying us of any unauthorized use of your account; and configuring your privacy settings according to your preferences."
        }
      ]
    },
    {
      title: "6. Data Retention and Deletion",
      content: [
        {
          label: "6.1 Retention Periods",
          text: "We retain your personal information only as long as necessary to fulfill the purposes described in this Privacy Policy, or as required by applicable law. The specific retention periods depend on the type of data: account information is retained for the duration of your active account; academic data (timetables, grades, assignments) is retained for the duration of your active account and may be archived upon deletion for a reasonable period for statistical analysis in anonymized form; community content is retained as long as your account is active or until you delete the content; communication records with our support team are retained for up to three (3) years for quality assurance and dispute resolution purposes; and backup data may be retained for up to ninety (90) days after deletion."
        },
        {
          label: "6.2 Account Deletion Process",
          text: "You may delete your account at any time through the Settings page in the Platform. Upon account deletion: your profile and personal information are removed from our active databases; your academic data (timetables, grades, assignments, budget entries, notes, planner entries, focus logs) is deleted; your community content (Feed posts, Thrift Market listings) may be disassociated from your account and retained in anonymized form; Campus Whispers content, being stored anonymously, is retained but permanently disassociated from your account; and your account credentials and authentication data are permanently deleted. Account deletion is irreversible, and we cannot restore your data once the deletion process is complete."
        },
        {
          label: "6.3 Data Retention After Deletion",
          text: "After account deletion, we may retain certain information in limited circumstances: (a) residual copies of your information may remain in our backup systems for up to ninety (90) days, after which they are permanently deleted; (b) aggregated, anonymized data derived from your usage may be retained indefinitely for analytics and research purposes; (c) information we are required to retain by applicable law or for legitimate legal purposes (such as transaction records for tax compliance) will be retained for the period required by law; and (d) records of communications related to disputes or legal claims may be retained until the resolution of such matters."
        },
        {
          label: "6.4 Data Export",
          text: "Before deleting your account, you may request a copy of your personal data by contacting us at uccguide25@gmail.com. We will provide your data in a structured, commonly used, machine-readable format within a reasonable timeframe, typically within thirty (30) days of your request. This export includes: your profile information; your academic data; your community content; and your settings and preferences. We recommend exporting any data you wish to retain before initiating account deletion."
        }
      ]
    },
    {
      title: "7. Your Rights and Choices",
      content: [
        {
          label: "7.1 Right of Access",
          text: "You have the right to request confirmation of whether we process your personal information and, if so, to access that information and obtain a copy. You can access and review much of your information directly through your account settings and Platform features. For additional access requests, please contact us at uccguide25@gmail.com. We will respond to your request within thirty (30) days, or as required by applicable law. In certain circumstances, we may charge a reasonable fee for additional copies or for requests that are manifestly unfounded or excessive."
        },
        {
          label: "7.2 Right of Rectification",
          text: "You have the right to request correction of any inaccurate or incomplete personal information we hold about you. You can update much of your information directly through your account settings, including your name, phone number, course of study, level, and semester. For corrections that cannot be made through the Platform, please contact us at uccguide25@gmail.com. We will make the requested corrections within a reasonable timeframe."
        },
        {
          label: "7.3 Right of Deletion ('Right to Be Forgotten')",
          text: "You have the right to request deletion of your personal information, subject to certain exceptions. You can delete your account and associated data directly through the Settings page. You may also request deletion of specific data without deleting your entire account by contacting us. We will process your deletion request within a reasonable timeframe. Exceptions where we may retain your information include: compliance with legal obligations; establishment, exercise, or defense of legal claims; completion of transactions where retention is necessary; and enforcement of our Terms of Service."
        },
        {
          label: "7.4 Right to Data Portability",
          text: "You have the right to receive your personal information in a structured, commonly used, machine-readable format and to transmit that data to another controller where technically feasible. As described in Section 6.4, you can request a data export by contacting us at uccguide25@gmail.com. We will provide the export in JSON or CSV format within thirty (30) days of your request."
        },
        {
          label: "7.5 Right to Withdraw Consent",
          text: "Where we rely on your consent as the legal basis for processing your personal information, you have the right to withdraw that consent at any time. Withdrawal of consent does not affect the lawfulness of processing based on consent before its withdrawal. You can manage your consent preferences through your account settings, including: push notification preferences; email communication preferences; and feature-specific data collection toggles. After withdrawing consent, certain features may become unavailable to you."
        },
        {
          label: "7.6 Right to Object to Processing",
          text: "You have the right to object to the processing of your personal information for direct marketing purposes (which we do not engage in) or for purposes of scientific or historical research. If you object to processing for legitimate interests, we will cease processing unless we demonstrate compelling legitimate grounds that override your interests, rights, and freedoms, or for the establishment, exercise, or defense of legal claims."
        },
        {
          label: "7.7 Right to Restrict Processing",
          text: "You have the right to request restriction of processing your personal information where: you contest the accuracy of the data (for a period enabling us to verify accuracy); the processing is unlawful and you oppose deletion and request restriction instead; we no longer need the data but you require it for legal claims; or you have objected to processing and are awaiting verification of whether our legitimate grounds override your objections. When processing is restricted, we may store your data but not further process it."
        },
        {
          label: "7.8 How to Exercise Your Rights",
          text: "To exercise any of the rights described in this Section 7, please contact us at uccguide25@gmail.com with a clear description of the right you wish to exercise and the specific data concerned. We may need to verify your identity before processing your request, which may require you to provide additional information matching our records. We will respond to all legitimate requests within thirty (30) days, or as required by applicable law. We do not charge a fee for exercising your rights unless your request is manifestly unfounded, excessive, or repetitive."
        },
        {
          label: "7.9 Complaint Lodging",
          text: "If you believe that we have violated your privacy rights or failed to adequately address your concerns, you have the right to lodge a complaint with the relevant data protection authority in your jurisdiction. In Ghana, the relevant authority is the Data Protection Commission (DPC). We encourage you to contact us first at uccguide25@gmail.com so that we can attempt to resolve your concern directly before you escalate to a regulatory authority."
        }
      ]
    },
    {
      title: "8. Children's Privacy",
      content: [
        {
          label: "8.1 Age Restriction",
          text: "Campus Guide is not intended for children under the age of sixteen (16). We do not knowingly collect, solicit, or maintain personal information from anyone under the age of sixteen (16), or knowingly allow such persons to register for an account. If you are under sixteen (16), you must not use or access the Platform or provide any personal information to us. If we become aware that we have collected personal information from a child under sixteen (16) without verification of parental consent, we will take prompt steps to delete that information and terminate the associated account."
        },
        {
          label: "8.2 Parental Rights",
          text: "If you are a parent or guardian and believe that your child under the age of sixteen (16) has provided us with personal information without your consent, please contact us immediately at uccguide25@gmail.com. We will take prompt action to delete the child's personal information and terminate their account. We encourage parents to monitor their children's online activities and to instruct them never to provide personal information through the Platform without parental permission."
        },
        {
          label: "8.3 Institutional Use",
          text: "If you are using Campus Guide through your educational institution's recommendation or program, your institution may have additional privacy and consent obligations. We encourage educational institutions to obtain appropriate parental consent before recommending the Platform to students under the age of eighteen (18). We are not responsible for compliance with institutional policies that go beyond the requirements of this Privacy Policy and applicable law."
        }
      ]
    },
    {
      title: "9. International Data Transfers",
      content: [
        {
          label: "9.1 Data Location",
          text: "Your personal information is stored and processed on servers located in the United States and potentially other jurisdictions where our cloud infrastructure provider, Supabase, maintains facilities. If you are accessing the Platform from outside these jurisdictions, your information will be transferred to, stored, and processed in these locations. The data protection laws in these jurisdictions may differ from those in your country of residence."
        },
        {
          label: "9.2 Transfer Safeguards",
          text: "We have implemented appropriate safeguards to ensure that your personal information receives an adequate level of protection regardless of where it is processed. These safeguards include: entering into data processing agreements with our service providers that incorporate standard contractual clauses or equivalent transfer mechanisms; ensuring that our service providers maintain appropriate technical and organizational security measures; limiting data transfers to what is strictly necessary for providing the Platform; and reviewing our service providers' compliance certifications and security practices."
        },
        {
          label: "9.3 Your Consent to Transfer",
          text: "By using the Platform and providing your personal information, you acknowledge and consent to the transfer, storage, and processing of your information in jurisdictions outside your country of residence, including the United States, as described in this Section 9. You understand that the data protection laws in these jurisdictions may not provide the same level of protection as those in your home country."
        }
      ]
    },
    {
      title: "10. Cookies and Local Storage",
      content: [
        {
          label: "10.1 Browser Storage Usage",
          text: "Campus Guide uses browser-based local storage and session storage to enhance your experience and maintain application state. Unlike cookies, local storage data is not automatically transmitted to servers and remains on your device unless explicitly accessed by the Platform's code. We use local storage for: maintaining your login session and authentication state; caching application data to improve performance and reduce load times; storing your preferences and settings; and enabling offline functionality where available."
        },
        {
          label: "10.2 What We Do NOT Use",
          text: "We do NOT use: third-party tracking cookies; advertising cookies or trackers; cross-site tracking mechanisms; fingerprinting techniques; social media pixels or tracking beacons; or any technology designed to track your activity across unrelated websites or services. Our use of local storage is strictly limited to what is necessary for the Platform's core functionality and performance."
        },
        {
          label: "10.3 Your Control",
          text: "You can clear or manage local storage data through your browser or device settings. However, please note that clearing local storage may affect the functionality and performance of the Platform, and you may need to log in again or reconfigure certain preferences. Most mobile applications do not provide the ability to selectively clear local storage; you may need to clear all app data or reinstall the application to reset local storage."
        }
      ]
    },
    {
      title: "11. Changes to This Privacy Policy",
      content: [
        {
          label: "11.1 Policy Updates",
          text: "We may update this Privacy Policy from time to time to reflect changes in our data practices, legal obligations, or Platform features. When we make material changes, we will notify you by: (a) sending an email to the email address associated with your account; (b) displaying an in-app notification or alert the next time you access the Platform; or (c) posting a prominent notice on the Platform. We will provide such notice at least fourteen (14) days before the changes take effect for material changes, or immediately for non-material changes or changes required by law."
        },
        {
          label: "11.2 Reviewing Changes",
          text: "We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information. The 'Last updated' date at the top of this Privacy Policy indicates when it was last revised. Your continued use of the Platform after the effective date of any changes constitutes your acceptance of the updated Privacy Policy. If you do not agree with the changes, you should discontinue use of the Platform and delete your account before the effective date."
        },
        {
          label: "11.3 Historical Versions",
          text: "We will maintain copies of previous versions of this Privacy Policy for your reference. If you would like to access a previous version, please contact us at uccguide25@gmail.com. We will provide the requested version within a reasonable timeframe."
        }
      ]
    },
    {
      title: "12. Contact Us",
      content: [
        {
          label: "12.1 Privacy Inquiries",
          text: "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, or if you wish to exercise any of your data protection rights, please contact us: Email: uccguide25@gmail.com. We will respond to your inquiry within a reasonable timeframe, typically within five (5) to ten (10) business days for general inquiries, and within thirty (30) days for data subject requests."
        },
        {
          label: "12.2 Data Protection Officer",
          text: "While we are a small team and do not have a formally appointed Data Protection Officer, all privacy-related matters are handled by our designated data protection contact. You can reach this contact at uccguide25@gmail.com. Please include 'PRIVACY REQUEST' in the subject line for all data subject rights requests to ensure prompt handling."
        },
        {
          label: "12.3 Responding to Your Requests",
          text: "We will make reasonable efforts to respond to your privacy-related requests promptly and thoroughly. We may need to verify your identity before processing certain requests to protect your information from unauthorized access. We will not discriminate against you for exercising any of your privacy rights. To the extent permitted by applicable law, we may charge a reasonable fee for requests that are manifestly unfounded, excessive, or repetitive, or we may refuse to act on such requests."
        }
      ]
    }
  ];

  return (
    <LegalLayout title="Privacy Policy" subtitle="Legal Documentation" lastUpdated="July 16, 2026" icon={Shield}>
      <IntroBlock icon={Shield} text="Campus Guide ('we,' 'our,' or 'us') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our academic planning and community platform, including the mobile application and any related services (collectively, the 'Platform'). By registering for, accessing, or using the Platform, you acknowledge that you have read and understood this Privacy Policy and consent to the collection, use, and disclosure of your information as described herein. This Privacy Policy is incorporated into and forms part of our Terms of Service. Capitalized terms used but not defined in this Privacy Policy have the meanings assigned to them in our Terms of Service." />
      
      <div className="space-y-16">
        {sections.map((section, sIdx) => (
          <section key={sIdx}>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-gray-100 mb-8 tracking-tight">
              {section.title}
            </h2>
            <div className="space-y-8">
              {section.content.map((item, cIdx) => (
                <div key={cIdx} className="space-y-3">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wider">
                    {item.label}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-sm">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            {sIdx < sections.length - 1 && <hr className="mt-12 border-gray-100 dark:border-gray-800" />}
          </section>
        ))}
      </div>
    </LegalLayout>
  );
};

export default TermsOfService;
