import { RATING_STARS_MAX } from '../../const';
import { Comment } from '../../types/comment';

type ProductPageReviewProps = {
  review: Comment;
}

function ProductPageReview(props: ProductPageReviewProps): JSX.Element {
  const {
    userName,
    createAt,
    advantage,
    disadvantage,
    comment,
    rating,
  } = props.review;

  const reviewDate = new Date(createAt);
  const formatedDate = new Intl.DateTimeFormat('ru-RU', {day: 'numeric', month: 'long' }).format(reviewDate);

  const ratingStarsAmount = rating;

  const ratingSolidStars = Array.from({length: ratingStarsAmount}, (_item, index) => index);
  const ratingEmptyStars = Array.from({length: RATING_STARS_MAX - ratingStarsAmount}, (_item, index) => index);

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{userName}</h4><span className="review__date">{formatedDate}</span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
        {ratingSolidStars.map((item) =>
          (
            <svg width="16" height="16" aria-hidden="true" key={item}>
              <use xlinkHref="#icon-full-star"></use>
            </svg>
          ))}
        {ratingEmptyStars.map((item) =>
          (
            <svg width="16" height="16" aria-hidden="true" key={item}>
              <use xlinkHref="#icon-star"></use>
            </svg>
          ))}<span className="rate__count"></span><span className="rate__message"></span>
      </div>
      {advantage &&
        <>
          <h4 className="review__title title title--lesser">Достоинства:</h4>
          <p className="review__value">{advantage}</p>
        </>}
      {disadvantage &&
        <>
          <h4 className="review__title title title--lesser">Недостатки:</h4>
          <p className="review__value">{disadvantage}</p>
        </>}
      {comment &&
        <>
          <h4 className="review__title title title--lesser">Комментарий:</h4>
          <p className="review__value">{comment}</p>
        </>}
    </div>
  );
}

export default ProductPageReview;
