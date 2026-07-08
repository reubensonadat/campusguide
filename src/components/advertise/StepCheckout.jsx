import { ExternalLink, CheckCircle2 } from 'lucide-react';
import CommunityCard from '../community/CommunityCard';
import { PaymentButton } from '../payment/PaymentButton';
import { AD_PACKAGES } from './constants';
import SocialProofBadge from './SocialProofBadge';
import { formatPhoneNumber } from './helpers';

const colorMap = {
    primary: {
        border: 'border-primary-600',
        text: 'text-primary-600',
        lightBorder: 'border-primary-100',
        iconBg: 'bg-primary-100',
        badge: 'bg-primary-600 text-white',
        highlightBg: 'bg-primary-50/50'
    },
    blue: {
        border: 'border-blue-600',
        text: 'text-blue-600',
        lightBorder: 'border-blue-100',
        iconBg: 'bg-blue-100',
        badge: 'bg-blue-600 text-white',
        highlightBg: 'bg-blue-50/50'
    }
};

const StepCheckout = ({ formData, selectedPackage, selectedDuration, calculatedPrice, onPriceSelection, onSuccess }) => {
    const activePackage = AD_PACKAGES.find(p => p.id === selectedPackage);

    return (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500 pb-12">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Checkout</h2>
            <p className="text-gray-500 mb-6 font-medium">Preview your ad, select your placement tier, and duration.</p>

            <SocialProofBadge variant="checkout" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-6">
                    {AD_PACKAGES.map((pkg) => {
                        const isSelected = selectedPackage === pkg.id;
                        const Icon = pkg.icon;
                        const C = colorMap[pkg.color] || colorMap.blue;

                        return (
                            <div
                                key={pkg.id}
                                className={`relative transition-all duration-300 rounded-xl border-2 p-1 bg-white
                                    ${isSelected ? C.border + ' shadow-xl shadow-' + pkg.color + '-200/40' : 'border-transparent shadow-sm hover:shadow-md'}
                                `}
                            >
                                <div className={`rounded-xl p-6 border ${isSelected ? C.lightBorder : 'border-gray-100'}`}>
                                    <div className="flex items-start gap-4 mb-5">
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? C.iconBg + ' ' + C.text : 'bg-gray-100 text-gray-500'}`}>
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

                                    <div className="grid grid-cols-3 gap-3">
                                        {pkg.prices.map((price, idx) => {
                                            const isSpecificPriceSelected = isSelected && selectedDuration === price.days;
                                            return (
                                                <div
                                                    key={idx}
                                                    onClick={() => onPriceSelection(pkg.id, price.days, price.price)}
                                                    className={`relative cursor-pointer flex flex-col items-center justify-center py-4 px-2 rounded-xl border-2 transition-all ${isSpecificPriceSelected
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

            <div className="mt-8 bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="w-full sm:w-auto text-center sm:text-left">
                    <span className="font-bold text-gray-500 block mb-1">Total to Pay</span>
                    <div className="font-black text-3xl sm:text-4xl text-gray-900 tracking-tight">GH₵{calculatedPrice}.00</div>
                    <div className="text-sm text-primary-600 font-bold mt-1">
                        {activePackage?.name} • {selectedDuration} Days
                    </div>
                </div>

                <div className="w-full sm:w-auto flex-1 max-w-sm">
                    <PaymentButton
                        amount={calculatedPrice}
                        email={"vendor@uccguide.com"}
                        onPaymentSuccess={onSuccess}
                        className="w-full py-5 rounded-xl font-bold text-white text-lg shadow-xl shadow-primary-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700"
                    >
                        <span id="submit-ad-text">Pay & Submit Ad</span> <ExternalLink size={20} />
                    </PaymentButton>
                    <p className="text-center text-xs text-gray-400 font-medium mt-3 flex items-center justify-center gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-500" /> Secure Checkout via Paystack
                    </p>
                </div>
            </div>

        </div>
    );
};

export default StepCheckout;
