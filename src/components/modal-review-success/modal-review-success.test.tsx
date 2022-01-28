import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ModalReviewSuccess from './modal-review-success';

const history = createMemoryHistory();

describe('Component: ModalReviewSuccess', () => {
  const mockhandler = () => {
    document.body.style.overflow = 'hidden';
  };
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <ModalReviewSuccess
          onModalClose={mockhandler}
        />
      </Router>);

    expect(screen.getByText(/Спасибо за ваш отзыв/i)).toBeInTheDocument();
  });
});
