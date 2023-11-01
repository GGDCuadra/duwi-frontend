import { NavLink, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Donaciones from './AllDonations';
import UserList from './UserList';
import Peliculas from './MoviesAdmin';
import SeriesList from './SeriesList';

const NavItem = ({ to, label }) => {
  const { pathname } = useLocation();
  const isActive = pathname.includes(to);

  return (
    <li className="mb-5">
      <NavLink
        to={to}
        className={`text-clarito hover:bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300 ${
          isActive ? 'bg-lila' : ''
        }`}
      >
        {label}
      </NavLink>
    </li>
  );
};

const Sidebar = () => {
  return (
    <nav className="bg-morado w-64 py-8 px-4 flex flex-col font-poppins">
      <div>
        <ul>
          <NavItem to="donaciones" label="Ver Donaciones" />
          <NavItem to="userlist" label="Lista de Usuarios" />
          <NavItem to="peliculas" label="Lista de Películas" />
          <NavItem to="series" label="Lista de Series" />
        </ul>
      </div>
    </nav>
  );
};

const Header = () => {
  return (
    <div className="w-full bg-lila text-clarito py-8 text-2xl font-semibold text-center font-poppins dark:bg-morado">
      Panel de Administrador
    </div>
  );
};

const DashboardAdmin = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="w-full flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="donaciones" element={<Donaciones />} />
            <Route path="userlist" element={<UserList />} />
            <Route path="peliculas" element={<Peliculas />} />
            <Route path="series" element={<SeriesList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;