import * as Redux from 'react-redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

import { SortOrder, SortType } from '../../../const';
import { getMockGuitars } from '../../../mocks/guitars';
import { createApi } from '../../../services/api';
import ModalCartAdd from './modal-cart-add';

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

describe('Component: ModalCartAdd', () => {
  const mockhandler = () => {
    document.body.style.overflow = 'hidden';
  };

  it('should render correctly', () => {
    render(
      <Redux.Provider store={store}>
        <Router history={history}>
          <ModalCartAdd product={mockGuitars[0]}  onModalOpen={mockhandler} onModalClose={mockhandler}/>
        </Router>
      </Redux.Provider>);

    expect(screen.getByRole('heading', {level: 3})).toHaveTextContent(mockGuitars[0].name);
  });
});
