import { combineReducers } from 'redux';
import { dataReducer } from './data/data-reducer';
import { NameSpace } from '../const';
import { userReducer } from './user/user-reducer';

const rootReducer = combineReducers({
  [NameSpace.Data]: dataReducer,
  [NameSpace.User]: userReducer,
});

type RootState = ReturnType<typeof rootReducer>

export { rootReducer };
export type { RootState };
