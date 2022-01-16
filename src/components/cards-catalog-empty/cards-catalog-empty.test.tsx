import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CardsCatalogEmpty from './cards-catalog-empty';

const history = createMemoryHistory();

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <CardsCatalogEmpty />
      </Router>);

    expect(screen.getByText(/не найдено/i)).toBeInTheDocument();
  });
});
