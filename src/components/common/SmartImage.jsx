import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { useDataSaver } from '../../hooks/useDataSaver';

/**
 * SmartImage
 * ─────────────────────────────────────────────────────────────────────────────
 * A drop-in `<img>` replacement that honors the user's Data Saver preference.
 *
 * - Data Saver ON  → renders a lightweight placeholder (no network request),
 *                    saving mobile bandwidth.
 * - Data Saver OFF → renders the real `<img>` as normal.
 * - Broken src     → falls back to the same placeholder instead of a broken
 *                    image icon (graceful degradation, never a blank hole).
 *
 * Pass-through: any extra props (loading, onClick, etc.) forward to the img.
 */
const SmartImage = ({ src, alt = '', className = '', placeholderClassName = '', ...rest }) => {
    const dataSaver = useDataSaver();
    const [failed, setFailed] = useState(false);

    const showPlaceholder = !src || dataSaver || failed;

    if (showPlaceholder) {
        return (
            <div
                className={`flex items-center justify-center bg-gray-100 text-gray-300 ${placeholderClassName || className}`}
                aria-label={alt || 'Image hidden to save data'}
                role="img"
            >
                <ImageOff size={22} strokeWidth={1.5} />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setFailed(true)}
            {...rest}
        />
    );
};

export default SmartImage;
