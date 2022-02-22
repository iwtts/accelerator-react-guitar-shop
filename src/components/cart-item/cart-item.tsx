import { ChangeEvent, useEffect, useState } from 'react';
import { ESC_KEY_CODE } from '../../const';
import { Guitar } from '../../types/guitar';
import { formatPrice, guitarTypeToReadable } from '../../utils';
import ModalCartRemove from '../modal/modal-cart-remove/modal-cart-remove';

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
    amount,
  } = props.item;

  const [isModalCartRemoveOpened, setIsOpenModalCartRemoveOpened] = useState(false);

  const handleModalCartRemoveOpen = () => {
    setIsOpenModalCartRemoveOpened(true);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onEscKeydown);
  };

  const handleModalCartRemoveClose = () => {
    setIsOpenModalCartRemoveOpened(false);
    document.body.style.overflow = 'scroll';
    document.removeEventListener('keydown', onEscKeydown);
  };

  const onEscKeydown = (evt: { keyCode: number; }) => {
    if (evt.keyCode === ESC_KEY_CODE) {
      handleModalCartRemoveClose();
    }
  };

  const getTotalPrice = () => {
    if (amount) {
      return formatPrice(price * amount);
    } else {
      return formatPrice(price);
    }
  };

  const [currentAmount, setCurrentAmount] = useState(amount);

  const storageGuitarsString = sessionStorage.getItem('cartGuitars');

  const handleAmountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let storageGuitars: Guitar[];
    if (storageGuitarsString) {
      storageGuitars = JSON.parse(storageGuitarsString);
    } else {
      storageGuitars = [];
    }

    const currentGuitar = storageGuitars.find((item) => item.id === props.item.id);
    if (currentGuitar) {
      currentGuitar.amount = +evt.target.value;
      sessionStorage.setItem('cartGuitars', JSON.stringify(storageGuitars));
    }
  };

  useEffect(() => {
    setCurrentAmount(props.item.amount);
  }, [props.item.amount, storageGuitarsString]);

  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={handleModalCartRemoveOpen}><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
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
        <input className="quantity__input" type="number" placeholder={currentAmount?.toString()} id="2-count" name="2-count" max="99" onChange={handleAmountChange}></input>
        <button className="quantity__button" aria-label="Увеличить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{`${getTotalPrice()} ₽`}</div>
      {isModalCartRemoveOpened &&
        <ModalCartRemove
          product={props.item}
          onModalClose={handleModalCartRemoveClose}
        />}
    </div>
  );
}

export default CartItem;
