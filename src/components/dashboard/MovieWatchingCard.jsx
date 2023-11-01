import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function MovieWatchingCard({ movieId }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [showCard, setShowCard] = useState(true);
  const [markedAsCompleted, setMarkedAsCompleted] = useState(false);

  const userData = localStorage.getItem('userData');
  const userInfo = JSON.parse(userData);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/movies/byObjectId/${movieId}`);
        if (response.status === 200) {
          const movieDetailsData = await response.json();
          setMovieDetails(movieDetailsData);
        } else if (response.status === 404) {
          // Si la película no se encuentra, no mostrar la tarjeta
          setShowCard(false);
        }
      } catch (error) {
        console.error('Error al obtener detalles de la película:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const markMovieAsCompleted = async () => {
    if (markedAsCompleted) return; // Evitar múltiples marcados

    const userId = userInfo._id;

    // Mostrar una alerta de confirmación
    const confirmMessage = `¿Estás seguro de que quieres marcar "${movieDetails.Series_Title}" como completada?`;

    const shouldMarkAsCompleted = await showConfirmationDialog(confirmMessage);
    if (shouldMarkAsCompleted) {
      try {
        const response = await fetch(`http://localhost:3001/moviesvistas/${userId}`);
        if (response.status === 200) {
          const data = await response.json();
          const entryToUpdate = data.find(entry => entry.movieId === movieId && entry.completada === null);

          if (entryToUpdate) {
            const entryId = entryToUpdate._id;

            const updateUrl = `http://localhost:3001/moviesvistas/${entryId}`;
            const updateResponse = await fetch(updateUrl, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                completada: true,
              }),
            });

            if (updateResponse.status === 200) {
              // Película marcada como completada con éxito
              setMarkedAsCompleted(true);
            } else {
              console.error('Error al marcar la película como completada:', updateResponse.statusText);
            }
          }
        }
      } catch (error) {
        console.error('Error al marcar la película como completada:', error);
      }
    }
  };

  const showConfirmationDialog = async (message) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Confirmación',
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    });

    return isConfirmed;
  };

  return showCard && !markedAsCompleted && movieDetails ? (
    <div>
      <div className="w-48 p-2 rounded-lg shadow-md mb-4 mr-5">
        <button className="text-lila hover:text-moradito" onClick={markMovieAsCompleted}>Marcar como vista</button>
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

export default MovieWatchingCard;
