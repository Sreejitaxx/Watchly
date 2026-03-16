// src/utils/gemini.js
console.log("Gemini key status:", import.meta.env.VITE_GEMINI_API_KEY ? "Loaded ✅" : "Missing ❌");

export const askGemini = async (prompt) => {
  try {
    // UPDATED MODEL NAME: gemini-2.5-flash
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Act as a movie recommendation system. Suggest 5 movies for this request: ${prompt}. Only return movie titles separated by commas. Do not include numbers or extra text.`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API Error:", data.error.message);
      return [];
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return text ? text.split(",").map((movie) => movie.trim()) : [];
    
  } catch (error) {
    console.error("Failed to fetch from Gemini:", error);
    return [];
  }
};