import React, { useRef, useEffect } from "react";

import { Container, Row, Col } from 'react-bootstrap'
import DailyEntry from "./DailyEntry";
import SingleEntry from "./SingleEntry";


const WeeklyEntry = ({prices, onChange}) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weeklyEntry = useRef({});
  const weeklyEntryArray = useRef([]);

  useEffect(() => {
    weeklyEntry.current.buyPrice = prices.buyPrice
  }, [])

  const handleChange = (result, day) => {
    switch(day) {
      case 'Monday':
        weeklyEntry.current.monday = result;
        break;
      case 'Tuesday':
        weeklyEntry.current.tuesday = result;
        break;
      case 'Wednesday':
        weeklyEntry.current.wednesday = result;
        break;
      case 'Thursday':
        weeklyEntry.current.thursday = result;
        break;
      case 'Friday':
        weeklyEntry.current.friday = result;
        break;
      case 'Saturday':
        weeklyEntry.current.saturday = result;
        break;
      default:
        break;
    }
    getArray();
    onChange(weeklyEntry.current, weeklyEntryArray.current);
  }

  const getArray = () => {
    var result = ['buyPrice' in weeklyEntry.current ? weeklyEntry.current.buyPrice : 0 ];
    days.map((day) => {
      day = day.toLowerCase();
      if(!(day in weeklyEntry.current)) {
        return result;
      }
      result = result.concat(weeklyEntry.current[day].AM);
      result = result.concat(weeklyEntry.current[day].PM);
      return result;
    })
    weeklyEntryArray.current = result;
  }

  const changeBuyPrice = (result) => {
    weeklyEntry.current.buyPrice = result;
    getArray();
    onChange(weeklyEntry.current, weeklyEntryArray.current);
  }
  
  return (
    <Container className={'weekly-entry'}>
      <h3 className={'title'}>
        Turnip Prices
      </h3>
      <SingleEntry
        label={'Buy Price'}
        onChange={(result) => changeBuyPrice(result)}
      />
      <Row>
        {days.map((day) => {
          return (
            <Col className={'entry'} key={day} sm={4} md={3} lg={2}>
              <DailyEntry
                day={day}
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