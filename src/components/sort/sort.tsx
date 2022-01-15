import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SortOrder, SortType } from '../../const';
import { setSortOrder, setSortType } from '../../store/actions';

type SortProps = {
  sortType: SortType,
};

function Sort(props: SortProps): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentSortType = props.sortType;

  useEffect(() => {
    if (new RegExp(`${SortType.Price}`).test(location.pathname)) {
      dispatch(setSortType(SortType.Price));
    }
    if (new RegExp(`${SortType.Rating}`).test(location.pathname)) {
      dispatch(setSortType(SortType.Rating));
    }
    if (new RegExp(`${SortOrder.Ascending}`).test(location.pathname)) {
      dispatch(setSortOrder(SortOrder.Ascending));
    }
    if (new RegExp(`${SortOrder.Descending}`).test(location.pathname)) {
      dispatch(setSortOrder(SortOrder.Descending));
    }
  }, [dispatch, location.pathname]);

  const handleSortByPriceBtnClick = () => {
    dispatch(setSortType(SortType.Price));
  };

  const handleSortByRatingBtnClick = () => {
    dispatch(setSortType(SortType.Rating));
  };

  const handleSortOrderUpClick = () => {
    if (currentSortType === SortType.Default) {
      dispatch(setSortType(SortType.Price));
    }
    dispatch(setSortOrder(SortOrder.Ascending));
  };

  const handleSortOrderDownClick = () => {
    if (currentSortType === SortType.Default) {
      dispatch(setSortType(SortType.Price));
    }
    dispatch(setSortOrder(SortOrder.Descending));
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className="catalog-sort__type-button"
          aria-label="по цене"
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
