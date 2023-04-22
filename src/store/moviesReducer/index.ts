import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Params, Result, MoviesState } from './types';

export const fetchData = async (params: Params) => {
  const response = await fetch(
    `${process.env.REACT_APP_API}&${new URLSearchParams(params)}`
  );
  const data: Result = await response.json();

  return data;
};

const initialState: MoviesState = {
  handling: false,
  data: {},
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchData',
  async (params: Params, thunkAPI) => {
    try {
      const result = await fetchData(params);

      return result;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.handling = true;
    });
    builder.addCase(fetchMovies.rejected, (state) => {
      state.handling = false;
    });
    builder.addCase(fetchMovies.fulfilled, (state, { payload }) => {
      state.handling = false;
      state.data = payload;
    });
  },
});

export default moviesSlice.reducer;
