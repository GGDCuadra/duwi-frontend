import React from 'react'

function MovieCard({Poster_Link, Series_Title, Genre}) {
  return (
    <div> 
      <img src={Poster_Link} />
      <h2 className='text-clarito font-poppins'>{Series_Title}</h2>
      <h2 className='text-clarito font-poppins'>{Genre}</h2>
    </div>
  )
}

export default MovieCard