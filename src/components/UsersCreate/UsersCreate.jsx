import { useState } from 'react';
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
    <div className="h-screen flex justify-center items-center font-poppins">
      <div className="bg-fondito p-8 rounded-lg shadow-md w-80 dark:bg-morado">
        <h1 className="text-2xl font-semibold mb-4 text-oscuro dark:text-lila">Registro de Usuario</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-moradito dark:text-clarito">Nombre de usuario:</label>
          <input
            className="w-full p-2 border rounded-md"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Escribe tu nombre de usuario"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-moradito dark:text-clarito">Correo electrónico:</label>
          <input
            className="w-full p-2 border rounded-md"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Escribe tu correo electrónico"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-moradito dark:text-clarito">Contraseña:</label>
          <input
            className="w-full p-2 border rounded-md"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Escribe tu contraseña"
          />
        </div>
        <button
          className="w-full bg-lila hover:bg-moradito text-fondito font-medium p-2 rounded-md"
          onClick={handleRegister}
        >
          Registrar
        </button>
        <div className="mt-4 text-red-500">{message}</div>
      </div>
    </div>
  );
  
}

export default UserRegistration;
