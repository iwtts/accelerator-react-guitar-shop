const ERROR_MESSAGE = 'Произошла ошибка';

enum AppRoute {
  Main = '/',
  Guitar = '/guitar',
}

enum ApiRoute {
  Guitars = '/guitars',
  GuitarsWithComments = '/guitars?_embed=comments',
}

enum ActionType {
  SetGuitars = 'app/set-guitars',
}

enum SortType {
  Default = '',
  Price = '&_sort=price',
  Rating = '&_sort=rating',
}

enum SortOrder {
  Default = '',
  Ascending = '&_order=asc',
  Descending = '&_order=desc',
}

enum Price {
  From = '&price_gte=',
  To = '&price_lte=',
}

enum GuitarType {
  Default = '',
  Electric = '&type=electric',
  Acoustic = '&type=acoustic',
  Ukulele = '&type=ukulele',
}

enum StringCount {
  Four = '&stringCount=4',
  Six = '&stringCount=6',
  Seven = '&stringCount=7',
  Twelve = '&stringCount=12',
}

enum NameSpace {
  Data = 'DATA',
}

export {
  ERROR_MESSAGE,
  AppRoute,
  ApiRoute,
  ActionType,
  Price,
  SortType,
  SortOrder,
  GuitarType,
  StringCount,
  NameSpace
};
