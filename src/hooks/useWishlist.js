import { useState, useEffect, useCallback } from 'react';

const WISHLIST_KEY = 'ucc_thrift_wishlist';

export const useWishlist = () => {
    const [wishlist, setWishlist] = useState(() => {
        try {
            const stored = localStorage.getItem(WISHLIST_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch {
            return {};
        }
    });

    // Persist every change
    useEffect(() => {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = useCallback((item) => {
        setWishlist(prev => {
            if (prev[item.id]) {
                const next = { ...prev };
                delete next[item.id];
                return next;
            }
            // Cache the full item object so it survives expiry
            return { ...prev, [item.id]: { ...item, _saved_at: new Date().toISOString() } };
        });
    }, []);

    const isWishlisted = useCallback((itemId) => {
        return Boolean(wishlist[itemId]);
    }, [wishlist]);

    const wishlistItems = Object.values(wishlist);

    return { wishlist, wishlistItems, toggleWishlist, isWishlisted };
};
