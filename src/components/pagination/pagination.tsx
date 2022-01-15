import clsx from 'clsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  GUITARS_PER_PAGE_AMOUNT,
  PAGINATION_CORRECTION_VALUE,
  PAGINATION_PAGES_PER_PAGE_AMOUNT,
  SLICE_END_FOR_PAGINATION_EFECT,
  SLICE_START_FOR_PAGINATION_EFECT
} from '../../const';
import { setCurrentPageNumber, setPaginationFilter } from '../../store/actions';
import { getDataForPagination } from '../../store/api-actions';
import { selectPaginationGuitars } from '../../store/data/data-selectors';
import { selectCurrentPageNumber } from '../../store/user/user-selectors';


function Pagination(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();

  const guitars = useSelector(selectPaginationGuitars);
  const currentPageNumber = useSelector(selectCurrentPageNumber);

  const paginationListItemsAmount = Math.floor(guitars.length / GUITARS_PER_PAGE_AMOUNT);
  const paginationListItems = Array.from({length: paginationListItemsAmount}, (_item, index) => index + PAGINATION_CORRECTION_VALUE);

  const sliceStart = PAGINATION_PAGES_PER_PAGE_AMOUNT * Math.floor((currentPageNumber - PAGINATION_CORRECTION_VALUE) / PAGINATION_PAGES_PER_PAGE_AMOUNT);
  const sliceEnd = sliceStart + PAGINATION_PAGES_PER_PAGE_AMOUNT;

  // const pageNumberForPaginationEffect = +location.pathname.slice(SLICE_START_FOR_PAGINATION_EFECT, SLICE_END_FOR_PAGINATION_EFECT);

  useEffect(() => {
    if (/page_/.test(location.pathname)) {
      handlePageNumberChange(+location.pathname.slice(SLICE_START_FOR_PAGINATION_EFECT, SLICE_END_FOR_PAGINATION_EFECT));
    }
    dispatch(getDataForPagination());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handlePageNumberChange = ( pageNumber: number) => {
    dispatch(setCurrentPageNumber(pageNumber));
    dispatch(setPaginationFilter(`&_start=${(pageNumber - PAGINATION_CORRECTION_VALUE) * GUITARS_PER_PAGE_AMOUNT}&_limit=${GUITARS_PER_PAGE_AMOUNT}`));
  };

  const handlePaginationBackClick = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    dispatch(setCurrentPageNumber(sliceEnd - PAGINATION_PAGES_PER_PAGE_AMOUNT));
    dispatch(setPaginationFilter(`&_start=${(sliceEnd - PAGINATION_PAGES_PER_PAGE_AMOUNT - PAGINATION_CORRECTION_VALUE) * GUITARS_PER_PAGE_AMOUNT}&_limit=${GUITARS_PER_PAGE_AMOUNT}`));
  };

  const handlePaginationNextClick = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    dispatch(setCurrentPageNumber(sliceStart + PAGINATION_PAGES_PER_PAGE_AMOUNT + PAGINATION_CORRECTION_VALUE));
    dispatch(setPaginationFilter(`&_start=${(sliceStart + PAGINATION_PAGES_PER_PAGE_AMOUNT + PAGINATION_CORRECTION_VALUE - PAGINATION_CORRECTION_VALUE) * GUITARS_PER_PAGE_AMOUNT}&_limit=${GUITARS_PER_PAGE_AMOUNT}`));
  };

  return (
    <div
      className="pagination page-content__pagination"
      data-testid="pagination"
    >
      <ul className="pagination__list">
        {sliceStart !== 0 && (
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
        {currentPageNumber !== paginationListItemsAmount && (
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

export default Pagination;
