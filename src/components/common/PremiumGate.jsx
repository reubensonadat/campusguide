import React, { useState, useEffect } from 'react';
import { Sparkles, Lock } from 'lucide-react';
import { usePremiumAccess } from '../../hooks/usePremiumAccess';
import { Button } from './Button';

export const triggerUpgradeModal = (context = 'premium') => {
  window.dispatchEvent(new CustomEvent('open-upgrade-modal', { detail: { context } }));
};

const PremiumGate = ({ 
  featureId, 
  children, 
  fallback, 
  inline = false,
  requiredTier = 'silver',
  maxFreeUses = 5
}) => {
  const { hasPremiumFeatures, hasGoldBadge } = usePremiumAccess();
  const [usageCount, setUsageCount] = useState(0);

  const isUnlocked = requiredTier === 'gold' ? hasGoldBadge : hasPremiumFeatures;

  useEffect(() => {
    if (isUnlocked) return;
    const stored = localStorage.getItem(`ucc_usage_${featureId}`);
    const count = stored ? parseInt(stored, 10) : 0;
    setUsageCount(count);
  }, [featureId, isUnlocked]);

  const handleInteraction = () => {
    if (isUnlocked) return;
    
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem(`ucc_usage_${featureId}`, newCount.toString());

    // Every maxFreeUses, show the support modal
    if (newCount % maxFreeUses === 0) {
      triggerUpgradeModal('support');
    }
  };

  if (isUnlocked) {
    return <div onClickCapture={handleInteraction} className="contents">{children}</div>;
  }

  // Soft lock: Always let them use it, but occasionally nag them and show the "Back the Vision" badge
  return (
    <div className="relative group contents" onClickCapture={handleInteraction}>
      <div className="absolute top-2 right-2 z-20 bg-primary-100 text-primary-700 text-[10px] font-black uppercase px-2 py-1 rounded-full flex items-center gap-1 shadow-sm border border-primary-200 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
        <Sparkles size={10} /> Back the Vision
      </div>
      {children}
    </div>
  );
};

export default PremiumGate;
