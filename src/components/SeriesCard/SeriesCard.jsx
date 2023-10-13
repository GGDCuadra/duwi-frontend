import React from 'react'

function SeriesCard({name, type, genres, image}) {
  return (
    <div>
      <img src={image} />
      <h2 className='text-clarito font-poppins'>{name}</h2>
      <h2 className='text-clarito font-poppins'>{type}</h2>
      <h2 className='text-clarito font-poppins'>{genres}</h2>
    </div>
  )
}

export default SeriesCard