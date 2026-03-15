export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmFlNzEwOGNhYTUyNTJmYmE2ZDI1MGEyMTJkYjNhNyIsIm5iZiI6MTc3MzU2Nzk4MC45NzgsInN1YiI6IjY5YjY3ZmVjNGM5YWRiMjhjMTVhNmU2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sYdTJACohPQfFQjtqAgeYdToM3fvD2t890jZmJrMM1A",
  },
};

export const NOW_PLAYING_MOVIES =
  "https://api.themoviedb.org/3/movie/now_playing";

export const POPULAR_MOVIES =
  "https://api.themoviedb.org/3/movie/popular";

export const TOP_RATED_MOVIES =
  "https://api.themoviedb.org/3/movie/top_rated";

export const TRENDING_MOVIES =
  "https://api.themoviedb.org/3/trending/movie/day";

  export const MOVIE_TRAILER_API = (movieId) =>
  `https://api.themoviedb.org/3/movie/${movieId}/videos`;