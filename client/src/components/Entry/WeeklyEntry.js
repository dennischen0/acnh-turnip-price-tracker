import React, { useRef, useEffect, useState } from "react";

import { Container, Row, Col } from 'react-bootstrap'
import DailyEntry from "./DailyEntry";
import SingleEntry from "./SingleEntry";


const WeeklyEntry = ({initPrices, onChange}) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [weeklyPrices, setWeeklyPrices] = useState({});

  useEffect(() => {
    if(initPrices) {
      setWeeklyPrices(initPrices);
    }
  }, [initPrices])

  const handleChange = (result, day) => {
    day = day.toLowerCase();
    weeklyPrices[day] = result
    setWeeklyPrices(weeklyPrices);
    onChange(weeklyPrices);
  }

  const changeBuyPrice = (result) => {
    weeklyPrices['buyPrice'] = result;
    setWeeklyPrices(weeklyPrices);
    onChange(weeklyPrices);
  }
  
  return (
    <Container className={'weekly-entry'}>
      <h2 className={'title'}>
        Turnip Prices
      </h2>
      <SingleEntry
        label={'Buy Price'}
        initValue={weeklyPrices.buyPrice}
        onChange={(result) => changeBuyPrice(result)}
      />
      <Row>
        {days.map((day) => {
          return (
            <Col className={'entry'} key={day} sm={4} md={3} lg={2}>
              <DailyEntry
                day={day}
                initValue={weeklyPrices[day.toLowerCase()]}
                onChange={(result) => handleChange(result, day)}
              />
            </Col>
          )
        })}
      </Row>
    </Container>

  );
}

export default WeeklyEntry;