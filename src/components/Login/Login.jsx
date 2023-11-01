import React, { useState } from 'react';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';

function LoginPage() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerFechaDeNacimiento, setRegisterFechaDeNacimiento] = useState('');
  const [error, setError] = useState(null);
  const [userInformation, setUserInformation] = useState(null);
  const { loginWithRedirect } = useAuth0();
  const [show, setShow] = useState('login')

  const handleLogin = async () => {
    setError(null);

    if (!loginEmail || !loginPassword) {
      setError('Por favor, ingresa tanto el correo electrónico como la contraseña.');
      return;
    }
    try {
      const response = await fetch('https://duwi.onrender.com/users');
      const users = await response.json();
      const user = users.find((user) => user.email === loginEmail);
      if (!user) {
        setError('El correo electrónico no existe.');
        return;
      }
      if (user.password === loginPassword) {
        // Realiza una solicitud para obtener información adicional del usuario
        const userInfoResponse = await fetch(`https://duwi.onrender.com/users/${user._id}`);
        const userInfo = await userInfoResponse.json();
        setUserInformation({
          _id: user._id,
          username: userInfo.username,
          email: user.email,
          rol: user.rol,
          fecha_de_nacimiento: user.fecha_de_nacimiento,
        });

        console.log('userInformation:', userInformation);
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
    const response = await fetch('https://duwi.onrender.com/users');
    const users = await response.json();
    const existingUser = users.find((user) => user.email === registerEmail);

    if (existingUser) {
      setError('El correo electrónico ya está registrado.');
    } else {
      const userData = {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
        fecha_de_nacimiento: registerFechaDeNacimiento,
      };
      try {
        const postResponse = await fetch('https://duwi.onrender.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        if (postResponse.status === 201) {
          window.location.href = '/login';
        } else {
          setError('Hubo un problema al registrar la cuenta. Inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error de registro:', error);
        setError('Se produjo un error al registrar la cuenta. Por favor, inténtalo de nuevo.');
      }
    }
  };
  const handleShow = (event) => {
    const {value } = event.target
    setShow(value)
  }
  return (
  <div className="container justify-center">
    {
      show === 'login' && (
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

        <button class='mt-3' onClick={() => loginWithRedirect()}>Iniciar Sesión con Auth0</button>

        <button class='mt-3' value='register' onClick={handleShow}>¿No tienes una cuenta? Regístrate</button>
      </div>
      )
    }
    
    {
      show === 'register' && (
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
        <button class='mt-3' value='login' onClick={handleShow}>¿Ya tienes una cuenta?</button>
      </div>
      )
    }  


      
      
    </div>
  );
}

export default LoginPage;