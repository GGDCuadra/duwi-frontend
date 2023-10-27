import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Donaciones = () => {
  const [donaciones, setDonaciones] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('createDate');
  const [order, setOrder] = useState('asc');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/alldonations')
      .then(response => {
        setDonaciones(response.data);
      })
      .catch(error => {
        console.error('Error al obtener donaciones:', error);
      });
  }, []);

  const handleSort = property => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  const filteredDonaciones = donaciones.filter(donacion =>
    donacion.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedDonaciones = filteredDonaciones.sort((a, b) => {
    const isAsc = order === 'asc';
    return isAsc ? a[orderBy] < b[orderBy] : a[orderBy] > b[orderBy];
  });

  const handleChangePage = newPage => {
    if (newPage >= 0 && newPage <= Math.ceil(sortedDonaciones.length / rowsPerPage) - 1) {
      setPage(newPage);
    }
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="w-4/5 p-5">
        <h1 className="text-2xl font-bold text-center mb-8">Donaciones</h1>
        <input
          type="text"
          placeholder="Buscar"
          className="w-full border border-gray-300 p-2 rounded-md mb-4"
          onChange={handleSearch}
        />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full border border-gray-400 table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th
                  className="px-6 py-3 cursor-pointer hover:underline"
                  onClick={() => handleSort('name')}
                >
                  Nombre
                </th>
                <th
                  className="px-6 py-3 cursor-pointer hover:underline"
                  onClick={() => handleSort('amount')}
                >
                  Monto
                </th>
                <th
                  className="px-6 py-3 cursor-pointer hover:underline"
                  onClick={() => handleSort('createDate')}
                >
                  Fecha de Creación
                </th>
                <th
                  className="px-6 py-3 cursor-pointer hover:underline"
                  onClick={() => handleSort('email')}
                >
                  Email
                </th>
                <th
                  className="px-6 py-3 cursor-pointer hover:underline"
                  onClick={() => handleSort('status')}
                >
                  Estado
                </th>
                <th
                  className="px-6 py-3 cursor-pointer hover:underline"
                  onClick={() => handleSort('address')}
                >
                  Dirección
                </th>
              </tr>
            </thead>
            
            <tbody>
              {sortedDonaciones
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(donacion => (
                  <tr
                    key={donacion._id}
                    className={`${
                      sortedDonaciones.indexOf(donacion) % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                    } hover:bg-gray-200 hover:dark:bg-gray-400`}
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{donacion.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">${donacion.amount}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {new Date(donacion.createDate).toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{donacion.email}</td>
                    <td className="whitespace-nowrap px-6 py-4">{donacion.status}</td>
                    <td className="whitespace-nowrap px-6 py-4">{donacion.address}</td>
                  </tr>
                ))}
            </tbody>

          </table>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <span className="mr-2">Filas por página</span>
          <select
            className="border border-gray-300 p-2 rounded-md"
            onChange={handleChangeRowsPerPage}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span className="ml-2">
            Página {page + 1} de {Math.ceil(sortedDonaciones.length / rowsPerPage)}
          </span>
          <button
            className={`flex items-center justify-center px-3 h-8 ml-2 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
          >
            Anterior
          </button>
          <ul className="flex justify-center ml-2">
            {Array.from({ length: Math.ceil(sortedDonaciones.length / rowsPerPage) }, (_, i) => i).map(
              numPagina => (
                <li key={numPagina}>
                  <button
                    onClick={() => handleChangePage(numPagina)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-700 dark:hover:text-white ${
                      page === numPagina
                        ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                        : ''
                    }`}
                  >
                    {numPagina + 1}
                  </button>
                </li>
              )
            )}
          </ul>
          <button
            className={`flex items-center justify-center px-3 h-8 ml-2 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark.border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            onClick={() => handleChangePage(page + 1)}
            disabled={page >= Math.ceil(sortedDonaciones.length / rowsPerPage) - 1}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Donaciones;
