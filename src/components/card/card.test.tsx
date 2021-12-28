import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Card from './card';
import { getMockGuitars } from '../../mocks/guitars';

const history = createMemoryHistory();

const mockGuitars = getMockGuitars();

describe('Component: Card', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Card guitar={mockGuitars[0]}/>
      </Router>);

    expect(screen.getByTestId('card-title')).toHaveTextContent(`${mockGuitars[0].name}`);
  });
});
