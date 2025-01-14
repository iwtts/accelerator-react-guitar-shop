import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AppRoute } from '../../const';
import { selectDataLoadingStatus } from '../../store/data/data-selectors';
import Loading from '../common/loading/loading';
import Catalog from '../catalog/catalog';
import NotFound from '../common/not-found/not-found';
import Product from '../product/product';
import Cart from '../cart/cart';

function App(): JSX.Element {
  const isLoading = useSelector(selectDataLoadingStatus);

  if (!isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <Redirect to={`${AppRoute.Main}page_1`} />
      </Route>
      <Route exact path={`${AppRoute.Main}:page_1`}>
        <Catalog />
      </Route>
      <Route exact path={`${AppRoute.Cart}`}>
        <Cart />
      </Route>
      <Route exact path={`${AppRoute.Catalog}/:id`}>
        <Product />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
