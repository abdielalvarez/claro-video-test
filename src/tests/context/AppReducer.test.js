import AppReducer from '../../context/AppReducer';

describe('AppReducer', () => {
  it('should set data in state', () => {
    const initialState = {
      data: null,
    };

    const action = { type: 'SET_DATA', payload: 'test data' };
    const newState = AppReducer(initialState, action);

    expect(newState.data).toBe('test data');
  });

  it('should toggle the popup state', () => {
    const initialState = {
      isPopupOpen: false,
    };

    const action = { type: 'TOGGLE_POPUP', payload: true };
    const newState = AppReducer(initialState, action);

    expect(newState.isPopupOpen).toBe(true);
  });

  it('should set the selected date', () => {
    const initialState = {
      selectedDate: { index: 0, date: '' },
    };

    const action = { type: 'DATE_SELECTOR', payload: { index: 1, date: '2023-01-01' } };
    const newState = AppReducer(initialState, action);

    expect(newState.selectedDate).toEqual({ index: 1, date: '2023-01-01' });
  });

  it('should select a TV show', () => {
    const initialState = {
      selectedTvShow: {
        name: '',
        startTime: '',
        endTime: '',
        channel: '',
        season: '',
        episode: '',
        description: '',
        image: '',
      },
    };

    const action = {
      type: 'SELECT_SHOW',
      payload: {
        name: 'Sample Show',
        startTime: '08:00',
        endTime: '09:00',
        channel: 'ABC',
        season: 'Season 1',
        episode: 'Episode 1',
        description: 'Sample description',
        image: 'sample.jpg',
      },
    };

    const newState = AppReducer(initialState, action);

    expect(newState.selectedTvShow).toEqual({
      name: 'Sample Show',
      startTime: '08:00',
      endTime: '09:00',
      channel: 'ABC',
      season: 'Season 1',
      episode: 'Episode 1',
      description: 'Sample description',
      image: 'sample.jpg',
    });
  });

  it('should return the same state for an unknown action', () => {
    const initialState = { data: 'test data' };

    const action = { type: 'UNKNOWN_ACTION' };
    const newState = AppReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
