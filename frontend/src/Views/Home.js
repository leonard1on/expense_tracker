import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
