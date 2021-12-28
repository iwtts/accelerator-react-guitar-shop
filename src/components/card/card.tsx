import { Guitar } from '../../types/guitar';

type CardProps = {
  guitar: Guitar;
}

function Card(props : CardProps): JSX.Element {
  const {
    previewImg,
    name,
    rating,
    price,
    comments,
  } = props.guitar;

  const rateCount = comments?.length;

  return (
    <div className="product-card">
      <img src={`../${previewImg}`} srcSet={`${previewImg}@2x.jpg 2x`} width="75" height="190" alt={name}>
      </img>
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={rating >= 1 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={rating >= 2 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={rating >= 3 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={rating >= 4 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref={rating >= 5 ? '#icon-full-star' : '#icon-star'}></use>
          </svg><span className="rate__count">{rateCount}</span><span className="rate__message"></span>
        </div>
        <p
          className="product-card__title"
          data-testid="card-title"
        >
          {name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <a className="button button--mini" href="#">Подробнее</a>
        <a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}

export default Card;
