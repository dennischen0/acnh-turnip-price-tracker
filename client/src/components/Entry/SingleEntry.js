import React, { useState } from "react";
import { Form, Col } from 'react-bootstrap'

import "../../App.scss";

const SingleEntry = ({label, onChange}) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const re = /^[0-9\b]+$/;
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
        value={value}
        onChange={(e) => handleChange(e)}
      />
    </Form.Group>
  )
};

export default SingleEntry;
