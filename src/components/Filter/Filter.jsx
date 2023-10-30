import { useState } from "react";
import style from './Filter.module.css'
import { useDispatch } from "react-redux";
import { getFilteredMovies } from "../../redux/actions";

const Filters = ({type, onFilterChange, currentFilters, currentMoviesPage, currentSeriesPage }) => {
    const dispatch = useDispatch()
    const [filters, setFilters] = useState({
        genre: "",
        sortByTitle: "",
        sortByYear: "",
        page: currentMoviesPage || currentSeriesPage, // Agregar parámetro de página
        perPage: 10, // Agregar parámetro de resultados por página
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFilters({
            ...filters,
            [name]: value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        onFilterChange(filters)
    }

    return (
        <div className='justify-center mt-10'>
            <form className='flex justify-center' onSubmit={handleSubmit}>
                <div className='mr-4'>
                    <select name="genre" className="border border-gray-300 rounded px-3 py-2 font-poppins" onChange={handleChange}>
                    <option value="">Selecciona un género</option>
                        {type === 'movies' && (
                            <>
                                <option value="Action">Acción</option>
                                <option value="Adventure">Aventura</option>
                                <option value="Drama">Drama</option>
                                <option value="War">Guerra</option>
                                <option value="Crime">Crimen</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Sci-Fi">Ciencia ficción</option>
                                <option value="History">Historia</option>
                                <option value="Biography">Biografía</option>
                                <option value="Fantasy">Fantasía</option>
                                <option value="Animation">Animación</option>
                                <option value="Music">Música</option>
                                <option value="Romance">Romance</option>
                                <option value="Mystery">Misterio</option>
                            </>
                        )}
                        {type === 'series' && (
                            <>
                                <option value="Drama">Drama</option>
                                <option value="Action">Acción</option>
                                <option value="War">Guerra</option>
                                <option value="Crime">Crimen</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Nature">Naturaleza</option>
                                <option value="Adventure">Aventura</option>
                                <option value="Science-Fiction">Ciencia ficción</option>
                                <option value="Western">Western</option>
                                <option value="Mystery">Misterio</option>
                                <option value="Supernatural">Supernatural</option>
                                <option value="Family">Family</option>
                                <option value="Romance">Romance</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Medical">Medical</option>
                                <option value="Anime">Anime</option>
                                <option value="Food">Food</option>
                                <option value="Travel">Travel</option>
                                <option value="History">History</option>
                            </>
                        )}
                    </select>
                </div>
                <div className='mr-'>
                    <select name="sortByTitle" className="border border-gray-300 rounded px-3 py-2 font-poppins mr-5" onChange={handleChange}>
                        <option value="">Ordenar por título</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </div>
                <div>
                <select name="sortByYear" className="border border-gray-300 rounded px-3 py-2 font-poppins" onChange={handleChange}>
                    <option value="">Ordenar por año</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                </div>
                <button type="submit" className="bg-moradito hover:bg-lila text-white rounded px-4 py-2 ml-4 ext-lg font-poppins">Aplicar filtros</button>
            </form>
        </div>
    );
};

export default Filters
