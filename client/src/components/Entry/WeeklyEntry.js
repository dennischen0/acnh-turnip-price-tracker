import React, { useRef, useEffect, useState } from "react";

import { Container, Row, Col } from 'react-bootstrap'
import DailyEntry from "./DailyEntry";
import SingleEntry from "./SingleEntry";


const WeeklyEntry = ({initPrices, onChange}) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [weeklyPrices, setWeeklyPrices] = useState({});
  const weeklyEntryArray = useRef([]);

  useEffect(() => {
    if(initPrices) {
      setWeeklyPrices(initPrices);
    }
  }, [initPrices])

  const handleChange = (result, day) => {
    day = day.toLowerCase();
    weeklyPrices[day] = result
    setWeeklyPrices(weeklyPrices);
    getArray();

    onChange(weeklyPrices, weeklyEntryArray.current);
  }

  const getArray = () => {
    var result = ['buyPrice' in weeklyPrices ? weeklyPrices.buyPrice : 0 ];
    days.map((day) => {
      day = day.toLowerCase();
      if(!(day in weeklyPrices)) {
        return result;
      }
      result = result.concat(weeklyPrices[day].AM);
      result = result.concat(weeklyPrices[day].PM);
      return result;
    })
    weeklyEntryArray.current = result;
  }

  const changeBuyPrice = (result) => {
    weeklyPrices['buyPrice'] = result;
    setWeeklyPrices(weeklyPrices);
    getArray();
    onChange(weeklyPrices, weeklyEntryArray.current);
  }
  
  return (
    <Container className={'weekly-entry'}>
      <h3 className={'title'}>
        Turnip Prices
      </h3>
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