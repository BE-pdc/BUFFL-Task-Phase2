import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import FormLabelInput from '../components/AccountForms/FormLabelInput';
import AppHeader from '../components/AppHeader';
import ToggleSwitch from '../components/ToggleSwitch';
import AddEditFormCSS from './../styles/addEditForm.module.css';
import { useHistory } from 'react-router';
import AddEditDropzone from '../components/AddEditDropzone';

const GET_SURVEYS = gql`
  query GetSurveys {
    surveys {
      _id
      name
      picURL
      created
      description
      target
      responses
      status
    }
  }
`;

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

const UPDATE_SURVEY = gql`
  mutation updateSurvey(
    $survId: ID!
    $survName: String!
    $survPicURL: String!
    $survCreated: String!
    $survDesc: String
    $survTarget: Int!
    $survResponses: Int!
    $survStatus: Boolean!
  ) {
    updateSurvey(
      id: $survId
      input: {
        name: $survName
        picURL: $survPicURL
        created: $survCreated
        description: $survDesc
        target: $survTarget
        responses: $survResponses
        status: $survStatus
      }
    ) {
      _id
      name
      created
      picURL
      description
      target
      responses
      status
    }
  }
`;

const AddEditForm = ({ loggedInAs, setLoggedInAs, setIsAuth }) => {
  const [editing, setEditing] = useState();
  const [image, setImage] = useState('');
  const [createSurvey] = useMutation(CREATE_SURVEY, {
    refetchQueries: [
      {
        query: GET_SURVEYS,
      },
    ],
  });
  const [updateSurvey] = useMutation(UPDATE_SURVEY, {
    refetchQueries: [
      {
        query: GET_SURVEYS,
      },
    ],
  });
  const history = useHistory();

  useEffect(() => {
    if (history.location.state.isEditing !== null) {
      setEditing(history.location.state.isEditing);
    }
  }, [history.location.state.isEditing]);

  useEffect(() => {
    if (history.location.state.picURL !== null) {
      setImage(history.location.state.picURL);
    }
  }, [history.location.state.picURL]);

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

            if (!editing) {
              createSurvey({
                variables: {
                  survName: survey_name,
                  survPicURL: image,
                  survDesc: survey_description,
                  survTarget: parseInt(survey_target),
                  survStatus: survey_status,
                },
              }).catch((err) => console.error(err));
            } else {
              updateSurvey({
                variables: {
                  survId: history.location.state._id,
                  survName: survey_name,
                  survCreated: new Date(Date.now()).toLocaleString(),
                  survPicURL: image,
                  survDesc: survey_description,
                  survTarget: parseInt(survey_target),
                  survResponses: history.location.state.responses,
                  survStatus: survey_status,
                },
              });
            }
            history.goBack();
          }}
        >
          <h1>Basic Settings</h1>
          <div className={AddEditFormCSS.label_input_wrapper}>
            <FormLabelInput
              id="survey_name"
              label="Type Survey Name here.."
              txt={history.location.state.name}
              type="text"
            />
          </div>
          <div className={AddEditFormCSS.label_input_wrapper}>
            <FormLabelInput
              id="survey_target"
              label="Type Survey Target.."
              txt={history.location.state.target}
              type="number"
              min="1"
              max="20"
            />
          </div>
          <div className={AddEditFormCSS.label_input_wrapper}>
            <label htmlFor="ta-desc">Please Type Survey Description</label>
            <textarea
              id="survey_desc"
              name="ta-desc"
              defaultValue={history.location.state.description}
            ></textarea>
          </div>
          <div>
            <label>Upload a cover picture</label>
            <AddEditDropzone
              editing={editing}
              image={image}
              setImage={setImage}
            />
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
