import clsx from 'clsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  GUITARS_PER_PAGE_AMOUNT,
  INITIAL_PAGE_NUMBER,
  PAGINATION_CORRECTION_VALUE,
  PAGINATION_PAGES_PER_PAGE_AMOUNT,
  SLICE_END_FOR_PAGINATION_EFECT,
  SLICE_START_FOR_PAGINATION_EFECT
} from '../../const';
import { setCurrentPageNumber, setPaginationFilter } from '../../store/actions';
import { getDataForPagination } from '../../store/api-actions';
import { selectPaginationGuitars } from '../../store/data/data-selectors';
import { selectCurrentPageNumber, selectFilter, selectMaxPrice, selectMinPrice, selectSortOrder, selectSortType } from '../../store/user/user-selectors';

function CatalogPagination(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();

  const guitars = useSelector(selectPaginationGuitars);
  const currentPageNumber = useSelector(selectCurrentPageNumber);
  const currentSortType = useSelector(selectSortType);
  const currentSortOder = useSelector(selectSortOrder);
  const currentMinPrice = useSelector(selectMinPrice);
  const currentMaxPrice = useSelector(selectMaxPrice);
  const currentFilter = useSelector(selectFilter);

  const rawPaginationListItemsAmount = Math.floor(guitars.length / GUITARS_PER_PAGE_AMOUNT);

  const getPaginationItemsAmount = () => {
    if (rawPaginationListItemsAmount === 0) {
      return PAGINATION_CORRECTION_VALUE;
    }
    return rawPaginationListItemsAmount;
  };

  const paginationListItemsAmount = getPaginationItemsAmount();

  const paginationListItems = Array.from({length: paginationListItemsAmount}, (_item, index) => index + PAGINATION_CORRECTION_VALUE);

  const sliceStart = PAGINATION_PAGES_PER_PAGE_AMOUNT * Math.floor((currentPageNumber - PAGINATION_CORRECTION_VALUE) / PAGINATION_PAGES_PER_PAGE_AMOUNT);
  const sliceEnd = sliceStart + PAGINATION_PAGES_PER_PAGE_AMOUNT;

  useEffect(() => {
    if (/page_/.test(location.pathname)) {
      dispatch(setCurrentPageNumber(+location.pathname.slice(SLICE_START_FOR_PAGINATION_EFECT, SLICE_END_FOR_PAGINATION_EFECT)));
      dispatch(setPaginationFilter(`&_start=${(+location.pathname.slice(SLICE_START_FOR_PAGINATION_EFECT, SLICE_END_FOR_PAGINATION_EFECT) - PAGINATION_CORRECTION_VALUE) * GUITARS_PER_PAGE_AMOUNT}&_limit=${GUITARS_PER_PAGE_AMOUNT}`));
    }
    dispatch(getDataForPagination(currentSortType, currentSortOder, currentMinPrice, currentMaxPrice, currentFilter));
  }, [currentFilter, currentMaxPrice, currentMinPrice, currentSortOder, currentSortType, dispatch, location.pathname]);

  const handlePageNumberChange = ( pageNumber: number) => {
    dispatch(setCurrentPageNumber(pageNumber));
    dispatch(setPaginationFilter(`&_start=${(pageNumber - PAGINATION_CORRECTION_VALUE) * GUITARS_PER_PAGE_AMOUNT}&_limit=${GUITARS_PER_PAGE_AMOUNT}`));
  };

  const handlePaginationBackClick = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    const newPageNumber = currentPageNumber - PAGINATION_CORRECTION_VALUE;
    dispatch(setCurrentPageNumber(newPageNumber));
    dispatch(setPaginationFilter(`&_start=${(newPageNumber - PAGINATION_CORRECTION_VALUE) * GUITARS_PER_PAGE_AMOUNT}&_limit=${GUITARS_PER_PAGE_AMOUNT}`));
  };

  const handlePaginationNextClick = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    const newPageNumber = currentPageNumber + PAGINATION_CORRECTION_VALUE;
    dispatch(setCurrentPageNumber(newPageNumber));
    dispatch(setPaginationFilter(`&_start=${(newPageNumber - PAGINATION_CORRECTION_VALUE) * GUITARS_PER_PAGE_AMOUNT}&_limit=${GUITARS_PER_PAGE_AMOUNT}`));
  };

  return (
    <div
      className="pagination page-content__pagination"
      data-testid="pagination"
    >
      <ul className="pagination__list">
        {currentPageNumber !== INITIAL_PAGE_NUMBER && (
          <li className="pagination__page pagination__page--next" id="next">
            <a
              className="link pagination__page-link"
              href={'/'}
              onClick={handlePaginationBackClick}
            >
                Назад
            </a>
          </li>
        )}
        {paginationListItems
          .slice(sliceStart, sliceEnd)
          .map((item) => {
            const handlePaginationItemClick = (evt: { preventDefault: () => void; }) => {
              evt.preventDefault();
              handlePageNumberChange(item);
            };
            return (
              <li
                className={clsx('pagination__page', currentPageNumber === item && 'pagination__page--active')}
                key={`page-number-${item}`}
              >
                <a
                  className="link pagination__page-link"
                  href={'/'}
                  onClick={handlePaginationItemClick}
                >
                  {item}
                </a>
              </li>);
          })}
        {currentPageNumber !== paginationListItems[paginationListItems.length - PAGINATION_CORRECTION_VALUE] && (
          <li className="pagination__page pagination__page--next" id="next">
            <a
              className="link pagination__page-link"
              href={'/'}
              onClick={handlePaginationNextClick}
            >
                Далее
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default CatalogPagination;
