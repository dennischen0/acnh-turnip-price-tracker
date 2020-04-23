import React, { useState, useEffect } from "react";
import Chart from "../components/Chart";
import WeeklyEntry from "../components/Entry/WeeklyEntry";
import { Container } from 'react-bootstrap'
import { useAuth0 } from "../react-auth0-spa";
var constants = require('../utils/constants');

const Home = () => {
  const { isAuthenticated, getTokenSilently } = useAuth0();
  const [prices, setPrices] = useState("");
  const [filter, setFilter] = useState("");
  const [fetchComplete, updateFetchComplete] = useState(false);

  useEffect(() => {
    fetchFromDB();
  }, [])

  // useEffect(()=> {
  //   console.log("price change");
  //   console.log(prices);
  // }, [prices])

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

      const response = await fetch(`${constants.API_SERVER}/api/entries`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });

      const responseData = await response.json();
      setPrices(responseData);
      updateFetchComplete(true);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePrices = (weeklyEntry, weeklyEntryArray) => {
    let graphData = []
    graphData = graphData.concat(weeklyEntry.buyPrice);
    setFilter(weeklyEntryArray);
    saveIntoDB(weeklyEntry);
  }

  return (
    <Container>
      <WeeklyEntry 
        initPrices={prices}
        onChange={(weeklyEntry, weeklyEntryArray) => updatePrices(weeklyEntry, weeklyEntryArray)} 
      />
      <Chart filter={filter}/>
    </Container>
  );
};
export default Home;
