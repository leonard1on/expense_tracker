import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Table,
} from "reactstrap";
import AccountForm from "../Components/AccountForm";

const Accounts = () => {
  const defaultAccount = {
    userId: "123141241",
    type: "Cash",
    name: "",
    money: 0,
  };

  // New Account States
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
        listAccounts();
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  // Modify Account States
  const [modAccount, setModAccount] = useState(defaultAccount);
  const [modifyModal, setModifyModal] = useState(false);
  const modToggle = () => setModifyModal(!modifyModal);

  const onChangeHandlerMod = (event) => {
    setModAccount((prev) => ({
      ...prev,
      [event.name]: event.value,
    }));
  };

  const setTypeMod = (data) => {
    setModAccount((prev) => ({
      ...prev,
      type: data,
    }));
  };

  const modifyAccount = () => {
    axios
      .post(
        "http://localhost:8080/accounts/update/" + modAccount._id,
        modAccount
      )
      .then((res) => {
        console.log(res.data);
        listAccounts();
      });
  };

  // List Account
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    console.log(accounts);
  }, [accounts]);

  useEffect(() => {
    listAccounts();
  }, []);

  const listAccounts = () => {
    axios.get("http://localhost:8080/accounts/").then((res) => {
      setAccounts(
        res.data.map((acc) => {
          return acc;
        })
      );
    });
  };

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
      <Modal
        size="lg"
        isOpen={modifyModal}
        toggle={modToggle}
        onClosed={() => setModAccount(defaultAccount)}
      >
        <ModalHeader toggle={modToggle}>Modify Account</ModalHeader>
        <ModalBody>
          <AccountForm
            account={modAccount}
            onChangeHandler={onChangeHandlerMod}
            typeHandler={setTypeMod}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="Button"
            onClick={() => {
              modifyAccount();
              modToggle();
            }}
          >
            Modify Account
          </Button>
          <Button
            color="danger"
            className="Button"
            onClick={() => {
              modToggle();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Button onClick={toggle}>Hi</Button>
      <Table>
        <colgroup>
          <col span="1" style={{ width: "35%" }} />
          <col span="1" style={{ width: "30%" }} />
          <col span="1" style={{ width: "20%" }} />
          <col span="1" style={{ width: "15%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Account Type</th>
            <th>Current Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => {
            return (
              <tr key={acc._id}>
                <td>{acc.name}</td>
                <td>{acc.type}</td>
                <td>{acc.money}</td>
                <td>
                  <Button
                    onClick={() => {
                      setModAccount(acc);
                      modToggle();
                    }}
                  >
                    Hi2
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Accounts;
