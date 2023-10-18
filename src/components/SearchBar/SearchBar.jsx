import React, { useState } from "react";
import { FaSistrix } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const allMovies = useSelector((state) => state.allMovies);
  const allSeries = useSelector((state) => state.allSeries);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const filteredMovies = allMovies.filter(movie =>
    movie.Series_Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSeries = allSeries.filter(serie =>
    serie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <form className="w-full">
        <input
          className="bg-search outline-none focus:outline-none rounded-full px-4 py-2 shadow w-full font-poppins"
          placeholder="Buscar película, serie o actor"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="absolute right-5 top-1/2 -translate-y-1/2">  
          <FaSistrix className="text-2xl"></FaSistrix>
        </button>
      </form>

      {searchTerm && (
        <div className="absolute mt-1 right-0 left-0 mx-auto max-h-60 overflow-y-auto z-10 rounded-xl">
          <div className="bg-clarito p-2 rounded shadow-md">
            <ul className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {filteredMovies.map(movie => (
                <li key={movie._id} className="mb-2 hover:bg-lila rounded p-1 cursor-pointer">
                  <Link to={`movie/${movie._id}`}>
                    <h3 className="mb-2 hover:bg-lila rounded p-1 cursor-pointer">{movie.Series_Title}</h3>
                  </Link>
                </li>
              ))}
              {filteredSeries.map(serie => (
                <li key={serie._id} className="mb-2 hover:bg-lila rounded p-1 cursor-pointer">
                  <Link to={`serie/${serie._id}`}>
                    <h3 className="mb-2 hover:bg-lila rounded p-1 cursor-pointer" >{serie.name}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;