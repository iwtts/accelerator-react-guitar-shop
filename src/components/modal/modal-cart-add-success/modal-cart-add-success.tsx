import FocusTrap from 'focus-trap-react';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../../const';

type ModalCartAddSuccessProps = {
  onModalClose: () => void,
}

function ModalCartAddSuccess(props: ModalCartAddSuccessProps): JSX.Element {
  const history = useHistory();

  const handleGoToCartBtnClick = () => {
    props.onModalClose();
    history.push(AppRoute.Cart);
  };

  const handleContinueShoppingBtnClick = () => {
    history.push(AppRoute.Catalog);
    props.onModalClose();
  };

  return(
    <div
      style={{
        position: 'absolute',
        width: '550px',
        height: '440px',
        marginBottom: '50px',
      }}
    >
      <div className="modal is-active modal--success modal-for-ui-kit">
        <FocusTrap>
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal></div>
            <div className="modal__content">
              <svg className="modal__icon" width="26" height="20" aria-hidden="true">
                <use xlinkHref="#icon-success"></use>
              </svg>
              <p className="modal__message">Товар успешно добавлен в корзину</p>
              <div className="modal__button-container modal__button-container--add">
                <button className="button button--small modal__button" onClick={handleGoToCartBtnClick}>Перейти в корзину</button>
                <button className="button button--black-border button--small modal__button modal__button--right" onClick={handleContinueShoppingBtnClick}>Продолжить покупки</button>
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

export default ModalCartAddSuccess;
