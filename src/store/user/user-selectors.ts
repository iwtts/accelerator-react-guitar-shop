import { NameSpace, SortOrder, SortType } from '../../const';
import { State } from '../../types/state';

const selectSortType = (state: State): SortType => state[NameSpace.User].sortType;
const selectSortOrder = (state: State): SortOrder => state[NameSpace.User].sortOrder;
const selectMinPrice = (state: State): string => state[NameSpace.User].minPrice;
const selectMaxPrice = (state: State): string => state[NameSpace.User].maxPrice;
const selectFilter = (state: State): string => state[NameSpace.User].filter;

export {
  selectSortType,
  selectSortOrder,
  selectMinPrice,
  selectMaxPrice,
  selectFilter
};
