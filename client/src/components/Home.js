import React from "react";
import Chart from "../components/Chart";
import WeeklyEntry from "./Entry/WeeklyEntry";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
    }
  }

  updatePrices(data) {
    let result = []
    Array.from(Object.keys(data)).map((day) => {
      result = result.concat(data[day]["AM"] ? data[day]["AM"] : 0)
      result = result.concat(data[day]["PM"] ? data[day]["PM"] : 0)
      return result;
    })

    console.log(result)
    this.setState({
      prices: [89].concat(result),
    })
  }

  render() {
    return (
      <>
        <WeeklyEntry onChange={(data) => this.updatePrices(data)} />
        <Chart filter={this.state.prices} />
      </>
    );
  }
}

export default Home;
