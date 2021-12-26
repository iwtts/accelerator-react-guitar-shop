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

export {
  getGuitars,
  setSortType,
  setSortOrder,
  setMinPrice,
  setMaxPrice,
  setFilter
};
