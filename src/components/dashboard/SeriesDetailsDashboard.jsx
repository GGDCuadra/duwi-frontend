import React, { useState, useEffect } from 'react';

function SeriesDetailsDashboard({ seriesId }) {
  const [seriesDetails, setSeriesDetails] = useState(null);

  useEffect(() => {
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

    fetchSeriesDetails();
  }, [seriesId]);

  return seriesDetails ? (
    <li>
      <div className="movie-card"> {/* Usamos la misma clase de "movie-card" */}
        <div className="movie-poster-container">
          <img src={seriesDetails.image.original} alt={seriesDetails.name} className="movie-poster" />
          <div className="movie-title-overlay">
            <h3 className="movie-title">{seriesDetails.name}</h3>
          </div>
        </div>
      </div>
    </li>
  ) : null;
}

export default SeriesDetailsDashboard;