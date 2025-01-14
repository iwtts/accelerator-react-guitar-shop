import { NameSpace } from '../../const';
import { Guitar } from '../../types/guitar';
import { State } from '../../types/state';

const selectGuitars = (state: State): Guitar[] => state[NameSpace.Data].guitars;
const selectPaginationGuitars = (state: State): Guitar[] => state[NameSpace.Data].paginationGuitars;
const selectDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;

export { selectGuitars, selectPaginationGuitars, selectDataLoadingStatus };
