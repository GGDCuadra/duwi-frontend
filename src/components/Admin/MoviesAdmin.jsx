import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [filasPorPagina, setFilasPorPagina] = useState(10);
  const [ordenarPor, setOrdenarPor] = useState('Series_Title');
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
  <div className="w-4/5 p-5">
    <h1 className="text-2xl font-bold text-center mb-8">Películas</h1>
    <input
      type="text"
      placeholder="Buscar por titulo de pelicula"
      className="w-full border border-gray-300 p-2 rounded-md mb-4"
      onChange={handleSearch}
    />

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full border border-gray-400 table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th onClick={() => handleSort('_id')} className="px-6 py-3 cursor-pointer hover:underline">
              ID
            </th>
            <th onClick={() => handleSort('Series_Title')} className="px-6 py-3 cursor-pointer hover:underline">
              Título
            </th>
            <th onClick={() => handleSort('Poster_Link')} className="px-6 py-3 cursor-pointer hover:underline">
              Poster
            </th>
            <th onClick={() => handleSort('Released_Year')} className="px-6 py-3 cursor-pointer hover:underline">
              Año
            </th>
            <th onClick={() => handleSort('Certificate')} className="px-6 py-3 cursor-pointer hover:underline">
              Clasificación
            </th>
            <th onClick={() => handleSort('Runtime')} className="px-6 py-3 cursor-pointer hover:underline">
              Duración
            </th>
            <th onClick={() => handleSort('Genre')} className="px-6 py-3 cursor-pointer hover:underline">
              Género
            </th>
            <th onClick={() => handleSort('IMDB_Rating')} className="px-6 py-3 cursor-pointer hover:underline">
              IMDB Rating
            </th>
            <th className="px-6 py-3">Descripción</th>
            <th onClick={() => handleSort('Meta_score')} className="px-6 py-3 cursor-pointer hover:underline">
              Meta Score
            </th>
            <th onClick={() => handleSort('Director')} className="px-6 py-3 cursor-pointer hover:underline">
              Director
            </th>
            <th className="px-6 py-3">Reparto</th>
            <th onClick={() => handleSort('No_of_Votes')} className="px-6 py-3 cursor-pointer hover:underline">
              No. de Votos
            </th>
            <th onClick={() => handleSort('Gross')} className="px-6 py-3 cursor-pointer hover:underline">
              Ingresos
            </th>
            <th className="px-6 py-3">Trailer</th>
            <th onClick={() => handleSort('deshabilitar')} className="px-6 py-3 cursor-pointer hover:underline">
              Deshabilitar
            </th>
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
                <td className="whitespace-nowrap px-6 py-4 font-medium">{pelicula._id}</td>
                <td className="whitespace-nowrap px-6 py-4">{pelicula.Series_Title}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <a href={pelicula.Poster_Link} target="_blank" rel="noopener noreferrer">
                    <img src={pelicula.Poster_Link} alt="Poster" className="w-20 h-auto" />
                  </a>
                </td>
                <td className="whitespace-nowrap px-6 py-4">{pelicula.Released_Year}</td>
                <td className="whitespace-nowrap px-6 py-4">{pelicula.Certificate}</td>
                <td className="whitespace-nowrap px-6 py-4">{pelicula.Runtime}</td>
                <td className="whitespace-nowrap px-6 py-4">{pelicula.Genre}</td>
                <td className="whitespace-nowrap px-6 py-4">{pelicula.IMDB_Rating}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div
                    className="description-cell"
                    style={{
                      maxHeight: '200px',
                      overflowY: 'auto',
                    }}
                  >
                    {pelicula.Overview}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">{pelicula.Meta_score}</td>
                <td className="whitespace-nowrap px-6 py-4">{pelicula.Director}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {pelicula.Star1}, {pelicula.Star2}, {pelicula.Star3}, {pelicula.Star4}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{pelicula.No_of_Votes}</td>
                <td className="whitespace-nowrap px-6 py-4">{pelicula.Gross}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <a href={pelicula.Trailer} target="_blank" rel="noopener noreferrer">
                    Ver Trailer
                  </a>
                </td>
                <td className="whitespace-nowrap px-6 py-4">{pelicula.deshabilitar}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>

 <div className="mt-6 flex justify-center items-center">
          <span className="mr-2">Filas por página</span>
          <select
            className="border border-gray-300 p-2 rounded-md"
            onChange={handleChangeRowsPerPage}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span className="ml-2">
            Página {pagina + 1} de {totalPaginas}
          </span>
          
          <button
            className={`flex items-center justify-center px-3 h-8 ml-2 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            onClick={() => handleChangePage(pagina - 1)}
            disabled={pagina === 0}
          >
            Anterior
          </button>
          <ul className="flex justify-center ml-2">
            {paginas.map((numPagina) => (
              <li key={numPagina}>
                <button
                  onClick={() => handleChangePage(numPagina)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-700 dark:hover:text-white ${pagina === numPagina ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : ''}`}
                >
                  {numPagina + 1}
                </button>
              </li>
            ))}
          </ul>
          <button
            className={`flex items-center justify-center px-3 h-8 ml-2 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            onClick={() => handleChangePage(pagina + 1)}
            disabled={pagina >= totalPaginas - 1}
          >
            Siguiente
          </button>
        </div>

      </div>
    </div>
  );
};


export default Peliculas;
