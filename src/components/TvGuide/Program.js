import React from 'react';
import { programWidth } from '../../utils'

const Program = ({
    index,
    program,
    leftOffset,
    handleHover
}) => {

    const { name, startTime, endTime } = program

    return (
        <div
            key={startTime}
            onMouseEnter={() => handleHover(index, true)}
            onMouseLeave={() => handleHover(index, false)}
            className="tv-shows__program__item"
            data-testid={`program-item-${index}`}
            style={{
                left: `${leftOffset}px`,
                minWidth: `${programWidth(program)}px`,
                maxWidth: `${programWidth(program)}px`,
            }}
        >
            <div className="tv-shows__program__item__channel">{name}</div>
            <div className="tv-shows__program__item__time">
                {startTime} - {endTime}
            </div>
        </div>
    );
};

export default Program;