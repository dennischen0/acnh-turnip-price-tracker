import React, { useState, useEffect } from "react";

import { Row, Col, Container } from 'react-bootstrap'
import SingleEntry from "./SingleEntry";

const DailyEntry = ({day, initValue, onChange}) => {
  const times = ['AM', 'PM'];
  const [dailyEntry, setDailyEntry] = useState({AM:0, PM:0});

  useEffect(() => {
    if(initValue) {
      setDailyEntry(initValue)
    }
  }, [initValue])

  const handleChange = (result, time) => {
    dailyEntry[time] = result;
    setDailyEntry(dailyEntry);
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
                initValue={dailyEntry[timeOfDay] === 0 ? '' : dailyEntry[timeOfDay]}
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