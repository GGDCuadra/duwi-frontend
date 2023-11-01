import React, { useState, useEffect } from 'react';

function SeriesWatchingCard({ serieId }) {
  const [seriesDetails, setSeriesDetails] = useState(null);
  const [markedAsCompleted, setMarkedAsCompleted] = useState(false);

  const userData = localStorage.getItem('userData');
  const userInfo = JSON.parse(userData);

  const markSerieAsCompleted = async (serieId) => {
    const userId = userInfo._id;

    try {
      const response = await fetch(`https://duwi.onrender.com/seriesvistas/${userId}`);
      if (response.status === 200) {
        const data = await response.json();
        const entryToUpdate = data.find(entry => entry.serieId === serieId && entry.completada === null);

        if (entryToUpdate) {
          const entryId = entryToUpdate._id;

          const updateUrl = `https://duwi.onrender.com/seriesvistas/${entryId}`;
          const updateResponse = await fetch(updateUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              completada: true,
            }),
          });

          if (updateResponse.status === 200) {
            // Serie marcada como completada con éxito
            // Actualizar el estado para ocultar la tarjeta
            setMarkedAsCompleted(true);
          } else {
            console.error('Error al marcar la serie como completada:', updateResponse.statusText);
          }
        }
      }
    } catch (error) {
      console.error('Error al marcar la serie como completada:', error);
    }
  };

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const response = await fetch(`https://duwi.onrender.com/series/${serieId}`);
        if (response.status === 200) {
          const seriesDetailsData = await response.json();
          setSeriesDetails(seriesDetailsData);
        } else {
          // Si no se encuentra la serie, no mostrar la tarjeta
          setSeriesDetails(null);
        }
      } catch (error) {
        console.error('Error al obtener detalles de la serie:', error);
      }
    };

    fetchSeriesDetails();
  }, [serieId]);

  return seriesDetails && !markedAsCompleted ? (

    <div className="hola">
      <div className="w-48 p-2 rounded-lg shadow-md mb-4 mr-5">
        <button className="text-lila hover:text-moradito" onClick={() => markSerieAsCompleted(serieId)}>Marcar como vista </button>
        <div className="serie-poster-container">
          {seriesDetails.image && seriesDetails.image.original && (
            <img src={seriesDetails.image.original} alt={seriesDetails.name} className="movie-poster" />
          )}
          <div className="movie-title-overlay">
            <h3 className="text-lg font-medium font-poppins text-moradito dark:text-clarito">{seriesDetails.name}</h3>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default SeriesWatchingCard;
