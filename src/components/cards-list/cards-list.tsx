import { Guitar } from '../../types/guitar';
import Card from '../card/card';

type CardsListProps = {
  guitars: Guitar[],
}

function CardsList(props: CardsListProps): JSX.Element {
  return(
    <div
      className="cards catalog__cards"
      data-testid="cards-catalog"
    >
      {props.guitars
        .map((guitar) => (
          <Card
            key={guitar.id}
            guitar={guitar}
          />
        ))}
    </div>
  );
}

export default CardsList;
