import { useState, useCallback, useMemo } from 'react';

export const DICEBEAR_STYLES = [
  { id: 'notionists', label: 'Notionists (Pro)' },
  { id: 'notionists-neutral', label: 'Notionists Neutral' }
];

export function useDiceBearAvatar(initialSeed, initialStyle = 'notionists') {
  const [seed, setSeed] = useState(initialSeed || Math.random().toString(36).substring(7));
  const [style, setStyle] = useState(initialStyle);
  const [flip, setFlip] = useState(false);
  const [hasBackground, setHasBackground] = useState(true);

  const avatarUrl = useMemo(() => {
    // DiceBear API for Notionists
    const bgParam = hasBackground ? '&backgroundColor=cce1eb,99c3d6,b6e3f4,f1f4dc,ffd5dc,ffdfbf,d1d4f9,e2e6ea' : '&backgroundColor=transparent'; 
    const flipParam = flip ? '&flip=true' : '';
    return `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}${bgParam}${flipParam}`;
  }, [seed, style, flip, hasBackground]);

  const shuffle = useCallback(() => {
    const newSeed = Math.random().toString(36).substring(7);
    setSeed(newSeed);
    return newSeed;
  }, []);

  const slotMachine = useCallback(() => {
    const randomStyle = DICEBEAR_STYLES[Math.floor(Math.random() * DICEBEAR_STYLES.length)].id;
    const newSeed = Math.random().toString(36).substring(7);
    setStyle(randomStyle);
    setSeed(newSeed);
  }, []);

  return {
    seed,
    setSeed,
    style,
    setStyle,
    flip,
    setFlip,
    hasBackground,
    setHasBackground,
    avatarUrl,
    shuffle,
    slotMachine,
    styles: DICEBEAR_STYLES,
  };
}
