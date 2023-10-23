import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopSeries } from '../../redux/actions';
import SeriesCard from '../SeriesCard/SeriesCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Top10Series() {
  const dispatch = useDispatch();
  const topSeries = useSelector((state) => state.topSeries);

  useEffect(() => {
    dispatch(getTopSeries());
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
      <h2 className="text-2xl font-bold mb-4 font-poppins text-moradito">Top 10 series</h2>
      <Slider {...settings}>
        {topSeries.map((serie) => (
          <SeriesCard
            key={serie._id}
            _id={serie._id}
            name={serie.name}
            genres={serie.genres}
            image={serie.image ? serie.image.original : ''}
          />
        ))}
      </Slider>
    </div>
  );
}

export default Top10Series;