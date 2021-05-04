import React from 'react';
import LoginCSS from './../styles/login.module.css';
import blueBlob from './../assets/images/BlueBlob.svg';
import greenBlob from './../assets/images/GreenBlob.svg';
import FormHeader from '../components/FormHeader';
import FormLink from '../components/FormLink';
import FormButton from '../components/FormButton';
import FormLabelInput from '../components/FormLabelInput';

const Login = () => {
  return (
    <div className={LoginCSS.page_container}>
      <FormHeader />
      <div className={LoginCSS.form_container}>
        <div className={LoginCSS.blob}>
          <img src={blueBlob} alt="Blue Blob" />
        </div>
        <div className={LoginCSS.form_wrapper}>
          <h1>Login</h1>
          <form className={LoginCSS.login_form} action="">
            <FormLabelInput label="E-Mail" type="text" />
            <br />
            <FormLabelInput label="Wachtwoord" type="password" />
            <FormButton text="Login" act={() => console.log('login')} />
            <FormLink text="Nog geen account aangemaakt? Registreer" link="@" />
            <FormLink text="Je wachtwoord vergeten? Reset het hier" link="@" />
          </form>
        </div>
        <div className={LoginCSS.blob}>
          <img src={greenBlob} alt="Green Blob" />
        </div>
      </div>
    </div>
  );
};

export default Login;
