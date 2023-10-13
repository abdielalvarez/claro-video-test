import React, { useReducer } from 'react';
import { render, screen, renderHook, act } from '@testing-library/react';
import Home from '../../pages/Home';
import { AppContext } from '../../context/AppContext';
import { initialStateIndividualInfoMock } from '../../utils/mocks';
import AppReducer from '../../context/AppReducer';
import '@testing-library/jest-dom/extend-expect';

describe('Home', () => {
  it('renders Home component correctly', () => {
    const { result } = renderHook(() => useReducer(AppReducer, initialStateIndividualInfoMock));
    const [state, dispatch] = result.current;
    act(() => {
      render(
        <AppContext.Provider value={{ state, dispatch }}>
          <Home />
        </AppContext.Provider>
      );
    });
    const homePage = screen.getByText('Bienvenidos a mi aplicación');
    expect(homePage).toBeInTheDocument();
  });
});
