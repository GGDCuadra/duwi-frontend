import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEnabledMovies, getAllSeries, getFilteredMovies  } from '../../redux/actions'
import MovieCard from '../MovieCard/MovieCard'
import Filters from '../Filter/Filter'

function Cards({ type }) {

  const dispatch = useDispatch()
  const allMovies = useSelector((state) => state.allMovies)
  const allSeries = useSelector((state) => state.allSeries)
  const [currentMoviesPage, setCurrentMoviesPage] = useState(1)
  const [filters, setFilters] = useState({
    genre: "",
    sortByTitle: "", // Agregar otros filtros según sea necesario
  });
  const handleNextPage = () => {
    setCurrentMoviesPage(currentMoviesPage + 1)
  }
  const handlePrevPage = () => {
    if (currentMoviesPage > 1) {
      setCurrentMoviesPage(currentMoviesPage - 1)}

  }
  const handleFilterChange = (newFilters) => {
    // Manejar cambios en los filtros
    setFilters(newFilters);
    setCurrentMoviesPage(1); // Reiniciar a la primera página al cambiar los filtros
  };
  useEffect(() => {
    // Despachar la acción con los filtros y la página actual
    dispatch(getFilteredMovies({
      ...filters,
      page: currentMoviesPage,
      perPage: 10, // Ajustar según sea necesario
    }));
  }, [dispatch, filters, currentMoviesPage]);

  return (
    <div>
      <Filters onFilterChange={handleFilterChange} currentFilters={filters} currentMoviesPage={currentMoviesPage} />
      {type === "movies" && (
        <div className='flex flex-wrap  m-5 w-100 h-100 gap-5'>
          {
            allMovies.map(movie => (
              <MovieCard
                key={movie._id}
                Series_Title={movie.Series_Title}
                Poster_Link={movie.Poster_Link}
                Genre={movie.Genre}
              />
            ))
          }
        </div>
      )
      }
      <div>
        <button onClick={handlePrevPage}>prev</button>
        <h3>{`page ${currentMoviesPage}`}</h3>
        <button onClick={handleNextPage}>next</button>
        

      </div>

      <MovieCard allSeries={allSeries} />
    </div>
  )
}

export default Cards