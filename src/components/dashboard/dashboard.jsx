import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Dashboard() {
  const { user, isAuthenticated } = useAuth0();

  const sendUserInfoToBackend = async (userInfo) => {
    try {
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

  if (isAuthenticated) {
    const userInfo = {
      username: user.given_name,
      email: user.email,
    };

    sendUserInfoToBackend(userInfo);

    return (
      <div>
        <img src={user.picture} alt={user.name} />
        <p>Bienvenido, {user.name}</p>
        <p>Correo, {user.email}</p>
        <p>Usuario, {user.given_name}</p>
      </div>
    );
  } else {
    return (
      <p>Debes iniciar sesión para ver el contenido del Dashboard.</p>
    );
  }
}

export default Dashboard;
