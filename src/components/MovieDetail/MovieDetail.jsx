import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

function MovieDetail() {
  const { _id } = useParams();
  const type = "movie";
  const allMovies = useSelector((state) => state.allMovies);
  const moviesDetail = allMovies.find((movie) => movie._id === _id);
  const dispatch = useDispatch();
  const [isWatching, setIsWatching] = useState(false); 

  const [isFav, setIsFav] = useState(false);

  if (!moviesDetail) {
    return <div>Loading...</div>;
  }

  const {
    Series_Title,
    Released_Year,
    Genre,
    Poster_Link,
    Trailer,
    Director,
    Overview,
    Star1,
    Star2,
    Star3,
    Star4,
  } = moviesDetail;
  const userData = localStorage.getItem("userData");
  const userInfo = JSON.parse(userData);

  const handleFavorite = async () => {
    if (!isFav) {
      setIsFav(true);
      const dataSeries = {
        movieId: _id,
        userId: userInfo._id,
      };
      console.log(dataSeries);
      // Realizar una solicitud POST a http://localhost:3001/favorites para guardar el favorito
      const { data } = await axios.post(
        "http://localhost:3001/favorites/movies",
        dataSeries
      );
      console.log(data);
    }
  };

  const handleWatching = async () => {
    if (!isWatching) {
      setIsWatching(true);

      const dataMovie = {
        userId: userInfo._id,
        movieId: _id,
        completada: null,
      };

      try {
        // Realizar una solicitud POST a http://localhost:3001/moviesvistas para agregar a "películas que estoy viendo"
        const { data } = await axios.post(
          "http://localhost:3001/moviesvistas",
          dataMovie
        );
        console.log(data);
      } catch (error) {
        console.error("Error al agregar a películas que estoy viendo:", error);
      }
    } else {
      // Si ya está marcada como "películas que estoy viendo", puedes implementar la lógica para quitarla si lo deseas.
      // Puedes realizar una solicitud DELETE o similar para eliminarla de la lista.
      // Esta parte dependerá de la lógica de tu aplicación.
    }
  };

  return (
    <>
      <div className="bg-white p-8 rounded-lg flex">
        <div className="mr-4 ml-9">
          <img
            src={Poster_Link}
            alt={Series_Title}
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
              className="bg-moradito hover:bg-lila text-white rounded px-4 py-2 text-l font-poppins"
            >
              Editar
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold text-morado font-poppins">
            {Series_Title}
          </h1>
          <p className="text-l font-bold text-moradito font-poppins">
            {Released_Year}
          </p>
          <p className="text-l font-bold text-moradito font-poppins mb-10">
            {Genre}
          </p>

          <div className="mx-[300px]">
          <iframe
            title={Series_Title}
            width="560"
            height="315"
            src={Trailer}
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl drop-shadow-xl mx-auto"
          ></iframe>
          </div>
          
          <div className="text-center mt-10">
            <h2 className="text-xl font-bold text-oscuro font-poppins mb-2">
              Sinopsis:
            </h2>
            <div className="w-full max-w-md"> 
              <p className="text-lg text-moradito font-poppins text-justify mt-3">
                {Overview}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-20 mt-3">
        <h2 className="text-xl font-bold text-oscuro font-poppins mb-3">
          Director:
        </h2>
        <ul className="list-disc list-inside">
          <li key={Director} className="font-poppins text-moradito">
            {Director}
          </li>
        </ul>
      </div>
      <div className="ml-20 mt-8">
        <h2 className="text-xl font-bold text-oscuro font-poppins mb-3">
          Reparto:
        </h2>
        <ul className="list-disc list-inside space-y-3 mb-10">
          <li key="Star1" className="font-poppins text-moradito">
            {Star1}
          </li>
          <li key="Star2" className="font-poppins text-moradito">
            {Star2}
          </li>
          <li key="Star3" className="font-poppins text-moradito">
            {Star3}
          </li>
          <li key="Star4" className="font-poppins text-moradito">
            {Star4}
          </li>
        </ul>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default MovieDetail;
