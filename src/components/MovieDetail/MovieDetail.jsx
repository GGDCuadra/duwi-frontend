import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

function MovieDetail() {
  const { _id } = useParams();
  const type = "movie";
  const allMovies = useSelector((state) => state.allMovies);
  const moviesDetail = allMovies.find((movie) => movie._id === _id);
  const dispatch = useDispatch();

  const [isFav, setIsFav] = useState(false);

  if (!moviesDetail) {
    return <div>Loading...</div>;
  }

  const { Series_Title, Released_Year, Genre, Poster_Link, Trailer, Director, Overview, Star1, Star2, Star3, Star4 } = moviesDetail;
  const userData = localStorage.getItem('userData');
  const userInfo = JSON.parse(userData);


  const handleFavorite = async() => {
    if (!isFav) {
      setIsFav(true);
      const dataSeries = {
        movieId: _id,
        userId: userInfo._id
      }
      console.log(dataSeries);
    
      const { data } = await axios.post('http://localhost:3001/favorites/movies', dataSeries);
      console.log(data);
      console.log( _id);
      console.log(userInfo._id);
    }
  };

  return (
    <div>
      <div className="bg-white p-8 rounded-lg flex">
        <div className="mr-4 ml-9">
          <img
            src={Poster_Link}
            alt={Series_Title}
            className="w-64 h-96 object-cover rounded-3xl shadow-lg mt-20 ml-10"
          />
          <div className="mt-2 flex">
            <button
              onClick={handleFavorite}
              className="bg-moradito hover:bg-lila text-white rounded px-4 py-2 text-xs font-poppins ml-20 relative top-[-1px]"
            >
              {isFav ? <MdFavorite size={24} /> : <MdFavoriteBorder size={24} />}
            </button>
            <button
              className="bg-moradito hover:bg-lila text-white rounded px-4 py-2 text-l font-poppins ml-10 relative top-[-0px]"
              to={`/formCreateEdit/${type}/${_id}`}
            >
              Editar
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center mt-15 ml-96">
          <h1 className="text-xl font-bold text-morado font-poppins">{Series_Title}</h1>
          <p className="text-lg font-bold text-moradito font-poppins">{Released_Year}</p>
          <p className="text-lg font-bold text-moradito font-poppins mb-4">{Genre}</p>
          <iframe className='rounded-xl mt-5 drop-shadow-xl'
            title={Series_Title}
            width="560"
            height="315"
            src={Trailer}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="ml-20 mt-8">
        <h2 className="text-xl font-bold text-oscuro font-poppins">Director:</h2>
        <ul className="list-disc list-inside">
          <li key={Director} className="font-poppins text-moradito">{Director}</li>
        </ul>
      </div>
      <div className="ml-20 mt-8">
        <h2 className="text-xl font-bold text-oscuro font-poppins">Reparto:</h2>
        <ul className="list-disc list-inside">
          <li key="Star1" className="font-poppins text-moradito">{Star1}</li>
          <li key="Star2" className="font-poppins text-moradito">{Star2}</li>
          <li key="Star3" className="font-poppins text-moradito">{Star3}</li>
          <li key="Star4" className="font-poppins text-moradito">{Star4}</li>
        </ul>
      </div>
      <div className="text-center mt-[-0px] mb-8 ml-[-96px]">
        <h2 className="text-xl font-bold text-oscuro font-poppins">Sinopsis:</h2>
        <p className="text-lg text-moradito font-poppins">{Overview}</p>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default MovieDetail;