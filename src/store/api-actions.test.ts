import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../services/api';
import { getDataGuitars } from './api-actions';
import { ApiRoute } from '../const';
import { State } from '../types/state';
import { getGuitars } from './actions';
import { getMockGuitars } from '../mocks/guitars';

describe('Async actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockGuitars = getMockGuitars();

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch getGuitars when GET /guitars', async () => {
    const store = mockStore();

    mockApi
      .onGet(ApiRoute.GuitarsWithComments)
      .reply(200, mockGuitars);

    await store.dispatch(getDataGuitars());

    expect(store.getActions()).toEqual([
      getGuitars(mockGuitars),
    ]);
  });
});
