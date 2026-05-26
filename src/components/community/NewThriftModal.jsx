import React, { useState } from 'react';
import { X, UploadCloud, Tag, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { addThriftListing } from '../../services/communityService';
import { PaymentButton } from '../payment/PaymentButton';

const NewThriftModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        condition: 'Used - Good',
        location: '',
        whatsapp: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        if (!formData.title || !formData.price || !formData.location || !formData.whatsapp) {
            toast.error('Please fill out all required fields.');
            return;
        }
        setStep(2);
    };

    const handleSuccess = async (res) => {
        setSubmitting(true);
        const { success, error } = await addThriftListing({ ...formData, paystack_reference: res.reference });
        setSubmitting(false);
        
        if (success) {
            setFormData({ title: '', price: '', condition: 'Used - Good', location: '', whatsapp: '' });
            toast.success('Listing posted and sent for review!');
            setStep(1);
            onClose();
        } else {
            toast.error(error || 'Failed to post item.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-200">
            <div className="absolute inset-0" onClick={onClose}></div>
            <div className="relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-4 duration-300 flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h3 className="font-black text-gray-900 text-lg flex items-center gap-2">
                        <Tag size={18} className="text-primary-500"/> Sell an Item
                    </h3>
                    <button onClick={onClose} className="p-2 bg-gray-50 text-gray-400 hover:text-gray-600 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-5 overflow-y-auto custom-scrollbar">
                    {step === 1 ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Item Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Mini Fridge (Hisense)" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-primary-500 font-medium" />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Price (GH₵)</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="0.00" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-primary-500 font-medium" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Condition</label>
                                    <select name="condition" value={formData.condition} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-primary-500 font-medium">
                                        <option>Like New</option>
                                        <option>Used - Good</option>
                                        <option>Used - Fair</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Your Location/Hostel</label>
                                <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. Casford Block C" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-primary-500 font-medium" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">WhatsApp Number</label>
                                <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="024 XXX XXXX" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-primary-500 font-medium" />
                            </div>

                            <button onClick={handleNext} className="w-full mt-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl transition-colors">
                                Next: Upload Photo
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                                <UploadCloud size={32} className="text-gray-400 mb-2" />
                                <span className="font-bold text-gray-700">Tap to upload clear photo</span>
                                <span className="text-xs font-medium text-gray-400 mt-1">Required to sell</span>
                            </div>

                            <div className="bg-primary-50 text-primary-800 p-4 rounded-xl text-sm font-medium">
                                <span className="font-bold block mb-1">Important Rules:</span>
                                • Listing fee is GH₵ 10<br/>
                                • Needs admin approval (like ads)<br/>
                                • Expires automatically in 7 days
                            </div>

                            <div className="flex gap-3">
                                <button onClick={() => setStep(1)} disabled={submitting} className="px-4 py-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 font-bold rounded-xl transition-colors">
                                    Back
                                </button>
                                <div className="flex-1">
                                    <PaymentButton
                                        amount={10}
                                        email="thrift@campusguide.com"
                                        onSuccess={handleSuccess}
                                        buttonText="Pay GH₵10 & Submit"
                                        className="w-full flex justify-center items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-primary-200"
                                    />
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
