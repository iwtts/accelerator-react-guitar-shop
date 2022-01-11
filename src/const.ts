const ERROR_MESSAGE = 'Произошла ошибка';

const GUITARS_PER_PAGE_AMOUNT = 6;
const PAGINATION_CORRECTION_VALUE = 1;
const PAGINATION_PAGES_PER_PAGE_AMOUNT = 3;

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
  SetHeaderGuitars ='user/set-header-guitars',
  SetPaginationGuitars = 'app/set-pagination-guitars',
  SetSortType = 'user/set-sort-type',
  SetSortOrder = 'user/set-sort-order',
  SetMinPrice = 'user/set-min-price',
  SetMaxPrice = 'user/set-max-price',
  SetFilter = 'user/set-filter',
  SetPaginationFilter = 'user/set-pagination-filter',
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
  User = 'USER',
}

enum RatingValue {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
}

export {
  ERROR_MESSAGE,
  GUITARS_PER_PAGE_AMOUNT,
  PAGINATION_CORRECTION_VALUE,
  PAGINATION_PAGES_PER_PAGE_AMOUNT,
  AppRoute,
  ApiRoute,
  ActionType,
  Price,
  SortType,
  SortOrder,
  GuitarType,
  StringCount,
  NameSpace,
  RatingValue
};
