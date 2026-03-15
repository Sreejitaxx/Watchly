import { useState } from "react";
import { API_OPTIONS } from "../utils/constants";
import { askGemini } from "../utils/gemini";

const AISearchBar = ({ setAIResults }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAI = async () => {
    if (!query) return;

    try {
      setLoading(true);

      // Ask Gemini
      const movieNames = await askGemini(query);

      // Search movies in TMDB
      const results = await Promise.all(
        movieNames.map(async (movie) => {
          const data = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${movie}`,
            API_OPTIONS
          );

          const json = await data.json();
          return json.results?.[0];
        })
      );

      setAIResults(results.filter(Boolean));
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 bg-red-600 text-white w-14 h-14 rounded-full shadow-lg text-xl z-50 hover:bg-red-700"
      >
        🤖
      </button>

      {/* AI Panel */}
      {open && (
        <div className="fixed bottom-24 left-6 w-[350px] bg-white text-black p-4 rounded-xl shadow-2xl z-50">

          <h2 className="text-lg font-bold mb-3">
            Ask AI For Movie Recommendations
          </h2>

          <input
            type="text"
            placeholder="Example: mind bending thriller movies"
            className="w-full border p-2 rounded mb-3"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            onClick={handleAI}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            {loading ? "Thinking..." : "Search"}
          </button>
        </div>
      )}
    </>
  );
};

export default AISearchBar;