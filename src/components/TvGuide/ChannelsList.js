import React, { useContext, useEffect } from 'react';
import { determineDateSelector } from '../../utils';
import { AppContext } from '../../context/AppContext';

const Channel = ({
  image,
  name,
  number
}) => {
  return (
    <div className="channels-list__channel">
      <div className="channels-list__channel__number">{number}</div>
      <div className="channels-list__channel__image">
        <img
          src={image}
          alt={name}
          className="channels-list__channel__image-img"
        />
      </div>
    </div>
  );
};

const ChannelsList = ({ modifiedChannels }) => {

  const { state, dispatch } = useContext(AppContext);
  const { data, selectedDate, isMock } = state

  const selectDate = () => {
    return determineDateSelector(modifiedChannels)
  }

  useEffect(() => {
    dispatch({ type: 'DATE_SELECTOR', payload: {
      index: 0,
      date: selectDate()[0]
    } });
    // eslint-disable-next-line
  }, [data])

  const handleBack = () => {
    if (selectedDate.index === 0) return
    const backNumber = selectedDate.index - 1
    dispatch({ type: 'DATE_SELECTOR', payload: {
      index: backNumber,
      date: selectDate()[backNumber]
    } });
  }

  const handleForward = () => {
    if (selectedDate.index >= (selectDate().length - 1)) return
    const forwardNumber = selectedDate.index + 1
    dispatch({ type: 'DATE_SELECTOR', payload: {
      index: forwardNumber,
      date: selectDate()[forwardNumber]
    } });
  }

  const handleMockVsReal = () => {
    dispatch({ type: 'MOCK_VIEW', payload: !isMock });
  }
  
  return (
    <div className="tv-guide-channel-list">
      <div className="channels-list">
        <div className="channels-list__header date-container">
          <div className='channels-list__container'>
            <button
              data-testid="back-button"
              onClick={handleBack}
              className="tv-guide-channel-list__button">
              {'<'}
            </button>
            <div className="tv-guide-channel-list__date">
              {selectedDate.date}
            </div>
            <button
              data-testid="forward-button"
              onClick={handleForward}
              className="tv-guide-channel-list__button">
              {'>'}
            </button>
          </div>
          <button
            data-testid="see-mock"
            onClick={handleMockVsReal}
            className="tv-guide-channel-list__button__mock">
            {!isMock ? 'Ver Mock' : 'Ver Datos'}
          </button>
        </div>
        <div className='channels-list__content'>
          {modifiedChannels.map(channel => {
            const { id, image, name, number } = channel
            return <Channel
              key={id}
              image={image}
              name={name}
              number={number}
            />
          })}
        </div>
      </div>
    </div>
  );
};

export default ChannelsList;
