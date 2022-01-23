import { AppRoute } from '../../../const';

type BreadCrumbsProps = {
  productName?: string,
}

function BreadCrumbs(props: BreadCrumbsProps): JSX.Element {
  return(
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item"><a className="link" href={AppRoute.Main}>Главная</a></li>
      <li className="breadcrumbs__item"><a className="link" href={AppRoute.Main}>Каталог</a> </li>
      {props.productName && <li className="breadcrumbs__item"><a className="link" href="#header">{props.productName}</a> </li>}
    </ul>
  );
}

export default BreadCrumbs;
