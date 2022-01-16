import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  GuitarType,
  Price,
  StringCount } from '../../const';
import { setFilter, setMaxPrice, setMinPrice } from '../../store/actions';
import { selectPaginationGuitars } from '../../store/data/data-selectors';

const PRICE_CORRECTION_VALUE = 15;

function Filter(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();

  const guitars = useSelector(selectPaginationGuitars);

  const guitarsByPrice = guitars.slice().sort((a, b) => a.price - b.price);

  const getCheapestGuitarPrice = () => {
    if(guitars.length) {
      return guitarsByPrice[0].price.toString();
    }
    return '0';
  };

  const getMostExpensiveGuitarPrice = () => {
    if(guitars.length) {
      return guitarsByPrice[guitarsByPrice.length -1].price.toString();
    }
    return '0';
  };

  const cheapestGuitarPrice = getCheapestGuitarPrice();
  const mostExpensiveGuitarPrice = getMostExpensiveGuitarPrice();

  const [filters] = useState<string[]>([]);

  useEffect(() => {
    if (new RegExp(`${Price.From}`).test(location.pathname)) {
      dispatch(setMinPrice(`${location.pathname.slice(location.pathname.indexOf(`${Price.From}`), location.pathname.indexOf(`${Price.From}`) + PRICE_CORRECTION_VALUE)}`));
    }
    if (new RegExp(`${Price.To}`).test(location.pathname)) {
      dispatch(setMaxPrice(`${location.pathname.slice(location.pathname.indexOf(`${Price.To}`))}`));
    }
    if (new RegExp(`${GuitarType.Acoustic}`).test(location.pathname) && !filters.includes(GuitarType.Acoustic)) {
      filters.push(GuitarType.Acoustic);
    }
    if (new RegExp(`${GuitarType.Electric}`).test(location.pathname) && !filters.includes(GuitarType.Electric)) {
      filters.push(GuitarType.Electric);
    }
    if (new RegExp(`${GuitarType.Ukulele}`).test(location.pathname) && !filters.includes(GuitarType.Ukulele)) {
      filters.push(GuitarType.Ukulele);
    }
    if (new RegExp(`${StringCount.Four}`).test(location.pathname) && !filters.includes(StringCount.Four)) {
      filters.push(StringCount.Four);
    }
    if (new RegExp(`${StringCount.Six}`).test(location.pathname) && !filters.includes(StringCount.Six)) {
      filters.push(StringCount.Six);
    }
    if (new RegExp(`${StringCount.Seven}`).test(location.pathname) && !filters.includes(StringCount.Seven)) {
      filters.push(StringCount.Seven);
    }
    if (new RegExp(`${StringCount.Twelve}`).test(location.pathname) && !filters.includes(StringCount.Twelve)) {
      filters.push(StringCount.Twelve);
    }
    dispatch(setFilter(filters.join('')));
  }, [dispatch, filters, location.pathname]);

  const handleMinPriceChange = (evt: ChangeEvent<HTMLInputElement> ) => {
    const modifiedValue = (+evt.target.value < +cheapestGuitarPrice) ? cheapestGuitarPrice : evt.target.value;
    evt.target.value = modifiedValue;
    dispatch(setMinPrice(`${Price.From}${modifiedValue}`));
  };

  const handleMaxPriceChange = (evt: ChangeEvent<HTMLInputElement> ) => {
    const modifiedValue = (+evt.target.value > +mostExpensiveGuitarPrice) ? mostExpensiveGuitarPrice : evt.target.value;
    evt.target.value = modifiedValue;
    dispatch(setMaxPrice((`${Price.To}${modifiedValue}`)));
  };

  const handleFilterChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if(filters.includes(evt.target.value)) {
      filters.splice(filters.indexOf(evt.target.value), 1);
    } else {
      filters.push(evt.target.value);
    }
    dispatch(setFilter(filters.join('')));
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type="number"
              placeholder={cheapestGuitarPrice}
              id="priceMin"
              name="от"
              min='0'
              onBlur={handleMinPriceChange}
            >
            </input>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder={mostExpensiveGuitarPrice}
              id="priceMax"
              name="до"
              min='0'
              onBlur={handleMaxPriceChange}
            >
            </input>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox" id="acoustic"
            name="acoustic"
            value={GuitarType.Acoustic}
            onChange={handleFilterChange}
            checked={filters.includes(GuitarType.Acoustic)}
          >
          </input>
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            value={GuitarType.Electric}
            onChange={handleFilterChange}
            checked={filters.includes(GuitarType.Electric)}
          >
          </input>
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            value={GuitarType.Ukulele}
            onChange={handleFilterChange}
            checked={filters.includes(GuitarType.Ukulele)}
          >
          </input>
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="4-strings"
            value={StringCount.Four}
            onChange={handleFilterChange}
            checked={filters.includes(StringCount.Four)}
            disabled={filters.includes(GuitarType.Acoustic) && !filters.includes(GuitarType.Ukulele) && !filters.includes(GuitarType.Electric)}
          >
          </input>
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            value={StringCount.Six}
            onChange={handleFilterChange}
            checked={filters.includes(StringCount.Six)}
            disabled={filters.includes(GuitarType.Ukulele) && !filters.includes(GuitarType.Acoustic)&& !filters.includes(GuitarType.Electric)}
          >
          </input>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            value={StringCount.Seven}
            onChange={handleFilterChange}
            checked={filters.includes(StringCount.Seven)}
            disabled={filters.includes(GuitarType.Ukulele) && !filters.includes(GuitarType.Electric) && !filters.includes(GuitarType.Acoustic)}
          >
          </input>
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            value={StringCount.Twelve}
            onChange={handleFilterChange}
            checked={filters.includes(StringCount.Twelve)}
            disabled={(filters.includes(GuitarType.Ukulele) || filters.includes(GuitarType.Electric)) && !filters.includes(GuitarType.Acoustic)}
          >
          </input>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default Filter;
