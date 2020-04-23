import React, { useState, useEffect } from "react";
import Chart from "../components/Chart";
import WeeklyEntry from "../components/Entry/WeeklyEntry";
import { Container } from 'react-bootstrap'
import { useAuth0 } from "../react-auth0-spa";
var constants = require('../utils/constants');

const Home = () => {
  const { user } = useAuth0();
  const { isAuthenticated, getTokenSilently } = useAuth0();
  const [prices, setPrices] = useState({});
  const [filter, setFilter] = useState([]);
  const [fetchComplete, updateFetchComplete] = useState(false);

  useEffect(() => {
    fetchFromDB();
  }, [])

  //need to fix problem with quickly entering data.
  const saveIntoDB = async (weeklyEntry) => {
    console.log("Attempting to save data");
    if (!isAuthenticated || !fetchComplete) return;
    try {
      const token = await getTokenSilently();

      await fetch(`${constants.API_SERVER}/api/entries`, {
        method: 'POST',
        body: JSON.stringify(weeklyEntry),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log("Data posted");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFromDB = async () => {
    if (!isAuthenticated) return;
    try {
      const token = await getTokenSilently();
      console.log()

      const response = await fetch(`${constants.API_SERVER}/api/entries/${user.sub}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });

      const responseData = await response.json();
      setPrices(responseData);
      setFilter(getArray(responseData));
      updateFetchComplete(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getArray = (weeklyPrices) => {
    var result = ['buyPrice' in weeklyPrices ? weeklyPrices.buyPrice : 0 ];
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => {
      day = day.toLowerCase();
      if(!(day in weeklyPrices)) {
        return result;
      }
      result = result.concat(weeklyPrices[day].AM);
      result = result.concat(weeklyPrices[day].PM);
      return result;
    })
    return result;
  }

  const updatePrices = (weeklyEntry) => {
    setPrices(weeklyEntry)
    setFilter(getArray(weeklyEntry));
    saveIntoDB(weeklyEntry);
  }

  return (
    <Container>
      <WeeklyEntry 
        initPrices={prices}
        onChange={(weeklyEntry) => updatePrices(weeklyEntry)} 
      />
      <Chart filter={filter}/>
    </Container>
  );
};
export default Home;
