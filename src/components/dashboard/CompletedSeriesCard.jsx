import React, { useState, useEffect } from 'react';

function CompletedSeriesCard({ serieId }) {
  const [completedSeriesDetails, setCompletedSeriesDetails] = useState(null);

  const userData = localStorage.getItem('userData');
  const userInfo = JSON.parse(userData);

  const markSeriesAsUncompleted = async (serieId) => {
    const userId = userInfo._id;

    try {
      const response = await fetch(`https://duwi.onrender.com/seriesvistas/${userId}`);
      if (response.status === 200) {
        const data = await response.json();
        const entryToUpdate = data.find(entry => entry.serieId === serieId);

        if (entryToUpdate) {
          const entryId = entryToUpdate._id;

          const updateUrl = `https://duwi.onrender.com/seriesvistas/${entryId}`;
          const updateResponse = await fetch(updateUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              completada: false, 
            }),
          });

          if (updateResponse.status === 200) {
           
            setCompletedSeriesDetails(null);
          } else {
            console.error('Error al sacar la serie de completados:', updateResponse.statusText);
          }
        }
      }
    } catch (error) {
      console.error('Error al sacar la serie de completados:', error);
    }
  };

  const fetchCompletedSeriesDetails = async () => {
    try {
      const response = await fetch(`https://duwi.onrender.com/series/${serieId}`);
      if (response.status === 200) {
        const seriesDetailsData = await response.json();
        setCompletedSeriesDetails(seriesDetailsData);
      }
    } catch (error) {
      console.error('Error al obtener detalles de la serie completada:', error);
    }
  };

  useEffect(() => {
    fetchCompletedSeriesDetails();
  }, [serieId]);

  return completedSeriesDetails ? (
    <li>
      <div className="w-48 p-2 rounded-lg shadow-md mb-4 mr-5">
        <button className="text-lila hover:text-moradito font-poppins text-sm" onClick={() => markSeriesAsUncompleted(serieId)}>Sacar de completados</button>
        <div className="movie-poster-container">
          {completedSeriesDetails.image && completedSeriesDetails.image.original && (
            <img src={completedSeriesDetails.image.original} alt={completedSeriesDetails.name} className="movie-poster" />
          )}
          <div className="movie-title-overlay">
            <h3 className="text-lg font-medium font-poppins text-moradito dark:text-clarito">{completedSeriesDetails.name}</h3>
          </div>
        </div>
      </div>
    </li>
  ) : null;
}

export default CompletedSeriesCard;
