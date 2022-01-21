import clsx from 'clsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductTabType, RATING_STARS_MAX } from '../../const';
import { selectGuitars } from '../../store/data/data-selectors';
import { formatPrice, guitarTypeToReadable } from '../../utils';

import Footer from '../footer/footer';
import Header from '../header/header';
import ProductPageReview from '../product-page-review/product-page-review';

function ProductPage(): JSX.Element {
  const tempProduct = useSelector(selectGuitars)[1];
  const [currentTab, setCurrentTab] = useState(ProductTabType.Characteristics);

  const handleCharacteristicsBtnClick = () => {
    setCurrentTab(ProductTabType.Characteristics);
  };

  const handleDescriptionBtnClick = () => {
    setCurrentTab(ProductTabType.Description);
  };

  const product = tempProduct;

  const {
    name,
    previewImg,
    comments,
    vendorCode,
    type,
    stringCount,
    description,
    price,
    rating,
  } = product;

  const currentComments = comments?.slice(0, 3);

  const ratingStarsAmount = Math.round(rating);
  const ratingSolidStars = Array.from({length: ratingStarsAmount}, (_item, index) => index);
  const ratingEmptyStars = Array.from({length: RATING_STARS_MAX - ratingStarsAmount}, (_item, index) => index);

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Каталог</a>
            </li>
            <li className="breadcrumbs__item"><a className="link">{name}</a>
            </li>
          </ul>
          <div className="product-container">
            <img className="product-container__img" src={previewImg} width="90" height="235" alt={name}></img>
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
              <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                {ratingSolidStars.map((item) =>
                  (
                    <svg width="14" height="14" aria-hidden="true" key={item}>
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                  ))}
                {ratingEmptyStars.map((item) =>
                  (
                    <svg width="14" height="14" aria-hidden="true" key={item}>
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  ))}<span className="rate__count">{comments?.length}</span><span className="rate__message"></span>
              </div>
              <div className="tabs">
                <a className={clsx('button', 'button--medium', 'tabs__button', currentTab !== ProductTabType.Characteristics && 'button--black-border')} href="#characteristics" onClick={handleCharacteristicsBtnClick}>
                  Характеристики
                </a>
                <a className={clsx('button', 'button--medium', 'tabs__button', currentTab !== ProductTabType.Description && 'button--black-border')} href="#description" onClick={handleDescriptionBtnClick}>
                  Описание
                </a>
                <div className="tabs__content" id="characteristics">
                  <table className={clsx('tabs__table', currentTab !== ProductTabType.Characteristics && 'hidden')}>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">{vendorCode}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">{guitarTypeToReadable[type]}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">{stringCount} струнная</td>
                    </tr>
                  </table>
                  <p className={clsx('tabs__product-description', currentTab !== ProductTabType.Description && 'hidden')}>{description}</p>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{formatPrice(price)} ₽</p><a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
            </div>
          </div>
          <section className="reviews">
            <h3 className="reviews__title title title--bigger">Отзывы</h3><a className="button button--red-border button--big reviews__sumbit-button" href="#">Оставить отзыв</a>
            {currentComments?.map((item) => (
              <ProductPageReview review={item} key={item.id}/>
            ))}
            <button className="button button--medium reviews__more-button">Показать еще отзывы</button>
            <a className="button--up button--red-border button--big reviews__up-button" href="#header" style={{zIndex:1}}>Наверх</a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductPage;
