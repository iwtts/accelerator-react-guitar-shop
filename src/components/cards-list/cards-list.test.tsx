import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CardsList from './cards-list';
import { getMockGuitars } from '../../mocks/guitars';

const history = createMemoryHistory();

const mockGuitars = getMockGuitars();

describe('Component: CardsList', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <CardsList guitars={mockGuitars}/>
      </Router>);

    expect(screen.getByTestId('cards-catalog')).toBeInTheDocument();
  });
});
