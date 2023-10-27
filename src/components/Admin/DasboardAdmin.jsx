import React, { useState } from 'react';
import { Link, Route, Routes, Outlet } from 'react-router-dom';
import Donaciones from './AllDonations';
import UserList from './UserList';
import Peliculas from './MoviesAdmin'; // Importa el componente Peliculas
import SeriesList from './SeriesList';

const DashboardAdmin = () => {
  const [showUserList, setShowUserList] = useState(false);
  const [showDonations, setShowDonations] = useState(false);
  const [showPeliculas, setShowPeliculas] = useState(false);
  const [showSeriesList, setShowSeriesList] = useState(false)

  const toggleDonations = () => {
    setShowDonations(!showDonations);
    setShowUserList(false);
    setShowPeliculas(false);
  };

  const toggleUserList = () => {
    setShowUserList(!showUserList);
    setShowDonations(false); // Cerrar donaciones si se abre la lista de usuarios
  };

  const toggleSeriesList = () => {
    setShowSeriesList(!showSeriesList);
  }

  return (
    <div className="min-h-screen flex">
      <nav className="bg-morado w-64 py-6 px-2">
        <ul>
          <li className="mb-5">
            <button
              onClick={toggleDonations}
              className="text-clarito hover:bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300"
            >
              Ver Donaciones
            </button>
          </li>
          <li className="mb-5">
            <button
              onClick={toggleUserList}
              className="text-clarito hover:bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300"
            >
              Lista de Usuarios
            </button>
          </li>
          <li className="mb-5">
            <button
              onClick={togglePeliculas}
              className="text-clarito hover:bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300"
            >
              Lista de Películas
            </button>
          </li>
          <li>
            <Link to="/admin/lista-usuarios"
              className="text-clarito hover-bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300">
              Lista de Series
            </Link>
          </li>
          <li className="mb-5">
            <Link to="/admin/crear-pelicula"
              className="text-clarito hover:bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300">
              Crear Película/Serie
            </Link>
          </li>
          <li className="mb-5">
            <Link to="/admin/lista-usuarios"
              className="text-clarito hover-bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300">
              Buzón de sugerencias
            </Link>
          </li>
        </ul>
      </nav>

      <div className="w-full  flex flex-col">
        <div className="bg-purple-100 text-black py-8 text-2xl font-bold text-center mb-1">Panel de Administrador</div>
        <Routes>
          <Route path="/admin/AllDonations" element={<Donaciones />} />
          <Route path="/admin/userlist" element={<UserList />} />
          <Route path="/admin/MoviesAdmin" element={<Peliculas />} />
          <Route path="/admin/serieslist" element={<SeriesList />} />

          {/* Agrega más rutas para otros componentes si es necesario */}
        </Routes>

        <Outlet />
        <div className="w-full p-3">
          {showUserList && <UserList />}
          {showDonations && <Donaciones />}
          {showPeliculas && <Peliculas />}
          {showSeriesList && <SeriesList />}

          {/* Agrega otras secciones del panel de administración aquí */}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;