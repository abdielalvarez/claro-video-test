import React, { useContext } from 'react';
import TvShow from './TvShow';
import { generarHorasConsecutivas, parseDataForTvShows } from '../../utils';
import { AppContext } from '../../context/AppContext';

const TVShows = ({ modifiedChannels }) => {

  const { state } = useContext(AppContext);
  const { selectedDate } = state

  return (
    <div className="tv-shows">
      <div className="tv-shows__schedule">
        <div className="tv-shows__schedule__time-header">
          {generarHorasConsecutivas().map((hora, index) => (
            <div key={index} className="tv-shows__schedule__time-header__hour">
              {hora}
            </div>
          ))}
        </div>
        <div className="tv-shows__schedule__programs">
          {modifiedChannels.map(channel => {
            const { id } = channel || {
              id: 0
            }
            const tvShows = parseDataForTvShows(channel, selectedDate.date)
            return <TvShow
              key={id}
              programs={tvShows}
            />
          })}
        </div>
      </div>
    </div>
  );
};

export default TVShows;