
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
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(data),
        });

        return { success: true };
    } catch (error) {
        console.error("Error submitting to Google Sheet:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Fetches data from a Google Sheet via a Google Apps Script Web App.
 * Returns mocked data if fetching fails or url is not provided.
 * 
 * @param {string} scriptUrl - The Web App URL of the Google Apps Script
 * @returns {Promise<Array>} - The array of supporters
 */
export const fetchSupporters = async (scriptUrl) => {
    if (!scriptUrl) return getMockSupporters();

    try {
        const response = await fetch(scriptUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data; // Assuming API returns array of object { name, amount, message, campus }
    } catch (error) {
        console.warn("Error fetching supporters, using mock data:", error);
        return getMockSupporters();
    }
};

const getMockSupporters = () => [
    { name: "Nana Kwame", amount: 20, message: "Great guide! Helped me find Casford.", campus: "UCC" },
    { name: "Abena S.", amount: 10, message: "Thanks for the map updates.", campus: "UG" },
    { name: "Kojo", amount: 50, message: "Keep it up!", campus: "KNUST" },
    { name: "Anonymous", amount: 5, message: "", campus: "UCC" },
];
