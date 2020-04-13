import React from "react";

import { Container, Row, Col, Form } from 'react-bootstrap'
import DailyEntry from "./DailyEntry";
import SingleEntry from "./SingleEntry";


class WeeklyEntry extends React.Component {
  constructor(props) {
    super(props);
    this.priceMap = {};
    this.buyPrice = 0;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    days.forEach(day => this.priceMap[day] = {'AM':0, 'PM':0})

  }

  handleChange(result, day) {
    this.priceMap[day] = result;
    console.log(this.priceMap)
    this.props.onChange(this.buyPrice, this.priceMap)
  }

  changeBuyPrice(result) {
    this.buyPrice = result;
    this.props.onChange(this.buyPrice, this.priceMap)
  }

  render() {
    return (
      <Container className={'weekly-entry'} sm={10}>
        <h3 className={'title'}>
          Turnip Prices
        </h3>
        <SingleEntry
          label={'Buy Price'}
          onChange={(result)=> this.changeBuyPrice(result)}
        />
        <Row>
          {Array.from(Object.keys(this.priceMap)).map((day) => {
            return (
              <Col className={'entry'} key={day} sm={4} md={3} lg={2}>
                <DailyEntry
                  day={day}
                  times={this.priceMap[day]}
                  onChange={(result)=> this.handleChange(result, day)}
                />
              </Col>
            )
          })}
        </Row>
      </Container>

    );
  }
}

// const WeeklyEntry = ({onChange}) => {
//   const prices = new Array(13);

//   const updatePrices = (e) => {
//     console.log("GOT NEW PRICES");
//     // prices = newPrices.slice(1);
//     console.log(e.target.value)
//     // setPrices(newPrices)
//   };


//   return (
//     <FormGroup>
//       <FormControl
//         onChange={updatePrices.bind(this)}
//       />
//     </FormGroup>
//   );
// };


export default WeeklyEntry;