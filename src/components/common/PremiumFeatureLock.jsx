import { useAppContext } from '../../context/AppContext';
import { usePremiumAccess } from '../../hooks/usePremiumAccess';

const PremiumFeatureLock = ({ children, featureName = 'this feature' }) => {
  const { actions } = useAppContext();
  const { hasPremiumFeatures } = usePremiumAccess();

  if (hasPremiumFeatures) {
    return children;
  }

  return (
    <div className="relative mb-6 min-h-[200px]">
      <div className="filter blur-sm pointer-events-none select-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center max-w-xs mx-4 shadow-xl border border-amber-100">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto mb-3">
            <Lock size={20} className="text-amber-500" />
          </div>
          <h3 className="text-sm font-black text-gray-900 mb-1">Premium Feature</h3>
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
            Buy us a drink to unlock {featureName} and other premium features.
          </p>
          <button
            onClick={() => actions?.setShowSupportModal(true)}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-amber-500/20"
          >
            Buy Us a Drink — From 5 GHS
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumFeatureLock;
