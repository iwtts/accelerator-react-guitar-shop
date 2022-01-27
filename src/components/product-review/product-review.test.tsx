import { datatype, internet, lorem } from 'faker';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ProductReview from './product-review';

const history = createMemoryHistory();

describe('Component: ProductReview', () => {
  const mockComment = {
    id: datatype.string(),
    userName: internet.userName(),
    advantage: datatype.string(),
    disadvantage: datatype.string(),
    comment: lorem.paragraph(),
    rating: datatype.number(5),
    createAt: datatype.datetime().toISOString(),
    guitarId: datatype.number(),
  };
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <ProductReview review={mockComment} />
      </Router>);

    expect(screen.getByTestId('review')).toBeInTheDocument();
  });
});
