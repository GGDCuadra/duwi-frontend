import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function CompletedMovieDetailsDashboard({ movieId }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [showCard, setShowCard] = useState(true);

  const userData = localStorage.getItem('userData');
  const userInfo = JSON.parse(userData);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`https://duwi.onrender.com/movies/byObjectId/${movieId}`);
      if (response.status === 200) {
        const movieDetailsData = await response.json();
        setMovieDetails(movieDetailsData);
      } else if (response.status === 404) {
        setShowCard(false);
      }
    } catch (error) {
      console.error('Error al obtener detalles de la película:', error);
    }
  };

  const markMovieAsUncompleted = async (movieId) => {
    const userId = userInfo._id;

    await fetchMovieDetails(); // Llama a fetchMovieDetails para obtener los detalles de la película

    const { isConfirmed } = await showConfirmationDialog(
      `¿Estás seguro de que deseas sacar "${movieDetails.Series_Title}" de tus películas completadas?`
    );

    if (isConfirmed) {
      try {
        const response = await fetch(`https://duwi.onrender.com/moviesvistas/${userId}`);
        if (response.status === 200) {
          const data = await response.json();
          const entryToUpdate = data.find(entry => entry.movieId === movieId);

          if (entryToUpdate) {
            const entryId = entryToUpdate._id;

            const updateUrl = `https://duwi.onrender.com/moviesvistas/${entryId}`;
            const updateResponse = await fetch(updateUrl, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                completada: 'false', // Cambia el valor a 'false' o cualquier otro valor que desees
              }),
            });

            if (updateResponse.status === 200) {
              // Película sacada de completados con éxito
              // Actualizar el estado para ocultar la tarjeta
              setShowCard(false);
            } else {
              console.error('Error al sacar la película de completados:', updateResponse.statusText);
            }
          }
        }
      } catch (error) {
        console.error('Error al sacar la película de completados:', error);
      }
    }
  };

  const showConfirmationDialog = async (message) => {
    return Swal.fire({
      title: 'Confirmación',
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return true;
      },
    });
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  return showCard && movieDetails ? (
    <div>
      <div className="w-48 p-2 rounded-lg shadow-md mb-4 mr-5">
        <button className="text-lila hover:text-moradito font-poppins text-sm" onClick={() => markMovieAsUncompleted(movieId)}>Sacar de completados</button>
        <div className="movie-poster-container">
          <img src={movieDetails.Poster_Link} alt={movieDetails.Series_Title} className="movie-poster" />
          <div className="movie-title-overlay">
            <h3 className="text-lg font-medium font-poppins text-moradito dark:text-clarito">{movieDetails.Series_Title}</h3>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default CompletedMovieDetailsDashboard;
