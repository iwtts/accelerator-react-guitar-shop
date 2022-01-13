import { SortOrder, SortType } from '../const';
import { RootState } from '../store/root-reducer';
import { Guitar } from './guitar';

type DataState = {
  isDataLoaded: boolean,
  guitars: Guitar[],
  paginationGuitars: Guitar[],
}

type UserState = {
  headerGuitars: Guitar[],
  sortType: SortType,
  sortOrder: SortOrder,
  minPrice: string,
  maxPrice: string,
  filter: string,
  paginationFilter: string,
  currentPageNumber: number,
}

type State = RootState;

export type {
  DataState,
  UserState,
  State
};
