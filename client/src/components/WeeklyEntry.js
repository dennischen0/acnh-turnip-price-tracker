import React, { useCallback, useState } from "react";

import { FormGroup, FormControl } from 'react-bootstrap'

const WeeklyEntry = ({onChange}) => {
  const prices = new Array(13);

  const handleChange = useCallback(
    (index) => ({
      target: {
        value,
        validity: { valid },
      },
    }) => {
      if (!valid) return;
      
      prices[index] = value
      console.log(prices)
      onChange(prices);
    },
    [prices, onChange]
  );

  const fields = Array.from({ length: 13 }, (v, i) => i).map((index) => (
    <FormControl
      key={`value-${index}`}
      inputProps={{ pattern: "[0-9]*", tabIndex: 0 }}
      InputLabelProps={{ shrink: true }}
      onChange={handleChange(index)}
    />
  ));



  const names = [
    "Buy Price",
    ..."Mon Tue Wed Thu Fri Sat"
      .split(" ")
      .reduce(
        (curr, day) => [...curr, ...[`${day} ${"AM"}`, `${day} ${"PM"}`]],
        []
      ),
  ];

  return (
    <FormGroup>
      {fields}
    </FormGroup>
  );
};


export default WeeklyEntry;
