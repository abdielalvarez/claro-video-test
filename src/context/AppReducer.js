const AppReducer = (state, action) => {
    switch (action.type) {
      case 'SET_DATA':
        return {
          ...state,
          data: action.payload,
        };
      case 'TOGGLE_POPUP':
        return {
          ...state,
          isPopupOpen: action.payload,
        };
      case 'DATE_SELECTOR':
        return {
          ...state,
          selectedDate: action.payload,
        };
      case 'SELECT_SHOW':
        return {
          ...state,
          selectedTvShow: action.payload
        };
      default:
        return state;
    }
  };
  
  export default AppReducer;
  