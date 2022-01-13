import { Middleware } from 'redux';

import browserHistory from '../../browser-history';

import { ActionType } from '../../const';
import { State } from '../../types/state';

const redirect: Middleware<unknown, State> =
  (_store) =>
    (next) =>
      (action) => {

        if (action.type === ActionType.RedirectToRoute) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };

export { redirect };
