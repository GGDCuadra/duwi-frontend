import React from 'react'

function SeriesCard({name, genres, image}) {
  return (
    <div className="relative w-60 h-80 rounded-lg shadow-md overflow-hidden group">
      <div className="w-full rounded-lg transition-filter group-hover:blur-[2px] ">
        <img src={image} />
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col justify-end items-center text-center">
        <h2 className="text-lila font-bold  font-poppins text-base p-5">{name}</h2>
        <h2 className="text-lila font-bold  font-poppins text-base p-5">{genres}</h2>
      </div>
    </div>
  )
}

export default SeriesCard