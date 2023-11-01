import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { FaEdit, FaSort, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const Peliculas = () => {

  const type = "movie";
  const [peliculas, setPeliculas] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [filasPorPagina, setFilasPorPagina] = useState(10);
  const [ordenarPor, setOrdenarPor] = useState('Released_Year');
  const [orden, setOrden] = useState('asc');
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('allmovies'); 

  const navigate = useNavigate();

  const obtenerPeliculasPorFiltro = (filtro) => {
    let endpoint = 'http://localhost:3001/movies'; 
  
    if (filtro === 'habilitadas') {
      endpoint = 'http://localhost:3001/enabledMovies'; 
    } else if (filtro === 'deshabilitadas') {
      endpoint = 'http://localhost:3001/disableMovies';
    }
  
    axios.get(endpoint)
      .then(response => {
        setPeliculas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener películas:', error);
      });
  };

  useEffect(() => {
    obtenerPeliculasPorFiltro(filtro);
  }, [filtro]);
  

  const handleEditClick = (_id) => {
    navigate(`/formCreateEdit/${type}/${_id}`);
  };

  const handleSort = property => {
    const esAsc = ordenarPor === property && orden === 'asc';
    setOrden(esAsc ? 'desc' : 'asc');
    setOrdenarPor(property);
  
    const peliculasOrdenadas = [...peliculas].sort((a, b) => {
      if (esAsc) {
        return a[property] - b[property]; 
      } else {
        return b[property] - a[property]; 
      }
    });
    setPeliculas(peliculasOrdenadas);
  };

  const handleSortTitle = () => {
    const esAsc = ordenarPor === "Series_Title" && orden === "asc";
    setOrden(esAsc ? "desc" : "asc");
    setOrdenarPor("Series_Title");
  
    const peliculasOrdenadas = [...peliculas].sort((a, b) => {
      if (esAsc) {
        return a.Series_Title.localeCompare(b.Series_Title);
      } else {
        return b.Series_Title.localeCompare(a.Series_Title);
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

  const handleToggleHabilitar = (pelicula) => {
    const confirmationMessage = `¿Está seguro de habilitar la película "${pelicula.Series_Title}"?`;
    
    Swal.fire({
      title: confirmationMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
      axios.put(`http://localhost:3001/movies/enable/${pelicula._id}`)
        .then(response => {
          const updatedPeliculas = peliculas.map(p =>
            p._id === pelicula._id
              ? { ...p, deshabilitar: null }
              : p
          );
          setPeliculas(updatedPeliculas);
        })
        .catch(error => {
          console.error(`Error al habilitar película:`, error);
        });
    }
  });
  };
  
  const handleAddClick = () => {
    navigate(`/formCreateEdit/movie/id`); 
  };

  const handleToggleDeshabilitar = (pelicula) => {
    const confirmationMessage = `¿Está seguro de deshabilitar la película "${pelicula.Series_Title}"?`;
    
    Swal.fire({
      title: confirmationMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
      axios.put(`http://localhost:3001/movies/disable/${pelicula._id}`)
        .then(response => {
          const updatedPeliculas = peliculas.map(p =>
            p._id === pelicula._id
              ? { ...p, deshabilitar: 'Disabled' }
              : p
          );
          setPeliculas(updatedPeliculas);
        })
        .catch(error => {
          console.error(`Error al deshabilitar película:`, error);
        });
    }
  });
  };

  const handleDetailClick = (_id) => {
    navigate(`/movie/${_id}`); 
  };

  
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="w-4/5 p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Películas</h1>
     
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Buscar por título de película"
            className="w-1/3 md:w-2/2 border border-gray-300 p-2 rounded-md "
            onChange={handleSearch}
          />
          
          <div className="flex items-center">
            <label className="mr-2">Filtro</label>
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            >
              <option disabled>Selecciona una opción</option>
              <option value="allmovies">Todas</option>
              <option value="habilitadas">Habilitadas</option>
              <option value="deshabilitadas">Deshabilitadas</option>
            </select>
          </div>
          
          <button
            className=" bg-blue-200 font-bold border border-gray-400 rounded-md p-2 rounded-md  hover:bg-gray-400"
            onClick={handleAddClick}
          >
            Agregar película
          </button>
        </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full border border-gray-400 table-auto">
        <thead className="bg-blue-200">
          <tr>
            <th onClick={handleSortTitle} 
            className="px-2 py-2 cursor-pointer">
              Título{" "}
              {ordenarPor === "Series_Title" ? (
                orden === "asc" ? (
                  <FaSort className="inline" />
                ) : (
                  <FaSort className="inline transform rotate-180" />
                )
              ) : null}
            </th>

            <th className="px-2 py-2">Poster</th>
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
              <th className="px-2 py-2">Duración</th>
              <th className="px-2 py-2">Género</th>
              <th className="px-2 py-2">Reparto</th>
              <th className="px-2 py-2">Trailer</th>
              <th className="px-2 py-2">Deshabilitar</th>
              <th className="px-2 py-2">Acción</th>
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
                <td className="whitespace-nowrap py-1 text-center">{pelicula.Series_Title}</td>
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

                <td className="whitespace-nowrap text-center">
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <button
                      onClick={() => handleToggleDeshabilitar(pelicula)}
                      className={`${
                        pelicula.deshabilitar === 'Disabled' ? 'bg-gray-300' : 'bg-red-500'
                      } text-white rounded-md text-sm`}
                      disabled={pelicula.deshabilitar === 'Disabled'}
                    >
                      Deshabilitar
                    </button>
                    <button
                      onClick={() => handleToggleHabilitar(pelicula)}
                      style={{
                        backgroundColor: pelicula.deshabilitar === 'Disabled' ? 'green' : '#cccccc',
                      }}
                      className="text-white rounded-md text-sm mt-2"
                      disabled={pelicula.deshabilitar !== 'Disabled'}
                    >
                      Habilitar
                    </button>
                  </div>
                </td>

                <td className="whitespace-nowrap px-2 py-2 text-center" style={{ position: 'relative' }}>
                  <FaEdit
                    className="edit-icon text-2xl "
                    onClick={() => handleEditClick(pelicula._id)}
                    style={{
                      position: 'absolute',
                      top: '60%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      cursor: 'pointer', 
                    }}
                    title="Editar"
                  />
                  <FaEye
                    className="detail-icon text-2xl"
                    onClick={() => handleDetailClick(pelicula._id)} 
                    style={{
                      position: 'absolute',
                      top: '40%',
                      left: '50%', 
                      transform: 'translate(-50%, -50%)',
                      cursor: 'pointer', 
                    }}
                    title="Ver detalle"
                  />
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