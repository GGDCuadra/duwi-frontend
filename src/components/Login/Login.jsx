import React, { useState } from 'react';
import './Login.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function LoginPage() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerFechaDeNacimiento, setRegisterFechaDeNacimiento] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null);

    if (!loginEmail || !loginPassword) {
      setError('Por favor, ingresa tanto el correo electrónico como la contraseña.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/users');
      const users = await response.json();
      const user = users.find((user) => user.email === loginEmail);
      if (!user) {
        setError('El correo electrónico no existe.');
        return;
      }
      if (user.password === loginPassword) {
        window.location.href = '/home';
      } else {
        setError('La contraseña es incorrecta.');
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      setError('Se produjo un error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  const handleRegister = async () => {
    setError(null);
    if (!registerUsername || !registerEmail || !registerPassword || !registerFechaDeNacimiento) {
      setError('Por favor, ingresa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
          fecha_de_nacimiento: registerFechaDeNacimiento,
          activo: "true",
        }),
      });
      if (response.status === 201) {
        window.location.href = '/login';
      } else {
        setError('Hubo un problema al registrar la cuenta. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error de registro:', error);
      setError('Se produjo un error al registrar la cuenta. Por favor, inténtalo de nuevo.');
    }
  };

  const responseGoogle = async (response) => {
    console.log(response);
    const userData = {
      username: registerUsername,
      email: registerEmail,
      password: registerPassword,
      fecha_de_nacimiento: registerFechaDeNacimiento,
    };
    try {
      const postResponse = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: response, ...userData }), 
      });
  
      if (postResponse.status === 201) {
        console.log('Datos del cliente guardados con éxito');
       
      } else {
        console.error('Hubo un problema al guardar los datos del cliente');
      }
    } catch (error) {
      console.error('Error al enviar los datos del cliente al servidor:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="180611375057-jp26g0lhg353gbs6h5q56tp01lf37kkk.apps.googleusercontent.com">
      <div className="container">
        <div className="form-box">
          <h2>Iniciar Sesión</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Iniciar Sesión</button>
          <GoogleLogin
            onSuccess={responseGoogle}
            onError={() => { console.log('Inicio de sesión fallido'); }}
          />
        </div>
        <div className="form-box">
          <h2>Registro</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <input
            type="date"
            placeholder="Fecha de nacimiento"
            value={registerFechaDeNacimiento}
            onChange={(e) => setRegisterFechaDeNacimiento(e.target.value)}
          />
          <button onClick={handleRegister}>Registrarse</button>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;