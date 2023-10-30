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
      const response = await axios.delete(`http://localhost:3001/favorites/movies/${userId}/${movieId}`);
    } catch (error) {
      console.error('Error al eliminar película de favoritos:', error);
    }
  };

  return movieDetails ? (
    <li>
      <div className="movie-card">
        <div className="movie-poster-container">
          <img src={movieDetails.Poster_Link} alt={movieDetails.Series_Title} className="movie-poster" />
          <div className="movie-title-overlay">
            <h3 className="movie-title">{movieDetails.Series_Title}</h3>
            <h3 className="movie-title">{movieDetails.Released_Year}</h3>
          </div>
        </div>
        <button onClick={handleRemoveFromFavorites}>Eliminar de Favoritos</button>
      </div>
    </li>
  ) : null;
}

export default MovieDetailsDashboard;
