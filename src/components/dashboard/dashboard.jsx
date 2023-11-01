import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import MovieDetailsDashboard from "./MovieDetailsDashboard";
import SeriesDetailsDashboard from "./SeriesDetailsDashboard.jsx";
import { Link } from "react-router-dom";
import MovieWatchingCard from '..//dashboard/MovieWatchingCard';
import SeriesWatchingCard from '..//dashboard/SeriesWatchingCard'; 

function Dashboard() {
  const { user, isAuthenticated } = useAuth0();
  const [isEmailExists, setIsEmailExists] = useState(false);
  const [userInfoByEmail, setUserInfoByEmail] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteSeries, setFavoriteSeries] = useState([]);
  const [selectedSection, setSelectedSection] = useState("favorites");
  const [watchedMovieIds, setWatchedMovieIds] = useState([]);
  const [moviesWatching, setMoviesWatching] = useState([]);
  const [watchingSeries, setWatchingSeries] = useState([]);

  const [availableGenres, setAvailableGenres] = useState([
    "Crime",
    "Drama",
    "Action",
    "Adventure",
    "Sci-Fi",
    "Biography",
    "History",
    "Fantasy",
    "Horror",
    "Mystery",
    "Thriller",
    "Western",
    "Comedy",
    "Romance",
    "Animation",
    "Family",
    "War",
    "Music",
    "Nature",
    "Science-Fiction",
    "Supernatural",
    "Medical",
    "Anime",
    "Food",
    "Travel",
  ]);

  const [editedUserInfo, setEditedUserInfo] = useState({
    apodo: "",
    edad: "",
    genres: "",
  });

  useEffect(() => {
    if (isAuthenticated && user && user.email) {
      // Check email existence and set a default role for users with email and password
      const checkEmailAndSetDefaultRole = async (email) => {
        try {
          const response = await fetch(
            `http://localhost:3001/users?email=${email}`
          );
          if (response.status === 200) {
            setIsEmailExists(true);
          }

          const userInfo = {
            username: user.given_name,
            email: user.email,
            rol: "Usuario", // Set a default role
          };

          if (!isEmailExists) {
            await sendUserInfoToBackend(userInfo);
          }

          fetchUserInfoByEmail(user.email);
        } catch (error) {
          console.error("Error al verificar la existencia del correo:", error);
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
      const response = await fetch(
        `http://localhost:3001/users?email=${email}`
      );
      if (response.status === 200) {
        setIsEmailExists(true);
      }
    } catch (error) {
      console.error("Error al verificar la existencia del correo:", error);
    }
  };

  const fetchUserInfoByEmail = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:3001/usersByEmail?email=${email}`
      );
      if (response.status === 200) {
        const userData = await response.json();
        setUserInfoByEmail(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
      }
    } catch (error) {
      console.error(
        "Error al obtener información del usuario por email:",
        error
      );
    }
  };

  const sendUserInfoToBackend = async (userInfo) => {
    try {
      // Primero, verifica si el correo existe
      await checkEmailExistence(userInfo.email);

      if (isEmailExists) {
        console.log("El correo ya está registrado en la base de datos.");
        return;
      }

      // Si el correo no existe, crea el usuario
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (response.status === 201) {
        console.log("Información del usuario enviada con éxito al backend.");
      } else {
        console.error(
          "Hubo un problema al enviar la información del usuario al backend."
        );
      }
    } catch (error) {
      console.error(
        "Error al enviar información del usuario al backend:",
        error
      );
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
          userInfo.rol = "Usuario";
          sendUserInfoToBackend(userInfo);
        }
        fetchUserInfoByEmail(user.email);
      });
    }
  }, [isAuthenticated, user]);

  const fetchFavoriteMovies = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/favorites/movies/${userId}`
      );
      if (response.status === 200) {
        const favoriteMoviesData = await response.json();
        setFavoriteMovies(favoriteMoviesData);
      }
    } catch (error) {
      console.error("Error al obtener las películas favoritas:", error);
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
      console.error("Error al obtener las series favoritas:", error);
    }
  };

  useEffect(() => {
    if (userInfoByEmail && userInfoByEmail._id) {
      fetchFavoriteMovies(userInfoByEmail._id);
      fetchFavoriteSeries(userInfoByEmail._id); 
      fetchWatchingSeries(userInfoByEmail._id);
    }
  }, [userInfoByEmail]);

  const enableEdit = () => {
    setIsEditing(true);
    // Puedes inicializar los valores con la información actual del usuario
    setEditedUserInfo({
      Nickname: userInfoByEmail.Nickname,
      edad: userInfoByEmail.edad,
      genres: userInfoByEmail.genres.join(", "),
    });
  };

  const saveEditedUser = async () => {
    try {
      // Enviar los campos editados al servidor a través de una solicitud PUT
      const response = await fetch(
        `http://localhost:3001/users/${userInfoByEmail._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            apodo: editedUserInfo.apodo, // Cambia "nickname" a "apodo"
            edad: editedUserInfo.edad,
            genres: editedUserInfo.genres,
          }),
        }
      );

      if (response.status === 200) {
        // Actualización exitosa
        setIsEditing(false); // Desactivar la edición
        // Recargar los datos del usuario para reflejar los cambios
        fetchUserInfoByEmail(user.email);
      } else {
        console.error(
          "Error al actualizar los campos de usuario:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al actualizar los campos de usuario:", error);
    }
  };

  
  useEffect(() => {
    if (userInfoByEmail && userInfoByEmail._id) {
      fetch(`http://localhost:3001/moviesvistas/${userInfoByEmail._id}`)
        .then(response => response.json())
        .then(data => {
          const movieIdsNullCompletada = data
            .filter(item => item.completada === null)
            .map(item => item.movieId);
          setMoviesWatching(movieIdsNullCompletada);
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });
    }
  }, [userInfoByEmail]);

  
  const fetchWatchingSeries = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/seriesvistas/${userId}`);
      if (response.status === 200) {
        const seriesData = await response.json();
        const nullCompletedSeries = seriesData.filter((item) => item.completada === null);
        setWatchingSeries(nullCompletedSeries);
      }
    } catch (error) {
      console.error('Error al obtener las series en curso con completada en null:', error);
    }
  };
  return (
    <div className="text-center m-4 bg-fondito p-4 rounded-lg shadow-md">
      {isAuthenticated ? (
        <div>
          <div className="flex flex-col items-end">
            {userInfoByEmail && userInfoByEmail.rol === "Admin" && (
              <Link to="/admin">
                {" "}
                {/* Utiliza Link para redirigir a /admin */}
                <button className="bg-8f8cc1 text-white border-none p-10 px-20 rounded-5 text-16 cursor-pointer h-45">
                  Panel Administrador
                </button>
              </Link>
            )}
          </div>

         

          <img
            src={user.picture}
            alt={user.name}
            className="w-40 h-40 rounded-full block m-auto border-4 border-lila"
          />

          <div className="mt-5 mb-5 font-poppins font-medium text-2xl text-moradito">
            <h1>
              Te damos la bienvenida,{" "}
              {userInfoByEmail && userInfoByEmail.apodo
                ? userInfoByEmail.apodo
                : user.name}{" "}
              🤗
            </h1>
          </div>
          <div className="flex justify-center items-center text-white py-4 mb-8 font-poppins">
            <button
              className="mx-4 px-4 py-2 bg-lila hover:bg-moradito rounded-lg focus:outline-none transition-all duration-200"
              onClick={() => handleSectionSelect("perfil")}
            >
              Perfil
            </button>
            <button
              className="mx-4 px-4 py-2 bg-lila hover:bg-moradito rounded-lg focus:outline-none transition-all duration-200"
              onClick={() => handleSectionSelect("favorites")}
            >
              Películas Favoritas
            </button>
            <button
              className="mx-4 px-4 py-2 bg-lila hover:bg-moradito rounded-lg focus:outline-none transition-all duration-200"
              onClick={() => handleSectionSelect("series")}
            >
              Series Favoritas
            </button>
            <button
              className="mx-4 px-4 py-2 bg-lila hover:bg-moradito rounded-lg focus:outline-none transition-all duration-200"
              onClick={() => handleSectionSelect("watchingSeries")}
            >
              Lo que estás viendo
            </button>
          </div>

          {selectedSection && (
            <div className="favorite-section">
              {selectedSection === "favorites" && (
                <div className="favorite-box">
                  <h2 className="font-poppins text-xl font-bold text-moradito mb-3 text-center">
                    Películas Favoritas ⭐
                  </h2>
                  {favoriteMovies.length === 0 ? (
                    <p className="font-poppins text-moradito text-center mb-5">
                      Aún no tienes películas favoritas.
                    </p>
                  ) : (
                    <div className="flex flex-wrap-10">
                      {favoriteMovies.map((movie) => (
                        <MovieDetailsDashboard
                          key={movie._id}
                          movieId={movie.movieId}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
              {selectedSection === "series" && (
                <div>
                  <h2 className="font-poppins text-xl font-bold text-moradito mb-3 text-center">
                    Series Favoritas ⭐
                  </h2>
                  {favoriteSeries.length === 0 ? (
                    <p className="font-poppins text-moradito text-center mb-5">
                      Aún no tienes series favoritas.
                    </p>
                  ) : (
                    <div className="flex flex-wrap">
                      {favoriteSeries.map((series) => (
                        <div key={series._id}>
                          <SeriesDetailsDashboard seriesId={series.seriesId} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}




{selectedSection === 'watchingSeries' && (
  <div className="watching-section">
    <div className="watching-container">
      <div className="watching-box">
        <h3 className="font-poppins text-xl font-bold text-moradito mb-3 text-center" >Películas que estás viendo</h3>
        {moviesWatching.length === 0 ? (
          <p>No estás viendo ninguna película</p>
        ) : (
          <ul div className="flex flex-wrap-10">
            {moviesWatching.map((movieId) => (
              <li key={movieId}>
                <MovieWatchingCard movieId={movieId} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="watching-box">
        <h3 className="font-poppins text-xl font-bold text-moradito mb-3 text-center">Series que estás viendo</h3>
        {watchingSeries.length === 0 ? (
          <p>No estás viendo ninguna serie</p>
        ) : (
          <ul div className="flex flex-wrap-10">
            {watchingSeries.map((serie) => {
              if (serie.serieId) {
                return <SeriesWatchingCard key={serie._id} serieId={serie.serieId} />;
              }
              return null; // Otra opción es omitir elementos con serieId null
            })}
          </ul>
        )}
      </div>
      {userInfoByEmail && userInfoByEmail._id !== 0 && userInfoByEmail.rol !== null && (
        <Link to="/completadas">
          <button>Ver Completadas</button>
        </Link>
      )}
    </div>
  </div>
)}
              {selectedSection === "perfil" && (
                <div>
                  <div>
                    {userInfoByEmail && (
                      <div className="font-poppins text-moradito mb-10">
                        <p className="mb-3">
                          ID Usuario: {userInfoByEmail._id}
                        </p>
                        <p className="mb-10">Correo: {user.email}</p>
                        {userInfoByEmail.rol !== null && (
                          <p className="mb-3">Rol: {userInfoByEmail.rol}</p>
                        )}
                        {isEditing ? (
                          <div>
                            <label htmlFor="apodo">Apodo:</label>
                            <input
                              className="rounded-xl ml-2 mr-5 pr-3 pl-3"
                              type="text"
                              id="apodo"
                              value={editedUserInfo.apodo}
                              onChange={(e) =>
                                setEditedUserInfo({
                                  ...editedUserInfo,
                                  apodo: e.target.value,
                                })
                              }
                            />
                            <label htmlFor="edad">Edad:</label>
                            <input
                              className="rounded-xl ml-2 mr-5 pr-3 pl-3"
                              type="text"
                              id="edad"
                              value={editedUserInfo.edad}
                              onChange={(e) =>
                                setEditedUserInfo({
                                  ...editedUserInfo,
                                  edad: e.target.value,
                                })
                              }
                            />

                            <div className="mb-8 mt-10">
                              <label htmlFor="genres" className="mr-3">
                                Géneros de tu preferencia:
                              </label>
                              <ul className="list-disc ml-6 space-y-2 mt-5 mb-5">
                                {availableGenres.map((genre) => (
                                  <label key={genre}>
                                    <input
                                      className="inline-flex items-center space-x-2 mb-7"
                                      type="checkbox"
                                      value={genre}
                                      checked={editedUserInfo.genres.includes(
                                        genre
                                      )}
                                      onChange={(e) => {
                                        const selectedGenres = new Set(
                                          editedUserInfo.genres.split(", ")
                                        );
                                        if (e.target.checked) {
                                          selectedGenres.add(genre);
                                        } else {
                                          selectedGenres.delete(genre);
                                        }
                                        setEditedUserInfo({
                                          ...editedUserInfo,
                                          genres: [...selectedGenres].join(
                                            ", "
                                          ),
                                        });
                                      }}
                                    />
                                    <span className="text-moradito mr-5 ml-1">
                                      {genre}
                                    </span>
                                  </label>
                                ))}
                              </ul>
                              <button
                                className="bg-lila text-white p-2 rounded-2xl"
                                onClick={saveEditedUser}
                              >
                                Guardar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="mb-5">
                              Apodo: {userInfoByEmail.apodo}
                            </p>
                            <p className="mb-5">
                              Edad: {userInfoByEmail.edad} Años
                            </p>
                            <p className="mb-5">
                              Tus géneros favoritos:{" "}
                              {userInfoByEmail.genres ||
                                "Sin géneros favoritos"}
                            </p>
                            <button
                              className=" bg-lila hover:bg-moradito text-white p-2 rounded-xl"
                              onClick={enableEdit}
                            >
                              Editar perfil
                            </button>
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
        <p className="font-poppins">
          Debes iniciar sesión para ver el contenido del Dashboard.
        </p>
      )}
    </div>
  );
}

export default Dashboard;
