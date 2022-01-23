const ERROR_MESSAGE = 'Произошла ошибка';

const GUITARS_PER_PAGE_AMOUNT = 9;
const PAGINATION_CORRECTION_VALUE = 1;
const PAGINATION_PAGES_PER_PAGE_AMOUNT = 3;
const INITIAL_PAGE_NUMBER = 1;
const INITIAL_PAGINATION_FILTER = `&_start=0&_limit=${GUITARS_PER_PAGE_AMOUNT}`;
const SLICE_START_FOR_PAGINATION_EFECT = 6;
const SLICE_END_FOR_PAGINATION_EFECT = 7;

const PRICE_FORMAT_VALUE = 1000;
const REVIEWS_PER_CLICK_AMOUNT = 3;
const RATING_STARS_MAX = 5;

enum AppRoute {
  Main = '/',
  Catalog = '/catalog',
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
  SetCurrentPageNumber = 'user/set-current-page-number',
  RedirectToRoute = 'user/redirect-to-route',
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

enum ProductTabType {
  Characteristics = 'characteristics',
  Description = 'description',
}

enum RatingPanelType {
  Card = 'card',
  ProductPage = 'product page',
  Review = 'review',
}

export {
  ERROR_MESSAGE,
  GUITARS_PER_PAGE_AMOUNT,
  PAGINATION_CORRECTION_VALUE,
  PAGINATION_PAGES_PER_PAGE_AMOUNT,
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGINATION_FILTER,
  SLICE_START_FOR_PAGINATION_EFECT,
  SLICE_END_FOR_PAGINATION_EFECT,
  PRICE_FORMAT_VALUE,
  REVIEWS_PER_CLICK_AMOUNT,
  RATING_STARS_MAX,
  AppRoute,
  ApiRoute,
  ActionType,
  Price,
  SortType,
  SortOrder,
  GuitarType,
  StringCount,
  NameSpace,
  RatingValue,
  ProductTabType,
  RatingPanelType
};
