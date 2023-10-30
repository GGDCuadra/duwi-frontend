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
      </div>
    </div>
  ) : null;
}

export default MovieDetailsDashboard;
