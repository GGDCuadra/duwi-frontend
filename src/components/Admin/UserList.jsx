import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSort } from 'react-icons/fa';
import Swal from 'sweetalert2';

function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de usuarios:', error);
      });
  }, []);


  const filteredUsers = users.filter(user => {
    return user.username && user.username.toLowerCase().includes(search.toLowerCase());
  });

  const handleSort = (property) => {
    if (property === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(property);
      setSortOrder('asc');
    }
  };

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] < b[sortBy] ? -1 : 1;
    } else {
      return a[sortBy] > b[sortBy] ? -1 : 1;
    }
  });

  const handleSearch = event => {
    setSearch(event.target.value);
    setPage(0); 
  };

  const handleChangePage = newPage => {
    if (newPage >= 0 && newPage <= Math.ceil(filteredUsers.length / rowsPerPage) - 1) {
      setPage(newPage); 
    }
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10)); 
    setPage(0);
  };

  const handleToggleHabilitar = (user) => {
    const confirmationMessage = `¿Está seguro de habilitar al usuario "${user.username}"?`;

    Swal.fire({
      title: confirmationMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`http://localhost:3001/users/enable/${user._id}`)
          .then(response => {
            const updatedUsers = users.map(u =>
              u._id === user._id
                ? { ...u, disabled: null }
                : u
            );
            setUsers(updatedUsers);
          })
          .catch(error => {
            console.error('Error al habilitar al usuario:', error);
          });
      }
    });
  };

  const handleToggleDeshabilitar = (user) => {
    const confirmationMessage = `¿Está seguro de deshabilitar al usuario "${user.username}"?`;

    Swal.fire({
      title: confirmationMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`http://localhost:3001/users/disable/${user._id}`)
          .then(response => {
            const updatedUsers = users.map(u =>
              u._id === user._id
                ? { ...u, disabled: 'Disabled' }
                : u
            );

            setUsers(updatedUsers);
          })
          .catch(error => {
            console.error('Error al deshabilitar al usuario:', error);
          });
      }
    });
  };

  const handleAddClick = () => {
    // Agrega tu lógica para agregar un usuario aquí
  };

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="w-4/5 p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Lista de usuarios</h1>
  
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Buscar usuarios"
            className="w-2/3 md:w-2/2 border border-gray-300 p-2 rounded-md"
            onChange={handleSearch}
          />
          <button
            className="bg-blue-200 font-bold border border-gray-400 rounded-md p-2  hover:bg-gray-400"
            onClick={handleAddClick}
          >
            Agregar Usuario
          </button>
        </div>
  
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full border border-gray-400 table-auto">
            <thead className="bg-blue-200">
              <tr>
                <th
                  onClick={() => handleSort('username')}
                  className="px-2 py-2 cursor-pointer"
                >
                  Nombre de Usuario{""}
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
                <th className="px-2 py-2">Deshabilitar</th>
              </tr>
            </thead>
  
            <tbody>
              {sortedUsers 
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index)=> (
                  <tr key={user._id} 
                  className={`${
                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                  } hover:bg-gray-200 hover:dark:bg-gray-400`}
                  >

                    <td className="whitespace-nowrap py-1 text-center">{user.username}</td>
                    <td className="whitespace-nowrap py-1 text-center">{user.email}</td>

                    <td className="whitespace-nowrap text-center mt-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '130px' }}>
                      <button
                        onClick={() => handleToggleDeshabilitar(user)}
                        className={`${
                          user.disabled ? 'bg-gray-300' : 'bg-red-500'
                        } text-white rounded-md text-sm`}
                        disabled={user.disabled}
                      >
                        Deshabilitar
                      </button>
                      <button
                        onClick={() => handleToggleHabilitar(user)}
                        style={{
                          backgroundColor: user.disabled ? 'green' : '#cccccc',
                        }}
                        className="text-white rounded-md text-sm mt-1"
                        disabled={!user.disabled}
                      >
                        Habilitar
                      </button>
                    </div>
                  </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
  
        <div className="mt-6 flex justify-between items-center">
          <div>
            <span className="mr-2">Filas por página</span>
            <select
              className="border border-gray-300 p-2 rounded-md"
              onChange={handleChangeRowsPerPage}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span className="whitespace-nowrap px-6 ">
              Página {page + 1} de {totalPages}
            </span>
          </div>
  
          <div className="inline-flex -space-x-px text-sm h-8">
            <button
              className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-morado border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-morado dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 0}
            >
              Anterior
            </button>
  
            <ul className="flex justify-center">
              {pages.map((numPagina) => (
                <li key={numPagina}>
                  <button
                    onClick={() => handleChangePage(numPagina)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-morado dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${page === numPagina ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : ''}`}
                  >
                    {numPagina + 1}
                  </button>
                </li>
              ))}
            </ul>
  
            <button
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-morado dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              onClick={() => handleChangePage(page + 1)}
              disabled={page >= totalPages - 1}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}  

export default UserList;