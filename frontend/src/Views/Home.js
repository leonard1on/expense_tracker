import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const { user, isAuthenticated } = useAuth0();
  const [expenses, setExpenses] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth());

  const getExpenses = () => {
    if (!isAuthenticated) return;
    axios.get("http://localhost:8080/expenses/uid/" + user.sub).then((res) => {
      setExpenses(
        res.data.map((acc) => {
          const accMonth = new Date(acc.createdAt).getMonth();
          if (accMonth === month) {
            return acc;
          }
        })
      );
    });
  };

  useEffect(() => {
    getExpenses();
  }, []);

  useEffect(() => {
    console.log(expenses);
  }, [expenses]);

  return (
    <Container>
      <h2>Expense Tracker</h2>
      {isAuthenticated ? (
        <Row>
          <Col xs="6">
            <h4>This month's expense report of 2020:</h4>
          </Col>
          <Col xs="3">
            <UncontrolledButtonDropdown className="Btn-group">
              <DropdownToggle caret color="success">
                {months[month]}
              </DropdownToggle>
              <DropdownMenu>
                {months.map((mth) => (
                  <DropdownItem
                    key={months.indexOf(mth)}
                    onClick={() => {
                      setMonth(months.indexOf(mth));
                    }}
                  >
                    {mth}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </Col>
        </Row>
      ) : (
        <p style={{ fontSize: "1.2rem" }}>
          Welcome to the Expense Tracker webapp! Once you are signed in, you
          will be able to make accounts, add your expenses and see your monthly
          reports.
        </p>
      )}
    </Container>
  );
};

export default Home;
