import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../Footer/Footer';

function MovieDetail() {
  const { _id } = useParams();
  const allMovies = useSelector((state) => state.allMovies);
  const moviesDetail = allMovies.find((movie) => movie._id === _id);

  if (!moviesDetail) {
    return <div>Loading...</div>;
  }

  const { Series_Title, Released_Year, Genre, Poster_Link, trailer, Director, Overview, Star1, Star2, Star3, Star4 } = moviesDetail;

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
      <Footer/>
    </div>
  );
}

export default MovieDetail;
