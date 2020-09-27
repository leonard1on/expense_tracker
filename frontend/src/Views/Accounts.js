import React, { useEffect, useState } from "react";
import { Container, Label, Col, Row, Input, Button } from "reactstrap";

const Accounts = () => {
  const defaultAccount = {
    userId: "",
    type: "",
    name: "",
    money: 0,
  };

  const [newAccount, setNewAccount] = useState(defaultAccount);

  const onChangeHandler = (event) => {
    setNewAccount((prev) => ({
      ...prev,
      [event.name]: event.value,
    }));
  };

  useEffect(() => {
    console.log(newAccount);
  }, [newAccount]);

  return (
    <Container>
      <Row>
        <Col>
          <Label>Type of Account</Label>
          <Input
            type="text"
            name="type"
            value={newAccount.type}
            id="type"
            placeholder="Cash, Credit, Debit, etc"
            onChange={(event) => onChangeHandler(event.currentTarget)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label>Account Name</Label>
          <Input
            type="text"
            name="name"
            value={newAccount.name}
            id="name"
            placeholder="BAC"
            onChange={(event) => onChangeHandler(event.currentTarget)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label>Amount of Money</Label>
          <Input
            type="text"
            name="money"
            value={newAccount.money}
            id="money"
            placeholder="1000"
            onChange={(event) => onChangeHandler(event.currentTarget)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Accounts;
