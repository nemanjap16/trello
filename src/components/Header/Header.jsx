import React from 'react';
import './Header.scss';
import avatar from '../../assets/avatar.jpg';

const Header = () => {
  return (
    <div className="header">
      <h1 className="header__logo">Trello Clone</h1>
      <div className="header__avatar">
        <img src={avatar} alt="avatar" />
      </div>
    </div>
  );
};

export default Header;
