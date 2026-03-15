import MovieCard from "./MovieCard";

const MovieRow = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className="px-10 mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="flex overflow-x-scroll space-x-4 scrollbar-hide">
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-[200px]">
            <MovieCard poster={movie.poster_path} id={movie.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;