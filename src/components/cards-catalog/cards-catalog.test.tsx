import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CardsCatalog from './cards-catalog';
import { getMockGuitars } from '../../mocks/guitars';

const history = createMemoryHistory();

const mockGuitars = getMockGuitars();

describe('Component: CardsCatalog', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <CardsCatalog guitars={mockGuitars}/>
      </Router>);

    expect(screen.getByTestId('cards-catalog')).toBeInTheDocument();
  });
});
