import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../const';
import { Guitar } from '../types/guitar';

const getGuitars = createAction(
  ActionType.SetGuitars,
  (guitars: Guitar[]) => ({
    payload: {
      guitars: guitars,
    },
  }),
);

export { getGuitars };
