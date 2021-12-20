import { Guitar } from '../../types/guitar';
import Card from '../card/card';

type CardsCatalogProps = {
  guitars: Guitar[],
}

function CardsCatalog(props: CardsCatalogProps): JSX.Element {
  return(
    <div className="cards catalog__cards">
      {props.guitars
        .slice(0, 9)
        .map((guitar) => (
          <Card
            key={guitar.id}
            guitar={guitar}
          />
        ))}
    </div>
  );
}

export default CardsCatalog;