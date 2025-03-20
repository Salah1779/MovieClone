import {Movie} from "../utils/types";

interface MovieCardProps {
    movie: Movie
}

const MovieCard = ({movie}: MovieCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={movie.primaryImage}
        alt={movie.primaryTitle}
        className="w-fit h-fit object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{movie.primaryTitle}</h2>

        <div className="flex flex-wrap gap-2">
          {movie.interests.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-200 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;