// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";

import {Navbar, Nav, Button} from 'react-bootstrap'

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (

    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">ACNH Turnip Price Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          {!isAuthenticated && (
            <Button variant="outline-success" onClick={() => loginWithRedirect({})}>Log in</Button>
          )}
          {isAuthenticated && (
            <>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/external-api">External API</Nav.Link>
              <Button variant="outline-success" onClick={() => logout()}>Log out</Button>

            </>
          )}
        </Navbar.Collapse>

      </Navbar>
    </div>
  );
};

export default NavBar;