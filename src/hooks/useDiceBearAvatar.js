import { useState, useCallback, useMemo } from 'react';

// List of boutique-friendly DiceBear styles
export const DICEBEAR_STYLES = [
  { id: 'avataaars', label: 'Classic' },
  { id: 'lorelei', label: 'Modern' },
  { id: 'bottts', label: 'Robot' },
  { id: 'pixel-art', label: 'Pixel' },
  { id: 'adventurer', label: 'Adventurer' },
  { id: 'miniavs', label: 'Minimalist' },
  { id: 'toon-head', label: 'Toon Head' },
  { id: 'personas', label: 'Personas' },
  { id: 'open-peeps', label: 'Open Peeps' },
  { id: 'notionists', label: 'Notionists' },
  { id: 'notionists-neutral', label: 'Notionists Neutral' },
  { id: 'micah', label: 'Micah' },
];

export function useDiceBearAvatar(initialSeed, initialStyle = 'avataaars') {
  const [seed, setSeed] = useState(initialSeed || Math.random().toString(36).substring(7));
  const [style, setStyle] = useState(initialStyle);
  const [flip, setFlip] = useState(false);
  const [hasBackground, setHasBackground] = useState(true);

  const avatarUrl = useMemo(() => {
    // We use the DiceBear HTTP API for zero-dependency generation
    // Updated background to fit the new luxury light aesthetic instead of roommate link colors
    const bgParam = hasBackground ? '&backgroundColor=cce1eb,99c3d6' : ''; // Using primary-100 and primary-200 from the new color palette
    const flipParam = flip ? '&flip=true' : '';
    return `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}${bgParam}${flipParam}`;
  }, [seed, style, flip, hasBackground]);

  const shuffle = useCallback(() => {
    const newSeed = Math.random().toString(36).substring(7);
    setSeed(newSeed);
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
