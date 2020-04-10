// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link,NavLink } from "react-router-dom";

import {Navbar, Nav, NavItem, Button} from 'react-bootstrap'

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (

    <div>
      <Navbar bg="light">
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
              <NavItem>
                <NavLink
                  to="/profile"
                  activeClassName="router-link-exact-active"
                >
                  Profile
                </NavLink>
              </NavItem>
              <Button variant="outline-success" onClick={() => logout()}>Log out</Button>

            </>
          )}
        </Navbar.Collapse>

      </Navbar>
    </div>


    // <div>


    //   

          
    //   {isAuthenticated && (
    //     <span>
    //       <Link to="/">Home</Link>&nbsp;
    //       <Link to="/profile">Profile</Link>
    //     </span>
    //   )}
    // </div>
  );
};

export default NavBar;