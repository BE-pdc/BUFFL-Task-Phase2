import React from 'react';
import AccFormCSS from './../styles/accountForm.module.css';
import blueBlob from './../assets/images/BlueBlob.svg';
import greenBlob from './../assets/images/GreenBlob.svg';
import FormHeader from '../components/AccountForms/FormHeader';
import FormLink from '../components/AccountForms/FormLink';
import FormButton from '../components/AccountForms/FormButton';
import FormLabelInput from '../components/AccountForms/FormLabelInput';

const Registration = () => {
  return (
    <div className={AccFormCSS.page_container}>
      <FormHeader />
      <div className={AccFormCSS.form_container}>
        <div className={AccFormCSS.blob}>
          <img src={blueBlob} alt="Blue Blob" />
        </div>
        <div className={AccFormCSS.form_wrapper}>
          <h1>Registreer je account</h1>
          <p>
            Het BUFFL dashboard geeft een duidelijk & gestructureerd beeld van
            je BUFFL <br /> campagne weer. De resultaten worden continu
            vernieuwd en maken het <br /> mogelijk je campagne op de voet te
            volgen.
          </p>
          <form className={AccFormCSS.form} action="">
            <FormLabelInput label="E-mail" type="email" />
            <br />
            <br />
            <FormLabelInput label="Wachtwoord" type="password" />
            <br />
            <br />
            <FormLabelInput label="Herhaal wachtwoord" type="password" />
            <FormButton
              text="Registreer"
              act={() => console.log('registreer')}
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

export default Registration;
