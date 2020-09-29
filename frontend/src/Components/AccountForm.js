import React from "react";
import {
  Label,
  Col,
  Row,
  Input,
  Form,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const AccountForm = ({ account, onChangeHandler, typeHandler }) => {
  const accountTypes = ["Cash", "Credit Card", "Debit Card", "Paypal", "Other"];

  return (
    <Form>
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
        <Col xs="3">
          <Label>Account Type</Label>
          <br />
          <UncontrolledButtonDropdown>
            <DropdownToggle caret color="primary">
              {account.type}
            </DropdownToggle>
            <DropdownMenu>
              {accountTypes.map((acc) => {
                return (
                  <DropdownItem
                    key={acc._id}
                    onClick={() => {
                      typeHandler(acc);
                    }}
                  >
                    {acc}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </Col>
        <Col xs="9">
          <Label>Amount of Money</Label>
          <Input
            type="number"
            name="money"
            value={account.money}
            id="money"
            placeholder="1000"
            onChange={(event) => onChangeHandler(event.currentTarget)}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default AccountForm;
