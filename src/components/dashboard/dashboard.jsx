import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import "./dashboard.css"; 
import MovieDetailsDashboard from './MovieDetailsDashboard';
import SeriesDetailsDashboard from './SeriesDetailsDashboard.jsx';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user, isAuthenticated } = useAuth0();
  const [isEmailExists, setIsEmailExists] = useState(false);
  const [userInfoByEmail, setUserInfoByEmail] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteSeries, setFavoriteSeries] = useState([]); 
  const [selectedSection, setSelectedSection] = useState('favorites');



  const [availableGenres, setAvailableGenres] = useState([

    "Crime", "Drama", "Action", "Adventure", "Sci-Fi", "Biography", "History", "Fantasy", "Horror", "Mystery", "Thriller", "Western", "Comedy", "Romance", "Animation", "Family", "War", "Music", "Nature", "Science-Fiction", "Supernatural", "Medical", "Anime", "Food", "Travel"
  ]);

  const [editedUserInfo, setEditedUserInfo] = useState({
    apodo: '', 
    edad: '',
    genres: '',
  });

  useEffect(() => {
    if (isAuthenticated && user && user.email) {
      // Check email existence and set a default role for users with email and password
      const checkEmailAndSetDefaultRole = async (email) => {
        try {
          const response = await fetch(`http://localhost:3001/users?email=${email}`);
          if (response.status === 200) {
            setIsEmailExists(true);
          }

          const userInfo = {
            username: user.given_name,
            email: user.email,
            rol: 'Usuario', // Set a default role
          };

          if (!isEmailExists) {
            await sendUserInfoToBackend(userInfo);
          }

          fetchUserInfoByEmail(user.email);
        } catch (error) {
          console.error('Error al verificar la existencia del correo:', error);
        }
      };

      checkEmailAndSetDefaultRole(user.email);
    }
  }, [isAuthenticated, user]);

  const [isEditing, setIsEditing] = useState(false);

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
  };

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
  useEffect(() => {
    if (isAuthenticated && user && user.email) {
      checkEmailExistence(user.email).then(() => {
        const userInfo = {
          username: user.given_name,
          email: user.email,
        };

        if (!isEmailExists) {
          userInfo.rol = 'Usuario'; 
          sendUserInfoToBackend(userInfo);
        }
        fetchUserInfoByEmail(user.email);
      });
    }
  }, [isAuthenticated, user]);


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
    if (userInfoByEmail && userInfoByEmail._id) {
      fetchFavoriteMovies(userInfoByEmail._id);
      fetchFavoriteSeries(userInfoByEmail._id); // Llama a la función para obtener series favoritas
    }
  }, [userInfoByEmail]);




  const enableEdit = () => {
    setIsEditing(true);
    // Puedes inicializar los valores con la información actual del usuario
    setEditedUserInfo({
      Nickname: userInfoByEmail.Nickname,
      edad: userInfoByEmail.edad,
      genres: userInfoByEmail.genres.join(', '),
    });
  };

  const saveEditedUser = async () => {
    try {
      // Enviar los campos editados al servidor a través de una solicitud PUT
      const response = await fetch(`http://localhost:3001/users/${userInfoByEmail._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apodo: editedUserInfo.apodo, // Cambia "nickname" a "apodo"
          edad: editedUserInfo.edad,
          genres: editedUserInfo.genres,
        }),
      });
  
      if (response.status === 200) {
        // Actualización exitosa
        setIsEditing(false); // Desactivar la edición
        // Recargar los datos del usuario para reflejar los cambios
        fetchUserInfoByEmail(user.email);
      } else {
        console.error('Error al actualizar los campos de usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al actualizar los campos de usuario:', error);
    }
  };
  
  if (isAuthenticated) {
    localStorage.setItem('userData', JSON.stringify(userInfoByEmail));
  }

  
  return (
<div className="dashboard-container">
      {isAuthenticated ? (
        <div>
<div className="divrolpanel" >
     
           {userInfoByEmail && userInfoByEmail.rol === 'Admin' && (
            <Link to="/admin"> {/* Utiliza Link para redirigir a /admin */}
            <button className="admin-button">Panel Administrador</button>
          </Link>
      )}

</div>

          <img src={user.picture} alt={user.name} className="user-avatar" />
  
          <div className="Userinfo">
          <h1>
  Bienvenido, {userInfoByEmail && userInfoByEmail.apodo ? userInfoByEmail.apodo : user.name} 🤗
</h1>
          </div>
          <div className="sidebar">
          <button onClick={() => handleSectionSelect('perfil')}>Perfil</button>
            <button onClick={() => handleSectionSelect('favorites')}>Películas Favoritas</button>
            <button onClick={() => handleSectionSelect('series')}>Series Favoritas</button>
            <button onClick={() => handleSectionSelect('watchingSeries')}>Lo que estás viendo</button>
          </div>
  
          {selectedSection && (
            <div className="favorite-section">
              {selectedSection === 'favorites' && (
                <div className="favorite-box">
                  <h2 className="rol">Películas Favoritas ⭐</h2>
                  {favoriteMovies.length === 0 ? (
                    <p>Aún no tienes películas favoritas.</p>
                  ) : (
                    <ul>
                      {favoriteMovies.map((movie) => (
                        <MovieDetailsDashboard key={movie._id} movieId={movie.movieId} />
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {selectedSection === 'series' && (
                <div>
                  <h2 className="rol">Series Favoritas ⭐</h2>
                  {favoriteSeries.length === 0 ? (
                    <p>Aún no tienes series favoritas.</p>
                  ) : (
                    <ul>
                      {favoriteSeries.map((series) => (
                        <li key={series._id}>
                          <SeriesDetailsDashboard seriesId={series.seriesId} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              
              
              )}
             {selectedSection === 'perfil' && (
              <div >
               <div>
                {userInfoByEmail && (
        <div>
          <p>ID Usuario: {userInfoByEmail._id}</p>
          <p>Correo: {user.email}</p>
          {userInfoByEmail.rol !== null && (
    <p>Rol: {userInfoByEmail.rol}</p>
  )}
          {isEditing ? (
            <div>
              <label htmlFor="apodo">Apodo:</label>
              <input
                type="text"
                id="apodo"
                value={editedUserInfo.apodo}
                onChange={(e) =>
                  setEditedUserInfo({ ...editedUserInfo, apodo: e.target.value })
                }
              />
              <label htmlFor="edad">Edad:</label>
              <input
                type="text"
                id="edad"
                value={editedUserInfo.edad}
                onChange={(e) =>
                  setEditedUserInfo({ ...editedUserInfo, edad: e.target.value })
                }
              />


<label htmlFor="genres">Géneros de tu preferencia:</label>
{availableGenres.map((genre) => (
      <label key={genre}>
        <input
          type="checkbox"
          value={genre}
          checked={editedUserInfo.genres.includes(genre)}
          onChange={(e) => {
            const selectedGenres = new Set(editedUserInfo.genres.split(', '));
            if (e.target.checked) {
              selectedGenres.add(genre);
            } else {
              selectedGenres.delete(genre);
            }
            setEditedUserInfo({ ...editedUserInfo, genres: [...selectedGenres].join(', ') });
          }}
        />
        {genre}
      </label>
    ))}
              <button onClick={saveEditedUser}>
                Guardar
              </button>
            </div>
          ) : (
            <div>
             
              <p>Apodo: {userInfoByEmail.apodo}</p>
              <p >Edad: {userInfoByEmail.edad} Años</p>
              <p>Tus géneros favoritos: {userInfoByEmail.genres || 'Sin géneros favoritos'}</p>
              <button onClick={enableEdit}>editar perfil✏️</button>
            </div>
          )}
        </div>
      )}
     
    </div>
  </div>
)}


            </div>
          )}
        </div>
      ) : (
        <p>Debes iniciar sesión para ver el contenido del Dashboard.</p>
      )}
    </div>
  );
  
}

export default Dashboard;
