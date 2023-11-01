import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




function CrearUsuarioForm () {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleRegister = async () => {
    if (!username || !email || !password) {
      setMessage('Por favor, completa todos los campos');
      return;
    }

    try {
      const newUser = {
        username,
        email,
        password,
        
      };

      const response = await axios.post('http://localhost:3001/users', newUser);

      if (response.status === 201) {
        setMessage('Usuario registrado con éxito');
        navigate('/admin/userlist');
   
      } else {
        setMessage('Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setMessage('Error al registrar el usuario');
    }
  };

  return (
    <div>
      <h1>Registro de Usuario</h1>
      <div>
        <label>Nombre de usuario:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Escribe tu nombre de usuario"
        />
      </div>
      <div>
        <label>Correo electrónico:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Escribe tu correo electrónico"
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Escribe tu contraseña"
        />
      </div>
      <button onClick={handleRegister}>Registrar</button>
      <div>{message}</div>
    </div>
  );
}

export default CrearUsuarioForm ;
