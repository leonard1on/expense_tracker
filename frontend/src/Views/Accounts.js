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
      <Modal size="lg" isOpen></Modal>
      <AccountForm account={newAccount} onChangeHandler={onChangeHandler} />
      <Button className="Button">Create Account</Button>
    </Container>
  );
};

export default Accounts;
