import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

function SerieDetail() {
  const { _id } = useParams();
  const type = "serie";
  const allSeries = useSelector((state) => state.allSeries);
  const seriesDetail = allSeries.find((serie) => serie._id === _id);
  const dispatch = useDispatch();
  const [isWatching, setIsWatching] = useState(false);
  const [isFav, setIsFav] = useState(false);

  if (!seriesDetail) {
    return <div>Loading...</div>;
  }

  const { name, genres, image, runtime, status, summary , Trailer } = seriesDetail;
  const userData = localStorage.getItem('userData');
  const userInfo = JSON.parse(userData);
  console.log(userInfo);
  const handleFavorite = async() => {
    if (!isFav) {
      setIsFav(true);
      const dataSeries = {
        seriesId: _id,
        userId: userInfo._id
      }
      // Realizar una solicitud POST a http://localhost:3001/favorites para guardar el favorito
      const { data } = await axios.post('http://localhost:3001/favorites', dataSeries);
      console.log(data);
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
        // Realizar una solicitud POST a http://localhost:3001/seriesvistas para agregar a "series que estoy viendo"
        const { data } = await axios.post(
          "http://localhost:3001/seriesvistas",
          dataSerie
        );
        console.log(data);
      } catch (error) {
        console.error("Error al agregar a series que estoy viendo:", error);
      }
    } else {
      // Si ya está marcada como "series que estoy viendo", puedes implementar la lógica para quitarla si lo deseas.
      // Puedes realizar una solicitud DELETE o similar para eliminarla de la lista.
      // Esta parte dependerá de la lógica de tu aplicación.
    }
  };
  return (
    <>
      <div className="bg-white p-8 rounded-lg flex">
        <div className="mr-4 ml-9">
          <img
            src={image ? image.original : ''}
            alt={name}
            className="w-64 h-96 object-cover rounded-3xl shadow-lg mt-20 ml-10"
          />
          <div className="mt-3 flex space-x-4 ml-20">
            <button
              onClick={handleFavorite}
              className="bg-moradito hover:bg-lila text-white rounded px-4 py-2 text-xs font-poppins"
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
              {isWatching ? "Viendo" : "Ver más tarde"}
            </button>
            <Link
              to={`/formCreateEdit/${type}/${_id}`}
              className="bg-moradito hover-bg-lila text-white rounded px-4 py-2 text-l font-poppins"
            >
              Editar
            </Link>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-morado font-poppins">{name}</h1>
          <p className="text-l font-bold text-moradito font-poppins">{runtime}</p>
          <p className="text-l font-bold text-moradito font-poppins mb-10">
            {genres}
          </p>
          <div className="mx-[300px]">
          <iframe
            width="560"
            height="315"
            src={Trailer}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl drop-shadow-xl mx-auto"
          ></iframe>
          </div>
        </div>
      </div>
      <div className="ml-20 mt-3">
        <h2 className="text-xl font-bold text-oscuro font-poppins mb-3">Estado:</h2>
        <p className="text-l font-bold text-moradito font-poppins">{status}</p>
      </div>
      <div className="text-center mx-auto">
        <h2 className="text-xl font-bold text-oscuro font-poppins mb-2 mt-[-150px]">Sinopsis:</h2>
        <div className="w-full max-w-4xl mx-auto text-justify">
        <p className="text-lg text-moradito font-poppins mb-20">{summary}</p></div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default SerieDetail;