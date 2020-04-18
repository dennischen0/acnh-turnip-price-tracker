import React from "react";

import { Container, Row, Col, Form } from 'react-bootstrap'
import DailyEntry from "./DailyEntry";
import SingleEntry from "./SingleEntry";
import WeeklyEntryModel from "../../model/weeklyEntryModel"
import DailyEntryModel from "../../model/dailyEntryModel"


class WeeklyEntry extends React.Component {
  constructor(props) {
    super(props);
    this.priceMap = {};
    this.buyPrice = 0;
    this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.weeklyEntry = new WeeklyEntryModel();
  }

  handleChange(result, day) {
    switch(day) {
      case 'Monday':
        this.weeklyEntry.setMonday(result);
        console.log("set monday");
        break;
      case 'Tuesday':
        this.weeklyEntry.setTuesday(result);
        break;
      case 'Wednesday':
        this.weeklyEntry.setWednesday(result);
        break;
      case 'Thursday':
        this.weeklyEntry.setThursday(result);
        break;
      case 'Friday':
        this.weeklyEntry.setFriday(result);
        break;
      case 'Saturday':
        this.weeklyEntry.setSaturday(result);
        break;
    }
    this.props.onChange(this.weeklyEntry)
  }

  changeBuyPrice(result) {
    this.weeklyEntry.setBuyPrice(result);
    this.props.onChange(this.weeklyEntry)
  }

  render() {
    return (
      <Container className={'weekly-entry'}>
        <h3 className={'title'}>
          Turnip Prices
        </h3>
        <SingleEntry
          label={'Buy Price'}
          onChange={(result)=> this.changeBuyPrice(result)}
        />
        <Row>
          {this.days.map((day) => {
            return (
              <Col className={'entry'} key={day} sm={4} md={3} lg={2}>
                <DailyEntry
                  day={day}
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