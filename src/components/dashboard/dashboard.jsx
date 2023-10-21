import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [googleCredentialId, setGoogleCredentialId] = useState(null);
  const [mongoUserId, setMongoUserId] = useState(null);

  useEffect(() => {
    // Realiza una solicitud para obtener el ID de la credencial de Google
    // Esto dependerá de cómo almacenas y recuperas esta información después de iniciar sesión con Google

    // Simulación de solicitud, reemplaza esto con la lógica real de tu aplicación
    const getGoogleCredentialId = async () => {
      try {
        const response = await fetch('URL_DE_TU_SERVIDOR_PARA_OBTENER_ID_DE_GOOGLE');
        const data = await response.json();
        setGoogleCredentialId(data.googleCredentialId); // Asume que recibes el ID de Google en el servidor
      } catch (error) {
        console.error('Error al obtener el ID de Google:', error);
      }
    };

    getGoogleCredentialId();
  }, []);

  useEffect(() => {
    // Una vez que tengas el ID de la credencial de Google, puedes buscar el usuario en la lista de usuarios
    // en http://localhost:3001/users

    // Simulación de búsqueda en la lista de usuarios, reemplaza con la lógica real
    const findMongoUserId = async () => {
      try {
        const response = await fetch('http://localhost:3001/users');
        const users = await response.json();
        
        // Busca el usuario que coincide con el ID de la credencial de Google
        const userWithGoogleId = users.find(user => user.googleCredentialId === googleCredentialId);
        
        if (userWithGoogleId) {
          setMongoUserId(userWithGoogleId._id); // Establece el ID de MongoDB del usuario encontrado
        } else {
          console.error('Usuario no encontrado en la lista de usuarios.');
        }
      } catch (error) {
        console.error('Error al buscar el usuario:', error);
      }
    };

    if (googleCredentialId) {
      findMongoUserId();
    }
  }, [googleCredentialId]);

  return (
    <div>
      <h2>Dashboard</h2>
      {mongoUserId && (
        <p>El ID de MongoDB del usuario es: {mongoUserId}</p>
      )}
    </div>
  );
}

export default Dashboard;
