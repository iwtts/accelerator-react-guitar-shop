import { useEffect, useState } from 'react';
import { AppRoute, ESC_KEY_CODE, RatingPanelType } from '../../const';
import { Guitar } from '../../types/guitar';
import { formatPrice } from '../../utils';
import RatingPanel from '../common/rating-panel/rating-panel';
import ModalCartAddSuccess from '../modal/modal-cart-add-success/modal-cart-add-success';
import ModalCartAdd from '../modal/modal-cart-add/modal-cart-add';

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

  const storageGuitarsString = sessionStorage.getItem('cartGuitars');

  const [isInCart, setIsInCart] = useState(false);
  const [isModalCartAddOpened, setIsOpenModalCartAddOpened] = useState(false);
  const [isModalCartAddSuccessOpened, setIsModalCartAddSuccessOpened] = useState(false);

  useEffect(() => {
    let storageGuitars: Guitar[];

    if (storageGuitarsString) {
      storageGuitars = JSON.parse(storageGuitarsString);
    } else {
      storageGuitars = [];
    }

    const currentGuitar = storageGuitars.find((item: Guitar) => item.id === props.guitar.id);

    if (currentGuitar) {
      setIsInCart(true);
    }
  }, [props.guitar.id, storageGuitarsString]);

  const handleModalCartAddClose = () => {
    setIsOpenModalCartAddOpened(false);
    document.body.style.overflow = 'scroll';
    document.removeEventListener('keydown', onEscKeydown);
  };

  const handleModalCartAddSuccessClose = () => {
    setIsModalCartAddSuccessOpened(false);
    document.body.style.overflow = 'scroll';
    document.removeEventListener('keydown', onEscKeydown);
  };

  const handleModalCartAddOpen = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    setIsOpenModalCartAddOpened(true);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onEscKeydown);
  };

  const handleModalCartAddSuccessOpen = () => {
    setIsModalCartAddSuccessOpened(true);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onEscKeydown);
  };

  const onEscKeydown = (evt: { keyCode: number; }) => {
    if (evt.keyCode === ESC_KEY_CODE) {
      handleModalCartAddClose();
      handleModalCartAddSuccessClose();
    }
  };

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
        {!isInCart && <a className="button button--red button--mini button--add-to-cart" href="/" onClick={handleModalCartAddOpen}>Купить</a>}
        {isInCart && <a className="button button--red-border button--mini button--in-cart" href={AppRoute.Cart}>В Корзине</a>}
      </div>
      {isModalCartAddOpened &&
      <ModalCartAdd
        product={props.guitar}
        onModalOpen={handleModalCartAddSuccessOpen}
        onModalClose={handleModalCartAddClose}
      />}
      {isModalCartAddSuccessOpened &&
      <ModalCartAddSuccess
        onModalClose={handleModalCartAddSuccessClose}
      />}
    </div>
  );
}

export default Card;
