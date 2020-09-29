import React from "react";
import {
  Row,
  Col,
  Label,
  Input,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
} from "reactstrap";

const ExpenseForm = ({
  expense,
  accounts,
  categories,
  accHandler,
  catHandler,
  handler,
}) => {
  return (
    <Form>
      <Row>
        <Col xs="5">
          <Label>Account</Label>
          <br />
          <UncontrolledButtonDropdown className="Btn-group">
            <DropdownToggle caret color="success">
              {expense.accId
                ? accounts.find((x) => x._id === expense.accId).name
                : "Account"}
            </DropdownToggle>
            <DropdownMenu>
              {accounts.map((acc) => {
                return (
                  <DropdownItem
                    onClick={() => {
                      accHandler(acc);
                    }}
                  >
                    {acc.name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </Col>
        <Col xs="5">
          <Label>Category</Label>
          <br />
          <UncontrolledButtonDropdown className="Btn-group">
            <DropdownToggle caret color="success">
              {expense.catId
                ? categories.find((x) => x._id === expense.catId).name
                : "Category"}
            </DropdownToggle>
            <DropdownMenu>
              {categories.map((cat) => {
                return (
                  <DropdownItem
                    onClick={() => {
                      catHandler(cat);
                    }}
                  >
                    {cat.name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </Col>
        <Col xs="2">
          <Label>Amount</Label>
          <Input
            type="text"
            name="amount"
            id="amount"
            value={expense.amount}
            onChange={(event) => handler(event.currentTarget)}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Label>Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            value={expense.description}
            onChange={(event) => handler(event.currentTarget)}
            style={{ height: "10rem" }}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default ExpenseForm;
