import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  const [expenses, setExpenses] = [];

  const getExpenses = () => {
    if (!isAuthenticated) return;
    axios.get("http://localhost:8080/expenses/uid/" + user.sub).then((res) => {
      setExpenses(
        res.data.map((acc) => {
          return acc;
        })
      );
    });
  };

  return (
    <Container>
      <h2>Expense Tracker</h2>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Home;
