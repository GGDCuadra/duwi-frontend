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
    <div className="w-48 p-2 rounded-lg shadow-md mb-4 mr-5">
      <div className="relative rounded-lg overflow-hidden border-t-0">
        <img
          src={seriesDetails.image.original}
          alt={seriesDetails.name}
          className="w-48 h-49 object-cover"
        />
      </div>
      <div className="mt-2">
        <h3 className="text-lg font-medium font-poppins">{seriesDetails.name}</h3>
        <button onClick={handleRemoveFromFavorites}>Eliminar de Favoritos</button>
      </div>
    </div>
  ) : null;
}

export default SeriesDetailsDashboard;
