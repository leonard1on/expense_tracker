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
  Table,
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
  const [accounts, setAccounts] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth());

  const getExpenses = () => {
    if (!isAuthenticated) return;
    axios
      .get("http://localhost:8080/expenses/reports/" + user.sub)
      .then((res) => {
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

  const getAccounts = () => {
    if (!isAuthenticated) return;
    axios.get("http://localhost:8080/accounts/uid/" + user.sub).then((res) => {
      setAccounts(
        res.data.map((acc) => {
          return acc;
        })
      );
    });
  };

  useEffect(() => {
    getExpenses();
  }, [month]);

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <Container>
      <h2>Expense Tracker</h2>
      {isAuthenticated ? (
        <>
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
          <br />
          <Row>
            <Col>
              {expenses ? (
                <Table>
                  <colgroup>
                    <col span="1" style={{ width: "25%" }} />
                    <col span="1" style={{ width: "25%" }} />
                    <col span="1" style={{ width: "25%" }} />
                    <col span="1" style={{ width: "25%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>Account Name</th>
                      <th>Amount Available</th>
                      <th>Use Frecuency</th>
                      <th>Total Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.map((acc) => {
                      const exp = expenses.find((e) => {
                        if (e) return e.accId === acc._id;
                      });
                      return (
                        <tr key={acc._id}>
                          <td>{acc.name}</td>
                          <td>{acc.type}</td>
                          <td>{exp ? exp.description.length : 0}</td>
                          <td>{exp ? exp.amount : 0}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : null}
            </Col>
          </Row>
        </>
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
