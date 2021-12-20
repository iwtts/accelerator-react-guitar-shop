import { toast } from 'react-toastify';
import {
  ERROR_MESSAGE,
  ApiRoute } from '../const';
import { ThunkActionResult } from '../types/action';
import { getGuitars } from './actions';

const getDataGuitars = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get(ApiRoute.Guitars)
      .then(({data}) => {
        dispatch(getGuitars(data));
      })
      .catch(() => {
        toast.error(ERROR_MESSAGE);
      });
  };

export { getDataGuitars };
