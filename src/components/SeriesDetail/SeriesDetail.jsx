import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

function SerieDetail() {
  const { _id } = useParams();
  const type = "serie";
  const allSeries = useSelector((state) => state.allSeries);
  const seriesDetail = allSeries.find((serie) => serie._id === _id);

  if (!seriesDetail) {
    return <div>Loading...</div>;
  }

  const { name, genres, image, runtime, status, summary } = seriesDetail;

  return (
    <>
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex">
        <div className="mr-4">
          <img src={image ? image.original : ""} alt={name} className="w-64 h-96 object-cover rounded-lg shadow-lg" />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-morado font-poppins">{name}</h1>
          <p className="text-lg font-bold text-moradito font-poppins">{runtime}</p>
          <p className="text-lg font-bold text-moradito font-poppins">{genres}</p>
        </div>
      </div>
      <div className="text-center mt-8">
        <h2 className="text-xl font-bold text-oscuro font-poppins">Estado:</h2>
        <p className="text-lg font-bold text-moradito font-poppins">{status}</p>
      </div>
      <div className="text-center mt-8">
        <h2 className="text-xl font-bold text-oscuro font-poppins">Sinopsis:</h2>
        <p className="text-lg text-moradito font-poppins">{summary}</p>
      </div>
      <div>
        <Link to={`/formCreateEdit/${type}/${_id}`}>
        <button>Editar</button>
        </Link>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default SerieDetail;
