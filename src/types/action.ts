import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';

import { State } from './state';

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;

export type { ThunkActionResult, ThunkAppDispatch };
