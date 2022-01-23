import { AppRoute, RatingPanelType } from '../../const';
import { Guitar } from '../../types/guitar';
import { formatPrice } from '../../utils';
import RatingPanel from '../common/rating-panel/rating-panel';

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
    id,
  } = props.guitar;

  return (
    <div className="product-card">
      <img src={`../${previewImg}`} width="75" height="190" alt={name}>
      </img>
      <div className="product-card__info">
        <RatingPanel
          type={RatingPanelType.Card}
          rating={rating}
          rateCount={comments?.length}
        />
        <p
          className="product-card__title"
          data-testid="card-title"
        >
          {name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{formatPrice(price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <a className="button button--mini" href={`${AppRoute.Catalog}/${id}`}>Подробнее</a>
        <a className="button button--red button--mini button--add-to-cart" href="/">Купить</a>
      </div>
    </div>
  );
}

export default Card;
