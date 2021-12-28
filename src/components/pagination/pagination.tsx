import clsx from 'clsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  GUITARS_PER_PAGE_AMOUNT,
  PAGINATION_CORRECTION_VALUE,
  PAGINATION_PAGES_PER_PAGE_AMOUNT
} from '../../const';
import { setPaginationFilter } from '../../store/actions';
import { getDataForPagination } from '../../store/api-actions';
import { selectPaginationGuitars } from '../../store/data/data-selectors';

function Pagination(): JSX.Element {
  const dispatch = useDispatch();

  const location = useLocation();
  const guitars = useSelector(selectPaginationGuitars);

  const pathNameSymbols = Array.from(location.pathname);
  const currentPageNumber = pathNameSymbols[pathNameSymbols.length - PAGINATION_CORRECTION_VALUE];

  const paginationListItemsAmount = Math.floor(guitars.length / GUITARS_PER_PAGE_AMOUNT);
  const paginationListItems = Array.from({length: paginationListItemsAmount}, (_item, index) => index + PAGINATION_CORRECTION_VALUE);

  const sliceStart = PAGINATION_PAGES_PER_PAGE_AMOUNT * Math.floor((+currentPageNumber - PAGINATION_CORRECTION_VALUE) / PAGINATION_PAGES_PER_PAGE_AMOUNT);
  const sliceEnd = sliceStart + PAGINATION_PAGES_PER_PAGE_AMOUNT;

  useEffect(() => {
    dispatch(getDataForPagination());
    dispatch(setPaginationFilter(`&_start=${(+currentPageNumber - PAGINATION_CORRECTION_VALUE) * GUITARS_PER_PAGE_AMOUNT}&_limit=6`));
  }, [currentPageNumber, dispatch]);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {sliceStart !== 0 && (
          <li className="pagination__page pagination__page--next" id="next">
            <a className="link pagination__page-link"  href={`/${sliceEnd - PAGINATION_PAGES_PER_PAGE_AMOUNT}`}>Назад</a>
          </li>
        )}
        {paginationListItems
          .slice(sliceStart, sliceEnd)
          .map((item) =>
            (
              <li
                className={clsx('pagination__page', location.pathname === `/${item}` && 'pagination__page--active')}
                key={`page-number-${item}`}
              >
                <a
                  className="link pagination__page-link"
                  href={`/${item}`}
                >{item}
                </a>
              </li>
            ))}
        {location.pathname <= `/${paginationListItems.length - PAGINATION_CORRECTION_VALUE}` && (
          <li className="pagination__page pagination__page--next" id="next">
            <a className="link pagination__page-link" href={`/${sliceStart + PAGINATION_PAGES_PER_PAGE_AMOUNT + PAGINATION_CORRECTION_VALUE}`}>Далее</a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
