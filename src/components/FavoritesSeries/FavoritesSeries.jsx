import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function FavoriteSeries({ userId }) {
  const [favoriteSeries, setFavoriteSeries] = useState([]);
  const allSeries = useSelector((state) => state.allSeries)

  const seriesFavoritas = allSeries.filter((serie) => {
    // Verifica si algún objeto en seriesIdArray tiene un _id que coincida con el _id de la serie.
    return favoriteSeries.some((favSerie) => favSerie.seriesId === serie._id);
  });
  console.log(allSeries);

  useEffect(() => {
    const fetchFavoriteSeries = async () => {
      try {
        const response = await axios.get(`/favorites/ID_DEL_USUARIO`);
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
  console.log(favoriteSeries);
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
              <p>{serie.name}</p>
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