import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEnabledMovies, getAllSeries, getFilteredMovies, getFilteredSeries } from '../../redux/actions'
import MovieCard from '../MovieCard/MovieCard'
import SeriesCard from '../SeriesCard/SeriesCard'
import Filters from '../Filter/Filter'

function Cards({ type }) {

  const dispatch = useDispatch()
  const allMovies = useSelector((state) => state.allMovies)
  const allSeries = useSelector((state) => state.allSeries)
  const [currentMoviesPage, setCurrentMoviesPage] = useState(1)
  const [currentSeriesPage, setCurrentSeriesPage] = useState(1)
  const [filters, setFilters] = useState({
    genre: "",
    sortByTitle: "", // Agregar otros filtros según sea necesario
  });
  console.log(allSeries);
  console.log(allMovies);
  const handleNextPage = () => {
    if (type === 'movies') {
      setCurrentMoviesPage(currentMoviesPage + 1)
    }
    if (type === 'series') {
      setCurrentSeriesPage(currentSeriesPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (type === 'movies') {
      if (currentMoviesPage > 1) {
        setCurrentMoviesPage(currentMoviesPage - 1)
      }
    }
    if(type = 'series'){
      if (currentSeriesPage > 1){
        setCurrentSeriesPage(currentSeriesPage - 1)
        }
    }

  }

  const handleFilterChange = (newFilters) => {

    if (type === 'movies') {
      setFilters(newFilters);
      setCurrentMoviesPage(1);
    }
    if (type === 'series') {
      setFilters(newFilters);
      setCurrentSeriesPage(1);
    }

  };
  useEffect(() => {
    
    if(type=== 'movies') {
      dispatch(getFilteredMovies({
      ...filters,
      page: currentMoviesPage,
      perPage: 10, 
    }));
    }
    if(type==='series'){
      dispatch(getFilteredSeries({
        ...filters,
        page: currentSeriesPage,
        perPage: 10,
      }))
    }
    
  }, [dispatch, filters, currentMoviesPage,currentSeriesPage]);

  return (
    <div>
      {type === "movies" && (
        <div className='flex-col justify-items-center w-100'>
          <Filters type='movies' onFilterChange={handleFilterChange} currentFilters={filters} currentMoviesPage={currentMoviesPage} />
          <div className='flex flex-wrap m-5 w-100 h-100 gap-5'>
            {
              allMovies.map(movie => (
                <MovieCard
                  key={movie._id}
                  _id={movie._id}
                  Series_Title={movie.Series_Title}
                  Poster_Link={movie.Poster_Link}
                  Genre={movie.Genre}
                />
              ))
            }
          </div>
        </div>

      )
      }
      {
        type === 'series' && (
          <div className='w-full'>
            <Filters type='series' onFilterChange={handleFilterChange} currentFilters={filters} currentSeriesPage={currentSeriesPage} />
            <div className="w">
              {
                allSeries.map(serie => (
                  <SeriesCard
                    key={serie._id}
                    _id={serie._id}
                    name={serie.name}
                    image={serie.image ? serie.image.original : ''}
                    genres={serie.genres}
                  />
                ))
              }
            </div>
          </div>
        )
      }
      <div>
        <button onClick={handlePrevPage}>prev</button>
        <h3>{type==='movies'? currentMoviesPage : currentSeriesPage}</h3>
        <button onClick={handleNextPage}>next</button>
      </div>

    </div>
  )
}

export default Cards