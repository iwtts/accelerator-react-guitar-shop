import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFound from './not-found';

const history = createMemoryHistory();

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <NotFound />
      </Router>);

    expect(screen.getByText(/страница не найдена/i)).toBeInTheDocument();
  });
});
