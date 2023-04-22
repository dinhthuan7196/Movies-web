import { PLOT, PAGINATION, TYPES } from '../../ultis/constants';

enum HANDLE_CHANGE {
  YEAR = 1,
  SEARCH = 2,
  TYPE = 3,
  PAGE = 4,
}

export interface State {
  s?: string;
  y?: string;
  type?: keyof typeof TYPES;
  plot?: typeof PLOT.FULL;
  page?: typeof PAGINATION.PAGE;
}

export interface Action {
  type: HANDLE_CHANGE;
  payload: State;
}

const initial: State = {
  s: '',
  y: '',
  plot: PLOT.FULL,
  page: PAGINATION.PAGE,
  type: TYPES.all,
};

const filterReducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case HANDLE_CHANGE.SEARCH:
    case HANDLE_CHANGE.YEAR:
    case HANDLE_CHANGE.TYPE:
    case HANDLE_CHANGE.PAGE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export { HANDLE_CHANGE, initial, filterReducer };
