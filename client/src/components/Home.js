import React, { Fragment, useState } from "react";
import Week from "../components/Week";
import Chart from "../components/Chart";
import WeeklyEntry from "../components/WeeklyEntry";

const Home = () => {
  const [prices, setPrices] = useState(new Array(13));

  const updatePrices = (newPrices) => {
    console.log("GOT NEW PRICES");
    // prices = newPrices.slice(1);
    console.log(prices)
    setPrices(newPrices)
  };

  return (
    <>
      <WeeklyEntry onChange={updatePrices} />
      <Chart filter={prices} />
    </>
  );
};

export default Home;
