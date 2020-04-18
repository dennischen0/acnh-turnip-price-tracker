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

  //need to fix problem with quickly entering data.
  const saveIntoDB = async (weeklyEntry) => {
    try {
      const token = await getTokenSilently();

      const response = await fetch(`${constants.API_SERVER}/api/entries`, {
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

  // const fetchFromDB = async (buyPrice, prices) => {
  //   if (!isAuthenticated) return;
  //   try {
  //     const data = Object.assign({buyPrice: buyPrice}, prices);
  //     const token = await getTokenSilently();
  //     console.log(data)

  //     const response = await fetch(`${constants.API_SERVER}/api/entries`, {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         Accept: 'application/json'
  //       }
  //     });

  //     const responseData = await response.json();
  //     // console.log(responseData);

  //     setPrices(responseData);

  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const updatePrices = (weeklyEntry) => {
    console.log(weeklyEntry)
    let graphData = []
    graphData = graphData.concat(weeklyEntry.buyPrice);
    graphData = graphData.concat(weeklyEntry.toPriceArray());
    console.log(graphData)
    setFilter(graphData);
    saveIntoDB(weeklyEntry);
  }

  // useEffect(() => {
  //   // fetchFromDB();
  // }, [dennis])

  return (
    <Container>
      <WeeklyEntry 
        onChange={(weeklyEntry) => updatePrices(weeklyEntry)} 
      />
      <Chart filter={filter}/>
    </Container>
  );
};
export default Home;
