import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

import App from './app';

import {
  AppRoute,
  SortOrder,
  SortType } from '../../const';
import { getMockGuitars } from '../../mocks/guitars';

const mockStore = configureMockStore();

const mockGuitars = getMockGuitars();

const store = mockStore({
  DATA: {
    guitars: mockGuitars,
    paginationGuitars: mockGuitars,
    isDataLoaded: true,
  },
  USER: {
    headerGuitars: [],
    sortType: SortType.Default,
    sortOrder: SortOrder.Default,
    minPrice: '',
    maxPrice: '',
    filter: '',
    paginationFilter: '',
    discountPercent: '25',
    cartGuitars: mockGuitars,
  },
});

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render Catalog when user navigate to "/"', () => {
    store.dispatch = jest.fn();
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(/Каталог гитар/i);
  });

  it('should render NotFound when user navigate to non-existent route', () => {
    history.push('/non/existent/route');
    render(fakeApp);

    expect(screen.getByText(/страница не найдена/i)).toBeInTheDocument();
  });
});
