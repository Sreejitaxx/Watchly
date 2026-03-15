import { useEffect, useState } from "react";
import Header from "../components/Header";
import MovieRow from "../components/MovieRow";
import AISearchBar from "../components/AISearchBar";
import {
  NOW_PLAYING_MOVIES,
  POPULAR_MOVIES,
  TOP_RATED_MOVIES,
  TRENDING_MOVIES,
  MOVIE_TRAILER_API,
  API_OPTIONS,
} from "../utils/constants";

const Browse = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [aiResults, setAIResults] = useState([]);

  const fetchMovies = async (url, setter) => {
    const data = await fetch(url, API_OPTIONS);
    const json = await data.json();
    if (json && json.results) setter(json.results);
    else setter([]);
  };

  const getTrailer = async (movieId) => {
    const data = await fetch(MOVIE_TRAILER_API(movieId), API_OPTIONS);
    const json = await data.json();

    const trailer =
      json.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      ) || json.results[0];

    if (trailer) {
      setTrailerKey(trailer.key);
      setShowTrailer(true);
    }
  };

  useEffect(() => {
    fetchMovies(NOW_PLAYING_MOVIES, setNowPlaying);
    fetchMovies(POPULAR_MOVIES, setPopular);
    fetchMovies(TOP_RATED_MOVIES, setTopRated);
    fetchMovies(TRENDING_MOVIES, setTrending);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      {/* HERO SECTION */}
      <div className="pt-28 px-10">
        {nowPlaying && nowPlaying.length > 0 && (
          <div className="relative rounded-xl overflow-hidden shadow-2xl mb-12">
            <img
              src={"https://image.tmdb.org/t/p/original" + nowPlaying[0].backdrop_path}
              alt="hero"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute bottom-10 left-10 max-w-xl">
              <h1 className="text-5xl font-bold mb-4">{nowPlaying[0].title}</h1>
              <p className="text-gray-300 mb-6">{nowPlaying[0].overview}</p>
              <button
                onClick={() => getTrailer(nowPlaying[0].id)}
                className="bg-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Watch Trailer
              </button>
            </div>
          </div>
        )}
      </div>

      {/* TRAILER POPUP */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-[80%] h-[80%]">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-0 right-0 text-white text-3xl p-4"
            >
              ✕
            </button>
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* AI SEARCH BAR (floating) */}
      <AISearchBar setAIResults={setAIResults} />

      {/* MOVIE ROWS */}
      {/* AI PICKED MOVIES */}
      {aiResults.length > 0 && <MovieRow title="🤖 AI Picks For You" movies={aiResults} />}

      <MovieRow title="Now Playing" movies={nowPlaying} />
      <MovieRow title="Trending Today" movies={trending} />
      <MovieRow title="Popular Movies" movies={popular} />
      <MovieRow title="Top Rated" movies={topRated} />
    </div>
  );
};

export default Browse;