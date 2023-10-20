import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FavoriteSeries({ userId }) {
  const [favoriteSeries, setFavoriteSeries] = useState([]);

  useEffect(() => {
    const fetchFavoriteSeries = async () => {
      try {
        const response = await axios.get(`/api/favorites/series/${userId}`);
        setFavoriteSeries(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavoriteSeries();
  }, [userId]);

  const handleDeleteSerie = async (serieId) => {
    try {
      await axios.delete(`/api/favorites/series/${userId}/${serieId}`);
      setFavoriteSeries((prevSeries) =>
        prevSeries.filter((serie) => serie.serieId !== serieId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mis series favoritas</h2>
      {favoriteSeries.length === 0 ? (
        <p>No tienes series favoritas.</p>
      ) : (
        <ul>
          {favoriteSeries.map((serie) => (
            <li key={serie._id}>
              <p>{serie.serieId}</p>
              <button onClick={() => handleDeleteSerie(serie.serieId)}>
                Eliminar de favoritos
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoriteSeries;