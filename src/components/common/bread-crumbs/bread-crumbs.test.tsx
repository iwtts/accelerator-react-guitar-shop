import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import BreadCrumbs from './bread-crumbs';

const history = createMemoryHistory();

describe('Component: BreadCrumbs', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <BreadCrumbs />
      </Router>);

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  });
});
