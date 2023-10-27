import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SeriesList() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    // Realiza una solicitud al servidor para obtener la lista de series
    axios.get('http://localhost:3001/series') // Asegúrate de usar la ruta correcta de tu API
      .then(response => {
        setSeries(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

//   const toggleSeries = (serieId, isEnabled) => {
//     axios.put(`http://localhost:3001/series/deshabilitar/:id ? 'enable' : 'disable'}`)
//       .then(response => {
//         // Actualiza el estado del componente con la serie habilitada/deshabilitada
//         setSeries(prevSeries => prevSeries.map(serie => {
//           if (serie._id === serieId) {
//             serie.deshabilitar = isEnabled ? 'Enabled' : 'Disabled';
//           }
//           return serie;
//         }));
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

return (
    <div>
      <h1>Lista de Series</h1>
      <ul>
        {series.map(serie => (
          <li key={serie._id}>
            <h2>{serie.name}</h2>
            <p>{serie.summary}</p>
            <img src={serie.image.medium} alt={serie.name} />
            <p>{serie.deshabilitar === 'Enabled' ? 'Habilitada' : 'Deshabilitada'}</p>
            <button onClick={() => toggleSeries(serie._id, true)}>Habilitar</button>
            <button onClick={() => toggleSeries(serie._id, false)}>Deshabilitar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SeriesList;
