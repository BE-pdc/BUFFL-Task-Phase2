import React, { useEffect, useState } from 'react';
import SurveyTablesCSS from './../../styles/surveyTables.module.css';
import _ from 'lodash';
import MOCK_DATA from '../../assets/MOCK_DATA.json';
import SurveyTable from './SurveyTable';
import { gql, useQuery } from '@apollo/client';

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

const SurveyTables = () => {
  const { loading, error, data } = useQuery(GET_SURVEYS);
  const [myFavoriteSurveys, setMyFavoriteSurveys] = useState([]);
  const [myFavSurveysList, setMyFavSurveysList] = useState([]);
  const [otherCampaigns, setOtherCampaigns] = useState([]);

  useEffect(() => {
    if (data) {
      const favSurvers = data.surveys.filter((x) =>
        myFavoriteSurveys.includes(x._id)
      );
      setMyFavSurveysList(favSurvers);
    }
  }, [myFavoriteSurveys, data]);

  useEffect(() => {
    if (data) {
      const otherCampaigns = data.surveys.filter(
        (x) => !myFavoriteSurveys.includes(x._id)
      );
      setOtherCampaigns(otherCampaigns);
    }
  }, [myFavoriteSurveys, data]);

  const addSurveyToFav = (index) => {
    if (!myFavoriteSurveys.includes(otherCampaigns[index]._id)) {
      const newFavSurveys = _.concat(
        myFavoriteSurveys,
        otherCampaigns[index]._id
      );
      setMyFavoriteSurveys(newFavSurveys);
    }
  };

  const removeSurveyFromFav = (index) => {
    if (myFavoriteSurveys.includes(myFavSurveysList[index]._id)) {
      const newFavSurveys = _.remove(
        myFavoriteSurveys,
        (x) => x !== myFavSurveysList[index]._id
      );
      setMyFavoriteSurveys(newFavSurveys);
    }
  };

  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  return (
    <div className={SurveyTablesCSS.surveys_table}>
      <h2>Favorites</h2>
      <SurveyTable
        dataToDisplay={myFavSurveysList}
        removeSurveyFromFav={removeSurveyFromFav}
        showStar={true}
        noDataText="No Favorites"
      />
      <h2>Other campaigns</h2>
      <SurveyTable
        dataToDisplay={otherCampaigns}
        addSurveyToFav={addSurveyToFav}
        showStar={false}
        noDataText="No Other Campaigns"
      />
    </div>
  );
};

export default SurveyTables;
