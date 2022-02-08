import { Guitar } from '../../types/guitar';
import { formatPrice, guitarTypeToReadable } from '../../utils';

type CartItemProps = {
  item: Guitar,
}

function CartItem(props: CartItemProps): JSX.Element {
  const {
    previewImg,
    name,
    type,
    vendorCode,
    stringCount,
    price,
  } = props.item;

  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить"><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img src={`../${previewImg}`} width="55" height="130" alt={name}></img>
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{`${guitarTypeToReadable[type]} ${name}`}</p>
        <p className="product-info__info">{`Артикул: ${vendorCode}`}</p>
        <p className="product-info__info">{`${guitarTypeToReadable[type]}, ${stringCount} струнная`}</p>
      </div>
      <div className="cart-item__price">{`${formatPrice(price)} ₽`}</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input className="quantity__input" type="number" placeholder="1" id="2-count" name="2-count" max="99"></input>
        <button className="quantity__button" aria-label="Увеличить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{`${formatPrice(price)} ₽`}</div>
    </div>
  );
}

export default CartItem;
