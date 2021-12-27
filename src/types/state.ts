import { SortOrder, SortType } from '../const';
import { RootState } from '../store/root-reducer';
import { Guitar } from './guitar';

type DataState = {
  guitars: Guitar[],
}

type UserState = {
  headerGuitars: Guitar[],
  sortType: SortType,
  sortOrder: SortOrder,
  minPrice: string,
  maxPrice: string,
  filter: string,
}

type State = RootState;

export type {
  DataState,
  UserState,
  State
};
