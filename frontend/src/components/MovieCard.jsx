import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const MovieCard = ({movie}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
         <LazyLoadImage
        src={movie.primaryImage}
        alt={movie.title}
        effect="blur"
        className="w-full h-auto rounded-md"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{movie.primaryTitle}</h2>

        <div className="flex flex-wrap gap-2">
          {movie.interests?.map((tag) => (
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