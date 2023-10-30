import React, { useState, useEffect } from 'react';
import axios from 'axios';
function SeriesDetailsDashboard({ seriesId }) {
  const [seriesDetails, setSeriesDetails] = useState(null);

 const fetchSeriesDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/series/${seriesId}`);
        if (response.status === 200) {
          const seriesDetailsData = await response.json();
          setSeriesDetails(seriesDetailsData);
        }
      } catch (error) {
        console.error('Error al obtener detalles de la serie:', error);
      }
    };

  useEffect(() => {
    fetchSeriesDetails();
  }, [seriesId,seriesDetails]);

  const userData = localStorage.getItem('userData');
  const userInfo = JSON.parse(userData);

  const handleRemoveFromFavorites = async () => {
    const userId = userInfo._id;

    try {
     const response= await axios.delete(`http://localhost:3001/favorites/${userId}/${seriesId}`);
    } catch (error) {
      console.error('Error al eliminar película de favoritos:', error);
    }
  };
  return seriesDetails ? (
    <li>
      <div className="movie-card"> {/* Usamos la misma clase de "movie-card" */}
        <div className="movie-poster-container">
          <img src={seriesDetails.image.original} alt={seriesDetails.name} className="movie-poster" />
          <div className="movie-title-overlay">
            <h3 className="movie-title">{seriesDetails.name}</h3>
          </div>
        </div>
        <button onClick={handleRemoveFromFavorites}>Eliminar de Favoritos</button>
      </div>
    </li>
  ) : null;
}

export default SeriesDetailsDashboard;