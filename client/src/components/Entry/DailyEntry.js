import React, { useRef, useEffect } from "react";

import { Row, Col, Container } from 'react-bootstrap'
import SingleEntry from "./SingleEntry";

const DailyEntry = ({day, onChange}) => {
  const times = ['AM', 'PM'];
  const dailyEntry = useRef({AM:0, PM:0});

  const handleChange = (result, time) => {
    switch (time) {
      case 'AM':
        dailyEntry.current.AM = result;
        break;
      case 'PM':
        dailyEntry.current.PM = result;
        break;
      default:
        break;
    }
    onChange(dailyEntry.current);
  }

  useEffect(() => {
    onChange(dailyEntry.current);
  }, [dailyEntry]);
  
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