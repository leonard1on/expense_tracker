import React, { useState } from "react";
import { Container, Col, Row, Input, Button } from "reactstrap";

const Accounts = () => {
  const [userId, setUserId] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [money, setMoney] = useState(0);

  const onChangeHandler = (event) => {
    console.log(event);
  };
  return (
    <Container>
      <Row>
        <Col>
          <Input
            type="text"
            name="type"
            value={type}
            id="type"
            placeholder="Cash, Credit, Debit, etc"
            onChange={(event) => onChangeHandler(event.currentTarget)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Accounts;
