import React, { useCallback, useContext, useMemo } from 'react';
import TVGuide from './TvGuide';
import { AppContext } from '../context/AppContext';
import { formatTimeDifference } from '../utils';

const PopupContent = () => {

    const { state } = useContext(AppContext);
    const { selectedTvShow } = state
    const {
        name,
        startTime,
        endTime,
        season,
        episode,
        description
    } = selectedTvShow

    const formattedDifference = formatTimeDifference(startTime, endTime);

    const tvIsEmpty = useMemo(() => {
        const keysFromTvShow = Object.keys(selectedTvShow)
        const tvShowInfoIsEmpty = keysFromTvShow.every(key => key === '')
        return {
            isEmpty: tvShowInfoIsEmpty
        }
    }, [selectedTvShow])

    const checkTextRender = useCallback(() => {
        if (name) return name
        if (tvIsEmpty) return 'No hay información que mostrar'
        return ''
    }, [selectedTvShow])

    const text = checkTextRender()

    return (
        <div className="popup-content1">
            {selectedTvShow.image && name ?
                <img
                    src={selectedTvShow.image}
                    alt="Imagen de fondo"
                    className="popup-content1-background-image"
                /> : null
            }
            <div className='popup-content1-box'>
                <h1 className="popup-content1-title">
                    {text}
                </h1>
                {name ?
                    <>
                        <p className="popup-content1-data">{`${startTime} a ${endTime} ${formattedDifference}`}</p>
                        <p className="popup-content1-description">
                            {`T${season} Ep.${episode}. ${description}`}
                        </p>
                    </> : null
                }
                <TVGuide />
            </div>
        </div>
    );
};

export default PopupContent;
