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
      </div>
    </div>
  ) : null;
}

export default SeriesDetailsDashboard;
