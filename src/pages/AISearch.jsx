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

      // 1. Get the array of names from your helper
      const movieNames = await askGemini(query);
      console.log("Gemini suggested these movies:", movieNames);

      // Check if we actually got names back
      if (!movieNames || movieNames.length === 0) {
        console.error("No movies returned from Gemini");
        setLoading(false);
        return;
      }

      // 2. Search each movie in TMDB
      const movieResults = await Promise.all(
        movieNames.map(async (movie) => {
          // encodeURIComponent handles movie names with spaces like "Interstellar" or "The Dark Knight"
          const data = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}`,
            API_OPTIONS
          );

          const json = await data.json();
          // Return the first result found for that name
          return json.results?.[0];
        })
      );

      // 3. Remove null/empty results
      const filteredMovies = movieResults.filter(Boolean);

      // 4. Send results to the UI
      setAIResults(filteredMovies);
    } catch (err) {
      console.error("AI Search Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="flex gap-4 bg-black/60 backdrop-blur p-4 rounded-xl">
        <input
          type="text"
          placeholder="Ask AI for movie recommendations..."
          className="w-[400px] p-3 rounded text-black outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAI()} // Press Enter to search
        />

        <button
          onClick={handleAI}
          disabled={loading}
          className="bg-red-600 px-6 py-3 rounded hover:bg-red-700 font-bold transition-all disabled:bg-gray-500"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </div>
    </div>
  );
};

export default AISearchBar;