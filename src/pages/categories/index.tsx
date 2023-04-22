/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';

import Card from './Card';

const Categories: FC = () => {
  const navigate = useNavigate();

  const { movies, msgError } = useSelector(({ movies }: RootState) => {
    const records = movies?.data?.Search ?? [];
    const movie = {
      Plot: movies?.data?.Plot ?? '',
      Poster: movies?.data?.Poster ?? '',
      Title: movies?.data?.Title ?? '',
      Year: movies?.data?.Year ?? '',
      Type: movies?.data?.Type ?? '',
      imdbID: movies?.data?.imdbID ?? '',
    };

    if (Object.values(movie).every((val) => !!val)) {
      records?.push(movie);
    }

    return {
      msgError: movies?.data?.Error,
      movies: records,
    };
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {msgError ? (
          <div className="text-xl text-red-600">{msgError}</div>
        ) : (
          <>
            {movies.map((rc) => (
              <Card
                key={rc.Title}
                {...rc}
                onClick={() => navigate(`/detail/${rc.imdbID}`)}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Categories;
