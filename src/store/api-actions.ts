import { toast } from 'react-toastify';
import { ERROR_MESSAGE, ApiRoute } from '../const';
import { ThunkActionResult } from '../types/action';
import {
  getGuitars,
  setHeaderGuitars,
  setPaginationGuitars } from './actions';

const getDataGuitars = (...params: string[]): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get(`${ApiRoute.GuitarsWithComments}${params.join('')}`)
      .then(({data}) => {
        dispatch(getGuitars(data));
      })
      .catch(() => {
        toast.error(ERROR_MESSAGE);
      });
  };

const getDataForSearch = (nameRef: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get(`${ApiRoute.Guitars}${`?name_like=${nameRef}`}`)
      .then(({data}) => {
        dispatch(setHeaderGuitars(data));
      })
      .catch(() => {
        toast.error(ERROR_MESSAGE);
      });
  };

const getDataForPagination = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get(`${ApiRoute.Guitars}`)
      .then(({data}) => {
        dispatch(setPaginationGuitars(data));
      })
      .catch(() => {
        toast.error(ERROR_MESSAGE);
      });
  };

export { getDataGuitars, getDataForSearch, getDataForPagination };
