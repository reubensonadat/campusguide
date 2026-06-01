import React from 'react';
import { Type, FlipHorizontal, Image as ImageIcon, Dices, RefreshCcw } from 'lucide-react';
import { useDiceBearAvatar } from '../../hooks/useDiceBearAvatar';

export function AvatarBuilder({ onSelect, initialUrl }) {
  // Try to extract seed and style from initial URL if it's a DiceBear URL
  const initialData = React.useMemo(() => {
    if (!initialUrl?.includes('dicebear.com')) return { seed: undefined, style: undefined };
    const parts = initialUrl.split('/');
    const style = parts[parts.length - 2];
    const seed = new URL(initialUrl).searchParams.get('seed') || undefined;
    return { seed, style };
  }, [initialUrl]);

  const { 
    seed, setSeed, style, setStyle, 
    flip, setFlip, hasBackground, setHasBackground,
    avatarUrl, shuffle, slotMachine, styles 
  } = useDiceBearAvatar(
    initialData.seed,
    initialData.style
  );

  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleRandomize = (e) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      shuffle(); // Generate new random avatar
      setIsAnimating(false);
    }, 200);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-4 animate-avatar-pop">
      {/* Live Preview */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gray-900/20 blur-2xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-500" />
        
        <div className={`w-40 h-40 rounded-[32px] bg-white border-4 border-gray-900/20 shadow-xl overflow-hidden relative z-10 transition-transform duration-200 ${isAnimating ? 'scale-75' : 'scale-100'}`}>
          <img 
            src={avatarUrl} 
            alt="Avatar Preview" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <button
          type="button"
          onClick={handleRandomize}
          className="absolute -right-2 -bottom-2 w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 z-20"
          aria-label="Randomize Avatar"
        >
          <Dices size={20} />
        </button>
      </div>

      {/* Controls Container */}
      <div className="w-full max-w-md bg-gray-50 rounded-[24px] border border-gray-200 p-6 space-y-6 shadow-sm">
        
        {/* Style Selector */}
        <div className="space-y-3">
          <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 pl-1">
            Character Style
          </label>
          <div className="flex flex-wrap gap-2">
            {styles.map((s) => (
              <button
                type="button"
                key={s.id}
                onClick={(e) => { e.preventDefault(); setStyle(s.id); }}
                className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all ${
                  style === s.id
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-900/40'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); setFlip(!flip); }}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
              flip 
                ? 'bg-gray-900/10 border-gray-900 text-gray-900 font-bold' 
                : 'bg-white border-gray-200 text-gray-500'
            }`}
          >
            <FlipHorizontal size={16} />
            <span className="text-[12px]">Flip Character</span>
          </button>
          
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); setHasBackground(!hasBackground); }}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
              hasBackground 
                ? 'bg-gray-900/10 border-gray-900 text-gray-900 font-bold' 
                : 'bg-white border-gray-200 text-gray-500'
            }`}
          >
            <ImageIcon size={16} />
            <span className="text-[12px]">Show BG</span>
          </button>
        </div>

        {/* Custom Seed Input */}
        <div className="space-y-3">
          <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 pl-1">
            Personalize your seed
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Type size={16} />
            </div>
            <input
              type="text"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              placeholder="Type anything..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-gray-900 transition-all shadow-sm text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Select Button */}
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); onSelect(avatarUrl); }}
        className="w-full h-[56px] bg-gray-900 text-white rounded-2xl font-black uppercase tracking-[0.15em] text-[14px] shadow-lg hover:bg-[#001f2e] active:scale-[0.98] transition-all"
      >
        Set as My Character
      </button>
    </div>
  );
}
