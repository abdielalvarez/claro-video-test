import React from 'react';
import profile from '../assets/images/profile-photo.jpg'

const withMainLayout = (WrappedComponent) => {
  return (props) => (
    <div className="main-layout">
      <header className="main-layout__header">
        <h1 className="main-layout__header__title">Bienvenidos a mi aplicación</h1>
        <div className="main-layout__header__user-info">
          <div className="main-layout__header__user-info__avatar">
            <img
              src={profile}
              alt='Abdiel Alvarez'
              width={40}
              height={40}
              className='main-layout__header__user-info__avatar__image'
            />
          </div>
          <div className="main-layout__header__user-info__text">
            <span className="main-layout__header__user-info__text__name">Abdiel Álvarez</span>
          </div>
        </div>
      </header>
      <WrappedComponent {...props} />
    </div>
  );
};

export default withMainLayout;
