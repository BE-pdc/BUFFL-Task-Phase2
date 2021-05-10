import React from 'react';

const FormLabelInput = (props) => {
  return (
    <>
      <label htmlFor={props.label}>{props.label}</label>
      <input id={props.id} type={props.type} name={props.label} />
    </>
  );
};

export default FormLabelInput;
