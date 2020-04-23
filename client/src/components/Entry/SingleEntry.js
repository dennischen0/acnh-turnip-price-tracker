import React, { useState, useEffect } from "react";
import { Form, Col } from 'react-bootstrap'

import "../../App.scss";

const SingleEntry = ({label, initValue, onChange}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if(initValue) {
      setValue(initValue);
    }
  }, [initValue])

  const handleChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value.toString().length > 4) {
      return;
    }
    if (e.target.value === '' || re.test(e.target.value)) {
      setValue(e.target.value);
      onChange(parseInt(e.target.value))
    }
  }

  return (
    <Form.Group className={'entry'} as={Col}>
      <Form.Label>
        {label}
      </Form.Label>
      <Form.Control 
        type="number"
        value={value}
        onChange={(e) => handleChange(e)}
      />
    </Form.Group>
  )
};

export default SingleEntry;
