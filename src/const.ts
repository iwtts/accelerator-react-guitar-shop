const ERROR_MESSAGE = 'Произошла ошибка';

enum AppRoute {
  Main = '/',
  Guitar = '/guitar'
}

enum ApiRoute {
  Guitars = '/guitars?_embed=comments',
}

enum ActionType {
  SetGuitars = 'app/set-guitars',
  SetComments = 'app/set-comments',
}

enum NameSpace {
  Data = 'DATA',
}

export {
  ERROR_MESSAGE,
  AppRoute,
  ApiRoute,
  ActionType,
  NameSpace
};
