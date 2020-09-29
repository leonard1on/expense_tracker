import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Container,
  Row,
  Col,
  Table,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

const MyExpenses = () => {
  const { user, isAuthenticated } = useAuth0();
  const [expenses, setExpenses] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);

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

  const getCategories = () => {
    axios.get("http://localhost:8080/categories/").then((res) => {
      setCategories(
        res.data.map((cat) => {
          return cat;
        })
      );
    });
  };

  useEffect(() => {
    getExpenses();
    getAccounts();
    getCategories();
  }, []);

  useEffect(() => {
    console.log(accounts);
  }, [accounts]);

  return (
    <Container>
      <h2>My Expenses</h2>
      {isAuthenticated ? (
        <Table>
          <colgroup>
            <col span="1" style={{ width: "20%" }} />
            <col span="1" style={{ width: "15%" }} />
            <col span="1" style={{ width: "15%" }} />
            <col span="1" style={{ width: "30%" }} />
            <col span="1" style={{ width: "20%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Account Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, index) => {
              return (
                <tr key={exp._id}>
                  <td>
                    {accounts.find((acc) => acc._id === exp.accId)
                      ? accounts.find((acc) => acc._id === exp.accId).name
                      : null}
                  </td>
                  <td>
                    {categories.find((cat) => cat._id === exp.catId)
                      ? categories.find((cat) => cat._id === exp.catId).name
                      : null}
                  </td>
                  <td>{exp.amount}</td>
                  <td>{exp.description}</td>
                  <td>
                    <Button color="danger" onClick={() => {}}>
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <Row>
          <Col>
            <p>
              Register first to see your account expenses! Once logged in, you
              may proceed.
            </p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default MyExpenses;
