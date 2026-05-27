import React, { useState, useRef, useCallback } from 'react';
import { X, UploadCloud, Tag, Image, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { addThriftListing } from '../../services/communityService';
import { PaymentButton } from '../payment/PaymentButton';
import { supabase } from '../../lib/supabase';
import { DataLoader } from '../common/CustomLoaders';

const NewThriftModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        condition: 'Brand New',
        location: '',
        whatsapp: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const processFile = (file) => {
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            toast.error('Please upload a JPEG, PNG, or WebP image.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image must be under 5MB.');
            return;
        }

        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleFileInput = (e) => {
        processFile(e.target.files[0]);
        // Reset input so same file can be re-selected
        e.target.value = null;
    };

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        processFile(file);
    }, []);

    const handleNext = () => {
        if (!formData.title || !formData.price || !formData.location || !formData.whatsapp) {
            toast.error('Please fill out all required fields.');
            return;
        }
        setStep(2);
    };

    const handleSuccess = async (res) => {
        setUploading(true);
        let finalImageUrl = null;

        // Upload image if one was selected
        if (imageFile) {
            try {
                const { data: uploadInfo, error: fnError } = await supabase.functions.invoke('generate-upload-url', {
                    body: {
                        fileName: imageFile.name,
                        fileType: imageFile.type,
                        fileSize: imageFile.size,
                        userId: localStorage.getItem('supabase_user_id') || 'anonymous'
                    }
                });

                if (!fnError && uploadInfo && !uploadInfo.error) {
                    const uploadRes = await fetch(uploadInfo.presignedUrl, {
                        method: 'PUT',
                        headers: { 'Content-Type': imageFile.type },
                        body: imageFile
                    });
                    if (uploadRes.ok) {
                        finalImageUrl = uploadInfo.publicUrl;
                    }
                }
            } catch (imgError) {
                console.warn('Image upload failed, continuing without image:', imgError);
            }
        }

        const { success, error } = await addThriftListing({
            ...formData,
            image_url: finalImageUrl,
            paystack_reference: res.reference
        });
        setUploading(false);

        if (success) {
            setFormData({ title: '', price: '', condition: 'Used - Good', location: '', whatsapp: '' });
            setImageFile(null);
            setImagePreview(null);
            toast.success('Listing posted and sent for review!');
            setStep(1);
            onClose();
        } else {
            toast.error(error || 'Failed to post item.');
        }
    };

    const handleClose = () => {
        setStep(1);
        setImageFile(null);
        setImagePreview(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-200">
            <div className="absolute inset-0" onClick={handleClose} />
            <div className="relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-4 duration-300 flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h3 className="font-black text-gray-900 text-lg flex items-center gap-2">
                        <Tag size={18} className="text-primary-500"/> Sell an Item
                    </h3>
                    <button onClick={handleClose} className="p-2 bg-gray-50 text-gray-400 hover:text-gray-600 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Step Indicator */}
                <div className="flex px-5 pt-4 gap-2">
                    {[1, 2].map(s => (
                        <div key={s} className={`h-1 flex-1 rounded-full transition-all ${s <= step ? 'bg-primary-600' : 'bg-gray-100'}`} />
                    ))}
                </div>

                <div className="p-5 overflow-y-auto custom-scrollbar">
                    {step === 1 ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Item Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Mini Fridge (Hisense)" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-primary-500 font-medium outline-none" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Price (GH₵)</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="0.00" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-primary-500 font-medium outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Condition</label>
                                    <select name="condition" value={formData.condition} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-primary-500 font-medium outline-none">
                                        <option>Brand New</option>
                                        <option>Like New</option>
                                        <option>Used - Good</option>
                                        <option>Used - Fair</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Your Location / Hostel</label>
                                <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. Casford Block C" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-primary-500 font-medium outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">WhatsApp Number</label>
                                <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="024 XXX XXXX" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-primary-500 font-medium outline-none" />
                            </div>

                            <button onClick={handleNext} className="w-full mt-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl transition-colors">
                                Next: Upload Photo
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {/* Image Upload Zone */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                                    <Image size={14} /> Item Photo <span className="text-red-500">*</span>
                                </label>

                                {/* Hidden file input */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleFileInput}
                                    className="hidden"
                                />

                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`relative border-2 rounded-xl cursor-pointer transition-all overflow-hidden group
                                        ${isDragging ? 'border-primary-500 bg-primary-50 scale-[1.01]' : imagePreview ? 'border-primary-200 bg-gray-50' : 'border-dashed border-gray-300 bg-gray-50 hover:bg-primary-50 hover:border-primary-400'}
                                    `}
                                >
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img src={imagePreview} alt="Preview" className="w-full max-h-56 object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-xl backdrop-blur-sm text-sm">
                                                    Tap to change photo
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-8 flex flex-col items-center justify-center text-center">
                                            <UploadCloud size={32} className={`mb-2 transition-colors ${isDragging ? 'text-primary-500' : 'text-gray-400'}`} />
                                            <span className="font-bold text-gray-700">
                                                {isDragging ? 'Drop it here!' : 'Tap to upload or drag & drop'}
                                            </span>
                                            <span className="text-xs font-medium text-gray-400 mt-1">JPEG, PNG or WebP • Max 5MB</span>
                                        </div>
                                    )}
                                </div>

                                {imagePreview && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(null); }}
                                        className="mt-2 text-xs text-red-500 font-bold hover:underline"
                                    >
                                        Remove photo
                                    </button>
                                )}
                            </div>

                            <div className="bg-amber-50 text-amber-800 p-4 rounded-xl text-sm font-medium border border-amber-100">
                                <span className="font-bold block mb-1">📋 Important Rules:</span>
                                • Listing fee is GH₵ 10<br/>
                                • Needs admin approval before going live<br/>
                                • Expires automatically in 7 days
                            </div>

                            {uploading && (
                                <div className="flex items-center justify-center gap-2 py-2 text-primary-600 font-semibold text-sm">
                                    <DataLoader className="w-5 h-5" />
                                    Uploading & submitting...
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button onClick={() => setStep(1)} disabled={uploading} className="px-4 py-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 font-bold rounded-xl transition-colors">
                                    Back
                                </button>
                                <div className="flex-1">
                                    <PaymentButton
                                        amount={10}
                                        email="thrift@campusguide.com"
                                        onPaymentSuccess={handleSuccess}
                                        onPaymentError={(err) => toast.error(err.message || 'Payment failed.')}
                                        disabled={!imagePreview || uploading}
                                        className="w-full flex justify-center items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-primary-200"
                                    >
                                        Pay GH₵10 & Post Item
                                    </PaymentButton>
                                    {!imagePreview && (
                                        <p className="text-center text-xs text-red-500 font-medium mt-2">Upload a photo to continue</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewThriftModal;
