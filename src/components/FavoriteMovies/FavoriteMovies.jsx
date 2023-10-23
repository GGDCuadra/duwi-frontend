import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FavoriteMovies({ userId }) {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const response = await axios.get(`/api/favorites/movies/${userId}`);
        setFavoriteMovies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavoriteMovies();
  }, [userId]);

  const handleDeleteMovie = async (movieId) => {
    try {
      await axios.delete(`/api/favorites/movies/${userId}/${movieId}`);
      setFavoriteMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.movieId !== movieId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mis películas favoritas</h2>
      {favoriteMovies.length === 0 ? (
        <p>No tienes películas favoritas.</p>
      ) : (
        <ul>
          {favoriteMovies.map((movie) => (
            <li key={movie._id}>
              <p>{movie.movieId}</p>
              <button onClick={() => handleDeleteMovie(movie.movieId)}>
                Eliminar de favoritos
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoriteMovies;