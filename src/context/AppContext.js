import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  data: null,
  isPopupOpen: false,
  selectedDate: {
    index: 0,
    date: ''
  },
  selectedTvShow: {
    name: '',
    startTime: '',
    endTime: '',
    channel: '',
    season: '',
    episode: '',
    description: '',
    image: ''
  }
};

const AppContext = createContext(initialState);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
