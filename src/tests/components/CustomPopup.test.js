import React, { useReducer } from 'react';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import CustomPopup from '../../components/CustomPopup';
import AppReducer from '../../context/AppReducer';
import { initialStateIndividualInfoMock } from '../../utils/mocks';
import { AppContext } from '../../context/AppContext';
import '@testing-library/jest-dom/extend-expect';

describe('CustomPopup', () => {
  it('renders CustomPopup correctly', () => {

    const { result } = renderHook(() => useReducer(
        AppReducer,
        initialStateIndividualInfoMock
    ));
    const [ state, dispatch ] = result.current

    render(
        <AppContext.Provider value={{ state, dispatch }}>
            <CustomPopup />
        </AppContext.Provider>
    );

    const dateElement = screen.getByText('2021/08/12');
    expect(dateElement).toBeInTheDocument();

    const closeButton = screen.getByText('×');
    expect(closeButton).toBeInTheDocument();
  });

  it('calls closeModal when clicking the close button', () => {
    const closeModalMock = jest.fn();

    const { result } = renderHook(() => useReducer(
        AppReducer,
        initialStateIndividualInfoMock
    ));
    const [ state, dispatch ] = result.current

    render(
      <AppContext.Provider value={{ state: state, dispatch }}>
        <CustomPopup isOpen={true} closeModal={closeModalMock} />
      </AppContext.Provider>
    );
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    expect(closeModalMock).toHaveBeenCalled();
  });
});
