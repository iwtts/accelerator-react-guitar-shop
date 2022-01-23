import clsx from 'clsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ProductTabType, RatingPanelType } from '../../const';
import { selectGuitars } from '../../store/data/data-selectors';
import { formatPrice, guitarTypeToReadable } from '../../utils';

import Footer from '../common/footer/footer';
import Header from '../common/header/header';
import ProductReview from '../product-review/product-review';
import RatingPanel from '../common/rating-panel/rating-panel';
import NotFound from '../common/not-found/not-found';
import BreadCrumbs from '../common/bread-crumbs/bread-crumbs';

function Product(): JSX.Element {
  const guitars = useSelector(selectGuitars);
  const [currentTab, setCurrentTab] = useState(ProductTabType.Characteristics);
  const {id: productId} = useParams() as {id: string};

  const product = guitars.find((item) => item.id.toString() === productId);

  if (!product) {
    return <NotFound />;
  }

  const handleCharacteristicsBtnClick = () => {
    setCurrentTab(ProductTabType.Characteristics);
  };

  const handleDescriptionBtnClick = () => {
    setCurrentTab(ProductTabType.Description);
  };

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

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{name}</h1>
          <BreadCrumbs productName={name}/>
          <div className="product-container">
            <img className="product-container__img" src={`../${previewImg}`} width="90" height="235" alt={name}></img>
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
              <RatingPanel
                type={RatingPanelType.ProductPage}
                rating={rating}
                rateCount={comments?.length}
              />
              <div className="tabs">
                <a className={clsx('button', 'button--medium', 'tabs__button', currentTab !== ProductTabType.Characteristics && 'button--black-border')} href="#characteristics" onClick={handleCharacteristicsBtnClick}>
                  Характеристики
                </a>
                <a className={clsx('button', 'button--medium', 'tabs__button', currentTab !== ProductTabType.Description && 'button--black-border')} href="#description" onClick={handleDescriptionBtnClick}>
                  Описание
                </a>
                <div className="tabs__content" id="characteristics">
                  <table className={clsx('tabs__table', currentTab !== ProductTabType.Characteristics && 'hidden')}>
                    <tbody>
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
                    </tbody>
                  </table>
                  <p className={clsx('tabs__product-description', currentTab !== ProductTabType.Description && 'hidden')} id="description">{description}</p>
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
              <ProductReview review={item} key={item.id}/>
            ))}
            <button className="button button--medium reviews__more-button">Показать еще отзывы</button><a className="button button--up button--red-border button--big reviews__up-button" href="#header" style={{zIndex:1}}>Наверх</a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Product;
