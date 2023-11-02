import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert2

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
  }, [seriesId, seriesDetails]);

  const userData = localStorage.getItem('userData');
  const userInfo = JSON.parse(userData);

  const handleRemoveFromFavorites = async () => {
    const userId = userInfo._id;

    // Muestra un mensaje de confirmación con SweetAlert2
    Swal.fire({
      title: `¿Estás seguro de eliminar "${seriesDetails.name}" de tus series favoritas?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // El usuario confirmó la eliminación, realiza la eliminación
        try {
         await axios.delete(`http://localhost:3001/favorites/${userId}/${seriesId}`);
                    // Maneja la respuesta o actualiza la interfaz si es necesario
        } catch (error) {
          console.error('Error al eliminar serie de favoritos:', error);
        }
      }
    });
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
        <h3 className="text-lg font-medium font-poppins text-moradito dark:text-clarito">{seriesDetails.name}</h3>
        <button className="text-lila hover:text-moradito" onClick={handleRemoveFromFavorites}>
          Eliminar de Favoritos
        </button>
      </div>
    </div>
  ) : null;
}

export default SeriesDetailsDashboard;
