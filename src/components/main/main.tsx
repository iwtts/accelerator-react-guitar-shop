import { useDispatch, useSelector } from 'react-redux';
import { selectGuitars } from '../../store/data/data-selectors';
import Header from '../header/header';
import Filter from '../filter/filter';
import Sort from '../sort/sort';
import CardsCatalog from '../cards-catalog/cards-catalog';
import Pagination from '../pagination/pagination';
import Footer from '../footer/footer';
import { getDataGuitars } from '../../store/api-actions';
import { useEffect } from 'react';
import {
  selectFilter,
  selectMaxPrice,
  selectMinPrice,
  selectPaginationFilter,
  selectSortOrder,
  selectSortType
} from '../../store/user/user-selectors';
import Loading from '../loading/loading';

function Main(): JSX.Element {
  const dispatch = useDispatch();

  const currentSortType = useSelector(selectSortType);
  const currentSortOder = useSelector(selectSortOrder);
  const currentMinPrice = useSelector(selectMinPrice);
  const currentMaxPrice = useSelector(selectMaxPrice);
  const currentFilter = useSelector(selectFilter);
  const currentPagintaionFilter = useSelector(selectPaginationFilter);

  useEffect(() => {
    dispatch(getDataGuitars(currentPagintaionFilter, currentSortType, currentSortOder, currentMinPrice, currentMaxPrice, currentFilter));
  }, [
    currentMinPrice,
    currentMaxPrice,
    currentSortOder,
    currentSortType,
    currentFilter,
    currentPagintaionFilter,
    dispatch]);

  const guitars = useSelector(selectGuitars);

  if (guitars.length === 0) {
    return <Loading />;
  }

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
          <div className="catalog">
            <Filter guitars={guitars} />
            <Sort sortType={currentSortType} />
            <CardsCatalog guitars={guitars} />
            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Main;
