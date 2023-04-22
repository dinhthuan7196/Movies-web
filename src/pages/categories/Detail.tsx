import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../components/button';

import { PLOT } from '../../ultis/constants';

import { fetchData } from '../../store/moviesReducer';
import { ResByI } from '../../store/moviesReducer/types';

import { InfoProps } from './type';

const rows = ['Title', 'Type', 'Year', 'Plot', 'imdbID'];

const Info: FC<InfoProps> = ({ label, value }) => (
  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-sm font-medium leading-6 text-gray-900">{label}</dt>
    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      {value}
    </dd>
  </div>
);

const Detail: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [movie, setMovie] = useState<ResByI>();

  useEffect(() => {
    (async () => {
      const res: ResByI = await fetchData({
        i: id,
        plot: PLOT.FULL,
      });

      setMovie(res);
    })();
  }, [id]);

  return (
    <>
      <div className="mb-3 md:mb-5">
        <Button onClick={() => navigate('/')}>Back to list</Button>
      </div>
      <div className="md:flex md:flex-row md:gap-10">
        <div className="basis-1/4 md:basis-1/3">
          <img
            alt="demo"
            loading="lazy"
            className="rounded-lg h-full w-full"
            src={movie?.Poster}
          />
        </div>
        <div className="basis-3/4 md:basis-2/3">
          <dl className="divide-y divide-gray-100">
            {rows.map((val) => (
              <Info
                key={val}
                label={val}
                value={movie?.[val as keyof ResByI] ?? ''}
              />
            ))}
          </dl>
        </div>
      </div>
    </>
  );
};

export default Detail;
