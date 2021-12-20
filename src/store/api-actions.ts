import { toast } from 'react-toastify';
import {
  ERROR_MESSAGE,
  ApiRoute,
  SortOrder,
  SortType } from '../const';
import { ThunkActionResult } from '../types/action';
import { getGuitars } from './actions';

const getDataGuitars = (sortType = SortType.Default, sortOrder = SortOrder.Default): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get(`${ApiRoute.GuitarsWithComments}${sortType}${sortOrder}`)
      .then(({data}) => {
        dispatch(getGuitars(data));
      })
      .catch(() => {
        toast.error(ERROR_MESSAGE);
      });
  };

export { getDataGuitars };
