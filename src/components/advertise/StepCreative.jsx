import { UploadCloud } from 'lucide-react';

const StepCreative = ({ formData, onInputChange, onImageUpload, onNext }) => {
    return (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">The Creative</h2>
            <p className="text-gray-500 mb-8 font-medium">Upload your flyer and describe your offer.</p>

            <div className="space-y-6 bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-gray-100">

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Flyer (16:9 or Square)</label>

                    <div className={`relative border-2 rounded-xl flex flex-col items-center justify-center text-center transition-colors cursor-pointer group overflow-hidden ${formData.imagePreview ? 'border-solid border-primary-100 bg-black/5' : 'border-dashed border-gray-300 p-8 hover:bg-gray-50 hover:border-primary-400 bg-gray-50'}`}>

                        <input
                            type="file"
                            accept="image/jpeg, image/png, image/webp"
                            onChange={onImageUpload}
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
                                <div className="w-16 h-16 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
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
                        onChange={onInputChange}
                        maxLength={300}
                        rows={4}
                        placeholder="Keep it extremely punchy. e.g. 'Get 20% off your first meal when you show this ad...'"
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors font-medium text-gray-900 resize-none"
                    />
                    <p className="text-xs text-gray-400 mt-2 font-medium">Note: Only the first 3 lines show automatically on the feed to keep the UI clean.</p>
                </div>
            </div>

            <div className="mt-8 flex gap-4">
                <button
                    onClick={onNext}
                    disabled={!formData.description.trim() || formData.description.length > 300 || !formData.imagePreview}
                    className="flex-1 bg-primary-600 disabled:bg-primary-300 disabled:cursor-not-allowed hover:bg-primary-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary-200 transition-all"
                >
                    Continue to Packages
                </button>
            </div>
        </div>
    );
};

export default StepCreative;
