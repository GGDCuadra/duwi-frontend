import { useState } from "react";
import style from './Filter.module.css'
import { useDispatch } from "react-redux";
import { getFilteredMovies } from "../../redux/actions";
const Filters = ({ onFilterChange, currentFilters, currentMoviesPage,currentSeriesPage }) => {
    const dispatch = useDispatch()
    const [filters, setFilters] = useState({
        genre: "",
        sortByTitle: "",
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
        <div className={style.filterContainer}>
            <form className={style.formFilters} onSubmit={handleSubmit}>
                <div className={style.selectContainer}>
                    <select name="genre" onChange={handleChange}>
                        <option value="">Seleciona un genero</option>
                        <option value="Action">Acción</option>
                        <option value="Adventure">Aventura</option>
                        <option value="Drama">Drama</option>
                        <option value="War">Guerra</option>
                        <option value="Nature">Naturaleza</option>
                        <option value="Crime">Crimen</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Science-Fiction">Ciencia ficción</option>
                        <option value="History">Historia</option>
                        <option value="Biography">Biografia</option>
                        <option value="Fantasy">Fantacia</option>
                        <option value="Animation">Animación</option>
                        <option value="Music">Musica</option>
                        <option value="Romance">Romance</option>
                        <option value="Mystery">Misterio</option>

                    </select>
                </div>
                <div className={style.selectContainer}>
                    <select name="sortByTitle" onChange={handleChange}>
                        <option value="">Ordenar por titulo</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </div>
                <button type="submit">Aplicar filtros</button>
            </form>
        </div>
    );
};

export default Filters;
