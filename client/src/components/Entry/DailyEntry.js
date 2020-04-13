import React from "react";

import { Row, Col, Container } from 'react-bootstrap'
import SingleEntry from "./SingleEntry";

class DailyEntry extends React.Component {
  constructor(props) {
    super(props);
    this.day = this.props.day
    this.times = this.props.times
  }

  handleChange(result, time) {
    
    this.times[time] = result;
    // console.log(this.times)

    this.props.onChange(this.times);
  }

  render() {
    return (
      <Container className={'daily-entry'}>
        <h5>
          {this.day}
        </h5>
        <Row>
          {Array.from(Object.keys(this.times)).map((timeOfDay) => {
            return (
              <Col key={timeOfDay}>
                <SingleEntry
                  label={timeOfDay}
                  onChange={(result)=> this.handleChange(result, timeOfDay)}
                />
              </Col>
            )
          })}
        </Row>
      </Container>

        
    );
  }
}

export default DailyEntry;
