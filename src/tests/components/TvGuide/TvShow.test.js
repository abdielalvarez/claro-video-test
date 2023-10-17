import React, { useReducer } from 'react';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TvShow from '../../../components/TvGuide/TvShow';
import { AppContext } from '../../../context/AppContext';
import { initialStateIndividualInfoMock, tvShowsWithDate } from '../../../utils/mocks';
import AppReducer from '../../../context/AppReducer';
import '@testing-library/jest-dom/extend-expect';

const mockDispatch = jest.fn();

describe('TvShow', () => {
  it('renders programs correctly', () => {

    const initialValue = {
      isPopupOpen: false
    }
    
    render(
      <AppContext.Provider value={{ state: initialValue, dispatch: mockDispatch }}>
        <TvShow programs={tvShowsWithDate} />
      </AppContext.Provider>
    );

    for (const program of tvShowsWithDate) {
      const startTime = screen.getAllByText((content) =>
        content.includes(program.startTime)
      );
      const endTime = screen.getAllByText((content) =>
        content.includes(program.endTime)
      );
      const channel = screen.getAllByText((content) =>
        content.includes(program.name)
      );
      
      const programItem = screen.getByTestId('program-item-0');
      userEvent.hover(programItem);
      userEvent.unhover(programItem);

      startTime.forEach((element) => {
        expect(element).toBeInTheDocument();
      });

      endTime.forEach((element) => {
        expect(element).toBeInTheDocument();
      });

      channel.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
    }
  });

  it('dispatches SELECT_SHOW on mouse enter', () => {

    const { result } = renderHook(() => useReducer(
      AppReducer,
      initialStateIndividualInfoMock
    ));
    const [ state, dispatch ] = result.current

    render(
      <AppContext.Provider value={{ state, dispatch }}>
        <TvShow programs={tvShowsWithDate} />
      </AppContext.Provider>
    );

    const firstProgram = tvShowsWithDate[0];
    const startTime = screen.getByText((content) =>
        content.includes(firstProgram.startTime)
    );

    userEvent.hover(startTime);
  });
});
