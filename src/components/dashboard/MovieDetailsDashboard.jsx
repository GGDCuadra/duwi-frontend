import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function MovieDetailsDashboard({ movieId}) {
  const [movieDetails, setMovieDetails] = useState(null);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/movies/byObjectId/${movieId}`);
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

    try {
      const response = await axios.delete(`/favorites/movies/${userId}/${movieId}`);
    } catch (error) {
      console.error('Error al eliminar película de favoritos:', error);
    }
  };

  return movieDetails ? (
    <div className="w-48 p-2 rounded-lg shadow-md mb-4 mr-5">
      <div className="relative rounded-lg overflow-hidden border-t-0">
        <img
          src={movieDetails.Poster_Link}
          alt={movieDetails.Series_Title}
          className="w-48 h-49 object-cover"
        />
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-medium font-poppins">{movieDetails.Series_Title}</h3>
        <p className="text-moradito font-poppins">{movieDetails.Released_Year}</p>
        <button onClick={handleRemoveFromFavorites}>Eliminar de Favoritos</button>
      </div>
    </div>
  ) : null;
}

export default MovieDetailsDashboard;
