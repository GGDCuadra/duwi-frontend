import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      {selectedItem && (
        <div>
          <h2>{selectedItem.title || selectedItem.name}</h2>
          <p>{selectedItem.overview}</p>
          {selectedItem.video && (
            <div>
              <iframe
                width="660"
                height="355"
                src={`https://www.youtube.com/embed/${selectedItem.video}?autoplay=1`}
                title="video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <button onClick={() => setSelectedItem(null)}>Close</button>
        </div>
      )}
      <div>
        <h2>Películas de estreno:</h2>
        <ul>
          {films.map((movie, index) => (
            <li key={index}>
              <div onClick={() => fetchDetails(movie.id, true)}>
                <h3>{movie.title}</h3>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: "220px", cursor: "pointer" }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Series de estreno:</h2>
        <ul>
          {series.map((serie, index) => (
            <li key={index}>
              <div onClick={() => fetchDetails(serie.id, false)}>
                <h3>{serie.name}</h3>
                <img
                  src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                  alt={serie.name}
                  style={{ width: "220px", cursor: "pointer" }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewReleases;

