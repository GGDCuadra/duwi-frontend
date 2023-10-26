import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [disabledUsers, setDisabledUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Número de usuarios por página

  useEffect(() => {
    // Realiza una solicitud al servidor para obtener la lista de usuarios (puedes utilizar Axios u otra biblioteca)
    axios.get('http://localhost:3001/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de usuarios:', error);
      });
  }, []);

  const handleBanUser = (userId) => {
    axios.post(`http://localhost:3001/disableUser/${userId}`)
    .then(response => {
      // Actualiza la lista de usuarios deshabilitados
      setDisabledUsers(prevUsers => [...prevUsers, userId]);
      // Opcional: También puedes actualizar la lista de usuarios activos si es necesario
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
    })
    .catch(error => {
      console.error('Error al deshabilitar al usuario:', error);
    });
};


  // Función para realizar la búsqueda de usuarios
  const filteredUsers = users.filter(user => {
    return user.username && user.username.toLowerCase().includes(search.toLowerCase());
  });
  

  // Lógica de paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="admin-dashboard-container">
      <div className="user-list">
        <h2 className="text-2xl font-bold mb-2 text-center">LISTA DE USUARIOS</h2>

        <input
          type="text"
          placeholder="Buscar usuarios"
          className="w-full border border-gray-300 p-2 rounded-md mb-4"
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="w-full border border-gray-400">
          <thead className="bg-indigo-300">
            <tr>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('username')}>
                Nombre de Usuario
              </th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('email')}>
                Correo Electrónico
              </th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user._id} className="bg-red-200">
                <td className="p-2 text-center">{user.username}</td>
                <td className="p-2 text-center">{user.email}</td>
                <td className="p-2 text-center">
                  <button onClick={() => handleBanUser(user._id)} className="text-red-600 hover:text-red-900">Banear</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <ul className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
            <li
              key={i}
              onClick={() => paginate(i + 1)}
              className={`cursor-pointer ${currentPage === i + 1 ? 'text-indigo-500 font-bold' : 'text-black-800'}`}
            >
              {i + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserList;
