import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
const NavBar = (props) => {
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Expense Tracker</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <Link to="/accounts" className="nav-link">
              Accounts
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
