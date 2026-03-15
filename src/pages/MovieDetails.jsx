import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { API_OPTIONS } from "../utils/constants";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const getMovieDetails = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}`,
      API_OPTIONS
    );
    const json = await data.json();
    setMovie(json);
  };

  const getSimilarMovies = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar`,
      API_OPTIONS
    );
    const json = await data.json();
    setSimilarMovies(json.results);
  };

  const getTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      API_OPTIONS
    );

    const json = await data.json();

    const trailer = json.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    if (trailer) {
      setTrailerKey(trailer.key);
      setShowTrailer(true);
    }
  };

  useEffect(() => {
    getMovieDetails();
    getSimilarMovies();
  }, []);

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-black text-white">

      {/* BACKDROP */}
      <div className="relative h-[500px] w-full">

        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          className="absolute w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

        <Header />
      </div>

      {/* CONTENT */}
      <div className="px-20 -mt-40 relative z-10">

        <div className="flex gap-12">

          {/* POSTER */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="w-[280px] rounded-xl shadow-2xl"
          />

          {/* DETAILS */}
          <div className="max-w-3xl">

            <h1 className="text-5xl font-bold mb-4">
              {movie.title}
            </h1>

            <div className="flex gap-6 text-gray-300 mb-6">

              <span className="text-yellow-400 font-semibold">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>

              <span>
                📅 {movie.release_date}
              </span>

              <span className="uppercase">
                🌍 {movie.original_language}
              </span>

              <span>
                ⏱ {movie.runtime} min
              </span>

            </div>

            {/* GENRES */}
            <div className="flex gap-3 flex-wrap mb-6">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-800 px-3 py-1 rounded-md text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              {movie.overview}
            </p>

            {/* WATCH TRAILER BUTTON */}
            <button
             onClick={getTrailer}
              className="mt-6 px-7 py-3 rounded-full 
             bg-white/10 backdrop-blur-md 
             border border-white/20
             hover:bg-white/20
              transition duration-300 
             flex items-center gap-2 font-medium"
                   >
                 Watch Trailer
            </button>

          </div>
        </div>

        {/* SIMILAR MOVIES */}
        <div className="mt-20">

          <h2 className="text-3xl font-bold mb-6">
            More Like This
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">

            {similarMovies
              .filter((movie) => movie.poster_path)
              .map((movie) => (
                <img
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  className="w-[150px] rounded-lg hover:scale-110 transition cursor-pointer"
                />
              ))}

          </div>

        </div>

      </div>

      {/* TRAILER MODAL */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">

          <div className="relative w-[80%] max-w-4xl">

            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white text-2xl"
            >
              ✕
            </button>

            <iframe
              className="w-full h-[450px] rounded-lg"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Movie Trailer"
              allowFullScreen
            ></iframe>

          </div>

        </div>
      )}

    </div>
  );
};

export default MovieDetails;