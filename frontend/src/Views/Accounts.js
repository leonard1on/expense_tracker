import React, { useEffect, useState } from "react";
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
    userId: "",
    type: "",
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
          <AccountForm account={newAccount} onChangeHandler={onChangeHandler} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className="Button" onClick={() => {}}>
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
