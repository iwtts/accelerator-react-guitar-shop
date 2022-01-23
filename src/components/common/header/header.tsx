import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { getDataForSearch } from '../../../store/api-actions';
import { selectHeaderGuitars } from '../../../store/user/user-selectors';

function Header(): JSX.Element {
  const dispatch = useDispatch();
  const data = useSelector(selectHeaderGuitars);

  const handleSearchInputChange = (evt: { target: { value: string; }; }) => {
    dispatch(getDataForSearch(evt.target.value));
  };

  return(
    <header className="header" id="header">
      <div className="container header__wrapper">
        <a className="header__logo logo" href='/'>
          <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип"></img>
        </a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <a className="link main-nav__link link--current" href="/">Каталог</a>
            </li>
            <li>
              <a className="link main-nav__link" href="/">Где купить?</a>
            </li>
            <li>
              <a className="link main-nav__link" href="/">О компании</a>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <form className="form-search__form">
            <button className="form-search__submit" type="submit">
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg><span className="visually-hidden">Начать поиск</span>
            </button>
            <input
              className="form-search__input"
              id="search"
              type="text"
              autoComplete="off"
              placeholder="что вы ищите?"
              onChange={handleSearchInputChange}
            >
            </input>
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          {
            data.length > 0 &&
            <ul
              className="form-search__select-list"
              style={{zIndex:10}}
            >
              {data.map((item) => (
                <li
                  className="form-search__select-item"
                  tabIndex={0}
                  key={item.id}
                >
                  <Link
                    to={`${AppRoute.Guitar}/${item.id}`}
                    className="form-search__select-item"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          }
        </div>
        <a className="header__cart-link" href="/" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg><span className="visually-hidden">Перейти в корзину</span><span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
