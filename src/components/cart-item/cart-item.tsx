import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AMOUNT_CHANGE_STEP, ESC_KEY_CODE, MAX_GUITAR_AMOUNT_IN_CART, MIN_GUITAR_AMOUNT_IN_CART } from '../../const';
import { setCartGuitars } from '../../store/actions';
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

  const dispatch = useDispatch();

  const [isModalCartRemoveOpened, setIsOpenModalCartRemoveOpened] = useState(false);
  const [amountInputValue, setInputValue] = useState(amount || '');

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

  const storageGuitarsString = sessionStorage.getItem('cartGuitars');

  const AmountInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let storageGuitars: Guitar[];
    if (storageGuitarsString) {
      storageGuitars = JSON.parse(storageGuitarsString);
    } else {
      storageGuitars = [];
    }

    const currentGuitar = storageGuitars.find((item) => item.id === props.item.id);
    if (currentGuitar) {
      if (evt.target.value === '') {
        setInputValue('');
      } else {
        if (+evt.target.value === 0) {
          evt.target.value = MIN_GUITAR_AMOUNT_IN_CART.toString();
        }
        if (+evt.target.value < 0) {
          evt.target.value = Math.abs(+evt.target.value).toString();
        }
        if (+evt.target.value >  MAX_GUITAR_AMOUNT_IN_CART) {
          evt.target.value =  MAX_GUITAR_AMOUNT_IN_CART.toString();
        }
        currentGuitar.amount = +evt.target.value;
        sessionStorage.setItem('cartGuitars', JSON.stringify(storageGuitars));
        dispatch(setCartGuitars(storageGuitars));
        setInputValue(+evt.target.value.toString().replace(/^0+/, ''));
      }
    }
  };

  const handleAmountInputBlur = () => {
    if (amountInputValue === '') {
      setInputValue(Number(amount));
    }
  };

  const handleMinusClick = () => {
    let storageGuitars: Guitar[];

    if (storageGuitarsString) {
      storageGuitars = JSON.parse(storageGuitarsString);
    } else {
      storageGuitars = [];
    }
    const currentGuitar = storageGuitars.find((item) => item.id === props.item.id);
    if (currentGuitar && currentGuitar.amount) {
      if (currentGuitar.amount === MIN_GUITAR_AMOUNT_IN_CART) {
        setIsOpenModalCartRemoveOpened(true);
        return;
      }
      currentGuitar.amount = currentGuitar.amount - AMOUNT_CHANGE_STEP;
      sessionStorage.setItem('cartGuitars', JSON.stringify(storageGuitars));
      dispatch(setCartGuitars(storageGuitars));
      setInputValue(currentGuitar.amount);
    }
  };

  const handlePlusClick = () => {
    let storageGuitars: Guitar[];

    if (storageGuitarsString) {
      storageGuitars = JSON.parse(storageGuitarsString);
    } else {
      storageGuitars = [];
    }
    const currentGuitar = storageGuitars.find((item) => item.id === props.item.id);
    if (currentGuitar && currentGuitar.amount) {
      if (currentGuitar.amount > MAX_GUITAR_AMOUNT_IN_CART) {
        currentGuitar.amount = MAX_GUITAR_AMOUNT_IN_CART;
      } else {
        currentGuitar.amount = currentGuitar.amount + AMOUNT_CHANGE_STEP;
      }
      sessionStorage.setItem('cartGuitars', JSON.stringify(storageGuitars));
      dispatch(setCartGuitars(storageGuitars));
      setInputValue(currentGuitar.amount);
    }
  };

  return (
    <>
      <div className="cart-item">
        <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={handleModalCartRemoveOpen}><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
        </button>
        <div className="cart-item__image">
          <img src={`../${previewImg}`} width="55" height="130" alt={name}></img>
        </div>
        <div className="product-info cart-item__info">
          <p className="product-info__title" data-testid="cart-item-title">{`${guitarTypeToReadable[type]} ${name}`}</p>
          <p className="product-info__info">{`Артикул: ${vendorCode}`}</p>
          <p className="product-info__info">{`${guitarTypeToReadable[type]}, ${stringCount} струнная`}</p>
        </div>
        <div className="cart-item__price">{`${formatPrice(price)} ₽`}</div>
        <div className="quantity cart-item__quantity">
          <button className="quantity__button" aria-label="Уменьшить количество" onClick={handleMinusClick}>
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-minus"></use>
            </svg>
          </button>
          <input
            className="quantity__input"
            type="number"
            value={amountInputValue}
            onBlur={handleAmountInputBlur}
            onChange={AmountInputChange}
            id="2-count"
            name="2-count"
            max="99"
          >
          </input>
          <button className="quantity__button" aria-label="Увеличить количество" onClick={handlePlusClick}>
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-plus"></use>
            </svg>
          </button>
        </div>
        <div className="cart-item__price-total">{`${getTotalPrice()} ₽`}</div>
      </div>
      {isModalCartRemoveOpened &&
      <ModalCartRemove
        product={props.item}
        onModalClose={handleModalCartRemoveClose}
      />}
    </>
  );
}

export default CartItem;
