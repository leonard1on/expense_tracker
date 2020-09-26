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
      <br />
      <Route path="/" exact component={Home} />
      <Route path="/accounts" exact component={Accounts} />
    </Router>
  );
}

export default App;
