import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetail() {
  const { title } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/movies/title?title=${title}`);
        setMovie(data[0]);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMovie();
  }, [title]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const { name, year, genres, poster, trailer, cast, synopsis } = movie;

  return (
    <div className="flex flex-col items-center">
      <img src={poster} alt={name} className="w-64 h-96 object-cover rounded-lg shadow-lg" />
      <div className="mt-4">
        <h1 className="text-3xl font-bold text-moradito">{name}</h1>
        <p className="text-lg font-bold text-clarito">{year}</p>
        <p className="text-lg font-bold text-clarito">{genres.join(', ')}</p>
      </div>
      <div className="mt-4">
        <iframe
          title={name}
          width="560"
          height="315"
          src={trailer}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold text-moradito">Reparto:</h2>
        <ul className="list-disc list-inside">
          {cast.map((actor) => (
            <li key={actor}>{actor}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold text-moradito">Sinopsis:</h2>
        <p className="text-lg font-bold text-clarito">{synopsis}</p>
      </div>
    </div>
  );
}

export default MovieDetail;