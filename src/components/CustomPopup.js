import React from 'react';
import PopupContent from './PopupContent';

const CustomPopup = ({ isOpen, closeModal }) => {
  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content">
        <PopupContent />
        <button className="popup-button" onClick={closeModal}>
          &#215;
        </button>
      </div>
    </div>
  );
};

export default CustomPopup;
