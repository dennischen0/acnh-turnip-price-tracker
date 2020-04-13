import React from "react";

import { Form, Col } from 'react-bootstrap'

import "../../App.scss";
class SingleEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}
  }

  handleChange(e){
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
       this.setState({value: e.target.value})
       this.props.onChange(parseInt(e.target.value))
    }
 }

  render() {
    return (
        <Form.Group className={'entry'} as={Col}>
          <Form.Label>
            {this.props.label}
          </Form.Label>
          <Form.Control 
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
        </Form.Group>
    );
  }
}

export default SingleEntry;
