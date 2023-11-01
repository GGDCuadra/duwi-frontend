import { useState, useEffect } from "react";
import { FaSistrix } from "react-icons/fa";
import { Link } from "react-router-dom";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allMovies, setAllMovies] = useState([]);
  const [allSeries, setAllSeries] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  useEffect(() => {
    setLoading(true);
    const delayTimer = setTimeout(() => {
      fetch("https://duwi.onrender.com/enabledMovies")
        .then((response) => response.json())
        .then((data) => {
          setAllMovies(data); 
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al cargar películas:", error);
          setLoading(false);
        });
    }, 500);

    return () => clearTimeout(delayTimer);
  }, [searchTerm]);

  useEffect(() => {
    
    setFilteredMovies(allMovies.filter((movie) =>
      movie.Series_Title.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [searchTerm, allMovies]);

  useEffect(() => {
    setLoading(true);
    const delayTimer = setTimeout(() => {
      fetch("https://duwi.onrender.com/series")
        .then((response) => response.json())
        .then((data) => {
          setAllSeries(data); 
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al cargar series:", error);
          setLoading(false);
        });
    }, 500); 

    return () => clearTimeout(delayTimer);
  }, [searchTerm]); 

  useEffect(() => {
    setFilteredSeries(allSeries.filter((serie) =>
      serie.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [searchTerm, allSeries]);
  
  return (
    <div className="relative">
  <form className="w-full">
    <input
      className="bg-search outline-none focus:outline-none rounded-full px-4 py-2 shadow w-full font-poppins"
      placeholder="Buscar película o serie"
      value={searchTerm}
      onChange={handleSearch}
    />
    <button className="absolute right-5 top-1/2 -translate-y-1/2">
      <FaSistrix className="text-2xl pl-2 ml-1 text-moradito"></FaSistrix>
    </button>
  </form>
  {searchTerm && (
    <div className="absolute mt-1 right-0 left-0 mx-auto max-h-40 overflow-y-auto z-10 rounded-xl">
      {loading ? (
        <div className="bg-clarito p-2 rounded shadow-md">
          <p className="mb-2 hover-bg-lila rounded p-1 cursor-pointer">Cargando...</p>
        </div>
        
      ) : (
        (filteredMovies.length === 0 && filteredSeries.length === 0) ? (
          <div className="bg-red-500 p-2 rounded shadow-md text-white">
            No se encontraron resultados. Por favor, prueba una búsqueda diferente.
          </div>
        ) : (
          <div className="bg-clarito p-2 rounded shadow-md">
            <ul className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {filteredMovies.map(movie => (
                <li key={movie._id} className="mb-2 hover-bg-lila rounded p-1 cursor-pointer">
                  <Link to={`movie/${movie._id}`}>
                    <h3 className="mb-2 hover-bg-lila rounded p-1 cursor-pointer">{movie.Series_Title}</h3>
                  </Link>
                </li>
              ))}
              {filteredSeries.map(serie => (
                <li key={serie._id} className="mb-2 hover-bg-lila rounded p-1 cursor-pointer">
                  <Link to={`serie/${serie._id}`}>
                    <h3 className="mb-2 hover-bg-lila rounded p-1 cursor-pointer">{serie.name}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  )}
</div>
  );
}


export default SearchBar;
