import { Building2, Phone, AlertCircle, ExternalLink, MessageCircle } from 'lucide-react';
import { validateUrl } from './helpers';

const StepBusinessDetails = ({ formData, onInputChange, onNext }) => {
    const isContactMethodValid = () => {
        if (formData.contactMethod === 'link') {
            return validateUrl(formData.contactUrl);
        } else {
            const cleaned = formData.whatsapp ? formData.whatsapp.replace(/\D/g, '') : '';
            return cleaned.length >= 9 && cleaned.length <= 15;
        }
    };

    const isStep2Valid = formData.businessName.trim().length >= 3 && formData.category && isContactMethodValid();

    return (
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
                            onChange={onInputChange}
                            placeholder="e.g. The boys kitchen, Chedar chops..."
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors font-medium text-gray-900"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Marketing Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={onInputChange}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-medium text-gray-900 appearance-none"
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
                        <label className={`cursor-pointer rounded-xl border-2 p-3 sm:p-4 flex flex-col items-center justify-center text-center transition-all ${formData.contactMethod === 'whatsapp' ? 'border-primary-600 bg-primary-50/50 text-primary-700' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600'}`}>
                            <input type="radio" name="contactMethod" value="whatsapp" checked={formData.contactMethod === 'whatsapp'} onChange={onInputChange} className="hidden" />
                            <MessageCircle size={20} className="mb-1.5 sm:mb-2 sm:w-6 sm:h-6" />
                            <span className="font-bold text-[10px] sm:text-sm">WhatsApp</span>
                        </label>
                        <label className={`cursor-pointer rounded-xl border-2 p-3 sm:p-4 flex flex-col items-center justify-center text-center transition-all ${formData.contactMethod === 'phone' ? 'border-primary-600 bg-primary-50/50 text-primary-700' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600'}`}>
                            <input type="radio" name="contactMethod" value="phone" checked={formData.contactMethod === 'phone'} onChange={onInputChange} className="hidden" />
                            <Phone size={20} className="mb-1.5 sm:mb-2 sm:w-6 sm:h-6" />
                            <span className="font-bold text-[10px] sm:text-sm">Phone Call</span>
                        </label>
                        <label className={`cursor-pointer rounded-xl border-2 p-3 sm:p-4 flex flex-col items-center justify-center text-center transition-all ${formData.contactMethod === 'link' ? 'border-primary-600 bg-primary-50/50 text-primary-700' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600'}`}>
                            <input type="radio" name="contactMethod" value="link" checked={formData.contactMethod === 'link'} onChange={onInputChange} className="hidden" />
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
                                onChange={onInputChange}
                                placeholder="e.g. +233 24 123 4567 or 024 123 4567"
                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors font-medium text-gray-900"
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
                                onChange={onInputChange}
                                placeholder="https://yourwebsite.com/product"
                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors font-medium text-gray-900"
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
                    onClick={onNext}
                    disabled={!isStep2Valid}
                    className="flex-1 bg-primary-600 disabled:bg-primary-300 disabled:cursor-not-allowed hover:bg-primary-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary-200 transition-all"
                >
                    Continue to Media
                </button>
            </div>
        </div>
    );
};

export default StepBusinessDetails;
