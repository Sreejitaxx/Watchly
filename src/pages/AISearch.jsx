import { useState } from "react";
import { API_OPTIONS } from "../utils/constants";
import { askGemini } from "../utils/gemini";

const AISearchBar = ({ setAIResults }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAI = async () => {
    if (!query) return;

    try {
      setLoading(true);

      // 1️⃣ Ask Gemini for movie names
      const movieNames = await askGemini(query);

      // 2️⃣ Search each movie in TMDB
      const movieResults = await Promise.all(
        movieNames.map(async (movie) => {
          const data = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${movie}`,
            API_OPTIONS
          );

          const json = await data.json();
          return json.results?.[0];
        })
      );

      // 3️⃣ Remove empty results
      const filteredMovies = movieResults.filter(Boolean);

      // 4️⃣ Send results to Browse page
      setAIResults(filteredMovies);
    } catch (err) {
      console.error("AI Search Error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center mt-10">

      <div className="flex gap-4 bg-black/60 backdrop-blur p-4 rounded-xl">

        <input
          type="text"
          placeholder="Ask AI for movie recommendations..."
          className="w-[400px] p-3 rounded text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={handleAI}
          className="bg-red-600 px-6 py-3 rounded hover:bg-red-700"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

      </div>

    </div>
  );
};

export default AISearchBar;