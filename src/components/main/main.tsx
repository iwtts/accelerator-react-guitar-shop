import { useDispatch, useSelector } from 'react-redux';
import { selectGuitars } from '../../store/data/data-selectors';
import Header from '../header/header';
import Filter from '../filter/filter';
import Sort from '../sort/sort';
import CardsCatalog from '../cards-catalog/cards-catalog';
import Pagination from '../pagination/pagination';
import Footer from '../footer/footer';
import NotFound from '../not-found/not-found';
import { getDataGuitars } from '../../store/api-actions';
import { useEffect } from 'react';
import {
  selectFilter,
  selectMaxPrice,
  selectMinPrice,
  selectSortOrder,
  selectSortType
} from '../../store/user/user-selectors';

function Main(): JSX.Element {
  const dispatch = useDispatch();

  const currentSortType = useSelector(selectSortType);
  const currentSortOder = useSelector(selectSortOrder);
  const currentMinPrice = useSelector(selectMinPrice);
  const currentMaxPrice = useSelector(selectMaxPrice);
  const currentFilter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(getDataGuitars(currentSortType, currentSortOder, currentMinPrice, currentMaxPrice, currentFilter));
  }, [
    currentMinPrice,
    currentMaxPrice,
    currentSortOder,
    currentSortType,
    currentFilter,
    dispatch]);

  const guitars = useSelector(selectGuitars).slice(0, 9);

  if (guitars.length === 0) {
    return <NotFound />;
  }

  return (
    <>
      <Header guitars={guitars} />
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
