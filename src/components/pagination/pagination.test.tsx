import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

import Pagination from './pagination';

import { SortOrder, SortType } from '../../const';
import { getMockGuitars } from '../../mocks/guitars';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const mockGuitars = getMockGuitars();

const store = mockStore({
  DATA: {
    guitars: mockGuitars,
    paginationGuitars: mockGuitars,
  },
  USER: {
    headerGuitars: [],
    sortType: SortType.Default,
    sortOrder: SortOrder.Default,
    minPrice: '',
    maxPrice: '',
    filter: '',
    paginationFilter: '',
  },
});

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    render(
      <Redux.Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Redux.Provider>);

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
