import { createAction } from '@reduxjs/toolkit';
import { ActionType, SortOrder, SortType } from '../const';
import { Guitar } from '../types/guitar';

const getGuitars = createAction(
  ActionType.SetGuitars,
  (guitars: Guitar[]) => ({
    payload: {
      guitars: guitars,
    },
  }),
);

const setHeaderGuitars = createAction(
  ActionType.SetHeaderGuitars,
  (headerGuitars: Guitar[]) => ({
    payload: {
      headerGuitars: headerGuitars,
    },
  }),
);

const setPaginationGuitars = createAction(
  ActionType.SetPaginationGuitars,
  (paginationGuitars: Guitar[]) => ({
    payload: {
      paginationGuitars: paginationGuitars,
    },
  }),
);

const setSortType = createAction(
  ActionType.SetSortType,
  (sortType: SortType) => ({
    payload: {
      sortType: sortType,
    },
  }),
);

const setSortOrder = createAction(
  ActionType.SetSortOrder,
  (sortOrder: SortOrder) => ({
    payload: {
      sortOrder: sortOrder,
    },
  }),
);

const setMinPrice = createAction(
  ActionType.SetMinPrice,
  (minPrice: string) => ({
    payload: {
      minPrice: minPrice,
    },
  }),
);

const setMaxPrice = createAction(
  ActionType.SetMaxPrice,
  (maxPrice: string) => ({
    payload: {
      maxPrice: maxPrice,
    },
  }),
);

const setFilter = createAction(
  ActionType.SetFilter,
  (filter: string) => ({
    payload: {
      filter: filter,
    },
  }),
);

const setPaginationFilter = createAction(
  ActionType.SetPaginationFilter,
  (paginationFilter: string) => ({
    payload: {
      paginationFilter: paginationFilter,
    },
  }),
);

const setCurrentPageNumber = createAction(
  ActionType.SetCurrentPageNumber,
  (currentPageNumber: number) => ({
    payload: {
      currentPageNumber: currentPageNumber,
    },
  }),
);

const setDiscountPercent = createAction(
  ActionType.SetCoupon,
  (discountPercent: string) => ({
    payload: {
      discountPercent: discountPercent,
    },
  }),
);

const setCartGuitars = createAction(
  ActionType.SetCartGuitars,
  (cartGuitars: Guitar[]) => ({
    payload: {
      cartGuitars: cartGuitars,
    },
  }),
);

export {
  getGuitars,
  setHeaderGuitars,
  setPaginationGuitars,
  setSortType,
  setSortOrder,
  setMinPrice,
  setMaxPrice,
  setFilter,
  setPaginationFilter,
  setCurrentPageNumber,
  setDiscountPercent,
  setCartGuitars
};
