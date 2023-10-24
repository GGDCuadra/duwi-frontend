import React from 'react'
import { Link } from 'react-router-dom'

function SeriesCard({name, _id, genres, image, premiered}) {
  return (
    <div className="relative w-60 h-80 rounded-3xl shadow-md overflow-hidden group">
      <Link to={`/serie/${_id}`}>
      <div className="w-full rounded-lg transition-filter group-hover:blur-[2px] ">
        <img src={image} />
      </div>
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity duration-300 ease-in-out flex flex-col justify-end items-center text-center">
        <h2 className="text-lila font-bold font-poppins text-base p-5">{name}</h2>
        <h2 className="text-lila font-bold font-poppins text-base p-5">{genres}</h2>
        <h2 className="text-lila font-bold font-poppins text-base p-5">{premiered}</h2>

      </div>
      </Link>
    </div>
  );
}

export default SeriesCard;