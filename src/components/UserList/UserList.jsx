import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);

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
    // Aquí puedes implementar la lógica para banear al usuario con el ID 'userId'
    // Esto implicaría una solicitud al servidor para realizar la acción de banear
    // Después de banear al usuario, puedes actualizar la lista de usuarios si es necesario
  };

  return (
    <div className="admin-dashboard-container">

      <div className="user-list">
        <h2 className="text-2xl font-bold mb-2 text-center">LISTA DE USUARIOS</h2>
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-indigo-300">
  <tr>
    <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-black-800 uppercase tracking-wider">
      Nombre de Usuario
    </th>
    <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-black-800 uppercase tracking-wider">
      Correo Electrónico
    </th>
    <th className="px-6 py-3"></th>
  </tr>
</thead>
          <tbody>
            {users.map(user => (
            <tr key={user._id} className="bg-red-600">
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 bg-yellow-300">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 bg-blue-500">
                  {user.email}  
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                  <button onClick={() => handleBanUser(user._id)} className="text-red-600 hover:text-red-900">Banear</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
