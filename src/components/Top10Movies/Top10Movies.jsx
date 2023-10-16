import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopMovies } from '../../redux/actions';
import MovieCard from '../MovieCard/MovieCard';

function Top10Movies() {
  const dispatch = useDispatch();
  const topMovies = useSelector((state) => state.topMovies);

  useEffect(() => {
    dispatch(getTopMovies());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 font-poppins text-moradito">Top 10 películas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {topMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            Series_Title={movie.Series_Title}
            Poster_Link={movie.Poster_Link}
            Genre={movie.Genre}
          />
        ))}
      </div>
    </div>
  );
}

export default Top10Movies;
