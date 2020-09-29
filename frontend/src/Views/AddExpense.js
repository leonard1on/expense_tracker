import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Label,
  Input,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
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

  const expenseHandler = (event) => {
    // setNewExpense((prev) => ({
    //   ...prev,
    //   accId = data
    // }))
    console.log(event);
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
  return (
    <Container>
      <h2>Add Expenses</h2>
      {isAuthenticated ? (
        <div>
          <ExpenseForm
            accounts={accounts}
            categories={categories}
            handler={expenseHandler}
          />
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
    </Container>
  );
};

export default AddExpense;
