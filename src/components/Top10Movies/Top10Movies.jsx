import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopMovies } from '../../redux/actions';
import MovieCard from '../MovieCard/MovieCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Top10Movies() {
  const dispatch = useDispatch();
  const topMovies = useSelector((state) => state.topMovies);

  useEffect(() => {
    dispatch(getTopMovies());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 font-poppins text-moradito">Top 10 películas</h2>
      <Slider {...settings}>
        {topMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            Series_Title={movie.Series_Title}
            Poster_Link={movie.Poster_Link}
            Genre={movie.Genre}
          />
        ))}
      </Slider>
    </div>
  );
}

export default Top10Movies;