import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import RatingPanel from './rating-panel';
import { RatingPanelType } from '../../../const';

const history = createMemoryHistory();

describe('Component: RatingPanel', () => {
  const mockRatingType = RatingPanelType.Card;
  const mockRating = 4;
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <RatingPanel
          type={mockRatingType}
          rating={mockRating}
        />
      </Router>);

    expect(screen.getByText(/Рейтинг:/i)).toBeInTheDocument();
  });
});
