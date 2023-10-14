import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMovies, getAllSeries } from '../../redux/actions'
import MovieCard from '../MovieCard/MovieCard'
import Filters from '../Filter/Filter'

function Cards() {

  const dispatch = useDispatch()
  const allMovies = useSelector((state) => state.allMovies)
  const allSeries = useSelector((state) => state.allSeries)

  useEffect(() => {
    dispatch(getAllMovies(), getAllSeries())
  }, [dispatch])

  return (
    <div>
      <Filters/>
      <MovieCard allMovies={allMovies}/>
      <MovieCard allSeries={allSeries}/>
    </div>
  )
}

export default Cards