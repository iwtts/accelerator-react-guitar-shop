import { useDispatch, useSelector } from 'react-redux';
import { selectDataLoadingStatus, selectGuitars } from '../../store/data/data-selectors';
import Header from '../header/header';
import Filter from '../filter/filter';
import Sort from '../sort/sort';
import CardsCatalog from '../cards-catalog/cards-catalog';
import Pagination from '../pagination/pagination';
import Footer from '../footer/footer';
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

function Main(): JSX.Element {
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
  const urlString = urlPageNumber + currentSortType + currentSortOder + currentMinPrice + currentMaxPrice + currentFilter;
  const guitarsRequestString = currentPaginationFilter + currentSortType + currentSortOder + currentMinPrice + currentMaxPrice + currentFilter;

  useEffect(() => {
    if (guitarsRequestString) {
      history.push(urlString);
    }
    dispatch(getDataGuitars(guitarsRequestString));
  }, [dispatch, guitarsRequestString, history, urlString]);

  const guitars = useSelector(selectGuitars);
  const isDataLoaded = useSelector(selectDataLoadingStatus);
  const correntGuitarsLength = () => {
    if (!currentPaginationFilter) {
      return guitars.slice(0, 9);
    }
    return guitars;
  };

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
            </li>
            <li className="breadcrumbs__item"><a className="link">Каталог</a>
            </li>
          </ul>
          {isDataLoaded &&
          <div className="catalog">
            <Filter guitars={guitars} />
            <Sort sortType={currentSortType} />
            <CardsCatalog guitars={correntGuitarsLength()} />
            <Pagination />
          </div>}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Main;
