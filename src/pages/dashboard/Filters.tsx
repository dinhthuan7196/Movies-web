import { FC, useMemo, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppDispatch, RootState } from '../../store';
import { fetchMovies } from '../../store/moviesReducer';

import { TYPES } from '../../ultis/constants';

import TextInput from '../../components/text-input';
import Dropdown from '../../components/dropdown';
import Button from '../../components/button';
import { Search as SearchIcon } from '../../components/icons';

import { HANDLE_CHANGE, initial, filterReducer, State } from './reducer';

const Filters: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const storeDispatch = useDispatch<AppDispatch>();
  const { handling } = useSelector(({ movies }: RootState) => ({
    handling: movies.handling,
  }));

  const [filters, dispatch] = useReducer(filterReducer, initial);

  const options = useMemo(
    () =>
      Object.keys(TYPES).map((key) => ({
        label: TYPES[key as keyof typeof TYPES],
        value: key,
      })),
    []
  );

  const handleChange = (type: HANDLE_CHANGE, payload: State) =>
    dispatch({ type, payload });

  const handleSearch = () => {
    const params = { ...filters };
    if (params.type === TYPES.all) {
      delete params.type;
    }
    storeDispatch(fetchMovies(params)).then(() => {
      if (location.pathname.includes('/detail')) {
        navigate('/');
      }
    });
  };

  return (
    <div className="w-full h-full bg-slate-100 shadow-md p-4 mb-1 md:flex md:flex-row md:gap-3">
      <div className="w-full px-3 md:w-80 md:px-0">
        <TextInput
          placeholder="Search by"
          disabled={handling}
          value={filters.s}
          onChange={(value) => handleChange(HANDLE_CHANGE.SEARCH, { s: value })}
        />
      </div>
      <div className="w-3/6 px-3 md:w-44 md:px-0">
        <TextInput
          placeholder="Year"
          disabled={handling}
          value={filters.y}
          onChange={(value) => handleChange(HANDLE_CHANGE.YEAR, { y: value })}
        />
      </div>
      <Dropdown
        disabled={handling}
        value={filters.type}
        options={options}
        onChange={(value) => {
          const val = value as keyof typeof TYPES | undefined;
          handleChange(HANDLE_CHANGE.TYPE, { type: val });
        }}
      />
      <Button disabled={handling} onClick={handleSearch}>
        <SearchIcon />
      </Button>
    </div>
  );
};

export default Filters;
