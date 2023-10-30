import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Donaciones from './AllDonations';
import UserList from './UserList';
import Peliculas from './MoviesAdmin'; 
import SeriesList from './SeriesList';

const DashboardAdmin = () => {
  const [showUserList, setShowUserList] = useState(false);
  const [showDonations, setShowDonations] = useState(false);
  const [showPeliculas, setShowPeliculas] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);
  const [showSeriesList, setShowSeriesList] = useState(false)

  const toggleDonations = () => {
    setActiveComponent('donations');
    setShowDonations(!showDonations);
    setShowUserList(false);
    setShowPeliculas(false);
  };

  const toggleUserList = () => {
    setActiveComponent('userList');
    setShowUserList(!showUserList);
    setShowDonations(false); // Cerrar donaciones si se abre la lista de usuarios
  };

  const toggleSeriesList = () => {
    setShowSeriesList(!showSeriesList);
  }
  const togglePeliculas = () => {
    setActiveComponent('peliculas');
    setShowPeliculas(!showPeliculas);
    setShowDonations(false);
    setShowUserList(false);
  };

  
  return (
    <div className="min-h-screen flex">
      <nav className="bg-morado w-64 py-8 px-4">
        <ul>
        <li className={`mb-5 ${activeComponent === 'donations' ? 'bg-lila' : ''}`}>
          <button
            onClick={toggleDonations}
            className="text-clarito hover:bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300"
          >
            Ver Donaciones
          </button>
        </li>
        <li className={`mb-5 ${activeComponent === 'userList' ? 'bg-lila' : ''}`}>
          <button
            onClick={toggleUserList}
            className="text-clarito hover:bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300"
          >
            Lista de Usuarios
          </button>
        </li>
        <li className={`mb-5 ${activeComponent === 'peliculas' ? 'bg-lila' : ''}`}>
          <button
            onClick={togglePeliculas}
            className="text-clarito hover-bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300"
          >
            Lista de Películas
          </button>
        </li>
          
        </ul>
      </nav>

      <div className="w-full  flex flex-col">
        <div className="bg-lila text-black py-8 text-2xl font-bold text-center mb-1">Panel de Administrador</div>

        <Outlet />
        <div className="w-full p-3">
          {showUserList && <UserList />}
          {showDonations && <Donaciones />}
          {showPeliculas && <Peliculas />}
          {showSeriesList && <SeriesList />}

          
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;