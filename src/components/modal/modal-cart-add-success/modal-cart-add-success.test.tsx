import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ModalCartAddSuccess from './modal-cart-add-success';

const history = createMemoryHistory();

describe('Component: ModalReviewSuccess', () => {
  const mockhandler = () => {
    document.body.style.overflow = 'hidden';
  };
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <ModalCartAddSuccess
          onModalClose={mockhandler}
        />
      </Router>);

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
  });
});

