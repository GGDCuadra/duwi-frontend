import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoon, FaSignInAlt } from 'react-icons/fa';
import logo from '../../assets/logoduwi.png';
import SearchBar from '../SearchBar/SearchBar';
import { useAuth0 } from "@auth0/auth0-react";

const NAVIGATION_LINKS = [
  { path: '/Home', label: 'Inicio' },
  { path: '/movies', label: 'Películas' },
  { path: '/series', label: 'Series' },
  { path: '/estrenos', label: 'Estrenos' },
  { path: '/formCreateEdit', label: 'Crear / Editar' },
]; 

const Navbar = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <nav className="bg-fondito p-4 pr-20 pl-10 flex justify-between items-center h-30">
      <div className="text-2xl font-bold text-oscuro">
        <img src={logo} alt="Logo" className="w-50 h-12 mt-2 ml-2" />
      </div>
      <div className="flex-1 flex justify-end mt-2 items-center">
        <ul className="flex space-x-10 pr-4 pl-4 justify-center mx-auto">
          {NAVIGATION_LINKS.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className="text-gray-800 hover:text-moradito font-poppins">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="ml-4 overflow-hidden">
          <SearchBar />
        </div>
        {isAuthenticated && (
          <div className="ml-4">
            <Link to="/dashboard">
              <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
            </Link>
          </div>
        )}
        <div className="ml-4 text-gray-800 hover:text-moradito">
          <FaMoon />
        </div>
        <div className="ml-4 text-gray-800 hover:text-moradito">
          <Link to="/login">
            <FaSignInAlt />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
