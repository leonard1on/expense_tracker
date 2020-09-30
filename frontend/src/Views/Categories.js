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
  return (
    <Container>
      <h2>Categories</h2>
      <br />
      <ListGroup>
        <Row>
          {categories.length === 0 ? (
            <Col>
              <p>Currently no categories exist</p>
            </Col>
          ) : (
            categories.map((cat) => {
              return (
                <Col xs="3" className="Col" key={cat._id}>
                  <ListGroupItem
                    key={cat._id}
                    style={{
                      marginTop: "4px",
                      borderRadius: "10px",
                      borderColor: "tomato",
                    }}
                  >
                    {cat.name}
                  </ListGroupItem>
                </Col>
              );
            })
          )}
        </Row>
      </ListGroup>
      <br />
    </Container>
  );
};

export default Categories;
