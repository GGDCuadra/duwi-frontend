import React, { useState } from "react";
import { FaSistrix } from "react-icons/fa";
import { useSelector } from 'react-redux';


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
    <div className="fiexed relative">
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

      <div>
        {searchTerm && (
          <div className="mt-4 bg-white p-2 rounded shadow-md">
            {filteredMovies.map(movie => (
              <div>
              <h3>{movie.Series_Title}</h3>
            </div>
            ))}
            {filteredSeries.map(serie => (
              <div>
                <h3>{serie.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;