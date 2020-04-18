import React, {useState} from "react";
import Chart from "../components/Chart";
import WeeklyEntry from "../components/Entry/WeeklyEntry";
import { Container } from 'react-bootstrap'
import { useAuth0 } from "../react-auth0-spa";
var constants = require('../utils/constants');

const Home = () => {
  const { getTokenSilently } = useAuth0();
  const [prices, setPrices] = useState("");

  const saveIntoDB = async (buyPrice, prices) => {
    const apiPort = process.env.NODE_ENV === 'production' ? process.env.PORT : 8080;

    console.log(`API PORT= ${process.env.NODE_ENV}${apiPort}`)
    try {
      const data = Object.assign({buyPrice: buyPrice}, prices);
      const token = await getTokenSilently();
      console.log(data)

      const response = await fetch(`${constants.API_SERVER}/api/entries`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const responseData = await response.json();

    } catch (error) {
      console.error(error);
    }
  };

  const fetchFromDB = async (buyPrice, prices) => {
    try {
      const data = Object.assign({buyPrice: buyPrice}, prices);
      const token = await getTokenSilently();
      console.log(data)

      const response = await fetch(`${constants.API_SERVER}/api/entries`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const responseData = await response.json();

    } catch (error) {
      console.error(error);
    }
  };

  const updatePrices = (buyPrice, prices) => {
    let result = []
    result = result.concat(buyPrice)
    Array.from(Object.keys(prices)).map((day) => {
      result = result.concat(prices[day]["AM"] ? prices[day]["AM"] : 0)
      result = result.concat(prices[day]["PM"] ? prices[day]["PM"] : 0)
      return result;
    })

    setPrices(prices)
    
    saveIntoDB(buyPrice, prices);
  }

  return (
    <Container>
      <WeeklyEntry onChange={(buyPrice, prices) => updatePrices(buyPrice, prices)} />
      <Chart filter={prices}/>
    </Container>
  );
};
export default Home;
