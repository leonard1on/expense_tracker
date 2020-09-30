import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Alert, Button } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";
import ExpenseForm from "../Components/ExpenseForm";

const AddExpense = () => {
  const defaultExpense = {
    userId: "",
    catId: "",
    accId: "",
    amount: 0,
    description: "",
  };
  const { user, isAuthenticated } = useAuth0();
  const [newExpense, setNewExpense] = useState(defaultExpense);
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const addExpense = () => {
    if (
      !newExpense.accId ||
      !newExpense.catId ||
      newExpense.amount <= 0 ||
      !newExpense.description
    ) {
      setError("All fields are required");
      return;
    }
    newExpense.userId = user.sub;
    axios.post("http://localhost:8080/expenses/add", newExpense).then((exp) => {
      const refAccount = accounts.find((acc) => acc._id === newExpense.accId);
      refAccount.money -= newExpense.amount;
      setError("");
      setSuccess(exp.data);
      // console.log(exp.data);
      axios
        .post(
          "http://localhost:8080/accounts/update/" + refAccount._id,
          refAccount
        )
        .then((acc) => {
          // console.log(acc);
          getAccounts();
        });

      axios
        .post("http://localhost:8080/expenses/cid", newExpense)
        .then((res) => {
          console.log(res);
          if (res.data.length > 6) {
            const refCat = categories.find(
              (cat) => cat._id === newExpense.catId
            );
            setSuccess(
              "Another purchase for " +
                refCat.name +
                " I see... Well it's just " +
                newExpense.amount +
                " less this month."
            );
          }
        });

      setNewExpense(defaultExpense);
    });
  };

  useEffect(() => {
    getCategories();
    getAccounts();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSuccess("");
    }, 8000);
  }, [success]);
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
      {error ? <Alert color="danger">{error}</Alert> : null}
      {success ? <Alert color="success">{success}</Alert> : null}
    </Container>
  );
};

export default AddExpense;
