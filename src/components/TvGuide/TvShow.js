import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { calculateLeftOffsets } from '../../utils/index';
import Program from './Program';

const TvShow = ({ programs }) => {
  const { state, dispatch } = useContext(AppContext);
  const { isPopupOpen } = state

  const emptyTvShow = {
    name: '',
    startTime: '',
    endTime: '',
    channel: '',
    season: '',
    episode: '',
    description: '',
    image: ''
  }

  useEffect(() => {
    dispatch({
      type: 'SELECT_SHOW',
      payload: emptyTvShow
    });
  }, [isPopupOpen])

  const handleHover = (index, mouseIn) => {
    dispatch({ type: 'SELECT_SHOW', payload:
      mouseIn ?
      programs[index] :
      emptyTvShow
    });
  };

  const programsWithOffsets = calculateLeftOffsets(programs);

  return (
    <div className="tv-shows__program">
      {programsWithOffsets.map(({
        index,
        program,
        leftOffset
      }) => (
        <Program
          key={program.startTime}
          index={index}
          program={program}
          leftOffset={leftOffset}
          handleHover={handleHover}
        />
      ))}
    </div>
  );
};

export default TvShow;
