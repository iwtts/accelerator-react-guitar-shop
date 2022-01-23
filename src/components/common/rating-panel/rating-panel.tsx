import clsx from 'clsx';

import { RatingPanelType, RATING_STARS_MAX } from '../../../const';
import { ratingPanelTypeToStarSize } from '../../../utils';

type RatingPanelProps = {
  type: RatingPanelType,
  rating: number,
  rateCount?: number,
}

function RatingPanel(props: RatingPanelProps): JSX.Element {
  const ratingStarsAmount = Math.round(props.rating);
  const ratingSolidStars = Array.from({length: ratingStarsAmount}, (_item, index) => index);
  const ratingHollowStars = Array.from({length: RATING_STARS_MAX - ratingStarsAmount}, (_item, index) => index);
  const starSize = ratingPanelTypeToStarSize[props.type];
  const ratingPanelClassName = clsx(
    'rate',
    props.type === RatingPanelType.Card && 'product-card__rate',
    props.type === RatingPanelType.ProductPage && 'product-container__rating',
    props.type === RatingPanelType.Review && 'review__rating-panel',
  );

  return (
    <div className={ratingPanelClassName} aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
      {ratingSolidStars.map((item) =>
        (
          <svg width={starSize} height={starSize} aria-hidden="true" key={item}>
            <use xlinkHref="#icon-full-star"></use>
          </svg>
        ))}
      {ratingHollowStars.map((item) =>
        (
          <svg width="14" height="14" aria-hidden="true" key={item}>
            <use xlinkHref="#icon-star"></use>
          </svg>
        ))}<span className="rate__count">{props.rateCount}</span><span className="rate__message"></span>
    </div>
  );
}

export default RatingPanel;
