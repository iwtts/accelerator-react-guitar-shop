import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../services/api';
import { getDataForPagination, getDataForSearch, getDataGuitars } from './api-actions';
import { ApiRoute } from '../const';
import { State } from '../types/state';
import { getGuitars, setHeaderGuitars, setPaginationGuitars } from './actions';
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

  it('should dispatch setHeaderGuitars when GET /guitars', async () => {
    const store = mockStore();
    const mockNameRef = 'Честер';

    mockApi
      .onGet(`${ApiRoute.Guitars}${`?name_like=${mockNameRef}`}`)
      .reply(200, mockGuitars);

    await store.dispatch(getDataForSearch(mockNameRef));

    expect(store.getActions()).toEqual([
      setHeaderGuitars(mockGuitars),
    ]);
  });

  it('should dispatch setPaginationGuitars when GET /guitars', async () => {
    const store = mockStore();

    mockApi
      .onGet(ApiRoute.Guitars)
      .reply(200, mockGuitars);

    await store.dispatch(getDataForPagination());

    expect(store.getActions()).toEqual([
      setPaginationGuitars(mockGuitars),
    ]);
  });
});
