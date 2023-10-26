import React from 'react';
import { Link } from 'react-router-dom';

const DashboardAdmin = () => {
  return (
    <div className="bg-clarito min-h-screen">
      {/* Panel de Administrador en la parte superior */}
      <div className="bg-lila py-6 px-2 text-white text-2xl font-bold text-center">
        Panel de Administrador
      </div>

      <div className="flex">
        {/* Barra de navegación lateral con fondo morado oscuro */}
        <nav className="bg-morado w-64 py-6 px-2">
          <ul>
            <li className="mb-4">
              <Link
                to="/crear-pelicula"
                className="text-clarito hover:bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300"
              >
                Crear Película/Serie
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/crear-pelicula"
                className="text-clarito hover:bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300"
              >
                Editar Película/Serie
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/donaciones"
                className="text-clarito hover:bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300"
              >
                Ver Donaciones
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/usuarios"
                className="text-clarito hover:bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300"
              >
                Lista de Usuarios
              </Link>
            </li>
            <li>
              <Link
                to="/lista-usuarios"
                className="text-clarito hover:bg-morado hover:text-white hover:font-bold block p-2 rounded transition duration-300"
              >
                Buzon de sugerencias
              </Link>
            </li>
            {/* Agrega enlaces para otras secciones aquí */}
          </ul>
        </nav>

        {/* Contenido principal */}
        <div className="w-full p-8 bg-clarito">
          {/* Contenido dinámico basado en la ruta */}
          {/* Asegúrate de configurar las rutas y componentes correspondientes en tu aplicación */}
          {/* Por ejemplo: <Route path="/crear-pelicula" component={CrearPelicula} /> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
