import { Guitar } from '../../../types/guitar';
import { formatPrice, guitarTypeToReadable } from '../../../utils';
import FocusTrap from 'focus-trap-react';
import { useDispatch } from 'react-redux';
import { setCartGuitars } from '../../../store/actions';

type ModalCartRemoveProps = {
  product: Guitar,
  onModalClose: () => void,
}

function ModalCartRemove(props: ModalCartRemoveProps): JSX.Element {
  const {
    previewImg,
    name,
    vendorCode,
    type,
    stringCount,
    price,
  } = props.product;

  const dispatch = useDispatch();

  const removeFromCart = (product: Guitar) => {
    const storageGuitarsString = sessionStorage.getItem('cartGuitars');
    let storageGuitars: Guitar[];

    if (storageGuitarsString) {
      storageGuitars = JSON.parse(storageGuitarsString);
    } else {
      storageGuitars = [];
    }

    const filteredArray = storageGuitars.filter((value) => value.id !== product.id);

    sessionStorage.setItem('cartGuitars', JSON.stringify(filteredArray));

    dispatch(setCartGuitars(filteredArray));
  };

  const handleRemoveFromCart = () => {
    removeFromCart(props.product);
    props.onModalClose();
  };

  return (
    <div
      style={{
        position: 'absolute',
        width: '550px',
        height: '440px',
        marginBottom: '50px',
      }}
    >
      <div className="modal is-active modal-for-ui-kit">
        <FocusTrap>
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal onClick={props.onModalClose}></div>
            <div className="modal__content">
              <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
              <div className="modal__info"><img className="modal__img" src={`../${previewImg}`} width="67" height="137" alt={name}></img>
                <div className="modal__info-wrapper">
                  <h3 className="modal__product-name title title--little title--uppercase">Гитара Честер {name}</h3>
                  <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
                  <p className="modal__product-params">{guitarTypeToReadable[type]}, {stringCount} струнная</p>
                  <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{formatPrice(price)} ₽</span></p>
                </div>
              </div>
              <div className="modal__button-container">
                <button className="button button--small modal__button" onClick={handleRemoveFromCart}>Удалить товар</button>
                <button className="button button--black-border button--small modal__button modal__button--right" onClick={props.onModalClose}>Продолжить покупки</button>
              </div>
              <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={props.onModalClose}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </div>
        </FocusTrap>
      </div>
    </div>
  );
}

export default ModalCartRemove;
