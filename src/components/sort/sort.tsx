import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SortOrder, SortType } from '../../const';
import { getDataGuitars } from '../../store/api-actions';

function Sort(): JSX.Element {
  const dispatch = useDispatch();

  const [currentSortType, setCurrentSortType] = useState<SortType | undefined>(undefined);

  const handleSortByPriceBtnClick = () => {
    dispatch(getDataGuitars(SortType.Price));
    setCurrentSortType(SortType.Price);
  };

  const handleSortByRatingBtnClick = () => {
    dispatch(getDataGuitars(SortType.Rating));
    setCurrentSortType(SortType.Rating);
  };

  const handleSortOrderUpClick = () => {
    if (currentSortType === SortType.Rating) {
      dispatch(getDataGuitars(SortType.Rating, SortOrder.Ascending));
      return;
    }
    dispatch(getDataGuitars(SortType.Price, SortOrder.Ascending));
  };

  const handleSortOrderDownClick = () => {
    if (currentSortType === SortType.Rating) {
      dispatch(getDataGuitars(SortType.Rating, SortOrder.Descending));
      return;
    }
    dispatch(getDataGuitars(SortType.Rating, SortOrder.Descending));
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className="catalog-sort__type-button"
          aria-label="по цене"
          // tabIndex={-1}
          onClick={handleSortByPriceBtnClick}
        >
          по цене
        </button>
        <button
          className="catalog-sort__type-button"
          aria-label="по популярности"
          onClick={handleSortByRatingBtnClick}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className="catalog-sort__order-button catalog-sort__order-button--up"
          aria-label="По возрастанию"
          // tabIndex={-1}
          onClick={handleSortOrderUpClick}
        >
        </button>
        <button
          className="catalog-sort__order-button catalog-sort__order-button--down"
          aria-label="По убыванию"
          onClick={handleSortOrderDownClick}
        >
        </button>
      </div>
    </div>
  );
}

export default Sort;
