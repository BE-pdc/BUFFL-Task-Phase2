import React from 'react';
import { useHistory, withRouter } from 'react-router';
import SurveyTables from '../components/ListOfSurveys/SurveyTables';
import AppHeader from './../components/AppHeader';
import ListOfSurveysCSS from './../styles/listOfSurveys.module.css';

const ListOfSurveys = ({ loggedInAs, setLoggedInAs, setIsAuth }) => {
  let history = useHistory();

  const openAddEditForm = () => {
    history.push('/add-edit-form', {
      isEditing: false,
    });
  };

  return (
    <div>
      <AppHeader
        loggedInAs={loggedInAs}
        setLoggedInAs={setLoggedInAs}
        setIsAuth={setIsAuth}
      />
      <div className={ListOfSurveysCSS.my_surveys}>
        <div className={ListOfSurveysCSS.title_btn_new_survey}>
          <h1>My Surveys</h1>
          <button
            onClick={() => openAddEditForm()}
            className={ListOfSurveysCSS.btn_new_survey}
          >
            <span className={ListOfSurveysCSS.plus}>+</span>
            <span>New survey</span>
          </button>
        </div>
        <SurveyTables />
      </div>
    </div>
  );
};

export default withRouter(ListOfSurveys);
