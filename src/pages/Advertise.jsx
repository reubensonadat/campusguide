import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Building2, UploadCloud, CheckCircle2, AlertCircle, Phone, LayoutGrid, Star, ChevronRight, Check, ExternalLink, MessageCircle } from 'lucide-react';
import { PaymentButton } from '../components/payment/PaymentButton'; // Simulated Paystack
import CommunityCard from '../components/community/CommunityCard';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { supabase } from '../lib/supabase';

const AD_PACKAGES = [
    {
        id: 'community_dir',
        name: 'Standard Listing',
        description: 'Permanent presence in the Community feed. Great for discoverability.',
        icon: LayoutGrid,
        popular: false,
        color: 'blue',
        prices: [
            { days: 3, price: 50 },
            { days: 7, price: 70, tag: 'Best Value' },
            { days: 14, price: 120 }
        ]
    },
    {
        id: 'home_banner',
        name: 'Premium Banner',
        description: 'Injected directly into Home & Timetable pages. Maximum visibility.',
        icon: Sparkles,
        popular: true,
        color: 'indigo',
        prices: [
            { days: 3, price: 70 },
            { days: 7, price: 100, tag: 'Most Popular' },
            { days: 14, price: 180 }
        ]
    }
];

const Advertise = () => {
    const navigate = useNavigate();
    const [step, setStep] = useLocalStorage('ucc_ad_step', 1);

    // Form State (Persisted)
    const [savedFormData, setSavedFormData] = useLocalStorage('ucc_ad_form_data', {
        businessName: '',
        category: '',
        whatsapp: '',
        contactMethod: 'whatsapp',
        contactUrl: '',
        description: ''
    });

    // Local form state for UI binding (we merge saved with local so we can handle files)
    const [formData, setFormData] = useState({
        ...savedFormData,
        imageFile: null,
        imagePreview: null
    });

    // Sync non-file formData to localStorage when it changes
    useEffect(() => {
        setSavedFormData({
            businessName: formData.businessName,
            category: formData.category,
            whatsapp: formData.whatsapp,
            contactMethod: formData.contactMethod,
            contactUrl: formData.contactUrl,
            description: formData.description
        });
    }, [formData.businessName, formData.category, formData.whatsapp, formData.contactMethod, formData.contactUrl, formData.description, setSavedFormData]);

    // Package State (Persisted)
    const [selectedPackage, setSelectedPackage] = useLocalStorage('ucc_ad_selected_pkg', AD_PACKAGES[0].id);
    const [selectedDuration, setSelectedDuration] = useLocalStorage('ucc_ad_selected_dur', 7);
    const [calculatedPrice, setCalculatedPrice] = useLocalStorage('ucc_ad_calculated_price', 70);

    const activePackage = AD_PACKAGES.find(p => p.id === selectedPackage);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Phone Validation (Allows digits, optional + or spaces)
        if (name === 'whatsapp') {
            if (!/^[\d\s+]*$/.test(value)) return;
            if (value.length > 20) return; // Prevent unreasonable lengths
        }

        setFormData(prev => {
            const nextState = { ...prev, [name]: value };

            // Automatically clear the other field to prevent users from typing both
            if (name === 'contactMethod') {
                if (value === 'link') {
                    nextState.whatsapp = '';
                } else {
                    nextState.contactUrl = '';
                }
            }

            return nextState;
        });
    };

    const formatPhoneNumber = (value) => {
        let cleaned = value.replace(/\D/g, ''); // strip non-digits

        // If it starts with 0 and has around 10 digits (like 0244...), convert it to 233
        if (cleaned.startsWith('0') && cleaned.length >= 10 && cleaned.length <= 11) {
            cleaned = '233' + cleaned.substring(1);
        }

        return cleaned;
    };

    const validateUrl = (urlStr) => {
        if (!urlStr) return false;
        try {
            const url = new URL(urlStr);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                alert("Invalid file format. Please upload a JPEG, PNG, or WebP image.");
                e.target.value = null;
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                alert("File size exceeds 2MB limit. Please upload a smaller image.");
                e.target.value = null; // reset the input
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    imageFile: file,
                    imagePreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Validation checks for buttons
    const isContactMethodValid = () => {
        if (formData.contactMethod === 'link') {
            return validateUrl(formData.contactUrl);
        } else {
            // For whatsapp and phone
            const cleaned = formData.whatsapp ? formData.whatsapp.replace(/\D/g, '') : '';
            return cleaned.length >= 9 && cleaned.length <= 15;
        }
    };

    const isStep2Valid = formData.businessName.trim().length >= 3 && formData.category && isContactMethodValid();

    // UI states

    const handlePriceSelection = (pkgId, days, price) => {
        setSelectedPackage(pkgId);
        setSelectedDuration(days);
        setCalculatedPrice(price);
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSuccess = async (res) => {
        try {
            // Provide immediate feedback to the user while uploading
            const submitButtonText = document.getElementById("submit-ad-text");
            if (submitButtonText) submitButtonText.innerText = "Uploading Ad...";

            let finalImageUrl = null;

            // 1. Upload Flyer to Supabase Storage if an image file exists
            if (formData.imageFile) {
                // Create a unique filename using timestamp and a random string
                const fileExt = formData.imageFile.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `flyers/${fileName}`;

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('ad-images')
                    .upload(filePath, formData.imageFile);

                if (uploadError) {
                    throw new Error("Failed to upload image: " + uploadError.message);
                }

                // Get the public URL for the uploaded image
                const { data: publicUrlData } = supabase.storage
                    .from('ad-images')
                    .getPublicUrl(filePath);

                finalImageUrl = publicUrlData.publicUrl;
            }

            // Calculate Expiry Date based on selected duration
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + selectedDuration);

            // 2. Save Ad Data to Supabase Database
            const { error: dbError } = await supabase
                .from('advertisements')
                .insert([{
                    title: formData.businessName,
                    description: formData.description,
                    phone_number: formatPhoneNumber(formData.whatsapp), // Cleaned number
                    contact_method: formData.contactMethod,
                    contact_url: formData.contactMethod === 'link' ? formData.contactUrl : null,
                    image_url: finalImageUrl,
                    category: formData.category,
                    status: 'PENDING',
                    paystack_reference: res.reference, // Important: Required for Cloudflare webhook verification
                    expires_at: expiryDate.toISOString()
                }]);

            if (dbError) {
                // If database insert fails, we ideally should delete the uploaded image too, but for MVPs this is okay.
                throw new Error("Failed to save advertisement details: " + dbError.message);
            }

            // Success! Clear local storage form data
            setSavedFormData({ businessName: '', category: '', whatsapp: '', contactMethod: 'whatsapp', contactUrl: '', description: '' });
            setStep(1); // Reset to beginning for next time

            // Construct WhatsApp Redirect Message
            const adminPhone = "233201534711"; // Formatted without '+' for wa.me link
            const contactDetail = formData.contactMethod !== 'link' ? `Contact: ${formData.whatsapp}` : `Link: ${formData.contactUrl}`;

            const message = `Hi, please I have made an advertisement for:\n\n` +
                `*Business Name:* ${formData.businessName}\n` +
                `*Category:* ${formData.category}\n` +
                `*${contactDetail}*\n` +
                `*Description:* ${formData.description}\n\n` +
                `I have paid using Paystack. Please verify my Paystack reference:\n` +
                `*${res.reference}*\n\n` +
                `Please verify and tell me how my ad will be shown.`;

            const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;

            // Redirect to WhatsApp - use window.location.href for a direct redirect, avoiding popup blockers
            window.location.href = whatsappUrl;

        } catch (error) {
            console.error("Submission Error:", error);
            alert("Ad submission encountered an issue: " + error.message + "\n\nPlease reach out to support with your Payment Reference: " + res.reference);
        }
    };

    const STEPS = [
        { id: 1, title: 'Guidelines' },
        { id: 2, title: 'Business Details' },
        { id: 3, title: 'Ad Creative' },
        { id: 4, title: 'Checkout' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900 mb-24 sm:pb-0">

            {/* Header */}
            <header className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-30">
                <div className="max-w-3xl mx-auto flex items-center gap-4">
                    <button
                        onClick={() => step === 1 ? navigate(-1) : prevStep()}
                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                            Create Ad Campaign <Sparkles size={18} className="text-amber-500" />
                        </h1>
                        <p className="text-sm font-medium text-gray-500">
                            {step === 4 ? `Step ${step} of 4: Checkout` : `Step ${step} of 4: ${STEPS[step - 1].title}`}
                        </p>
                    </div>
                </div>
            </header>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-gray-100">
                <div
                    className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                    style={{ width: `${(step / 4) * 100}%` }}
                ></div>
            </div>

            <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">

                {/* STEP 1: GUIDELINES */}
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                            <CheckCircle2 size={32} />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-4">Quality & Trust Framework</h2>
                        <p className="text-lg text-gray-600 mb-8 font-medium leading-relaxed">
                            To maintain a premium experience for students, all advertisements are subject to manual review before going live.
                        </p>

                        <div className="space-y-4 mb-10">
                            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex gap-4">
                                <div className="mt-1 text-emerald-500"><Check size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-gray-900">100% Student Focus</h4>
                                    <p className="text-sm text-gray-500 mt-1">Offers must be relevant to university life (Hostels, Food, Tech, Transport, Events).</p>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex gap-4">
                                <div className="mt-1 text-indigo-500"><Check size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Manual Verification</h4>
                                    <p className="text-sm text-gray-500 mt-1">Ads are reviewed within 2 hours. If rejected for violating terms, you receive a full automated refund.</p>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex gap-4">
                                <div className="mt-1 text-pink-500"><Check size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Direct WhatsApp Connections</h4>
                                    <p className="text-sm text-gray-500 mt-1">Students will be routed directly to your WhatsApp to seamlessly complete their purchases.</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={nextStep}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
                        >
                            I Agree, Start Setup
                        </button>
                    </div>
                )}

                {/* STEP 2: BUSINESS DETAILS */}
                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Business Details</h2>
                        <p className="text-gray-500 mb-8 font-medium">How should students contact you?</p>

                        <div className="space-y-6 bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-gray-100">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Brand or Vendor Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                        <Building2 size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="businessName"
                                        value={formData.businessName}
                                        onChange={handleInputChange}
                                        placeholder="e.g. The boys kitchen, Chedar chops..."
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors font-medium text-gray-900"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Marketing Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium text-gray-900 appearance-none"
                                >
                                    <option value="" disabled>Select a category</option>
                                    <option value="food">Food & Delivery</option>
                                    <option value="clothing">Clothing & Fashion</option>
                                    <option value="tech">Tech & Electronics</option>
                                    <option value="services">Student Services</option>
                                    <option value="event">Commercial Event</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-4">Preferred Contact Method</label>
                                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                    <label className={`cursor-pointer rounded-xl border-2 p-3 sm:p-4 flex flex-col items-center justify-center text-center transition-all ${formData.contactMethod === 'whatsapp' ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600'}`}>
                                        <input type="radio" name="contactMethod" value="whatsapp" checked={formData.contactMethod === 'whatsapp'} onChange={handleInputChange} className="hidden" />
                                        <MessageCircle size={20} className="mb-1.5 sm:mb-2 sm:w-6 sm:h-6" />
                                        <span className="font-bold text-[10px] sm:text-sm">WhatsApp</span>
                                    </label>
                                    <label className={`cursor-pointer rounded-xl border-2 p-3 sm:p-4 flex flex-col items-center justify-center text-center transition-all ${formData.contactMethod === 'phone' ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600'}`}>
                                        <input type="radio" name="contactMethod" value="phone" checked={formData.contactMethod === 'phone'} onChange={handleInputChange} className="hidden" />
                                        <Phone size={20} className="mb-1.5 sm:mb-2 sm:w-6 sm:h-6" />
                                        <span className="font-bold text-[10px] sm:text-sm">Phone Call</span>
                                    </label>
                                    <label className={`cursor-pointer rounded-xl border-2 p-3 sm:p-4 flex flex-col items-center justify-center text-center transition-all ${formData.contactMethod === 'link' ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600'}`}>
                                        <input type="radio" name="contactMethod" value="link" checked={formData.contactMethod === 'link'} onChange={handleInputChange} className="hidden" />
                                        <ExternalLink size={20} className="mb-1.5 sm:mb-2 sm:w-6 sm:h-6" />
                                        <span className="font-bold text-[10px] sm:text-sm">Ext. Link</span>
                                    </label>
                                </div>
                            </div>

                            {formData.contactMethod !== 'link' ? (
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between">
                                        <span>{formData.contactMethod === 'whatsapp' ? 'WhatsApp Business Number' : 'Phone Number'}</span>
                                        {formData.whatsapp && formData.whatsapp.replace(/\D/g, '').length > 0 && !(formData.whatsapp.replace(/\D/g, '').length >= 9 && formData.whatsapp.replace(/\D/g, '').length <= 15) && (
                                            <span className="text-red-500 text-xs">Invalid number length</span>
                                        )}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                            <Phone size={18} />
                                        </div>
                                        <input
                                            type="tel"
                                            name="whatsapp"
                                            value={formData.whatsapp}
                                            onChange={handleInputChange}
                                            placeholder="e.g. +233 24 123 4567 or 024 123 4567"
                                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors font-medium text-gray-900"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2 font-medium flex items-center gap-1">
                                        <AlertCircle size={12} /> Students will tap a button to {formData.contactMethod === 'whatsapp' ? 'message you directly' : 'call you directly'}. Leading zeros are converted to +233.
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between">
                                        <span>Website / Product Link</span>
                                        {formData.contactUrl && !validateUrl(formData.contactUrl) && (
                                            <span className="text-red-500 text-xs">Invalid URL format</span>
                                        )}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                            <ExternalLink size={18} />
                                        </div>
                                        <input
                                            type="url"
                                            name="contactUrl"
                                            value={formData.contactUrl}
                                            onChange={handleInputChange}
                                            placeholder="https://yourwebsite.com/product"
                                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors font-medium text-gray-900"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2 font-medium flex items-center gap-1">
                                        <AlertCircle size={12} /> Must include http:// or https://. External links are reviewed for safety.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button
                                onClick={nextStep}
                                disabled={!isStep2Valid}
                                className="flex-1 bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed hover:bg-indigo-700 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all"
                            >
                                Continue to Media
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: CREATIVE / MEDIA */}
                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">The Creative</h2>
                        <p className="text-gray-500 mb-8 font-medium">Upload your flyer and describe your offer.</p>

                        <div className="space-y-6 bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-gray-100">

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Flyer (16:9 or Square)</label>

                                <div className={`relative border-2 rounded-3xl flex flex-col items-center justify-center text-center transition-colors cursor-pointer group overflow-hidden ${formData.imagePreview ? 'border-solid border-indigo-100 bg-black/5' : 'border-dashed border-gray-300 p-8 hover:bg-gray-50 hover:border-indigo-400 bg-gray-50'}`}>

                                    <input
                                        type="file"
                                        accept="image/jpeg, image/png, image/webp"
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                    />

                                    {formData.imagePreview ? (
                                        <div className="relative w-full flex items-center justify-center">
                                            <img
                                                src={formData.imagePreview}
                                                alt="Flyer Preview"
                                                className="w-full max-h-[400px] object-contain bg-black/5"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                                <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-xl backdrop-blur-sm shadow-lg">Change Image</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                                                <UploadCloud size={32} />
                                            </div>
                                            <span className="font-bold text-gray-700">Tap to upload flyer</span>
                                            <span className="text-xs text-gray-400 mt-1 font-medium">JPEG or PNG under 5MB. High quality strongly advised.</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between">
                                    <span>Description / Caption</span>
                                    <span className={`${formData.description.length > 250 ? 'text-red-500' : 'text-gray-400'}`}>
                                        {formData.description.length}/300
                                    </span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    maxLength={300}
                                    rows={4}
                                    placeholder="Keep it extremely punchy. e.g. 'Get 20% off your first meal when you show this ad...'"
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors font-medium text-gray-900 resize-none"
                                />
                                <p className="text-xs text-gray-400 mt-2 font-medium">Note: Only the first 3 lines show automatically on the feed to keep the UI clean.</p>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button
                                onClick={nextStep}
                                disabled={!formData.description.trim() || formData.description.length > 300 || !formData.imagePreview}
                                className="flex-1 bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed hover:bg-indigo-700 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all"
                            >
                                Continue to Packages
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 4: PACKAGE SELECTION & CHECKOUT */}
                {step === 4 && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500 pb-12">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Checkout</h2>
                        <p className="text-gray-500 mb-8 font-medium">Preview your ad, select your placement tier, and duration.</p>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Left Side: Package Selection */}
                            <div className="lg:col-span-7 space-y-6">
                                {AD_PACKAGES.map((pkg) => {
                                    const isSelected = selectedPackage === pkg.id;
                                    const Icon = pkg.icon;
                                    const C = pkg.color === 'indigo'
                                        ? { border: 'border-indigo-600', text: 'text-indigo-600', lightBorder: 'border-indigo-100', iconBg: 'bg-indigo-100', badge: 'bg-indigo-600 text-white', highlightBg: 'bg-indigo-50/50' }
                                        : { border: 'border-blue-600', text: 'text-blue-600', lightBorder: 'border-blue-100', iconBg: 'bg-blue-100', badge: 'bg-blue-600 text-white', highlightBg: 'bg-blue-50/50' };

                                    return (
                                        <div
                                            key={pkg.id}
                                            className={`relative transition-all duration-300 rounded-[2rem] border-2 p-1 bg-white
                                                ${isSelected ? C.border + ' shadow-xl shadow-' + pkg.color + '-200/40' : 'border-transparent shadow-sm hover:shadow-md'}
                                            `}
                                        >
                                            <div className={`rounded-[1.75rem] p-6 border ${isSelected ? C.lightBorder : 'border-gray-100'}`}>
                                                <div className="flex items-start gap-4 mb-5">
                                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${isSelected ? C.iconBg + ' ' + C.text : 'bg-gray-100 text-gray-500'}`}>
                                                        <Icon size={24} />
                                                    </div>
                                                    <div>
                                                        <h4 className={`font-semibold text-xl mb-1 leading-none ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                                                            {pkg.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-500 font-medium leading-relaxed pr-4">
                                                            {pkg.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Interactive Pricing Tiers Selection */}
                                                <div className="grid grid-cols-3 gap-3">
                                                    {pkg.prices.map((price, idx) => {
                                                        const isSpecificPriceSelected = isSelected && selectedDuration === price.days;
                                                        return (
                                                            <div
                                                                key={idx}
                                                                onClick={() => handlePriceSelection(pkg.id, price.days, price.price)}
                                                                className={`relative cursor-pointer flex flex-col items-center justify-center py-4 px-2 rounded-2xl border-2 transition-all ${isSpecificPriceSelected
                                                                    ? C.border + ' ' + C.highlightBg
                                                                    : 'border-gray-100 bg-gray-50 hover:bg-gray-100/80'
                                                                    }`}
                                                            >
                                                                {price.tag && (
                                                                    <span className={`absolute -top-3 ${isSpecificPriceSelected ? C.badge : 'bg-gray-800 text-white'} text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full whitespace-nowrap shadow-sm`}>
                                                                        {price.tag}
                                                                    </span>
                                                                )}
                                                                <span className={`text-xs font-bold mb-1 ${isSpecificPriceSelected ? C.text : 'text-gray-500'}`}>
                                                                    {price.days} Days
                                                                </span>
                                                                <span className={`font-black text-lg sm:text-xl tracking-tight ${isSpecificPriceSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                                                                    GH₵{price.price}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Right Side: Live Ad Preview */}
                            <div className="lg:col-span-5">
                                <div className="sticky top-24">
                                    <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                                        <ExternalLink size={18} className="text-gray-400" />
                                        Live Feed Preview
                                    </h3>
                                    <div className="scale-[0.95] origin-top md:scale-100 transition-transform">
                                        <CommunityCard
                                            post={{
                                                type: 'ad',
                                                title: formData.businessName || 'Your Business Name',
                                                description: formData.description || 'Your promotional description will appear here.',
                                                image: formData.imagePreview,
                                                actionText: formData.contactMethod === 'link' ? 'Visit Link' : formData.contactMethod === 'phone' ? 'Call Now' : 'Message via WhatsApp',
                                                link: formData.contactMethod === 'link'
                                                    ? formData.contactUrl || '#'
                                                    : formData.contactMethod === 'phone'
                                                        ? formData.whatsapp ? `tel:+${formatPhoneNumber(formData.whatsapp)}` : '#'
                                                        : formData.whatsapp
                                                            ? `https://wa.me/${formatPhoneNumber(formData.whatsapp)}?text=${encodeURIComponent(`Hello, I saw an advertisement for ${formData.businessName || 'your business'} on Campus Guide. I would like to make a purchase / find out how much.`)}`
                                                            : '#',
                                            }}
                                        />
                                    </div>
                                    <p className="text-center text-xs text-gray-400 font-medium mt-2">
                                        This is how your ad will appear to students in the feed.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Summary & Checkout Stick to bottom of screen on mobile, inline on desktop */}
                        <div className="mt-8 bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="w-full sm:w-auto text-center sm:text-left">
                                <span className="font-bold text-gray-500 block mb-1">Total to Pay</span>
                                <div className="font-black text-3xl sm:text-4xl text-gray-900 tracking-tight">GH₵{calculatedPrice}.00</div>
                                <div className="text-sm text-indigo-600 font-bold mt-1">
                                    {activePackage?.name} • {selectedDuration} Days
                                </div>
                            </div>

                            <div className="w-full sm:w-auto flex-1 max-w-sm">
                                <PaymentButton
                                    amount={calculatedPrice}
                                    email={"vendor@uccguide.com"}
                                    onPaymentSuccess={handleSuccess}
                                    className="w-full py-5 rounded-2xl font-bold text-white text-lg shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <span id="submit-ad-text">Pay & Submit Ad</span> <ExternalLink size={20} />
                                </PaymentButton>
                                <p className="text-center text-xs text-gray-400 font-medium mt-3 flex items-center justify-center gap-1.5">
                                    <CheckCircle2 size={14} className="text-emerald-500" /> Secure Checkout via Paystack
                                </p>
                            </div>
                        </div>

                    </div>
                )}

            </main>
        </div>
    );
};

export default Advertise;
