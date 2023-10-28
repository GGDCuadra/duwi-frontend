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
          <img src={Poster_Link} alt={Series_Title} className="w-64 h-96 object-cover rounded-lg shadow-lg" />
        </div>
        <div className="text-center m-l">
          <h1 className="text-xl font-bold text-morado font-poppins">{Series_Title}</h1>
          <p className="text-lg font-bold text-moradito font-poppins">{Released_Year}</p>
          <p className="text-lg font-bold text-moradito font-poppins">{Genre}</p>
        </div>
        <iframe
            width="560"
            height="315"
            src={Trailer}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
          ></iframe>
      </div>
      <div className='mt-11'>
          <button onClick={handleFavorite} className="bg-moradito hover:bg-lila text-white rounded px-4 py-2 mt-10 ext-lg font-poppins">
            {isFav ? <MdFavorite size={24} /> : <MdFavoriteBorder size={24} />}
          </button>
          <Link className="bg-moradito hover:bg-lila text-white rounded px-4 py-2 mt-10 ext-lg font-poppins ml-4" to={`/formCreateEdit/${type}/${_id}`}>
            Editar
          </Link>
        </div>
      <div className="text-center mt-8">
        <h2 className="text-xl font-bold text-oscuro font-poppins">Director:</h2>
        <ul className="list-disc list-inside">
          <li key={Director} className="font-poppins text-moradito">{Director}</li>
        </ul>
      </div>
      <div className="text-center mt-8">
        <h2 className="text-xl font-bold text-oscuro font-poppins">Reparto:</h2>
        <ul className="list-disc list-inside">
          <li key="Star1" className="font-poppins text-moradito">{Star1}</li>
          <li key="Star2" className="font-poppins text-moradito">{Star2}</li>
          <li key="Star3" className="font-poppins text-moradito">{Star3}</li>
          <li key="Star4" className="font-poppins text-moradito">{Star4}</li>
        </ul>
      </div>
      <div className="text-center mt-8 mb-8">
        <h2 className="text-xl font-bold text-oscuro font-poppins">Sinopsis:</h2>
        <p className="text-lg text-moradito font-poppins">{Overview}</p>
      </div>
      <div>
        
      </div>
      <Footer/>
    </div>
  );
}

export default MovieDetail;
