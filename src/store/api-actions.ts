import { toast } from 'react-toastify';
import { ERROR_MESSAGE, ApiRoute } from '../const';
import { ThunkActionResult } from '../types/action';
import { CommentToPost } from '../types/comment';
import { getSortedGuitars } from '../utils';
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
        dispatch(setHeaderGuitars(getSortedGuitars(data, nameRef)));
      })
      .catch(() => {
        toast.error(ERROR_MESSAGE);
      });
  };

const getDataForPagination = (...params: string[]): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get(`${ApiRoute.GuitarsWithComments}${params.join('')}`)
      .then(({data}) => {
        dispatch(setPaginationGuitars(data));
      })
      .catch(() => {
        toast.error(ERROR_MESSAGE);
      });
  };

const postReview = ({comment, rating, guitarId, advantage, disadvantage, userName}: CommentToPost, openSuccessPopup?: () => void): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.post(`${ApiRoute.Comments}`, {comment: comment, rating, guitarId, advantage, disadvantage, userName})
      .then(({data}) => {
        if(data){
          dispatch(getDataForPagination());
          openSuccessPopup?.();
        }
      })
      .catch(() => {
        toast.error(ERROR_MESSAGE);
      });
  };

export { getDataGuitars, getDataForSearch, getDataForPagination, postReview};
