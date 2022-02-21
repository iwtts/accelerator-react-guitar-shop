import { Guitar } from '../../types/guitar';
import { formatPrice } from '../../utils';
import CartItem from '../cart-item/cart-item';
import BreadCrumbs from '../common/bread-crumbs/bread-crumbs';
import Footer from '../common/footer/footer';
import Header from '../common/header/header';

const GUITAR_PRICE_REDUCER_INITIAL_VALUE = 0;

function Cart(): JSX.Element {
  let guitars = [];

  const storageGuitarsString = sessionStorage.getItem('cartGuitars');
  if (storageGuitarsString) {
    guitars = JSON.parse(storageGuitarsString);
  } else {
    guitars = [];
  }

  const totalPrice = guitars.reduce((accumulator: number, currentValue: { price: number, amount: number; }) => accumulator + currentValue.price * currentValue.amount, GUITAR_PRICE_REDUCER_INITIAL_VALUE);
  const discount = 3000; //temp
  const priceToPay = totalPrice - discount;

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
                <form className="coupon__form" id="coupon-form" method="post" action="/">
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input type="text" placeholder="Введите промокод" id="coupon" name="coupon"></input>
                    <p className="form-input__message form-input__message--success">Промокод принят</p>
                  </div>
                  <button className="button button--big coupon__button">Применить</button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{`${formatPrice(totalPrice)} ₽`}</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className="cart__total-value cart__total-value--bonus">{`- ${formatPrice(discount)} ₽`}</span></p>
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
