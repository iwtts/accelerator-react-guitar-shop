import * as Redux from 'react-redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

import { SortOrder, SortType } from '../../const';
import { getMockGuitars } from '../../mocks/guitars';
import { createApi } from '../../services/api';
import CartItem from './cart-item';

const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

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

describe('Component: CartItem', () => {
  it('should render correctly', () => {
    render(
      <Redux.Provider store={store}>
        <Router history={history}>
          <CartItem item={mockGuitars[0]} />
        </Router>
      </Redux.Provider>);

    expect(screen.getByTestId('cart-item-title')).toHaveTextContent(`${mockGuitars[0].name}`);
  });
});

