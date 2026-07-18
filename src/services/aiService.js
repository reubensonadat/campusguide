const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export const generateLetter = async (formData, campusName = 'your university') => {
  const { letterType, studentName, studentId, courseInfo, department, reason } = formData;

  const prompt = `You are a professional academic assistant for ${campusName}.
Your task is to write a formal academic letter based on the following details:

- Letter Type: ${letterType}
- Student Name: ${studentName}
- Student ID: ${studentId}
- Course/Program Details: ${courseInfo}
- Department: ${department}
- Reason/Context: ${reason}

Instructions:
1. Address the letter to: "The Head of Department, Department of ${department || '[Insert Department]'}, ${campusName}".
2. Use a strictly formal, respectful, and professional tone suitable for a university administration.
3. Include standard formal letter elements (Date, Salutation, Subject Line, Body, Sign-off).
4. For the Date, use the placeholder [Insert Date].
5. DO NOT include any conversational filler (e.g., "Here is your letter", "I hope this helps"). ONLY output the text of the letter itself.
6. If any critical information is missing, use bolded bracket placeholders like **[Insert Lecturer Name]** or **[Insert Date of Exam]**.
7. Keep it concise but comprehensive.`;

  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2, // Low temperature for professional tone
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text.trim();
    } else {
      throw new Error("Invalid response format from Gemini API");
    }
  } catch (error) {
    console.error("Error generating letter:", error);
    throw error;
  }
};
