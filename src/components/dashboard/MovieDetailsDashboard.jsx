import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'; // Importa SweetAlert2

function MovieDetailsDashboard({ movieId }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [showCard, setShowCard] = useState(true)


  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`https://duwi.onrender.com/movies/byObjectId/${movieId}`);
      if (response.status === 200) {
        const movieDetailsData = await response.json();
        setMovieDetails(movieDetailsData);
      }
    } catch (error) {
      console.error('Error al obtener detalles de la película:', error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [movieId, movieDetails]);

  const userData = localStorage.getItem('userData');
  const userInfo = JSON.parse(userData);

  const handleRemoveFromFavorites = async () => {
    const userId = userInfo._id;

    // Muestra un mensaje de confirmación con SweetAlert2
    Swal.fire({
      title: `¿Estás seguro de eliminar "${movieDetails.Series_Title}" de tus películas favoritas?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario confirmó la eliminación, realiza la eliminación
        axios.delete(`http://localhost:3001/favorites/movies/${userId}/${movieId}`);

        setShowCard(false)
      }
    });
  };

  return showCard && movieDetails ? (
    <div className="w-48 p-2 rounded-lg shadow-md mb-4 mr-5">
      <div className="relative rounded-lg overflow-hidden border-t-0">
        <img
          src={movieDetails.Poster_Link}
          alt={movieDetails.Series_Title}
          className="w-48 h-49 object-cover"
        />
      </div>
      <div className="mt-2">
        <h3 className="text-lg font-medium font-poppins text-moradito dark:text-clarito">{movieDetails.Series_Title}</h3>
        <p className="text-moradito font-poppins dark:text-clarito">{movieDetails.Released_Year}</p>
        <button className="text-lila hover:text-moradito" onClick={handleRemoveFromFavorites}>Eliminar de Favoritos</button>
      </div>
    </div>
  ) : null;
}

export default MovieDetailsDashboard;