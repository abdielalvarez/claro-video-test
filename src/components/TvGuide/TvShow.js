import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const TvShow = ({ programas }) => {

  const { dispatch } = useContext(AppContext);

    const programWidth = (programa) => {
        const { startTime, endTime } = programa;
        const startParts = startTime.split(':');
        const endParts = endTime.split(':');
        const startHour = parseInt(startParts[0]);
        const startMinute = parseInt(startParts[1]);
        const endHour = parseInt(endParts[0]);
        const endMinute = parseInt(endParts[1]);
        const startOffset = startHour * 60 + startMinute;
        const endOffset = endHour * 60 + endMinute;
        const width = ((endOffset - startOffset) / 30) * 156.26;
    
        return width;
    };

    let leftOffset = 0

    const handleHover = (index) => {
      dispatch({ type: 'SELECT_SHOW', payload: programas[index] });
    }

  return (
    <div className="tv-shows__program">
      {programas.map((programa, index) => {
        const { startTime, endTime, name } = programa;
        const startParts = startTime.split(':');
        const startHour = parseInt(startParts[0]);
        const startMinute = parseInt(startParts[1]);
        const startOffset = startHour * 60 + startMinute;

        const firstOffsetOfIndexZero = (startOffset / 30) * 156.26

        leftOffset =
            index === 0 ?
                firstOffsetOfIndexZero :
            index > 0 && programas[index - 1].endTime === startTime ?
                leftOffset : leftOffset

        return (
          <div
            key={startTime}
            onMouseEnter={() => handleHover(index)}
            className="tv-shows__program__item"
            style={{
              left: `${leftOffset}px`,
              minWidth: `${programWidth(programa)}px`,
              maxWidth: `${programWidth(programa)}px`,
            }}
          >
            <div className="tv-shows__program__item__channel">{name}</div>
            <div className="tv-shows__program__item__time">
              {startTime} - {endTime}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TvShow;