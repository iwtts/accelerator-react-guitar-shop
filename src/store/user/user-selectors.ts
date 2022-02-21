import {
  NameSpace,
  SortOrder,
  SortType } from '../../const';
import { Guitar } from '../../types/guitar';
import { State } from '../../types/state';

const selectHeaderGuitars = (state: State): Guitar[] => state[NameSpace.User].headerGuitars;
const selectSortType = (state: State): SortType => state[NameSpace.User].sortType;
const selectSortOrder = (state: State): SortOrder => state[NameSpace.User].sortOrder;
const selectMinPrice = (state: State): string => state[NameSpace.User].minPrice;
const selectMaxPrice = (state: State): string => state[NameSpace.User].maxPrice;
const selectFilter = (state: State): string => state[NameSpace.User].filter;
const selectPaginationFilter = (state: State): string => state[NameSpace.User].paginationFilter;
const selectCurrentPageNumber = (state: State): number => state[NameSpace.User].currentPageNumber;
const selectCurrentCoupon = (state: State): string => state[NameSpace.User].currentCoupon;

export {
  selectHeaderGuitars,
  selectSortType,
  selectSortOrder,
  selectMinPrice,
  selectMaxPrice,
  selectFilter,
  selectPaginationFilter,
  selectCurrentPageNumber,
  selectCurrentCoupon
};
