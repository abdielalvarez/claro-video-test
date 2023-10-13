import React from 'react';
import { render } from '@testing-library/react';
import TVShows from '../../../components/TvGuide/TvShows';
import { AppContext } from '../../../context/AppContext';
import { channelMock } from '../../../utils/channelMock';
import '@testing-library/jest-dom/extend-expect';

describe('TVShows', () => {
  it('renders TV shows schedule correctly', () => {
    const mockState = {
      selectedDate: {
        date: '2023-01-15',
      },
    };

    render(
      <AppContext.Provider value={{ state: mockState }}>
        <TVShows modifiedChannels={[channelMock]} />
      </AppContext.Provider>
    );
  });
});
