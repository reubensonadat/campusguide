import React, { useState } from 'react';
import { X, UploadCloud, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../../lib/supabase';
import ModalPortal from '../common/ModalPortal';

const LostFoundModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        itemName: '',
        description: '',
        location: '',
        contactInfo: '',
        status: 'lost',
        imageFile: null,
        imagePreview: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size exceeds 5MB limit.");
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (localStorage.getItem('ucc_has_posted_lost_found') === 'true') {
                toast.error("You can only post one Lost & Found item per device to prevent spam.");
                setIsSubmitting(false);
                return;
            }

            const userId = localStorage.getItem('supabase_user_id') || 'anonymous';
            let finalImageUrl = null;

            if (formData.imageFile) {
                const file = formData.imageFile;

                // 1. Get Presigned URL from Cloudflare R2 Edge Function
                const { data: uploadInfo, error: fnError } = await supabase.functions.invoke('generate-upload-url', {
                    body: {
                        fileName: file.name,
                        fileType: file.type,
                        fileSize: file.size,
                        userId: userId
                    }
                });

                if (fnError) {
                    throw new Error("Failed to get upload URL: " + fnError.message);
                }

                if (uploadInfo?.error) {
                    throw new Error("Upload configuration error: " + uploadInfo.error);
                }

                const { presignedUrl, publicUrl } = uploadInfo;

                console.log("SUCCESSFULLY GOT UPLOAD INFO FROM EDGE FUNCTION:");
                console.log("Presigned URL:", presignedUrl);
                console.log("Public URL:", publicUrl);

                // 2. Upload directly to Cloudflare R2 using the presigned URL
                try {
                    const uploadRes = await fetch(presignedUrl, {
                        method: 'PUT',
                        body: file,
                        headers: {
                            'Content-Type': file.type
                        }
                    });

                    if (!uploadRes.ok) {
                        const errorText = await uploadRes.text();
                        console.error("R2 Upload Failed:", uploadRes.status, errorText);
                        throw new Error(`Cloudflare R2 rejected the upload (Status ${uploadRes.status}): ${errorText}`);
                    }
                } catch (fetchErr) {
                    console.error("BROWSER FAILED TO FETCH THE PRESIGNED URL:", fetchErr);
                    throw new Error(`Network/CORS error when hitting R2. URL was: ${presignedUrl.substring(0, 50)}...`);
                }

                finalImageUrl = publicUrl;
            }

            // 3. Insert into Supabase database
            const { error: dbError } = await supabase
                .from('lost_and_found')
                .insert([{
                    user_id: userId,
                    item_name: formData.itemName,
                    description: formData.description,
                    location: formData.location,
                    contact_info: formData.contactInfo,
                    type: formData.status,
                    status: 'active',
                    image_url: finalImageUrl
                }]);

            if (dbError) throw new Error("DB Error: " + dbError.message);

            localStorage.setItem('ucc_has_posted_lost_found', 'true');
            onSuccess(); // Refresh feed
            onClose(); // Close modal
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to submit: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ModalPortal>
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-gray-900/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200" onClick={onClose}>
            <div className="bg-white w-full sm:w-[480px] sm:rounded-3xl rounded-t-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-4 duration-300" onClick={e => e.stopPropagation()}>
                
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Report Lost/Found Item</h2>
                    <button onClick={onClose} className="p-2 bg-gray-50 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-5 overflow-y-auto custom-scrollbar">
                    <form id="lostfound-form" onSubmit={handleSubmit} className="space-y-4">
                        
                        <div className="flex gap-4">
                            <label className={`flex-1 cursor-pointer rounded-xl border-2 p-3 text-center transition-all ${formData.status === 'lost' ? 'border-rose-500 bg-rose-50 text-rose-700 font-bold' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}>
                                <input type="radio" name="status" value="lost" checked={formData.status === 'lost'} onChange={handleInputChange} className="hidden" />
                                I lost something
                            </label>
                            <label className={`flex-1 cursor-pointer rounded-xl border-2 p-3 text-center transition-all ${formData.status === 'found' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}>
                                <input type="radio" name="status" value="found" checked={formData.status === 'found'} onChange={handleInputChange} className="hidden" />
                                I found something
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Item Name</label>
                            <input required type="text" name="itemName" value={formData.itemName} onChange={handleInputChange} placeholder="e.g. Blue HP Laptop, Student ID Card" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Where was it {formData.status}?</label>
                            <input required type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. Library 2nd Floor, Science Quad" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Description (Colors, marks, etc)</label>
                            <textarea required name="description" value={formData.description} onChange={handleInputChange} rows={3} placeholder="Provide any details to help identify the item..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 resize-none" />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Contact Phone/WhatsApp</label>
                            <input required type="text" name="contactInfo" value={formData.contactInfo} onChange={handleInputChange} placeholder="e.g. 055 123 4567" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Photo (Optional but helpful)</label>
                            <div className={`relative border-2 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden ${formData.imagePreview ? 'border-solid border-primary-200 bg-black/5' : 'border-dashed border-gray-300 p-6 hover:bg-gray-50'}`}>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                                {formData.imagePreview ? (
                                    <img src={formData.imagePreview} alt="Preview" className="w-full h-32 object-contain bg-black/5" />
                                ) : (
                                    <>
                                        <UploadCloud className="text-gray-400 mb-2" size={24} />
                                        <span className="text-sm font-bold text-gray-600">Tap to upload photo</span>
                                    </>
                                )}
                            </div>
                        </div>

                    </form>
                </div>

                <div className="p-5 border-t border-gray-100 bg-gray-50">
                    <button form="lostfound-form" type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white font-bold rounded-xl shadow-lg shadow-primary-200 flex items-center justify-center gap-2 transition-all">
                        {isSubmitting ? (
                            <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Uploading...</>
                        ) : (
                            <><CheckCircle2 size={20} /> Post Item</>
                        )}
                    </button>
                </div>
            </div>
        </div>
        </ModalPortal>
    );
};

export default LostFoundModal;
