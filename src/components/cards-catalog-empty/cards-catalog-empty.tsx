function CardsCatalogEmpty(): JSX.Element {
  return(
    <div
      className="cards catalog__cards"
      data-testid="cards-catalog"
    >
      <h2>По вашему запросу ничего не найдено</h2>
    </div>
  );
}

export default CardsCatalogEmpty;
