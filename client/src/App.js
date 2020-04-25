import React from "react";
import NavBar from "./components/NavBar";

// New - import the React Router components, and the Profile page component
import { Router, Route, Switch } from "react-router-dom";

// pages
import Home from "./views/Home";
import Profile from "./views/Profile";

// auth
import history from "./utils/history";
import { useAuth0 } from "./react-auth0-spa";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";

import "./App.scss";
var constants = require('./utils/constants');

function App() {
  const { loading } = useAuth0();
  const { isAuthenticated, getTokenSilently, user } = useAuth0();

  const checkUser = async () => {
    if (!isAuthenticated) return;
    try {
      const token = await getTokenSilently();

      const response = await fetch(`${constants.API_SERVER}/api/users/${user.sub}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });
      console.log(response.status);
      if(response.status === 404) {
        createUser(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async (response) => {
    try {
      const token = await getTokenSilently();

      await fetch(`${constants.API_SERVER}/api/users`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  checkUser();

  return (
    <div className="App">
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;