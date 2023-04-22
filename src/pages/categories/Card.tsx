import { FC } from 'react';

import { CategoryProps } from './type';

const Card: FC<CategoryProps> = ({ Title, Poster, onClick }) => (
  <div
    className="bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer hover:shadow-2xl"
    onClick={onClick}
  >
    <img
      loading="lazy"
      className="rounded-t-lg h-56 w-full"
      src={Poster}
      alt={Title}
    />
    <h5 className="text-lg tracking-tight text-gray-700 p-2 truncate text-center">
      {Title}
    </h5>
  </div>
);

export default Card;
