import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AppRoute } from '../../const';
import { selectGuitars } from '../../store/data/data-selectors';
import Loading from '../loading/loading';
import Main from '../main/main';
import NotFound from '../not-found/not-found';

function App(): JSX.Element {
  const guitars = useSelector(selectGuitars);
  if (!guitars.length) {
    return (
      <Loading />
    );
  }
  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <Redirect to={`${AppRoute.Main}:page_1`} />
      </Route>
      <Route exact path={`${AppRoute.Main}:page_1`}>
        <Main />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
