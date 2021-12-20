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
  SetComments = 'app/set-comments',
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

enum NameSpace {
  Data = 'DATA',
}

export {
  ERROR_MESSAGE,
  AppRoute,
  ApiRoute,
  ActionType,
  SortType,
  SortOrder,
  NameSpace
};
