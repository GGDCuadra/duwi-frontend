import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import"./dashboard.css"; // Asegúrate de que la ruta del archivo CSS sea correcta
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user, isAuthenticated } = useAuth0();
  const [isEmailExists, setIsEmailExists] = useState(false);
  const [userInfoByEmail, setUserInfoByEmail] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteSeries, setFavoriteSeries] = useState([]); // Agrega un estado para las series favoritas

  const checkEmailExistence = async (email) => {
    try {
      const response = await fetch(`http://localhost:3001/users?email=${email}`);
      if (response.status === 200) {
        setIsEmailExists(true);
      }
    } catch (error) {
      console.error('Error al verificar la existencia del correo:', error);
    }
  };

  const fetchUserInfoByEmail = async (email) => {
    try {
      const response = await fetch(`http://localhost:3001/usersByEmail?email=${email}`);
      if (response.status === 200) {
        const userData = await response.json();
        setUserInfoByEmail(userData);
      }
    } catch (error) {
      console.error('Error al obtener información del usuario por email:', error);
    }
  };

  const sendUserInfoToBackend = async (userInfo) => {
    try {
      // Primero, verifica si el correo existe
      await checkEmailExistence(userInfo.email);

      if (isEmailExists) {
        console.log('El correo ya está registrado en la base de datos.');
        return;
      }

      // Si el correo no existe, crea el usuario
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });

      if (response.status === 201) {
        console.log('Información del usuario enviada con éxito al backend.');
      } else {
        console.error('Hubo un problema al enviar la información del usuario al backend.');
      }
    } catch (error) {
      console.error('Error al enviar información del usuario al backend:', error);
    }
  };

  const fetchFavoriteMovies = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/favorites/movies/${userId}`);
      if (response.status === 200) {
        const favoriteMoviesData = await response.json();
        setFavoriteMovies(favoriteMoviesData);
      }
    } catch (error) {
      console.error('Error al obtener las películas favoritas:', error);
    }
  };

  // Nueva función para obtener series favoritas
  const fetchFavoriteSeries = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/favorites/${userId}`);
      if (response.status === 200) {
        const favoriteSeriesData = await response.json();
        setFavoriteSeries(favoriteSeriesData);
      }
    } catch (error) {
      console.error('Error al obtener las series favoritas:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user && user.email) {
      checkEmailExistence(user.email).then(() => {
        const userInfo = {
          username: user.given_name,
          email: user.email,
        };
  
        // Envía la información del usuario si el correo no existe
        if (!isEmailExists) {
          sendUserInfoToBackend(userInfo);
        }
  
        // Después de enviar la información del usuario, obtén más detalles del usuario
        fetchUserInfoByEmail(user.email);
      });
    }
  }, [isAuthenticated, user]);
  
  

  useEffect(() => {
    if (userInfoByEmail && userInfoByEmail._id) {
      fetchFavoriteMovies(userInfoByEmail._id);
      fetchFavoriteSeries(userInfoByEmail._id); // Llama a la función para obtener series favoritas
    }
  }, [userInfoByEmail]);
  
 
  return (
    <div className="dashboard-container">
      {isAuthenticated ? (
        <div>
          <img src={user.picture} alt={user.name} className="user-avatar" />
          <h1>Bienvenido, {user.name}</h1>
          <p>Correo: {user.email}</p>
          <p>Usuario: {user.given_name}</p>
          {userInfoByEmail && (
            <div className="user-details">
              <p>ID de Mongo: {userInfoByEmail._id}</p>
              <p>Rol: {userInfoByEmail.rol}</p>
            </div>
          )}
          {userInfoByEmail && userInfoByEmail.rol === "Admin" && (
          <Link to="/admin">
          <button className="orange-button">Panel Administrador ultrasecreto</button>
        </Link>
        )}
          <div className="favorite-section">
            <div className="favorite-box">
              <h2>Películas Favoritas</h2>
              <ul>
                {favoriteMovies.map((movie) => (
                <li key={movie._id}>{movie.movieId}</li>
                     ))}
               </ul>
            </div>
            <div className="favorite-box">
              <h2>Series Favoritas</h2>
              <ul>
                {favoriteSeries.map((series) => (
                <li key={series._id}>{series.seriesId}</li>
                ))}
                </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>Debes iniciar sesión para ver el contenido del Dashboard.</p>
      )}
    </div>
  );
}

export default Dashboard;