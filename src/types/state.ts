import { RootState } from '../store/root-reducer';
import { Guitar } from './guitar';

type DataState = {
  guitars: Guitar[],
}

type State = RootState;

export type { DataState, State };
