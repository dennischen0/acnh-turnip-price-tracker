import React from "react";
import NavBar from "./components/NavBar";

// New - import the React Router components, and the Profile page component
import { Router, Route, Switch } from "react-router-dom";

// pages
import Home from "./components/Home";
import Profile from "./components/Profile";

// auth
import history from "./utils/history";
import { useAuth0 } from "./react-auth0-spa";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";

import "./App.scss";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

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