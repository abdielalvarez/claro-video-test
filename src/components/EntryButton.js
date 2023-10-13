import React from 'react';

class EntryButton extends React.PureComponent {
  render() {
    const { handlePopup } = this.props;

    return (
      <button
        type='button'
        onClick={handlePopup}
        className="entry-button"
      >
        <span className="entry-button-text">Mostrar EPG</span>
      </button>
    );
  }
}

export default EntryButton;
