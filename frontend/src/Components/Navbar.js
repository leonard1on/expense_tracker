import React from "react";
import { Navbar, NavItem } from "reactstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <Navbar>
        <NavItem>
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem>
          <Link to="/accounts">Accounts</Link>
        </NavItem>
      </Navbar>
    </div>
  );
};

export default NavBar;
