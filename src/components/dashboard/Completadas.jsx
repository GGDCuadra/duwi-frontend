import React, { useState, useEffect } from 'react';
import CompletedMovieDetailsDashboard from '../dashboard/CompletedMovieDetailsDashboard';
import CompletedSeriesCard from '..//dashboard/CompletedSeriesCard'; 

function Completadas() {
  const [userData, setUserData] = useState(null);
  const [moviesVistas, setMoviesVistas] = useState([]);
  const [seriesVistas, setSeriesVistas] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const userInfo = JSON.parse(userData);
    
    // Obtén el ID del usuario del almacenamiento local
    const userId = userInfo._id;

    // Realiza una solicitud para obtener películas completadas
    const fetchMoviesVistas = async () => {
      try {
        const response = await fetch(`http://localhost:3001/moviesvistas/${userId}`);
        if (response.status === 200) {
          const moviesData = await response.json();
          setMoviesVistas(moviesData);
        } else {
          console.log('No se encontraron películas completadas.');
        }
      } catch (error) {
        console.error('Error al obtener películas completadas:', error);
      }
    };

    // Realiza una solicitud para obtener series completadas
    const fetchSeriesVistas = async () => {
      try {
        const response = await fetch(`http://localhost:3001/seriesvistas/${userId}`);
        if (response.status === 200) {
          const seriesData = await response.json();
          setSeriesVistas(seriesData);
        } else {
          console.log('No se encontraron series completadas.');
        }
      } catch (error) {
        console.error('Error al obtener series completadas:', error);
      }
    };

    // Llama a las funciones para obtener películas y series completadas
    fetchMoviesVistas();
    fetchSeriesVistas();
  }, []);

  return (
    <div className="completadas">
      <div className="peliculas-vistas">
        <h2 className="font-poppins text-xl font-bold text-moradito mb-3 text-center">Películas Completadas</h2>
        <ul div className="flex flex-wrap-10">
          {moviesVistas.length === 0 && <p>No tienes ninguna película completada</p>}
          {moviesVistas.map((movie) => {
            if (movie.completada === true) {
              return (
                <CompletedMovieDetailsDashboard key={movie._id} movieId={movie.movieId} />
              );
            }
            return null; // Si no está completado, no se renderiza
          })}
        </ul>
      </div>
      <div className="series-vistas">
        <h2 className="font-poppins text-xl font-bold text-moradito mb-3 text-center">Series Completadas</h2>
        <ul div className="flex flex-wrap-10">
          {seriesVistas.length === 0 && <p>No tienes ninguna serie completada</p>}
          {seriesVistas.map((serie) => {
            if (serie.completada === true) {
              return (
                <CompletedSeriesCard key={serie._id} serieId={serie.serieId} />
              );
            }
            return null; // Si no está completado, no se renderiza
          })}
        </ul>
      </div>
    </div>
  );
}

export default Completadas;
