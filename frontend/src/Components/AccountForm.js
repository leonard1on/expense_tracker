import React from "react";
import { Label, Col, Row, Input } from "reactstrap";

const AccountForm = ({ account, onChangeHandler }) => {
  return (
    <div>
      <Row>
        <Col>
          <Label>Type of Account</Label>
          <Input
            type="text"
            name="type"
            value={account.type}
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
            value={account.name}
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
            value={account.money}
            id="money"
            placeholder="1000"
            onChange={(event) => onChangeHandler(event.currentTarget)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AccountForm;
