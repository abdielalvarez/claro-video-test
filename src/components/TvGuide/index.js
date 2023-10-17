import React, { useContext } from 'react';
import ChannelsList from './ChannelsList';
import TVShows from './TvShows';
import { AppContext } from '../../context/AppContext';
import { channelDataMock } from '../../utils/channelDataMock';

const TVGuide = () => {

  const { state } = useContext(AppContext);
  const { data, isMock } = state

  const { channels }  = data?.response || {
    channels: []
  }

  const modifiedChannels = isMock ? [channelDataMock] : channels

  return (
    <div className="tv-guide-programs">
      <div className="program-container">
        <ChannelsList modifiedChannels={modifiedChannels} />
        <TVShows modifiedChannels={modifiedChannels} />
      </div>
    </div>
  );
};

export default TVGuide;
