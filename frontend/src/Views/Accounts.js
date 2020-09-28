import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Table,
} from "reactstrap";
import AccountForm from "../Components/AccountForm";
import { useAuth0 } from "@auth0/auth0-react";

const Accounts = () => {
  const { user, isAuthenticated } = useAuth0();
  const defaultAccount = {
    userId: "",
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
    newAccount.userId = user.sub;
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
    if (user.sub !== modAccount.userId) return;
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
  // Delete Account State
  //const [selectedAccount, setSelectedAccount] = useState(defaultAccount);

  const deleteAccount = (acc, index) => {
    if (user.sub !== modAccount.userId) return;

    axios.delete("http://localhost:8080/accounts/" + acc._id).then((res) => {
      console.log(res);
      const refAccounts = [...accounts];
      refAccounts.splice(index, 1);
      setAccounts(refAccounts);
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
    if (!isAuthenticated) return;
    axios.get("http://localhost:8080/accounts/uid/" + user.sub).then((res) => {
      setAccounts(
        res.data.map((acc) => {
          return acc;
        })
      );
    });
  };

  return (
    <Container>
      <h2>Accounts</h2>
      {isAuthenticated ? (
        <>
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
          <Button onClick={toggle} className="Add-Button">
            +
          </Button>
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
              {accounts.map((acc, index) => {
                return (
                  <tr key={acc._id}>
                    <td>{acc.name}</td>
                    <td>{acc.type}</td>
                    <td>{acc.money}</td>
                    <td>
                      <Button
                        color="success"
                        onClick={() => {
                          setModAccount(acc);
                          modToggle();
                        }}
                      >
                        Modify
                      </Button>
                      <Button
                        color="danger"
                        onClick={() => {
                          deleteAccount(acc, index);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      ) : (
        <Row>
          <Col>
            <p>
              Register first to save your money accounts! Once logged in, you
              may proceed.
            </p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Accounts;
