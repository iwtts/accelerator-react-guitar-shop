import { useDispatch, useSelector } from 'react-redux';
import { selectDataLoadingStatus, selectGuitars } from '../../store/data/data-selectors';
import Header from '../common/header/header';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import CardsList from '../cards-list/cards-list';
import CatalogPagination from '../catalog-pagination/catalog-pagination';
import Footer from '../common/footer/footer';
import { getDataGuitars } from '../../store/api-actions';
import { useEffect } from 'react';
import {
  selectCurrentPageNumber,
  selectFilter,
  selectMaxPrice,
  selectMinPrice,
  selectPaginationFilter,
  selectSortOrder,
  selectSortType
} from '../../store/user/user-selectors';
import { useHistory } from 'react-router-dom';
import { GUITARS_PER_PAGE_AMOUNT } from '../../const';
import CardsListEmpty from '../cards-list-empty/cards-list-empty';

function Catalog(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentSortType = useSelector(selectSortType);
  const currentSortOder = useSelector(selectSortOrder);
  const currentMinPrice = useSelector(selectMinPrice);
  const currentMaxPrice = useSelector(selectMaxPrice);
  const currentFilter = useSelector(selectFilter);
  const currentPageNumber = useSelector(selectCurrentPageNumber);
  const currentPaginationFilter = useSelector(selectPaginationFilter);

  const urlPageNumber = `page_${currentPageNumber}`;
  const urlString = urlPageNumber + currentSortType + currentSortOder + currentFilter + currentMinPrice + currentMaxPrice;
  const guitarsRequestString = currentPaginationFilter + currentSortType + currentSortOder  + currentFilter + currentMinPrice + currentMaxPrice;

  useEffect(() => {
    if (guitarsRequestString) {
      history.push(urlString);
    }
    dispatch(getDataGuitars(guitarsRequestString));
  }, [dispatch, guitarsRequestString, history, urlString]);

  const guitars = useSelector(selectGuitars);
  const isDataLoaded = useSelector(selectDataLoadingStatus);

  const getInitialGuitars = () => {
    if (!currentPaginationFilter) {
      return guitars.slice(0, GUITARS_PER_PAGE_AMOUNT);
    }
    return guitars;
  };

  return (
    <div className='wrapper'>
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" href="/">Каталог</a>
            </li>
          </ul>
          {isDataLoaded &&
          <div className="catalog">
            <CatalogFilter />
            <CatalogSort sortType={currentSortType} />
            {guitars.length ?  <CardsList guitars={getInitialGuitars()} /> : <CardsListEmpty />}
            <CatalogPagination />
          </div>}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Catalog;
