import React from 'react';
import ToggleSwitchCSS from './../styles/toggleSwitch.module.css';

const ToggleSwitch = ({ id, name }) => {
  return (
    <label name={name} className={ToggleSwitchCSS.switch}>
      <input id={id} type="checkbox" />
      <span
        className={`${ToggleSwitchCSS.slider} + " " ${ToggleSwitchCSS.round}`}
      ></span>
    </label>
  );
};

export default ToggleSwitch;
