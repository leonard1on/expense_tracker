import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useAuth0 } from "@auth0/auth0-react";

import Home from "./Views/Home";
import Accounts from "./Views/Accounts";
import NavBar from "./Components/Navbar";

const App = () => {
  const { user, isLoading, isAuthenticated } = useAuth0();

  if (isAuthenticated && !isLoading) {
    console.log(user);
  }
  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);
  return (
    <Router>
      <NavBar />
      <br />
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/accounts" exact>
        <Accounts />
      </Route>
    </Router>
  );
};

export default App;
