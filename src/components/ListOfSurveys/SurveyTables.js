import React, { useEffect, useState } from 'react';
import SurveyTablesCSS from './../../styles/surveyTables.module.css';
import _ from 'lodash';
import MOCK_DATA from '../../assets/MOCK_DATA.json';
import SurveyTable from './SurveyTable';

const SurveyTables = () => {
  const [myFavoriteSurveys, setMyFavoriteSurveys] = useState([1, 3, 4, 6]);
  const [myFavSurveysList, setMyFavSurveysList] = useState([]);
  const [otherCampaigns, setOtherCampaigns] = useState([]);

  useEffect(() => {
    const favSurvers = MOCK_DATA.filter((x) =>
      myFavoriteSurveys.includes(x.id)
    );
    setMyFavSurveysList(favSurvers);
  }, [myFavoriteSurveys]);

  useEffect(() => {
    const otherCampaigns = MOCK_DATA.filter(
      (x) => !myFavoriteSurveys.includes(x.id)
    );
    setOtherCampaigns(otherCampaigns);
  }, [myFavoriteSurveys]);

  const addSurveyToFav = (index) => {
    if (!myFavoriteSurveys.includes(otherCampaigns[index].id)) {
      const newFavSurveys = _.concat(
        myFavoriteSurveys,
        otherCampaigns[index].id
      );
      setMyFavoriteSurveys(newFavSurveys);
    }
  };

  const removeSurveyFromFav = (index) => {
    if (myFavoriteSurveys.includes(myFavSurveysList[index].id)) {
      const newFavSurveys = _.remove(
        myFavoriteSurveys,
        (x) => x !== myFavSurveysList[index].id
      );
      setMyFavoriteSurveys(newFavSurveys);
    }
  };

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
