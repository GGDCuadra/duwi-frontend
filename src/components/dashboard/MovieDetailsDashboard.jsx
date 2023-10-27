import React, { useState, useEffect } from 'react';


function MovieDetailsDashboard({ movieId }) {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
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

    fetchMovieDetails();
  }, [movieId]);

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
      </div>
    </li>
  ) : null;
}

export default MovieDetailsDashboard;
