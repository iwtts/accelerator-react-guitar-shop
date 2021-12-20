import { getMockGuitars } from '../../mocks/guitars';
import { getGuitars } from '../actions';
import { initialState, dataReducer } from './data-reducer';

describe('Reducer: dataReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(dataReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update guitars', () => {
    const mockGuitars = getMockGuitars();

    expect(dataReducer(initialState, getGuitars(mockGuitars)))
      .toEqual({
        ...initialState,
        guitars: mockGuitars,
      });
  });
});