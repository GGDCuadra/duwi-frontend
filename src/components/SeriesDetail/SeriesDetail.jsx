import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useAuth0 } from "@auth0/auth0-react";
import { FaEye, FaEyeSlash} from 'react-icons/fa'

function SerieDetail() {
  const { _id } = useParams();
  const type = "serie";
  const allSeries = useSelector((state) => state.allSeries);
  const seriesDetail = allSeries.find((serie) => serie._id === _id);
  const [isWatching, setIsWatching] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const [seriesFromDb, setSeriesFromDb] = useState(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (!seriesDetail) {
      getSeriesByObjectId();
    }
  }, [_id]);

  const getSeriesByObjectId = async () => {
    try {
      const id = _id
      const { data } = await axios.get(`http://localhost:3001/series/${id}`);
      setSeriesFromDb(data);
    } catch (error) {
      console.error('Error al obtener detalles de la serie:', error);
    }
  };

  const series = seriesDetail || seriesFromDb;

  const userData = localStorage.getItem('userData');
  const userInfo = JSON.parse(userData);


  const handleFavorite = async () => {
    if (!isFav) {
      setIsFav(true);
      const dataSeries = {
        seriesId: _id,
        userId: userInfo._id
      };

      // Realizar una solicitud POST al servidor para guardar la serie como favorita
      await axios.post('http://localhost:3001/favorites', dataSeries);
    }
  };
  const handleWatching = async () => {
    if (!isWatching) {
      setIsWatching(true);

      const dataSerie = {
        userId: userInfo._id,
        serieId: _id,
        completada: null,
      };

      try {
        // Realizar una solicitud POST a /seriesvistas para agregar a "series que estoy viendo"
        await axios.post(
          "http://localhost:3001/seriesvistas",
          dataSerie
        );
      } catch (error) {
        console.error("Error al agregar a series que estoy viendo:", error);
      }
    } else {
      // Si ya está marcada como "series que estoy viendo", puedes implementar la lógica para quitarla si lo deseas.
      // Puedes realizar una solicitud DELETE o similar para eliminarla de la lista.
      // Esta parte dependerá de la lógica de tu aplicación.
    }
  };
  if (!series) {
    return  <div className="flex w-screen h-screen justify-center items-center">
    <div className="flex flex-col items-center">
      <svg className="animate-spin h-12 w-12 text-moradito dark:text-lila" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
      <p className="mt-2 text-moradito font-semibold text-lg">Cargando...</p>
    </div>
  </div>
  }

  return (
    <>
      <div className= "p-8 rounded-lg flex">
        <div className="mr-4 ml-20">
          <img
            src={series.image ? series.image.original : ''}
            alt={series.name}
            className="w-64 h-96 object-cover rounded-3xl shadow-lg mt-20 ml-10"
          />
          <div className="mt-3 flex space-x-4 ml-20">
          {
            isAuthenticated ? (
              <>
            <button
              onClick={handleFavorite}
              className="bg-moradito hover-bg-lila text-white rounded px-4 py-2 text-xs font-poppins"
            >
              {isFav ? (
                <MdFavorite size={24} />
              ) : (
                <MdFavoriteBorder size={24} />
              )}
            </button>
            <button
              onClick={handleWatching}
              className="bg-moradito hover:bg-lila text-white rounded px-4 py-2 text-xs font-poppins"
            >
              {isWatching ? (
                <FaEyeSlash size={24} />
              ) : (
                <FaEye size={24} />
              )}
            </button>
          
            </>) : null
          }
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-morado font-poppins dark:text-clarito">{series.name}</h1>
          <p className="text-l font-bold text-moradito font-poppins dark:text-clarito">{series.runtime}</p>
          <p className="text-l font-bold text-moradito font-poppins mb-10 dark:text-clarito">
            {series.genres}
          </p>
          <div className="mx-[300px]">
            <iframe
              title={series.name}
              width="560"
              height="315"
              src={series.Trailer}
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl drop-shadow-xl mx-auto"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="ml-20 mt-3">
        <h2 className="text-xl font-bold text-oscuro font-poppins mb-3 dark:text-lila ml-20">Estado:</h2>
        <p className="text-l font-medium text-moradito font-poppins ml-20 dark:text-clarito">{series.status}</p>
      </div>
      <div className="text-center mx-auto">
        <h2 className="text-xl font-bold text-oscuro font-poppins mb-2 mt-[-150px] dark:text-lila ml-20">Sinopsis:</h2>
        <div className="w-full max-w-4xl mx-auto text-justify">
          <p className="text-lg text-moradito font-poppins mb-20 dark:text-clarito ml-20">{series.summary}</p>
        </div>
      </div>
      <div>
      <Footer />
      </div>
    </>
  );
}

export default SerieDetail;
