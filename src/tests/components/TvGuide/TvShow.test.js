import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TvShow from '../../../components/TvGuide/TvShow';
import { AppContext } from '../../../context/AppContext';
import { tvShowsWithDate } from '../../../utils/mocks';
import '@testing-library/jest-dom/extend-expect';

const mockDispatch = jest.fn();

describe('TvShow', () => {
  it('renders programs correctly', () => {
    render(
      <AppContext.Provider value={{ dispatch: mockDispatch }}>
        <TvShow programas={tvShowsWithDate} />
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
    render(
      <AppContext.Provider value={{ dispatch: mockDispatch }}>
        <TvShow programas={tvShowsWithDate} />
      </AppContext.Provider>
    );

    const firstProgram = tvShowsWithDate[0];
    const startTime = screen.getByText((content) =>
        content.includes(firstProgram.startTime)
    );

    userEvent.hover(startTime);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SELECT_SHOW',
      payload: firstProgram,
    });
  });
});
