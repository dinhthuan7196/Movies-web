import { TYPES } from '../../ultis/constants';

export type Params = {
  i?: string; // imdbID
  s?: string; // search
  y?: string; // year
  plot?: string;
  page?: string;
  type?: keyof typeof TYPES;
};

export type ResByI = {
  Plot?: string;
  Poster?: string;
  Title?: string;
  Year?: string;
  Type?: string;
  imdbID?: string;
};

export type ResByT = {
  totalResults?: string;
  Search?: ResByI[];
};

export type ResError = {
  Error?: string;
};

export type Result = ResByI & ResByT & ResError;

export interface MoviesState {
  handling: boolean;
  data?: Result;
}
