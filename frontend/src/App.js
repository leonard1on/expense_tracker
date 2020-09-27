import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Home from "./Views/Home";
import Accounts from "./Views/Accounts";

import NavBar from "./Components/Navbar";

function App() {
  return (
    <Router>
      <NavBar />
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/accounts" exact>
        <Accounts />
      </Route>
    </Router>
  );
}

export default App;
