
/**
 * Submits data to a Google Sheet via a Google Apps Script Web App.
 * 
 * @param {string} scriptUrl - The Web App URL of the Google Apps Script
 * @param {Object} data - The data object to submit
 * @returns {Promise<Object>} - The response from the script
 */
export const submitToGoogleSheet = async (scriptUrl, data) => {
    try {
        // We use no-cors mode because Google Apps Script doesn't support CORS preflight
        // This means we can't read the response, but the request will go through.
        // However, to get a response, we usually need a proxy or we just trust it worked if no error.
        // BUT! A common workaround for React apps is using 'application/x-www-form-urlencoded' or 
        // expecting an opaque response.

        // For specific "JSON" handling in Apps Script with nice errors, usually we need 
        // `Content-Type: text/plain` to avoid CORS preflight triggers that fail.

        const response = await fetch(scriptUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return { success: true };
    } catch (error) {
        console.error("Error submitting to Google Sheet:", error);
        return { success: false, error: error.message };
    }
};
