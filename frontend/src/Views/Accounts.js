import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import AccountForm from "../Components/AccountForm";

const Accounts = () => {
  const defaultAccount = {
    userId: "123141241",
    type: "Cash",
    name: "",
    money: 0,
  };

  const [newAccount, setNewAccount] = useState(defaultAccount);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const onChangeHandler = (event) => {
    setNewAccount((prev) => ({
      ...prev,
      [event.name]: event.value,
    }));
  };

  const setType = (data) => {
    setNewAccount((prev) => ({
      ...prev,
      type: data,
    }));
  };

  const createAccount = () => {
    console.log(newAccount);
    axios
      .post("http://localhost:8080/accounts/add", newAccount)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    console.log(newAccount);
  }, [newAccount]);

  return (
    <Container>
      <Modal
        size="lg"
        isOpen={modal}
        toggle={toggle}
        onClosed={() => setNewAccount(defaultAccount)}
      >
        <ModalHeader toggle={toggle}>Create New Account</ModalHeader>
        <ModalBody>
          <AccountForm
            account={newAccount}
            onChangeHandler={onChangeHandler}
            typeHandler={setType}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="Button"
            onClick={() => {
              createAccount();
              toggle();
            }}
          >
            Create Account
          </Button>
          <Button
            color="danger"
            className="Button"
            onClick={() => {
              toggle();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Button onClick={toggle}>Hi</Button>
    </Container>
  );
};

export default Accounts;
