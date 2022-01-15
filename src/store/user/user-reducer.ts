import { createReducer } from '@reduxjs/toolkit';
import {
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGINATION_FILTER,
  SortOrder,
  SortType } from '../../const';
import { UserState } from '../../types/state';
import {
  setHeaderGuitars,
  setMaxPrice,
  setMinPrice,
  setSortOrder,
  setSortType,
  setFilter,
  setPaginationFilter,
  setCurrentPageNumber
} from '../actions';

const initialState: UserState = {
  headerGuitars: [],
  sortType: SortType.Default,
  sortOrder: SortOrder.Default,
  minPrice: '',
  maxPrice: '',
  filter: '',
  paginationFilter: INITIAL_PAGINATION_FILTER,
  currentPageNumber: INITIAL_PAGE_NUMBER,
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
    })
    .addCase(setPaginationFilter, (state, action) => {
      state.paginationFilter = action.payload.paginationFilter;
    })
    .addCase(setCurrentPageNumber, (state, action) => {
      state.currentPageNumber = action.payload.currentPageNumber;
    });
});

export { initialState, userReducer };
