import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSort, FaBan, FaCheckCircle, FaEdit } from 'react-icons/fa';

function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de usuarios:', error);
      });
  }, []);

  const handleSort = (property) => {
    if (property === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(property);
      setSortOrder('asc');
    }
  };

  const handleSearch = event => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter(user => {
    return user.username && user.username.toLowerCase().includes(search.toLowerCase());
  });

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] < b[sortBy] ? -1 : 1;
    } else {
      return a[sortBy] > b[sortBy] ? -1 : 1;
    }
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  const handleChangePage = newPage => {
    if (newPage >= 0 && newPage <= totalPages - 1) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="w-4/5 p-4">
        <h1 className="text-2xl font-bold text-center mb-8">LISTA DE USUARIOS</h1>

        <input
          type="text"
          placeholder="Buscar usuarios"
          className="w-full border border-gray-300 p-2 rounded-md mb-4"
          onChange={handleSearch}
        />

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full border border-gray-400 table-auto">
            <thead className="bg-blue-200">
              <tr>
                <th
                  onClick={() => handleSort('username')}
                  className={`px-2 py-2 cursor-pointer text-center ${
                    sortBy === 'username' ? 'text-blue-600' : ''
                  }`}
                >
                  Nombre de Usuario{' '}
                  {sortBy === 'username' ? (
                    sortOrder === 'asc' ? (
                      <FaSort className="inline" />
                    ) : (
                      <FaSort className="inline transform rotate-180" />
                    )
                  ) : null}
                </th>
                <th
                  onClick={() => handleSort('email')}
                  className={`px-2 py-2 cursor-pointer text-center ${
                    sortBy === 'email' ? 'text-blue-600' : ''
                  }`}
                >
                  Correo Electrónico{' '}
                  {sortBy === 'email' ? (
                    sortOrder === 'asc' ? (
                      <FaSort className="inline" />
                    ) : (
                      <FaSort className="inline transform rotate-180" />
                    )
                  ) : null}
                </th>
                <th
                  onClick={() => handleSort('deshabilitar')}
                  className={`px-2 py-2 cursor-pointer text-center ${
                    sortBy === 'deshabilitar' ? 'text-blue-600' : ''
                  }`}
                >
                  Deshabilitar{' '}
                  {sortBy === 'deshabilitar' ? (
                    sortOrder === 'asc' ? (
                      <FaSort className="inline" />
                    ) : (
                      <FaSort className="inline transform rotate-180" />
                    )
                  ) : null}
                </th>
                <th className="px-2 py-2 text-center">Editar</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map(user => (
                <tr key={user._id} className={user.disabled ? 'bg-gray-300' : 'bg-red-200'}>
                  <td className="whitespace-nowrap px-2 py-2 text-center">{user.username}</td>
                  <td className="whitespace-nowrap px-2 py-2 text-center">{user.email}</td>
                  <td className="whitespace-nowrap px-2 py-2 text-center">
                    {user.disabled ? (
                      <button className="text-green-600 hover:text-green-900">
                        <FaCheckCircle className="inline" /> Habilitar
                      </button>
                    ) : (
                      <button className="text-red-600 hover:text-red-900">
                        <FaBan className="inline" /> Deshabilitar
                      </button>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-center">
                    <FaEdit className="edit-icon" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="flex justify-center mt-4">
          {pages.map(page => (
            <li
              key={page}
              onClick={() => handleChangePage(page)}
              className={`cursor-pointer ${
                currentPage === page ? 'text-blue-600 font-bold' : 'text-black-800'
              }`}
            >
              {page + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserList;