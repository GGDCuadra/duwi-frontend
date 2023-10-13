import { useState } from "react";
import style from './Filter.module.css'
const Filters = () => {

    const [filters, setFilters] = useState({
        gender: "",
        sortByTitle: "",
        sortByReleaseDate: ""
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
    }

    return (
        <div className={style.filterContainer}>
            <form className={style.formFilters} onSubmit={handleSubmit}>
                <div className={style.selectContainer}>
                    <select name="gender" onChange={handleChange}>
                        <option value="">Select a genre</option>
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Drama">Drama</option>
                        <option value="War">War</option>
                        <option value="Nature">Nature</option>
                        <option value="Crime">Crime</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Science-Fiction">Science-Fiction</option>
                        <option value="History">History</option>
                        <option value="Biography">Biography</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Animation">Animation</option>
                        <option value="Music">Music</option>
                        <option value="Romance">Romance</option>
                        <option value="Mystery">Mystery</option>

                    </select>
                </div>
                <div className={style.selectContainer}>
                    <select name="sortByTitle" onChange={handleChange}>
                        <option value="">Order by title</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </div>
                <div className={style.selectContainer}>
                    <select name="sortByReleaseDate" onChange={handleChange}>
                        <option value="">Order by release date</option>
                        <option value="asc">Oldest to Newest</option>
                        <option value="desc">Newest to Oldest</option>
                    </select>
                </div>
                <button type="submit">APPLY FILTERS</button>
            </form>
        </div>
    );
};

export default Filters;
