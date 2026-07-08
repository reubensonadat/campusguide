export const formatPhoneNumber = (value) => {
    let cleaned = value.replace(/\D/g, '');
    if (cleaned.startsWith('0') && cleaned.length >= 10 && cleaned.length <= 11) {
        cleaned = '233' + cleaned.substring(1);
    }
    return cleaned;
};

export const validateUrl = (urlStr) => {
    if (!urlStr) return false;
    try {
        const url = new URL(urlStr);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
};
