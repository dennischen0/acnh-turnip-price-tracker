import React, { useState, useEffect } from "react";
import Chart from "../components/Chart";
import WeeklyEntry from "../components/Entry/WeeklyEntry";
import AllEntries from "../components/AllEntries";
import { Container } from 'react-bootstrap'
import { useAuth0 } from "../react-auth0-spa";
var constants = require('../utils/constants');

const Home = () => {
  const { user } = useAuth0();
  const { isAuthenticated, getTokenSilently } = useAuth0();
  const [prices, setPrices] = useState({});
  const [priceUpdated, setPriceUpdated] = useState(false);
  const [fetchComplete, updateFetchComplete] = useState(false);

  useEffect(() => {
    fetchFromDB();
  }, [])

  //what the fuck is this?
  useEffect(() => {
    setPriceUpdated(false)
    setPrices(prices)
  }, [priceUpdated])

  //need to fix problem with quickly entering data.
  const saveIntoDB = async (weeklyEntry) => {
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
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFromDB = async () => {
    if (!isAuthenticated) return;
    try {
      const token = await getTokenSilently();

      const response = await fetch(`${constants.API_SERVER}/api/entries/${user.sub}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });
      console.log(response)

      if(response.status === 200) {
        const responseData = await response.json();
        setPrices(responseData);
      }

      updateFetchComplete(true);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePrices = (weeklyEntry) => {
    console.log("update prices")
    setPrices(weeklyEntry);
    setPriceUpdated(true)
    saveIntoDB(weeklyEntry);
  }

  return (
    <Container>
      <AllEntries/>
      <Chart 
        prices={prices}
      />
      <WeeklyEntry 
        initPrices={prices}
        onChange={(weeklyEntry) => updatePrices(weeklyEntry)} 
      />
    </Container>
  );
};
export default Home;
