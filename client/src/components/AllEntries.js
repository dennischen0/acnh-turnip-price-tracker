import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import Chart from "../components/Chart";
import { Container, Accordion, Card } from 'react-bootstrap';

var constants = require('../utils/constants');

const AllEntries = () => {
  const { getTokenSilently, user } = useAuth0();
  const [allEntries, setAllEntries] = useState([]);

  useEffect(() => {
    fetchFromDB();
  }, [])
  
  const fetchFromDB = async () => {
    try {
      // const token = await getTokenSilently();

      const response = await fetch(`${constants.API_SERVER}/api/entries`, {
        method: 'GET',
        headers: {
          // Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });

      const responseData = await response.json();
      setAllEntries(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className={'accordion-body'}>
      <Accordion>
        {allEntries.map((entry) => {
          if(!user || entry.userName !== user.name){
            return (
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey={entry.userName}>
                  {entry.userName}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={entry.userName}>
                  <Card.Body>
                    <Chart prices={entry}/>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            )
          }

        })}
      </Accordion>
    </Container>
  );
}

export default AllEntries;