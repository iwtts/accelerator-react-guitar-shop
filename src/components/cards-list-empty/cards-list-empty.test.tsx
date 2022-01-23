import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CardsListEmpty from './cards-list-empty';

const history = createMemoryHistory();

describe('Component: CardsListEmpty', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <CardsListEmpty />
      </Router>);

    expect(screen.getByText(/не найдено/i)).toBeInTheDocument();
  });
});
