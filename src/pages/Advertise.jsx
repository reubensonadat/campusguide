import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { AD_PACKAGES, STEPS, formatPhoneNumber, StepGuidelines, StepBusinessDetails, StepCreative, StepCheckout } from '../components/advertise';

const Advertise = () => {
    const navigate = useNavigate();
    const [step, setStep] = useLocalStorage('ucc_ad_step', 1);

    const [userCount, setUserCount] = useState(null);

    useEffect(() => {
        supabase
            .from('users')
            .select('id', { count: 'exact', head: true })
            .then(({ count }) => {
                if (count && count > 0) {
                    setUserCount(count.toLocaleString());
                }
            })
            .catch(() => {});
    }, []);

    const [savedFormData, setSavedFormData] = useLocalStorage('ucc_ad_form_data', {
        businessName: '',
        category: '',
        whatsapp: '',
        contactMethod: 'whatsapp',
        contactUrl: '',
        description: ''
    });

    const [formData, setFormData] = useState({
        ...savedFormData,
        imageFile: null,
        imagePreview: null
    });

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

    const [selectedPackage, setSelectedPackage] = useLocalStorage('ucc_ad_selected_pkg', AD_PACKAGES[0].id);
    const [selectedDuration, setSelectedDuration] = useLocalStorage('ucc_ad_selected_dur', 7);
    const [calculatedPrice, setCalculatedPrice] = useLocalStorage('ucc_ad_calculated_price', 70);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'whatsapp') {
            if (!/^[\d\s+]*$/.test(value)) return;
            if (value.length > 20) return;
        }

        setFormData(prev => {
            const nextState = { ...prev, [name]: value };

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

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                toast.error("Invalid file format. Please upload a JPEG, PNG, or WebP image.");
                e.target.value = null;
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                toast.error("File size exceeds 2MB limit. Please upload a smaller image.");
                e.target.value = null;
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

    const handlePriceSelection = (pkgId, days, price) => {
        setSelectedPackage(pkgId);
        setSelectedDuration(days);
        setCalculatedPrice(price);
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSuccess = async (res) => {
        try {
            const submitButtonText = document.getElementById("submit-ad-text");
            if (submitButtonText) submitButtonText.innerText = "Uploading Ad...";

            let finalImageUrl = null;
            let adminWarning = '';

            if (formData.imageFile) {
                try {
                    const { data: uploadInfo, error: fnError } = await supabase.functions.invoke('generate-upload-url', {
                        body: {
                            fileName: formData.imageFile.name,
                            fileType: formData.imageFile.type,
                            fileSize: formData.imageFile.size,
                            userId: localStorage.getItem('supabase_user_id') || 'anonymous'
                        }
                    });

                    if (fnError) {
                        throw new Error("Failed to get upload URL: " + fnError.message);
                    }

                    if (uploadInfo?.error) {
                        throw new Error("Upload configuration error: " + uploadInfo.error);
                    }

                    const { presignedUrl, publicUrl } = uploadInfo;

                    const uploadRes = await fetch(presignedUrl, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': formData.imageFile.type
                        },
                        body: formData.imageFile
                    });

                    if (!uploadRes.ok) {
                        throw new Error("Failed to upload image to Cloudflare R2");
                    }

                    finalImageUrl = publicUrl;
                } catch (imgError) {
                    console.error("Image upload failed after payment:", imgError);
                    adminWarning = "\n\n[ADMIN NOTE: The user successfully paid, but their image failed to upload due to a network/server error. Please contact them to get their flyer.]";
                }
            }

            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + selectedDuration);

            const { error: dbError } = await supabase
                .from('advertisements')
                .insert([{
                    title: formData.businessName,
                    description: formData.description + adminWarning,
                    phone_number: formatPhoneNumber(formData.whatsapp),
                    contact_method: formData.contactMethod,
                    contact_url: formData.contactMethod === 'link' ? formData.contactUrl : null,
                    image_url: finalImageUrl,
                    category: formData.category,
                    package_id: selectedPackage,
                    status: 'PENDING',
                    paystack_reference: res.reference,
                    expires_at: expiryDate.toISOString()
                }]);

            if (dbError) {
                throw new Error("Failed to save advertisement details: " + dbError.message);
            }

            setSavedFormData({ businessName: '', category: '', whatsapp: '', contactMethod: 'whatsapp', contactUrl: '', description: '' });
            setStep(1);

            const adminPhone = "233201534711";
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

            window.location.href = whatsappUrl;

        } catch (error) {
            console.error("Submission Error:", error);
            toast.error("Ad submission encountered an issue: " + error.message + "\n\nPlease reach out to support with your Payment Reference: " + res.reference);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-primary-100 selection:text-primary-900 mb-24 sm:pb-0">

            <header className="bg-white border-b border-gray-100 px-4 pt-[calc(1rem_+_env(safe-area-inset-top,0px))] pb-4 sticky top-0 z-30">
                <div className="max-w-3xl mx-auto flex items-center gap-4">
                    <button
                        onClick={() => step === 1 ? navigate(-1) : prevStep()}
                        className="p-2 -ml-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-gray-900 tracking-tight">
                            Create Ad Campaign
                        </h1>
                    </div>
                </div>
            </header>

            <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 pt-6">
                <div className="flex gap-2">
                    {STEPS.map(s => (
                        <div 
                            key={s.id} 
                            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${s.id <= step ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-800'}`}
                            title={s.title}
                        />
                    ))}
                </div>
            </div>

            <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">

                {step === 1 && (
                    <StepGuidelines userCount={userCount} onNext={nextStep} />
                )}

                {step === 2 && (
                    <StepBusinessDetails formData={formData} onInputChange={handleInputChange} onNext={nextStep} />
                )}

                {step === 3 && (
                    <StepCreative formData={formData} onInputChange={handleInputChange} onImageUpload={handleImageUpload} onNext={nextStep} />
                )}

                {step === 4 && (
                    <StepCheckout
                        formData={formData}
                        selectedPackage={selectedPackage}
                        selectedDuration={selectedDuration}
                        calculatedPrice={calculatedPrice}
                        onPriceSelection={handlePriceSelection}
                        onSuccess={handleSuccess}
                    />
                )}

            </main>
        </div>
    );
};

export default Advertise;
