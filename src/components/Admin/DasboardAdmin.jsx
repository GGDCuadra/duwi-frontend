import React from 'react';
import { Link, Route, Routes, Outlet } from 'react-router-dom';
import Donaciones from './AllDonations';

const DashboardAdmin = () => {
  return (
    <div className="min-h-screen flex">
      <nav className="bg-morado w-64 py-6 px-2">
        <ul>
          <li className="mb-5">
            <Link to="/admin/crear-pelicula"
              className="text-clarito hover:bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300">
              Crear Película/Serie
            </Link>
          </li>
          <li className="mb-5">
            <Link to="/admin/editar-pelicula"
              className="text-clarito hover:bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300">
              Editar Película/Serie
            </Link>
          </li>
          <li className="mb-5">
            <Link to="/admin/AllDonations"
              className="text-clarito hover:bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300">
              Ver Donaciones
            </Link>
          </li>
          <li className="mb-5">
            <Link to="/admin/banear-usuario"
              className="text-clarito hover:bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300">
              Lista de Usuarios
            </Link>
          </li>
          <li className="mb-5">
            <Link to="/admin/lista-usuarios"
              className="text-clarito hover:bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300">
              Buzón de sugerencias
            </Link>
          </li>
          <li className="mb-5">
            <Link to="/admin/lista-usuarios"
              className="text-clarito hover:bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300">
              Películas
            </Link>
          </li>
          <li>
            <Link to="/admin/lista-usuarios"
              className="text-clarito hover:bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300">
              Series
            </Link>
          </li>
        </ul>
      </nav>
      <div className="w-full  flex flex-col">
      <div className="bg-purple-100 text-black py-8 text-2xl font-bold text-center mb-1">Panel de Administrador
      </div>
        
      <div className="w-full p-3">
        <Routes>
          <Route path="/admin/*" element={
              <>
                <Outlet />
              </>
            }/>
        </Routes>
        <Donaciones />
      </div>
    </div>
    </div>
  );
};

export default DashboardAdmin;