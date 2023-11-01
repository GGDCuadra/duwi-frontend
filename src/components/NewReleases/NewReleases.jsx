import { useState, useEffect } from "react";
import axios from "axios";
import Footer from '../Footer/Footer'

const NewReleases = () => {
  const [films, setFilms] = useState([]);
  const [series, setSeries] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchDetails = async (id, isMovie) => {
    const type = isMovie ? "movie" : "tv";
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=04b13acbfc1d95f3118398d9fe408110&language=en-US`
      );
      const videoResponse = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=04b13acbfc1d95f3118398d9fe408110&language=en-US`
      );

      const videoKey = videoResponse.data.results[0]?.key;
      setSelectedItem({ ...response.data, video: videoKey });
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/now_playing?api_key=04b13acbfc1d95f3118398d9fe408110&language=en-US&page=1"
        );
        setFilms(response.data.results.slice(0, 10));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchSeries = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/tv/on_the_air?api_key=04b13acbfc1d95f3118398d9fe408110&language=en-US&page=1"
        );
        setSeries(response.data.results.slice(0, 10));
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    };

    fetchMovies();
    fetchSeries();
  }, []);

  return (
    <div className="p-4">
      {selectedItem && (
        <div className="p-2 border border-lila rounded-lg shadow-lg font-poppins mb-3">
          <h2 className="text-2xl font-bold text-center text-moradito mt-5 dark:text-lila">
            {selectedItem.title || selectedItem.name}
          </h2>
          <p className="text-moradito align-middle mt-10 text-center dark:text-clarito">{selectedItem.overview}</p>
          {selectedItem.video && (
            <div className="mt-4 font-poppins">
              <iframe
                width="660"
                height="355"
                src={`https://www.youtube.com/embed/${selectedItem.video}?autoplay=0`}
                title="video"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg mx-auto"
              ></iframe>
            </div>
          )}
          <button
            onClick={() => setSelectedItem(null)}
            className="mt-4 bg-moradito hover:bg-lila text-white py-2 px-4 rounded ml-[880px] mb-3"
          >
            Cerrar
          </button>
        </div>
      )}
      <div className="mt-4">
        <h2 className="text-2xl font-poppins font-semibold text-moradito mb-10 dark:text-lila">Películas de estreno:</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {films.map((movie, index) => (
            <li
              key={index}
              className="rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition duration-300"
              onClick={() => fetchDetails(movie.id, true)}
            >
              
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-2xl"
              />
              <h3 className="text-lg font-semibold p-2 font-poppins text-center text-moradito dark:text-lila">{movie.title}</h3>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 mb-8">
        <h2 className="text-2xl font-poppins font-semibold text-moradito mb-10 mt-10 dark:text-lila">Series de estreno:</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {series.map((serie, index) => (
            <li
              key={index}
              className="rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition duration-300"
              onClick={() => fetchDetails(serie.id, false)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                alt={serie.name}
                className="w-full mb-2 rounded-xl"
              />
              <h3 className="text-lg font-semibold font-poppins text-moradito p-2 text-center dark:text-lila">{serie.name}</h3>
            </li>
          ))}
        </ul>
      </div>
      <Footer/>
    </div>
  );
};

export default NewReleases;
