import React, { Fragment } from "react";
import Week from "../components/Week";
import Chart from "../components/Chart";

const Home = () => {

  var prices = new Array(13)
  prices[0] =97
  prices[1] =85
  prices[2] =81
  prices[3] =76
  prices[4] =72
  prices[5] =133
  prices[6] =188
  return (
    <>
      <Chart filter={prices} />
    </>
  );
};

export default Home;
