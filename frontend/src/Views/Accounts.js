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
      .post("/api/accounts/add", newAccount)
      .then((res) => {
        getAccounts();
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
      .post("/api/accounts/update/" + modAccount._id, modAccount)
      .then((res) => {
        console.log(res.data);
        getAccounts();
      });
  };
  // Delete Account State
  const [selectedAccount, setSelectedAccount] = useState(defaultAccount);
  const [delIndex, setDelIndex] = useState(-1);
  const [deleteModal, setDeleteModal] = useState(false);
  const deleteToggle = () => setDeleteModal(!deleteModal);

  const deleteAccount = () => {
    if (user.sub !== selectedAccount.userId || delIndex < 0) return;

    axios.delete("/api/accounts/" + selectedAccount._id).then((res) => {
      console.log(res);
      const refAccounts = [...accounts];
      refAccounts.splice(delIndex, 1);
      setAccounts(refAccounts);
      axios.delete("/api/expenses/uid/" + selectedAccount._id).then((exp) => {
        console.log(exp);
      });
    });
  };

  // List Account
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = () => {
    if (!isAuthenticated) return;
    axios.get("/api/accounts/uid/" + user.sub).then((res) => {
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
          <Modal size="md" isOpen={deleteModal} toggle={deleteToggle}>
            <ModalHeader toggle={deleteToggle}>Deleting Account</ModalHeader>
            <ModalBody>
              {`Are sure you want to delete ${selectedAccount.name} account?`}
              <br />
              {` Note: This will also delete all your Expenses linked with the account.`}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={() => {
                  deleteToggle();
                  deleteAccount();
                }}
              >
                Delete
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  deleteToggle();
                  setSelectedAccount(defaultAccount);
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
              <col span="1" style={{ width: "40%" }} />
              <col span="1" style={{ width: "20%" }} />
              <col span="1" style={{ width: "20%" }} />
              <col span="1" style={{ width: "20%" }} />
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
                        size="sm"
                        color="success"
                        onClick={() => {
                          setModAccount(acc);
                          modToggle();
                        }}
                      >
                        Modify
                      </Button>{" "}
                      <Button
                        size="sm"
                        color="danger"
                        onClick={() => {
                          setSelectedAccount(acc);
                          setDelIndex(index);
                          deleteToggle();
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
