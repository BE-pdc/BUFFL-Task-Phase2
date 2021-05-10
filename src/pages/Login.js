import React from 'react';
import AccFormCSS from './../styles/accountForm.module.css';
import blueBlob from './../assets/images/BlueBlob.svg';
import greenBlob from './../assets/images/GreenBlob.svg';
import FormHeader from '../components/AccountForms/FormHeader';
import FormLink from '../components/AccountForms/FormLink';
import FormButton from '../components/AccountForms/FormButton';
import FormLabelInput from '../components/AccountForms/FormLabelInput';
import { useHistory, withRouter } from 'react-router';

const Login = ({ setIsAuth, setLoggedInAs }) => {
  let history = useHistory();

  const login = (p) => {
    const inputEmail = document.getElementById('form_email').value;
    setIsAuth(true);
    setLoggedInAs(inputEmail);
    history.push('/surveys');
  };

  return (
    <div className={AccFormCSS.page_container}>
      <FormHeader />
      <div className={AccFormCSS.form_container}>
        <div className={AccFormCSS.blob}>
          <img src={blueBlob} alt="Blue Blob" />
        </div>
        <div className={AccFormCSS.form_wrapper}>
          <h1>Login</h1>
          <form className={AccFormCSS.form} action="">
            <FormLabelInput id="form_email" label="E-mail" type="email" />
            <br />
            <br />
            <FormLabelInput
              id="form_password"
              label="Wachtwoord"
              type="password"
            />
            <FormButton
              text="Login"
              act={() => {
                login();
              }}
            />
            <FormLink
              text="Nog geen account aangemaakt? Registreer"
              link="/register"
            />
            <FormLink
              text="Je wachtwoord vergeten? Reset het hier"
              link="/reset-password"
            />
          </form>
        </div>
        <div className={AccFormCSS.blob}>
          <img src={greenBlob} alt="Green Blob" />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
