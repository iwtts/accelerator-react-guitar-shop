import { Route, Switch } from 'react-router-dom';
import { AppRoute } from '../../const';
import Main from '../main/main';
import NotFound from '../not-found/not-found';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <Main />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
