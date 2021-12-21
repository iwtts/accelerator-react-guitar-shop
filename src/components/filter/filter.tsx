import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  GuitarType,
  Price,
  SortOrder,
  SortType,
  StringCount } from '../../const';
import { getDataGuitars } from '../../store/api-actions';
import { Guitar } from '../../types/guitar';

type FilterProps = {
  guitars: Guitar[],
}

function Filter(props: FilterProps): JSX.Element {
  const dispatch = useDispatch();
  const guitarsByPrice = props.guitars.slice().sort((a, b) => a.price - b.price);

  const cheapestGuitarPrice = guitarsByPrice[0].price.toString();
  const mostExpensiveGuitarPrice = guitarsByPrice[guitarsByPrice.length -1].price.toString();

  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [guitarType, setGuitarType] = useState<string>('');
  const [stringCount, setStringCount] = useState<string>('');

  const handleMinPriceChange = (evt: ChangeEvent<HTMLInputElement> ) => {
    const modifiedValue = (+evt.target.value < +cheapestGuitarPrice) ? cheapestGuitarPrice : evt.target.value;
    evt.target.value = modifiedValue;
    setMinPrice(`${Price.From}${modifiedValue}`);
  };

  const handleMaxPriceChange = (evt: ChangeEvent<HTMLInputElement> ) => {
    const modifiedValue = (+evt.target.value > +mostExpensiveGuitarPrice) ? mostExpensiveGuitarPrice : evt.target.value;
    evt.target.value = modifiedValue;
    setMaxPrice(`${Price.To}${evt.target.value}`);
  };

  const handleGuitarTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setGuitarType(evt.target.value);
  };

  const handleStringCountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setStringCount(evt.target.value);
  };

  useEffect(() => {
    dispatch(getDataGuitars(SortType.Default, SortOrder.Default, minPrice, maxPrice, guitarType, stringCount));
  }, [
    minPrice,
    maxPrice,
    guitarType,
    stringCount,
    dispatch,
  ]);

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
            onChange={handleGuitarTypeChange}
            checked={guitarType === GuitarType.Acoustic}
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
            onChange={handleGuitarTypeChange}
            checked={guitarType === GuitarType.Electric}
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
            onChange={handleGuitarTypeChange}
            checked={guitarType === GuitarType.Ukulele}
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
            onChange={handleStringCountChange}
            checked={stringCount === StringCount.Four}
            disabled={guitarType === GuitarType.Acoustic}
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
            onChange={handleStringCountChange}
            checked={stringCount === StringCount.Six}
            disabled={guitarType === GuitarType.Ukulele}
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
            onChange={handleStringCountChange}
            checked={stringCount === StringCount.Seven}
            disabled={guitarType === GuitarType.Ukulele}
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
            onChange={handleStringCountChange}
            checked={stringCount === StringCount.Twelve}
            disabled={guitarType !== GuitarType.Acoustic}
          >
          </input>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default Filter;
