import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Dashboard() {
  const { user, isAuthenticated } = useAuth0();
  const [isEmailExists, setIsEmailExists] = useState(false);

  const checkEmailExistence = async (email) => {
    try {
      const response = await fetch(`http://localhost:3001/users?email=${email}`);
      if (response.status === 200) {
        setIsEmailExists(true);
      }
    } catch (error) {
      console.error('Error al verificar la existencia del correo:', error);
    }
  };

  const sendUserInfoToBackend = async (userInfo) => {
    try {
      // Primero, verifica si el correo existe
      await checkEmailExistence(userInfo.email);

      if (isEmailExists) {
        console.log('El correo ya está registrado en la base de datos.');
        return;
      }

      // Si el correo no existe, crea el usuario
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

  useEffect(() => {
    if (isAuthenticated && user && user.email) {
      // En el montaje inicial, verifica el correo del usuario
      checkEmailExistence(user.email);
    }
  }, [isAuthenticated, user]);

  if (isAuthenticated) {
    const userInfo = {
      username: user.given_name,
      email: user.email,
    };

    // Envía la información del usuario
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
