import React from "react";
import Chart from "../components/Chart";
import WeeklyEntry from "./Entry/WeeklyEntry";
import { Container } from 'react-bootstrap'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
    }
  }

  updatePrices(buyPrice, prices) {
    let result = []
    result = result.concat(buyPrice)
    Array.from(Object.keys(prices)).map((day) => {
      result = result.concat(prices[day]["AM"] ? prices[day]["AM"] : 0)
      result = result.concat(prices[day]["PM"] ? prices[day]["PM"] : 0)
      return result;
    })

    console.log(result)
    this.setState({
      prices: result,
    })
  }

  render() {
    return (
      <Container>
        <WeeklyEntry onChange={(buyPrice, prices) => this.updatePrices(buyPrice, prices)} />
        <Chart filter={this.state.prices}/>
      </Container>
    );
  }
}

export default Home;
