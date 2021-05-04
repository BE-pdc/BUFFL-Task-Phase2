import React from 'react';
import FormHeaderCSS from './../../styles/formHeader.module.css';
import Buffl_Logo_Black from './../../assets/images/buffl-logo-black.svg';

const FormHeader = () => {
  return (
    <header className={FormHeaderCSS.header}>
      <img width="60" src={Buffl_Logo_Black} alt="BUFFL full logo" />
      <span>dashboard</span>
    </header>
  );
};

export default FormHeader;
