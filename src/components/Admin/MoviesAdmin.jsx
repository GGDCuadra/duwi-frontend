import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaSort } from 'react-icons/fa';

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [filasPorPagina, setFilasPorPagina] = useState(10);
  const [ordenarPor, setOrdenarPor] = useState('Released_Year');
  const [orden, setOrden] = useState('asc');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/movies')
      .then(response => {
        setPeliculas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener películas:', error);
      });
  }, []);

  const handleSort = property => {
    const esAsc = ordenarPor === property && orden === 'asc';
    setOrden(esAsc ? 'desc' : 'asc');
    setOrdenarPor(property);
  
    const peliculasOrdenadas = [...peliculas].sort((a, b) => {
      if (esAsc) {
        return a[property] - b[property]; // Orden ascendente
      } else {
        return b[property] - a[property]; // Orden descendente
      }
    });
  
    setPeliculas(peliculasOrdenadas);
  };

  const handleSearch = event => {
    setBusqueda(event.target.value);
    setPagina(0);
  };

  const handleChangePage = nuevaPagina => {
    if (nuevaPagina >= 0 && nuevaPagina <= Math.ceil(peliculas.length / filasPorPagina) - 1) {
      setPagina(nuevaPagina);
    }
  };

  const handleChangeRowsPerPage = event => {
    setFilasPorPagina(parseInt(event.target.value, 10));
    setPagina(0);
  };

  const peliculasFiltradas = peliculas.filter(pelicula => {
    return pelicula.Series_Title.toLowerCase().includes(busqueda.toLowerCase());
  });

  const totalPaginas = Math.ceil(peliculasFiltradas.length / filasPorPagina);
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i);

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="w-4/5 p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Películas</h1>
      <input
        type="text"
        placeholder="Buscar por titulo de pelicula"
        className="w-full border border-gray-300 p-2 rounded-md mb-4"
        onChange={handleSearch}
      />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full border border-gray-400 table-auto">
        <thead className="bg-blue-200">
          <tr>
            <th onClick={() => handleSort('Series_Title')} className="px-2 py-2 cursor-pointer">
              Título
            </th>
            <th className="px-2 py-2 cursor-pointer">Poster</th>
            <th onClick={() => handleSort('Released_Year')} className="px-2 py-2 cursor-pointer">
              Año{' '}
              {ordenarPor === 'Released_Year' ? (
                orden === 'asc' ? (
                  <FaSort className="inline " />
                ) : (
                  <FaSort className="inline transform rotate-180" />
                )
              ) : null}
            </th>
            <th onClick={() => handleSort('Runtime')} className="px-2 py-2 cursor-pointer">
              Duración
            </th>
            <th className="px-2 py-2 cursor-pointer">Género</th>
            <th className="px-2 py-2 cursor-pointer">Reparto</th>
            <th className="px-2 py-2 cursor-pointer">Trailer</th>
            <th onClick={() => handleSort('deshabilitar')} className="px-2 py-2 cursor-pointer">
              Deshabilitar
            </th>
            <th className="px-2 py-2">Editar</th>
          </tr>
        </thead>
        <tbody>
          {peliculasFiltradas
            .slice(pagina * filasPorPagina, pagina * filasPorPagina + filasPorPagina)
            .map((pelicula, index) => (
              <tr
                key={pelicula._id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } hover:bg-gray-200 hover:dark:bg-gray-400`}
              >
                <td className="py-1 text-center">{pelicula.Series_Title}</td>
                <td className="whitespace-nowrap px-2 py-2 text-center">
                  <a href={pelicula.Poster_Link} target="_blank" rel="noopener noreferrer">
                    <img src={pelicula.Poster_Link} alt="Poster" className="w-10 h-auto" />
                  </a>
                </td>
                <td className="whitespace-nowrap px-2 py-2 text-center">{pelicula.Released_Year}</td>
                <td className="whitespace-nowrap px-2 py-2 text-center">{pelicula.Runtime}</td>
                <td className="whitespace-nowrap px-2 py-2 text-center">
                  <ul>
                    {typeof pelicula.Genre === 'string' ? (
                      pelicula.Genre.split(', ').map((genre, genreIndex) => (
                        <li key={genreIndex}>{genre}</li>
                      ))
                    ) : (
                      <li>{pelicula.Genre}</li>
                    )}
                  </ul>
                </td>
                <td className="whitespace-nowrap px-2 py-2 text-center">
                  <ul>
                    {[
                      pelicula.Star1,
                      pelicula.Star2,
                      pelicula.Star3,
                      pelicula.Star4,
                    ].map((star, starIndex) => (
                      <li key={starIndex}>{star}</li>
                    ))}
                  </ul>
                </td>
                <td className="whitespace-nowrap px-2 py-2 text-center">
                  <a href={pelicula.Trailer} target="_blank" rel="noopener noreferrer">
                    Ver Trailer
                  </a>
                </td>
                <td className="whitespace-nowrap px-2 py-2 text-center">{pelicula.deshabilitar}</td>
                <td className="px-2 py-2 text-center" style={{ textAlign: 'center', height: '100%', verticalAlign: 'middle', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  
                  <FaEdit className="edit-icon" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          <span className="mr-2">Filas por página</span>
          <select
            className="border border-gray-300 p-2 rounded-md"
            onChange={handleChangeRowsPerPage}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span className="whitespace-nowrap px-6 ">
            Página {pagina + 1} de {totalPaginas}
          </span>
        </div>

        <div className="inline-flex -space-x-px text-sm h-8">
          <button
            className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-morado border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-morado dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            onClick={() => handleChangePage(pagina - 1)}
            disabled={pagina === 0}
          >
            Anterior
          </button>
          <ul className="flex justify-center">
            {paginas.map((numPagina) => (
              <li key={numPagina}>
                <button
                  onClick={() => handleChangePage(numPagina)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-morado dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${pagina === numPagina ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : ''}`}
                >
                  {numPagina + 1}
                </button>
              </li>
            ))}
          </ul>
          <button
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-morado dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            onClick={() => handleChangePage(pagina + 1)}
            disabled={pagina >= totalPaginas - 1}
          >
            Siguiente
          </button>
        </div>
      </div>
      </div>
      </div>
    );
  };


export default Peliculas;