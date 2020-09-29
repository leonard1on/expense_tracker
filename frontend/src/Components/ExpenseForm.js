import React from "react";
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

const ExpenseForm = ({ accounts, categories }) => {
  return (
    <Row>
      <Col>
        <Label>Account</Label>
        <br />
        <UncontrolledButtonDropdown>
          <DropdownToggle caret color="primary">
            Accounts
          </DropdownToggle>
          <DropdownMenu>
            {accounts.map((acc) => {
              return (
                <DropdownItem
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
    </Row>
  );
};

export default ExpenseForm;
