import React, { useEffect, useState } from 'react';
import packageJson from './../../package.json';
import Buffl_Logo_White_Small from './../assets/images/buffl-logo-white-small.png';
import Client_Logo from './../assets/images/client_icon.svg';
import White_Arrow_Down from './../assets/images/white-arrow-down.svg';
import AppHeaderCSS from './../styles/appHeader.module.css';

const AppHeader = ({ loggedInAs, setLoggedInAs, setIsAuth }) => {
  const [displayLogout, setDisplayLogout] = useState(false);

  useEffect(() => {
    const logout = document.getElementById('logout');
    if (displayLogout) {
      logout.style.display = 'flex';
    } else {
      logout.style.display = 'none';
    }
  }, [displayLogout]);

  const toggleLogout = () => {
    var logout = document.getElementById('logout');
    if (logout.style.display === 'none') {
      setDisplayLogout(true);
    } else {
      setDisplayLogout(false);
    }
  };

  const logout = () => {
    setLoggedInAs('');
    setIsAuth(false);
  };

  return (
    <header className={AppHeaderCSS.header}>
      <div>
        <img src={Buffl_Logo_White_Small} alt="Buffl logo white small" />
        <span className={AppHeaderCSS.version}>v{packageJson.version}</span>
      </div>
      <div className={AppHeaderCSS.client} onClick={() => toggleLogout()}>
        <img src={Client_Logo} alt="Client logo" />
        <img src={White_Arrow_Down} alt="Arrow down" width="10" />
      </div>
      <div id="logout" className={AppHeaderCSS.logout}>
        <span>{loggedInAs}</span>
        <span onClick={() => logout()}>Logout</span>
      </div>
    </header>
  );
};

export default AppHeader;
