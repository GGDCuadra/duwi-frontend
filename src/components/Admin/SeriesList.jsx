import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaSort, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const SeriesList = () => {

  const type = "serie";
  const [series, setSeries] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [filasPorPagina, setFilasPorPagina] = useState(10);
  const [ordenarPor, setOrdenarPor] = useState('premiered');
  const [orden, setOrden] = useState('asc');
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('allseries'); 


  const navigate = useNavigate();

  const obtenerSeriesPorFiltro = (filtro) => {
    let endpoint = 'http://localhost:3001/allseries'; 
  
    if (filtro === 'habilitadas') {
      endpoint = 'http://localhost:3001/series'; 
    } else if (filtro === 'deshabilitadas') {
      endpoint = 'http://localhost:3001/disableSeries';
    }
    axios.get(endpoint)
      .then(response => {
        setSeries(response.data);
      })
      .catch(error => {
        console.error('Error al obtener series:', error);
      });
  };

  useEffect(() => {
    obtenerSeriesPorFiltro(filtro);
  }, [filtro]);

  const handleEditClick = (_id) => {
    navigate(`/formCreateEdit/${type}/${_id}`);
  };

  const handleSort = property => {
    const esAsc = ordenarPor === property && orden === 'asc';
    setOrden(esAsc ? 'desc' : 'asc');
    setOrdenarPor(property);
  
    const seriesOrdenadas = [...series].sort((a, b) => {
      const aValue = property === 'premiered' ? new Date(a[property]) : a[property];
      const bValue = property === 'premiered' ? new Date(b[property]) : b[property];
  
      if (esAsc) {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  
    setSeries(seriesOrdenadas);
  };
  

  const handleSortTitle = () => {
    const esAsc = ordenarPor === "name" && orden === "asc";
    setOrden(esAsc ? "desc" : "asc");
    setOrdenarPor("name");
  
    const seriesOrdenadas = [...series].sort((a, b) => {
      if (esAsc) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSeries(seriesOrdenadas);
  };

  const handleSearch = event => {
    setBusqueda(event.target.value);
    setPagina(0);
  };

  const handleChangePage = nuevaPagina => {
    if (nuevaPagina >= 0 && nuevaPagina <= Math.ceil(series.length / filasPorPagina) - 1) {
      setPagina(nuevaPagina);
    }
  };

  const handleChangeRowsPerPage = event => {
    setFilasPorPagina(parseInt(event.target.value, 10));
    setPagina(0);
  };

  const seriesFiltradas = series.filter(serie => {
    const seriesTitle = serie.name|| ''; // Si Series_Title es undefined, asignamos una cadena vacía
    return seriesTitle.toLowerCase().includes(busqueda.toLowerCase());
  });
  
  const totalPaginas = Math.ceil(seriesFiltradas.length / filasPorPagina);
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i);

  const handleToggleHabilitar = (serie) => {
    const confirmationMessage = `¿Está seguro de habilitar la serie "${serie.name}"?`;
  

    Swal.fire({
      title: confirmationMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
      axios.put(`http://localhost:3001/series/enable/${serie._id}`)

        .then(response => {
          const updatedSeries = series.map(s =>
            s._id === serie._id
              ? { ...s, deshabilitar: null }
              : s
          );
          setSeries(updatedSeries);
        })
        .catch(error => {
          console.error('Error al habilitar serie:', error);
        });
    }
  });
  };

  const handleAddClick = () => {
    navigate(`/formCreateEdit/serie/id`); 
  };
  
  const handleToggleDeshabilitar = (serie) => {
    const confirmationMessage = `¿Está seguro de deshabilitar la serie "${serie.name}"?`;
  

    Swal.fire({
      title: confirmationMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
      axios.put(`http://localhost:3001/series/disable/${serie._id}`)
        .then(response => {
          const updatedSeries = series.map(s =>
            s._id === serie._id
              ? { ...s, deshabilitar: 'Disabled' }
              : s
          );
  
          setSeries(updatedSeries);
        })
        .catch(error => {
          console.error('Error al deshabilitar serie:', error);
        });
    }
  });
  };

  const handleDetailClick = (_id) => {
    navigate(`/serie/${_id}`); 
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="w-4/5 p-4">

      <h1 className="text-3xl font-bold text-center mb-8 font-poppins text-moradito dark:text-lila">Series</h1>
      <div className="flex justify-between items-center mb-6 font-poppins">
        <input
          type="text"
          placeholder="Buscar por título de serie"
          className="w-1/3 md:w-2/2 border border-lila p-2 rounded-md"

          onChange={handleSearch}
        />

          <div className="flex items-center">
            <label className="mr-2 font-poppins">Filtro</label>
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="border border-lila-300 p-2 rounded-md"
            >
              <option disabled>Selecciona una opción</option>
              <option value="allmovies">Todas</option>
              <option value="habilitadas">Habilitadas</option>
              <option value="deshabilitadas">Deshabilitadas</option>
            </select>
          </div>

          <button
            className=" bg-lila text-fondito font-bold rounded-xl p-2 hover:bg-moradito font-poppins"
            onClick={handleAddClick}
          >
            Agregar Serie
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full border border-gray-400 table-auto">
            <thead className="bg-lila">
              <tr>

                <th onClick={handleSortTitle}  
                className="px-2 py-2 cursor-pointer font-poppins text-clarito">
                  Título{" "}
                  {ordenarPor === "name" ? (
                    orden === "asc" ? (
                  <FaSort className="inline" />
                ) : (
                  <FaSort className="inline transform rotate-180" />
                )
              ) : null}
                </th>

                <th className="px-2 py-2">Poster</th>
                <th onClick={() => handleSort('premiered')} className="px-2 py-2 cursor-pointer font-poppins text-clarito">
                  Año{' '}
                  {ordenarPor === 'premiered' ? (
                    orden === 'asc' ? (
                      <FaSort className="inline " />
                    ) : (
                      <FaSort className="inline transform rotate-180" />
                    )
                  ) : null}
                </th>


                <th className="px-2 py-2 cursor-pointer font-poppins text-clarito">Duración</th>
                <th className="px-2 py-2 cursor-pointer font-poppins text-clarito">Género</th>
                <th className="px-2 py-2 cursor-pointer font-poppins text-clarito">Trailer</th>
                <th className="px-2 py-2 cursor-pointer font-poppins text-clarito">Deshabilitar</th>
                <th className="px-2 py-2 cursor-pointer font-poppins text-clarito">Acción</th>

              </tr>
            </thead>

            <tbody>
              {seriesFiltradas
                .slice(pagina * filasPorPagina, pagina * filasPorPagina + filasPorPagina)
                .map((serie, index) => (
                  <tr
                    key={serie._id}
                    className={`${
                      index % 2 === 0 ? 'bg-clarito' : 'bg-white'
                    } hover:bg-lila hover:dark:bg-lila`}
                  >
                    <td className="py-1 text-center">{serie.name}</td>
                    <td className="whitespace-nowrap px-2 py-2 text-center font-poppins">
                      <a href={serie.Poster_Link} target="_blank" rel="noopener noreferrer">
                        <img src={serie.image.medium} alt="Poster" className="w-10 h-auto" />
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-center font-poppins">{serie.premiered}</td>
                    <td className="whitespace-nowrap px-2 py-2 text-center font-poppins">{serie.runtime}</td>
                    <td className="whitespace-nowrap px-2 py-2 text-center font-poppins">
                      <ul>
                        {typeof serie.genres === 'string' ? (
                          serie.genres.split(', ').map((genre, genreIndex) => (
                            <li key={genreIndex}>{genre}</li>
                          ))
                        ) : (
                          serie.genres.map((genre, genreIndex) => (
                            <li key={genreIndex}>{genre}</li>
                          ))
                        )}
                      </ul>
                    </td>
                    
                    <td className="whitespace-nowrap px-2 py-2 text-center font-poppins">
                      <a href={serie.Trailer} target="_blank" rel="noopener noreferrer">
                        Ver Trailer
                      </a>
                    </td>

                  <td className="whitespace-nowrap px-2 py-2 text-center">
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <button
                      onClick={() => handleToggleDeshabilitar(serie)}
                      className={`${
                        serie.deshabilitar === 'Disabled' ? 'bg-gray-300' : 'bg-red-500'
                      } text-white px-1 py-1 rounded-md text-sm`}
                      disabled={serie.deshabilitar === 'Disabled'}
                    >
                      Deshabilitar
                    </button>
                    <button
                      onClick={() => handleToggleHabilitar(serie)}
                      style={{
                        backgroundColor: serie.deshabilitar === 'Disabled' ? 'green' : '#cccccc',
                      }}
                      className="text-white px-1 py-1 rounded-md text-sm mt-2"
                      disabled={serie.deshabilitar !== 'Disabled'}
                    >
                      Habilitar
                    </button>
                  </div>
                  </td>

                   <td className="whitespace-nowrap px-2 py-2 text-center" style={{ position: 'relative' }}>
                  <FaEdit
                    className="edit-icon text-2xl "
                    onClick={() => handleEditClick(serie._id)}
                    style={{
                      position: 'absolute',
                      top: '70%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      cursor: 'pointer', 
                    }}
                    title="Editar"
                  />
                  <FaEye
                    className="detail-icon text-2xl"
                    onClick={() => handleDetailClick(serie._id)} 
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
            <span className="mr-2 font-poppins text-moradito dark:text-lila">Filas por página</span>
            <select
              className="border border-lila p-2 rounded-md font-poppins text-moradito"
              onChange={handleChangeRowsPerPage}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span className="whitespace-nowrap px-6 font-poppins text-moradito dark:text-lila">
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
  );
};

export default SeriesList;