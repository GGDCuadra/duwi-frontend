import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopSeries } from '../../redux/actions';
import SeriesCard from '../SeriesCard/SeriesCard';

function Top10Series() {
  const dispatch = useDispatch();
  const topSeries = useSelector((state) => state.topSeries);

  useEffect(() => {
    dispatch(getTopSeries());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 font-poppins text-moradito">Top 10 series</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {topSeries.map((serie) => (
          <SeriesCard
            key={serie._id}
            name={serie.name}
            image={serie.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Top10Series;
