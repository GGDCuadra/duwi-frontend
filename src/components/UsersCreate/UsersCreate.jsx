import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function UserRegistration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); 

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('El nombre de usuario es obligatorio'),
    email: Yup.string()
      .email('Correo electrónico no válido')
      .required('El correo electrónico es obligatorio'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('La contraseña es obligatoria'),
  });

  const handleRegister = async () => {
    try {
      await validationSchema.validate({ username, email, password }, { abortEarly: false });
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
      if (error instanceof Yup.ValidationError) {
        const validationErrors = error.inner.map((e) => e.message);
        setMessage(validationErrors.join(', '));
      } else {
        console.error('Error al registrar el usuario:', error);
        setMessage('Error al registrar el usuario');
      }
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

export default UserRegistration;
