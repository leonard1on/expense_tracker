import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Alert, Button } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";
import ExpenseForm from "../Components/ExpenseForm";

const AddExpense = () => {
  const defaultExpense = {
    userID: "",
    catId: "",
    accId: "",
    amount: 0,
    description: "",
  };
  const { user, isAuthenticated } = useAuth0();
  const [newExpense, setNewExpense] = useState(defaultExpense);
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  const accountHandler = (data) => {
    setNewExpense((prev) => ({
      ...prev,
      accId: data._id,
    }));
  };

  const categoryHandler = (data) => {
    setNewExpense((prev) => ({
      ...prev,
      catId: data._id,
    }));
  };

  const changeHandler = (event) => {
    setNewExpense((prev) => ({
      ...prev,
      [event.name]: event.value,
    }));
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
    getCategories();
    getAccounts();
  }, []);

  useEffect(() => {
    console.log(newExpense);
  }, [newExpense]);

  const addExpense = () => {
    if (
      !newExpense.accId ||
      !newExpense.catId ||
      newExpense.amount <= 0 ||
      !newExpense.description
    ) {
      setMessage("All fields are required");
      return;
    }
    newExpense.userId = user.sub;
    axios.post("http://localhost:8080/expenses/add", newExpense).then((exp) => {
      console.log(exp);
    });
  };

  return (
    <Container>
      <h2>Add Expenses</h2>
      {isAuthenticated ? (
        <div>
          <ExpenseForm
            expense={newExpense}
            accounts={accounts}
            categories={categories}
            accHandler={accountHandler}
            catHandler={categoryHandler}
            handler={changeHandler}
          />
          <Button className="Button" color="primary" onClick={addExpense}>
            Add
          </Button>
        </div>
      ) : (
        <Row>
          <Col>
            <p>
              Register first to register your account expenses! Once logged in,
              you may proceed.
            </p>
          </Col>
        </Row>
      )}
      <br />
      {message ? <Alert color="danger">{message}</Alert> : null}
    </Container>
  );
};

export default AddExpense;
