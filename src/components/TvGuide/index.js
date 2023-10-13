import React, { useContext } from 'react';
import ChannelsList from './ChannelsList';
import TVShows from './TvShows';
import { AppContext } from '../../context/AppContext';

const TVGuide = () => {

  const { state } = useContext(AppContext);
  const { data } = state

  const { channels }  = data?.response || {
    channels: []
  }

  const modifiedChannels = channels.slice(10, 70)

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
