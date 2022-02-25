import clsx from 'clsx';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GUITAR_PRICE_REDUCER_INITIAL_VALUE, MAX_PERCENT_VALUE } from '../../const';
import { setCartGuitars, setDiscountPercent } from '../../store/actions';
import { postCoupon } from '../../store/api-actions';
import { selectCartGuitars, selectDiscountPercent } from '../../store/user/user-selectors';
import { Guitar } from '../../types/guitar';
import { formatPrice } from '../../utils';
import CartItem from '../cart-item/cart-item';
import BreadCrumbs from '../common/bread-crumbs/bread-crumbs';
import Footer from '../common/footer/footer';
import Header from '../common/header/header';

function Cart(): JSX.Element {
  const dispatch = useDispatch();
  const guitars = useSelector(selectCartGuitars);

  const [coupon, setCoupon] = useState('');
  const [isCouponAccepted, setIsCouponAccepted] = useState(false);
  const [isCouponRejected, setIsCouponRejected] = useState(false);

  const storageGuitarsString = sessionStorage.getItem('cartGuitars');
  const storageDiscountString = sessionStorage.getItem('discount');

  useEffect(() => {
    if (storageDiscountString) {
      dispatch(setDiscountPercent(storageDiscountString));
    } else {
      dispatch(setDiscountPercent(''));
    }
    if (storageGuitarsString) {
      dispatch(setCartGuitars(JSON.parse(storageGuitarsString)));
    } else {
      dispatch(setCartGuitars([]));
    }
  }, [dispatch, storageDiscountString, storageGuitarsString]);

  const dataDiscount = useSelector(selectDiscountPercent);

  const totalPrice = guitars.reduce((accumulator, currentValue) => accumulator + currentValue.price * ((currentValue.amount ? currentValue.amount : 1)), GUITAR_PRICE_REDUCER_INITIAL_VALUE);
  const discount = totalPrice * (+dataDiscount / MAX_PERCENT_VALUE);
  const priceToPay = totalPrice - discount;

  const handleFormSubmit = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    dispatch(postCoupon(coupon, () => {setIsCouponAccepted(true);}, () => {setIsCouponRejected(true);}));
  };

  const handleCouponInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const spaceRegEx = new RegExp(/\s/g);

    evt.target.value = evt.target.value.replace(spaceRegEx, '');
    setCoupon(evt.target.value);
  };

  return (
    <div className='wrapper'>
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <BreadCrumbs productName='Корзина' />
          <div className="cart">
            {guitars
              .map((item: Guitar) => (
                <CartItem item={item} key={item.id}/>
              ))}
            <div className="cart__footer">
              <div className="cart__coupon coupon">
                <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                <form className="coupon__form" id="coupon-form" method="post" action="/" onSubmit={handleFormSubmit}>
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" onChange={handleCouponInputChange}></input>
                    {isCouponAccepted && <p className="form-input__message form-input__message--success">Промокод принят</p>}
                    {isCouponRejected && <p className="form-input__message form-input__message--error">неверный промокод</p>}
                  </div>
                  <button className="button button--big coupon__button">Применить</button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{`${formatPrice(totalPrice)} ₽`}</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className={clsx('cart__total-value', discount && 'cart__total-value--bonus')}>{`${discount ? '-' : ''}${formatPrice(discount)} ₽`}</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{`${formatPrice(priceToPay)} ₽`}</span></p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Cart;
