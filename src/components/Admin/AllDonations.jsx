import React, { useEffect, useState } from 'react';

const Donaciones = () => {
  const [donaciones, setDonaciones] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('createDate');
  const [order, setOrder] = useState('asc');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/alldonations')
      .then(response => response.json())
      .then(data => setDonaciones(data))
      .catch(error => console.error('Error al obtener donaciones:', error));
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
    <div className="flex justify-center">
      <div className="w-4/5 p-5">
        <h1 className="text-2xl font-bold text-center mb-8">Donaciones</h1>
        <input type="text"
          placeholder="Buscar"
          className="w-full border border-gray-300 p-2 rounded-md mb-4"
          onChange={handleSearch}
        />
        <table className="w-full border border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('name')}>
                Nombre
              </th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('amount')}>
                Monto
              </th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('createDate')}>
                Fecha de Creación
              </th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('email')}>
                Email
              </th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('status')}>
                Estado
              </th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('address')}>
                Dirección
              </th>
            </tr>
          </thead>
          <tbody>

            {sortedDonaciones
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(donacion => (
                <tr key={donacion._id} className="bg-gray-100">
                  <td className="p-2 text-center">{donacion.name}</td>
                  <td className="p-2 text-center">${donacion.amount}</td>
                  <td className="p-2 text-center">
                    {new Date(donacion.createDate).toLocaleString()}
                  </td>
                  <td className="p-2 text-center">{donacion.email}</td>
                  <td className="p-2 text-center">{donacion.status}</td>
                  <td className="p-2 text-center">{donacion.address}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="mt-6 flex justify-center items-center">
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
            className="bg-blue-500 text-white p-2 rounded-md ml-4"
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
          >
            Anterior
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded-md ml-2"
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