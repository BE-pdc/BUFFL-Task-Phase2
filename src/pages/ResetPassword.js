import React from 'react';
import AccFormCSS from './../styles/accountForm.module.css';
import blueBlob from './../assets/images/BlueBlob.svg';
import greenBlob from './../assets/images/GreenBlob.svg';
import FormHeader from '../components/AccountForms/FormHeader';
import FormLink from '../components/AccountForms/FormLink';
import FormButton from '../components/AccountForms/FormButton';
import FormLabelInput from '../components/AccountForms/FormLabelInput';

const ResetPassword = () => {
  return (
    <div className={AccFormCSS.page_container}>
      <FormHeader />
      <div className={AccFormCSS.form_container}>
        <div className={AccFormCSS.blob}>
          <img src={blueBlob} alt="Blue Blob" />
        </div>
        <div className={AccFormCSS.form_wrapper}>
          <h1>Reset wachtwoord</h1>
          <form className={AccFormCSS.form} action="">
            <FormLabelInput label="E-mail" type="email" />
            <FormButton
              text="Reset wachtwoord"
              act={() => console.log('reset wachtwoord')}
            />
            <FormLink text="Reeds een account aangemaakt? Login" link="@" />
          </form>
        </div>
        <div className={AccFormCSS.blob}>
          <img src={greenBlob} alt="Green Blob" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
