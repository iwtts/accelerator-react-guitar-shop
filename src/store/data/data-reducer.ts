import { createReducer } from '@reduxjs/toolkit';
import { DataState } from '../../types/state';
import { getGuitars } from '../actions';

const initialState: DataState = {
  guitars: [],
};

const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getGuitars, (state, action) => {
      state.guitars = action.payload.guitars;
    });
});

export { initialState, dataReducer };
