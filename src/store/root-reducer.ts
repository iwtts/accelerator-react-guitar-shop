import { combineReducers } from 'redux';
import { dataReducer } from './data/data-reducer';
import { NameSpace } from '../const';

const rootReducer = combineReducers({
  [NameSpace.Data]: dataReducer,
});

type RootState = ReturnType<typeof rootReducer>

export { rootReducer };
export type { RootState };
