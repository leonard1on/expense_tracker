import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Label,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
const Categories = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axios.get("http://localhost:8080/categories/").then((res) => {
      setCategories(
        res.data.map((cat) => {
          return cat;
        })
      );
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const addCategory = () => {
    const newCategory = { name };
    axios
      .post("http://localhost:8080/categories/add", newCategory)
      .then((res) => {
        getCategories();
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  return (
    <Container>
      <h2>Categories</h2>
      <ListGroup>
        <Row>
          {categories.length === 0 ? (
            <Col>
              <p>Currently no categories exist</p>
            </Col>
          ) : (
            categories.map((cat) => {
              return (
                <Col xs="3" className="Col">
                  <ListGroupItem>{cat.name}</ListGroupItem>
                </Col>
              );
            })
          )}
        </Row>
      </ListGroup>
      <br />
      <Row>
        <Col xs="10">
          <Label>Add a Category</Label>
          <Input
            type="text"
            name="name"
            value={name}
            id="name"
            placeholder="Gardening"
            onChange={(event) => setName(event.currentTarget.value)}
          />
        </Col>
        <Col xs="2">
          <br />
          <Button
            block
            color="primary"
            className="Button"
            onClick={addCategory}
          >
            Add
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Categories;
