import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function DashboardUser() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div>
      <div>
        {isAuthenticated ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Bienvenido, {user.name}</h2>
            <img src={user.picture} alt={user.name} />
          </>
        ) : (
          <p>Debes iniciar sesión para ver el contenido del Dashboard.</p>
        )}
      </div>
      <div className="flex mb-4">
        <div className="mr-4">
          <Link to="/edit-user">Modificar usuario y contraseña</Link>
        </div>
        <div className="mr-4">
          <Link to="/edit-profile">Modificar foto de perfil</Link>
        </div>
        <div className="mr-4">
          <Link to="/favorite-movies">Películas favoritas</Link>
        </div>
        <div className="mr-4">
          <Link to="/favorite-series">Series favoritas</Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div>
          <h3 className="text-lg font-bold mb-2">Series que ves actualmente</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Aquí van las cards de "las series que ves actualmente" */}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Series vistas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Aquí van las cards de las "series vistas" */}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Series que quieres ver</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Aquí van las cards de las "series que quieres ver" */}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Películas vistas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Aquí van las cards de las "películas vistas" */}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Películas que quieres ver</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Aquí van las cards de las "películas que quieres ver" */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardUser;
