import React, { useReducer } from 'react';
import { render, renderHook, screen } from '@testing-library/react';
import PopupContent from '../../components/PopupContent';
import AppReducer from '../../context/AppReducer';
import { initialStateIndividualInfoMock } from '../../utils/mocks';
import { AppContext } from '../../context/AppContext';
import '@testing-library/jest-dom/extend-expect';

describe('PopupContent', () => {
  it('renders PopupContent correctly', () => {

    const { result } = renderHook(() => useReducer(
        AppReducer,
        initialStateIndividualInfoMock
    ));
    const [ state, dispatch ] = result.current

    render(
        <AppContext.Provider value={{ state, dispatch }}>
            <PopupContent />
        </AppContext.Provider>
    );

    const dateElement = screen.getByText('2021/08/12');
    expect(dateElement).toBeInTheDocument();
  });
});
