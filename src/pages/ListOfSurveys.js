import React from 'react';
import SurveyTables from '../components/ListOfSurveys/SurveyTables';
import AppHeader from './../components/AppHeader';
import ListOfSurveysCSS from './../styles/listOfSurveys.module.css';

const ListOfSurveys = () => {
  return (
    <div>
      <AppHeader />
      <div className={ListOfSurveysCSS.my_surveys}>
        <div className={ListOfSurveysCSS.title_btn_new_survey}>
          <h1>My Surveys</h1>
          <button
            onClick={() => console.log('new survey')}
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

export default ListOfSurveys;