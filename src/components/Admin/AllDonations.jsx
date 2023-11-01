import { useEffect, useState } from 'react';
import axios from 'axios';

const Donaciones = () => {
  const [donaciones, setDonaciones] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('createDate');
  const [order, setOrder] = useState('asc');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/alldonations')
      .then(response => {
        setDonaciones(response.data);
      })
      .catch(error => {
        console.error('Error al obtener donaciones:', error);
      });
  }, []);

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
        <h1 className="text-3xl font-bold font-poppins text-moradito text-center mb-8 dark:text-lila">Donaciones</h1>
        <input
          type="text"
          placeholder="Buscar"
          className="w-full border border-lila p-2 rounded-md mb-4 font-poppins"
          onChange={handleSearch}
        />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg font-poppins">
          <table className="w-full border border-lila table-auto">
            <thead className="bg-lila">
              <tr>
                <th className="px-6 py-3 font-poppins text-clarito"> Nombre</th>
                <th className="px-6 py-3 font-poppins text-clarito">Monto</th>
                <th className="px-6 py-3 font-poppins text-clarito">Fecha de Creación</th>
                <th className="px-6 py-3 font-poppins text-clarito">Email</th>
                <th className="px-6 py-3 font-poppins text-clarito">Estado</th>
                <th className="px-6 py-3 font-poppins text-clarito">Dirección</th>
              </tr>
            </thead>
            
            <tbody>
              {sortedDonaciones
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(donacion => (
                  <tr
                    key={donacion._id}
                    className={`${
                      sortedDonaciones.indexOf(donacion) % 2 === 0 ? 'bg-clarito' : 'bg-white'
                    } hover:bg-lila hover:dark:bg-lila`}
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-center font-poppins">{donacion.name}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-poppins">${donacion.amount}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-poppins">
                      {new Date(donacion.createDate).toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-poppins">{donacion.email}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-poppins">{donacion.status}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-center font-poppins">{donacion.address}</td>
                  </tr>
                ))}
            </tbody>

          </table>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div>
          <span className="mr-2 font-poppins text-lila">Filas por página</span>
          <select
            className="border border-lila p-2 rounded-md"
            onChange={handleChangeRowsPerPage}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span className="whitespace-nowrap px-6 font-poppins text-lila">
            Página {page + 1} de {Math.ceil(sortedDonaciones.length / rowsPerPage)}
          </span>
          </div>

          <div className="inline-flex -space-x-px text-sm h-8 font-poppins">
          <button
            className={`flex items-center justify-center px-3 h-8 ml-2 text-moradito bg-white border border-lila hover:bg-moradito hover:text-clarito dark:bg-lila dark:border-lila dark:text-clarito dark:hover:bg-moradito dark:hover:text-white`}
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
                    className={`flex items-center justify-center px-3 h-8 ml-2 text-moradito bg-white border border-lila hover:bg-moradito hover:text-clarito dark:bg-lila dark:border-lila dark:text-clarito dark:hover:bg-moradito dark:hover:text-white ${
                      page === numPagina
                        ? 'text-moradito bg-clarito hover:bg-lila hover:text-moradito dark:border-lila dark:bg-morado dark:text-clarito'
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
            className={`flex items-center justify-center px-3 h-8 ml-2 text-moradito bg-white border border-lila hover:bg-moradito hover:text-clarito dark:bg-moradito dark:border-lila dark:text-clarito dark:hover:bg-lila dark:hover:text-white`}
            onClick={() => handleChangePage(page + 1)}
            disabled={page >= Math.ceil(sortedDonaciones.length / rowsPerPage) - 1}
          >
            Siguiente
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Donaciones;