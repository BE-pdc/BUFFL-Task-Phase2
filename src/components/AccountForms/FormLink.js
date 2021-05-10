import React from 'react';
import { Link } from 'react-router-dom';

const FormLink = (props) => {
  return <Link to={props.link}>{props.text}</Link>;
};

export default FormLink;
