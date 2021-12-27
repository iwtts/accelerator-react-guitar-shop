import { createReducer } from '@reduxjs/toolkit';
import { SortOrder, SortType } from '../../const';
import { UserState } from '../../types/state';
import {
  setHeaderGuitars,
  setMaxPrice,
  setMinPrice,
  setSortOrder,
  setSortType,
  setFilter
} from '../actions';

const initialState: UserState = {
  headerGuitars: [],
  sortType: SortType.Default,
  sortOrder: SortOrder.Default,
  minPrice: '',
  maxPrice: '',
  filter: '',
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setHeaderGuitars, (state, action) => {
      state.headerGuitars = action.payload.headerGuitars;
    })
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload.sortType;
    })
    .addCase(setSortOrder, (state, action) => {
      state.sortOrder = action.payload.sortOrder;
    })
    .addCase(setMinPrice, (state, action) => {
      state.minPrice = action.payload.minPrice;
    })
    .addCase(setMaxPrice, (state, action) => {
      state.maxPrice = action.payload.maxPrice;
    })
    .addCase(setFilter, (state, action) => {
      state.filter = action.payload.filter;
    });
});

export { initialState, userReducer };
