import { GuitarType, SortOrder, SortType } from '../../const';
import { getMockGuitars } from '../../mocks/guitars';
import { setFilter, setHeaderGuitars, setMaxPrice, setMinPrice, setPaginationFilter, setSortOrder, setSortType } from '../actions';
import { initialState, userReducer } from './user-reducer';

describe('Reducer: userReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(userReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update headerGuitars', () => {
    const mockGuitars = getMockGuitars();

    expect(userReducer(initialState, setHeaderGuitars(mockGuitars)))
      .toEqual({
        ...initialState,
        headerGuitars: mockGuitars,
      });
  });

  it('should update sortType', () => {
    const mockSortType = SortType.Price;

    expect(userReducer(initialState, setSortType(mockSortType)))
      .toEqual({
        ...initialState,
        sortType: mockSortType,
      });
  });

  it('should update sortOrder', () => {
    const mockSortOrder = SortOrder.Ascending;

    expect(userReducer(initialState, setSortOrder(mockSortOrder)))
      .toEqual({
        ...initialState,
        sortOrder: mockSortOrder,
      });
  });

  it('should update minPrice', () => {
    const mockMinPrice = '3000';

    expect(userReducer(initialState, setMinPrice(mockMinPrice)))
      .toEqual({
        ...initialState,
        minPrice: mockMinPrice,
      });
  });

  it('should update maxPrice', () => {
    const mockMaxPrice = '5000';

    expect(userReducer(initialState, setMaxPrice(mockMaxPrice)))
      .toEqual({
        ...initialState,
        maxPrice: mockMaxPrice,
      });
  });

  it('should update filter', () => {
    const mockFilter = GuitarType.Acoustic;

    expect(userReducer(initialState, setFilter(mockFilter)))
      .toEqual({
        ...initialState,
        filter: mockFilter,
      });
  });

  it('should update paginationFilter', () => {
    const mockPaginationFilter = '&_start=1&_limit=6';

    expect(userReducer(initialState, setPaginationFilter(mockPaginationFilter)))
      .toEqual({
        ...initialState,
        paginationFilter: mockPaginationFilter,
      });
  });
});
