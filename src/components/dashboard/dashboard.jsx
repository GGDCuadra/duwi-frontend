import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function DashboardUser() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <div className="mb-8 text-center">
        {isAuthenticated ? (
          <>
            <h2 className="text-2xl font-bold mb-4 font-poppins">
              Bienvenido, {user.name}
            </h2>
            <img
              src={user.picture}
              alt={user.name}
              className="rounded-full w-32 h-32 object-cover object-center mb-4"
            />
          </>
        ) : (
          <p className="text-xl font-medium font-poppins text-lila mb-20">
            Debes iniciar sesión para ver el contenido del Dashboard.
          </p>
        )}
      </div>
      <div className="flex flex-wrap justify-center mb-8">
        <div className="mr-4 mb-4 order-2 md:order-1">
          <Link
            to="/edit-user"
            className="text-morado hover:text-moradito font-medium font-poppins mx-10"
          >
            Modificar usuario y contraseña
          </Link>
        </div>
        <div className="mr-4 mb-4 order-3 md:order-2">
          <Link
            to="/edit-profile"
            className="text-gray-700 hover:text-moradito font-medium font-poppins mx-10"
          >
            Modificar foto de perfil
          </Link>
        </div>
        <div className="mr-4 mb-4 order-4 md:order-3">
          <Link
            to="/favorite-movies"
            className="text-gray-700 hover:text-moradito font-medium font-poppins mx-10"
          >
            Películas favoritas
          </Link>
        </div>
        <div className="mr-4 mb-4 order-5 md:order-4">
          <Link
            to="/favorite-series"
            className="text-gray-700 hover:text-moradito font-medium font-poppins"
          >
            Series favoritas
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 mr-96">
        <div className="text-left">
          <h3 className="text-xl text-moradito font-normal m-8 font-poppins">
            Series que ves actualmente
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Aquí van las cards de "las series que ves actualmente" */}
        </div>
        <div className="text-left">
          <h3 className="text-xl text-moradito font-normal m-8 font-poppins">
            Series vistas
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Aquí van las cards de las "series vistas" */}
        </div>
        <div className="text-left">
          <h3 className="text-xl text-moradito font-normal m-8 font-poppins">
            Series que quieres ver
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Aquí van las cards de las "series que quieres ver" */}
        </div>
        <div className="text-left">
          <h3 className="text-xl text-moradito font-normal m-8 font-poppins">
            Películas que ves actualmente
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Aquí van las cards de las "películas vistas" */}
        </div>
        <div className="text-left">
          <h3 className="text-xl text-moradito font-normal m-8 font-poppins">
            Películas vistas
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Aquí van las cards de las "películas vistas" */}
        </div>
        <div className="text-left">
          <h3 className="text-xl text-moradito font-normal m-8 font-poppins">
            Películas que quieres ver
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Aquí van las cards de las "películas que quieres ver" */}
        </div>
      </div>
    </div>
  );
}

export default DashboardUser;
