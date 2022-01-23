import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';

function NotFound(): JSX.Element {
  return (
    <>
      <h1>404.</h1>
      <p>Страница не найдена.</p>
      <Link to={AppRoute.Main}>Вернуться на главную</Link>
    </>
  );
}

export default NotFound;
