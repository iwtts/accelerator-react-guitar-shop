import { createReducer } from '@reduxjs/toolkit';
import { DataState } from '../../types/state';
import { getGuitars, setPaginationGuitars } from '../actions';

const initialState: DataState = {
  guitars: [],
  paginationGuitars: [],
};

const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getGuitars, (state, action) => {
      state.guitars = action.payload.guitars;
    })
    .addCase(setPaginationGuitars, (state, action) => {
      state.paginationGuitars = action.payload.paginationGuitars;
    });
});

export { initialState, dataReducer };
