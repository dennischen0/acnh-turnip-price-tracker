import React, { useRef } from "react";

import { Row, Col, Container } from 'react-bootstrap'
import SingleEntry from "./SingleEntry";
import DailyEntryModel from "../../model/dailyEntryModel"

const DailyEntry = ({day, onChange}) => {
  const times = ['AM', 'PM'];
  const dailyEntry = useRef(new DailyEntryModel());

  const handleChange = (result, time) => {
    switch (time) {
      case 'AM':
        dailyEntry.current.setAM(result);
        break;
      case 'PM':
        dailyEntry.current.setPM(result);
        break;
    }
    onChange(dailyEntry);
  }
  
  return (
    <Container className={'daily-entry'}>
      <h5>
        {day}
      </h5>
      <Row>
        {times.map((timeOfDay) => {
          return (
            <Col key={timeOfDay}>
              <SingleEntry
                label={timeOfDay}
                onChange={(result) => handleChange(result, timeOfDay)}
              />
            </Col>
          )
        })}
      </Row>
    </Container>

      
  );
}

export default DailyEntry;