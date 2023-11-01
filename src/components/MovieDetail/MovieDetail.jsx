import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";

function MovieDetail() {

  const { _id } = useParams();
  const { user, isAuthenticated } = useAuth0();
  const type = "movie";
  const allMovies = useSelector((state) => state.allMovies);
  const moviesDetail = allMovies.find((movie) => movie._id === _id);
  const dispatch = useDispatch();
  const [isWatching, setIsWatching] = useState(false); 
  const [isFav, setIsFav] = useState(false);
  const [movieFromDb, setMovieFromDb] = useState("")


  useEffect(() => {
    if (!moviesDetail) {
      getSeriesByObjectId();
    }
  }, [_id]);

  const getSeriesByObjectId = async () => {
    try {
      const id = _id
      const { data } = await axios.get(`/movies/byObjectId/${_id}`);
      setMovieFromDb(data);
    } catch (error) {
      console.error('Error al obtener detalles de la serie:', error);
    }
  };


  

  /* const {
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
  } = movieFromDb || moviesDetail; */
  const movie = movieFromDb || moviesDetail

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
        "/favorites/movies",
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
          "/moviesvistas",
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
if (!movieFromDb && !moviesDetail) {
    return  <div className="flex w-screen h-screen justify-center items-center bg-gray-100">
    <div className="flex flex-col items-center">
      <svg className="animate-spin h-12 w-12 text-moradito dark:text-lila" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
      <p className="mt-2 text-moradito font-semibold text-lg dark:text-lila">Cargando...</p>
    </div>
  </div>
  }
  return (
    <>
      <div className="p-8 rounded-lg flex">
        <div className="mr-4">
          <img
            src={movie.Poster_Link}
            alt={movie.Series_Title}
            className="w-64 h-96 object-cover rounded-3xl shadow-lg mt-20 ml-10"
          />
          {
            isAuthenticated ? (
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
               {isWatching ? (
                <FaEyeSlash size={24} />
              ) : (
                <FaEye size={24} />
              )}
            </button>
            
          </div>
            ) : null
          }
          
        </div>
        <div className="flex flex-col items-center mt-10">
          <h1 className="text-xl font-bold text-morado font-poppins dark:text-clarito">
            {movie.Series_Title}
          </h1>
          <p className="text-l font-bold text-moradito font-poppins dark:text-clarito">
            {movie.Released_Year}
          </p>
          <p className="text-l font-bold text-moradito font-poppins mb-10 dark:text-clarito">
            {movie.Genre}
          </p>

          <div className="mx-[500px]">
          <iframe
            title={movie.Series_Title}
            width="560"
            height="315"
            src={movie.Trailer}
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl drop-shadow-xl mx-auto"
          ></iframe>
          </div>
          
          <div className="text-center mt-10">
            <h2 className="text-xl font-bold text-oscuro font-poppins mb-2 dark:text-lila">
              Sinopsis:
            </h2>
            <div className="w-full max-w-md"> 
              <p className="text-lg text-moradito font-poppins text-justify mt-3 dark:text-clarito">
                {movie.Overview}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-20">
        <h2 className="text-xl font-bold text-oscuro font-poppins mb-3 dark:text-lila ml-20">
          Director:
        </h2>
        <ul className="list-disc list-inside">
          <li key={movie.Director} className="font-poppins text-moradito dark:text-clarito ml-20">
            {movie.Director}
          </li>
        </ul>
      </div>
      <div className="ml-20 mt-8">
        <h2 className="text-xl font-bold text-oscuro font-poppins mb-3 dark:text-lila ml-20">
          Reparto:
        </h2>
        <ul className="list-disc list-inside space-y-3 mb-10">
          <li key="Star1" className="font-poppins text-moradito dark:text-clarito ml-20">
            {movie.Star1}
          </li>
          <li key="Star2" className="font-poppins text-moradito dark:text-clarito ml-20">
            {movie.Star2}
          </li>
          <li key="Star3" className="font-poppins text-moradito dark:text-clarito ml-20">
            {movie.Star3}
          </li>
          <li key="Star4" className="font-poppins text-moradito dark:text-clarito ml-20">
            {movie.Star4}
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
