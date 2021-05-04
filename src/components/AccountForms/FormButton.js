import React from 'react';

const FormButton = (props) => {
  return (
    <button type="button" onClick={props.act}>
      {props.text}
    </button>
  );
};

export default FormButton;
