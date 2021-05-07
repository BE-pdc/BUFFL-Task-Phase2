import React from 'react';
import packageJson from './../../package.json';
import Buffl_Logo_White_Small from './../assets/images/buffl-logo-white-small.png';
import Client_Logo from './../assets/images/client_icon.svg';
import White_Arrow_Down from './../assets/images/white-arrow-down.svg';
import AppHeaderCSS from './../styles/appHeader.module.css';

const AppHeader = () => {
  return (
    <header className={AppHeaderCSS.header}>
      <div>
        <img src={Buffl_Logo_White_Small} alt="Buffl logo white small" />
        <span>v{packageJson.version}</span>
      </div>
      <div>
        <img
          className={AppHeaderCSS.client_logo}
          src={Client_Logo}
          alt="Client logo"
        />
        <img src={White_Arrow_Down} alt="Arrow down" width="10" />
      </div>
    </header>
  );
};

export default AppHeader;
