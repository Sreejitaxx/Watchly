import { useNavigate } from "react-router-dom";

const MovieCard = ({ poster, id }) => {

  const navigate = useNavigate();

  if (!poster) return null;

  return (
    <div
      onClick={() => navigate("/movie/" + id)}
      className="relative overflow-hidden rounded-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
    >
      <img
        alt="movie poster"
        src={"https://image.tmdb.org/t/p/w500" + poster}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default MovieCard;