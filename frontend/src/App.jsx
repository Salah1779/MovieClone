import { useState, useEffect } from 'react';
import MovieCard from  './components/MovieCard';
import { fetchAPI } from './utils/api';
import NavigationButtons from './components/NavigationButtons';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected , setSelected] = useState('most-popular-movies');
  const moviesPerPage = 30;


  useEffect(() => {
    const loadMovies = async () => {
        try {
          const data =await fetchAPI(selected);    
          setMovies(data);
          setCurrentMovies(data.slice(0, moviesPerPage));
        } catch (error) {
          setError(`Failed to fetch movies: ${error}`);
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      
    loadMovies();
  }, [selected]);

 

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-blue-950 min-h-screen p-8 flex flex-col gap-4">
      <NavigationButtons labels={['most-popular-movies', 'top250-movies', 'top-box-office']} setSelected={setSelected} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentMovies.map((movie) => (
          movie.primaryImage && (
          <MovieCard key={movie.id} movie={movie} />
          )
        ))}
      </div>
   
    </div>
  );
};

export default App;