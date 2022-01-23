import { RatingPanelType } from '../../const';
import { Comment } from '../../types/comment';
import RatingPanel from '../common/rating-panel/rating-panel';

type ProductReviewProps = {
  review: Comment;
}

function ProductReview(props: ProductReviewProps): JSX.Element {
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

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{userName}</h4><span className="review__date">{formatedDate}</span>
      </div>
      <RatingPanel
        type={RatingPanelType.Review}
        rating={rating}
      />
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

export default ProductReview;
