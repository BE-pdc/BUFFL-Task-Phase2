import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import FormLabelInput from '../components/AccountForms/FormLabelInput';
import AppHeader from '../components/AppHeader';
import ToggleSwitch from '../components/ToggleSwitch';
import AddEditFormCSS from './../styles/addEditForm.module.css';
import { useHistory } from 'react-router';
import AddEditDropzone from '../components/AddEditDropzone';
import axios from 'axios';

const CREATE_SURVEY = gql`
  mutation createSurvey(
    $survName: String!
    $survPicURL: String!
    $survDesc: String
    $survTarget: Int!
    $survStatus: Boolean!
  ) {
    createSurvey(
      name: $survName
      picURL: $survPicURL
      description: $survDesc
      target: $survTarget
      status: $survStatus
    ) {
      name
      picURL
      description
      target
      status
    }
  }
`;

const AddEditForm = ({ loggedInAs, setLoggedInAs, setIsAuth }) => {
  const [image, setImage] = useState('');
  const [createSurvey] = useMutation(CREATE_SURVEY);
  const history = useHistory();

  return (
    <div>
      <AppHeader
        loggedInAs={loggedInAs}
        setLoggedInAs={setLoggedInAs}
        setIsAuth={setIsAuth}
        title="My Surveys"
      />
      <div className={AddEditFormCSS.form_wrapper}>
        <form
          className={AddEditFormCSS.form}
          onSubmit={async (e) => {
            e.preventDefault();

            let survey_name = document.getElementById('survey_name').value;
            let survey_target = document.getElementById('survey_target').value;
            let survey_description =
              document.getElementById('survey_desc').value;
            let survey_status =
              document.getElementById('survey_status').checked;
            createSurvey({
              variables: {
                survName: survey_name,
                survPicURL: image,
                survDesc: survey_description,
                survTarget: parseInt(survey_target),
                survStatus: survey_status,
              },
            }).catch((err) => console.error(err));
            history.goBack();
          }}
        >
          <h1>Basic Settings</h1>
          <div className={AddEditFormCSS.label_input_wrapper}>
            <FormLabelInput
              id="survey_name"
              label="Type Survey Name here.."
              type="text"
            />
          </div>
          <div className={AddEditFormCSS.label_input_wrapper}>
            <FormLabelInput
              id="survey_target"
              label="Type Survey Target.."
              type="number"
              min="1"
              max="20"
            />
          </div>
          <div className={AddEditFormCSS.label_input_wrapper}>
            <label htmlFor="ta-desc">Please Type Survey Description</label>
            <textarea id="survey_desc" name="ta-desc"></textarea>
          </div>
          <div>
            <label>Upload a cover picture</label>
            <AddEditDropzone setImage={setImage} />
            <p>{image}</p>
          </div>
          <h1>Advanced Settings</h1>
          <div className={AddEditFormCSS.published_toggler}>
            <label htmlFor="togglePublished">Published</label>
            <ToggleSwitch id="survey_status" name="togglePublished" />
          </div>
          <input
            className={AddEditFormCSS.hidden}
            id="submitAddEditForm"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AddEditForm;
