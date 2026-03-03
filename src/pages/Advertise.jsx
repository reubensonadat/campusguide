import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Building2, UploadCloud, CheckCircle2, AlertCircle, Phone, LayoutGrid, Star, ChevronRight, Check, ExternalLink } from 'lucide-react';
import { PaymentButton } from '../components/payment/PaymentButton'; // Simulated Paystack

const AD_PACKAGES = [
    {
        id: 'community_dir',
        name: 'Standard Listing',
        description: 'Permanent presence in the Community feed. Great for discoverability.',
        icon: LayoutGrid,
        popular: false,
        color: 'amber',
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
    const [step, setStep] = useState(1);

    // Form State
    const [formData, setFormData] = useState({
        businessName: '',
        category: '',
        whatsapp: '',
        description: '',
        imageFile: null // In real app, this would be an uploaded file or URL
    });

    // Package State
    const [selectedPackage, setSelectedPackage] = useState(AD_PACKAGES[1].id);
    const [selectedDuration, setSelectedDuration] = useState(7);
    const [calculatedPrice, setCalculatedPrice] = useState(100);

    const activePackage = AD_PACKAGES.find(p => p.id === selectedPackage);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Strict WhatsApp Validation (Allows digits, optional + or spaces, minimum length 10)
        if (name === 'whatsapp') {
            // Only allow typing numbers, space, and +
            if (!/^[\d\s+]*$/.test(value)) return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // In a real app, you'd check file size (e.g., file.size < 5000000 for 5MB)
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
    const isStep2Valid = formData.businessName.length > 2 && formData.category && formData.whatsapp.replace(/\D/g, '').length >= 9;

    // UI states


    const handlePriceSelection = (pkgId, days, price) => {
        setSelectedPackage(pkgId);
        setSelectedDuration(days);
        setCalculatedPrice(price);
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSuccess = (res) => {
        // Here we'd typically save data to Supabase with status: 'pending'
        alert("Payment successful! Your ad is now pending manual review. We will reach out via WhatsApp once approved.");
        navigate('/community');
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
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between">
                                    <span>WhatsApp Business Number</span>
                                    {formData.whatsapp && formData.whatsapp.replace(/\D/g, '').length < 9 && (
                                        <span className="text-red-500 text-xs">Invalid number</span>
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
                                        placeholder="024 123 4567"
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors font-medium text-gray-900"
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-2 font-medium flex items-center gap-1">
                                    <AlertCircle size={12} /> Students will tap a button to message you directly.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button
                                onClick={nextStep}
                                disabled={!formData.businessName || !formData.category || !formData.whatsapp}
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

                                <div className="relative border-2 border-dashed border-gray-300 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-indigo-400 transition-colors cursor-pointer group overflow-hidden bg-gray-50">

                                    <input
                                        type="file"
                                        accept="image/jpeg, image/png, image/webp"
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />

                                    {formData.imagePreview ? (
                                        <div className="absolute inset-0 w-full h-full bg-black/5">
                                            <img
                                                src={formData.imagePreview}
                                                alt="Flyer Preview"
                                                className="w-full h-full object-contain"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
                                disabled={!formData.description || !formData.imagePreview}
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
                        <p className="text-gray-500 mb-8 font-medium">Select your placement tier and duration.</p>

                        <div className="space-y-6">
                            {AD_PACKAGES.map((pkg) => {
                                const isSelected = selectedPackage === pkg.id;
                                const Icon = pkg.icon;
                                const C = pkg.color === 'indigo'
                                    ? { border: 'border-indigo-600', text: 'text-indigo-600', lightBorder: 'border-indigo-100', iconBg: 'bg-indigo-100', badge: 'bg-indigo-600 text-white', highlightBg: 'bg-indigo-50/50' }
                                    : { border: 'border-amber-500', text: 'text-amber-600', lightBorder: 'border-amber-100', iconBg: 'bg-amber-100', badge: 'bg-amber-500 text-white', highlightBg: 'bg-amber-50/50' };

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
                                                    <h4 className={`font-bold text-xl mb-1 leading-none ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
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
                                    Pay & Submit Ad <ExternalLink size={20} />
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
