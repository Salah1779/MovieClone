import { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import { fetchAPI } from './utils/api';
import {Movie} from './utils/types';
//import { API_URL } from './utils/constants';
//import  Pagination  from './components/Pagination';
import NavigationButtons from './components/NavigationButtons';


const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentMovies, setCurrentMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
 // const [currentPage, setCurrentPage] = useState<number>(1);
  const [selected , setSelected] = useState<string>('most-popular-movies');
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

  
  // const handlePageChange = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  //   window.scrollTo(0, 0);
  // };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-blue-950 min-h-screen p-8">
      <NavigationButtons labels={['most-popular-movies', 'top250-movies', 'top-box-office']} setSelected={setSelected} />

      <h1 className="text-3xl font-bold text-light-backgroundColor text-center mb-8">{selected}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movies} />
        ))}
      </div>
      {/* <Pagination
        currentPage={currentPage}
        totalItems={movies}
        itemsPerPage={moviesPerPage}
        onPageChange={handlePageChange}
        setCurrentItems={setCurrentMovies}
      /> */}
    </div>
  );
};

export default App;