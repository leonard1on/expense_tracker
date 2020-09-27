import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Components/LoginButton";
import LogoutButton from "../Components/LogoutButton";

const NavBar = (props) => {
  const { loginWithRedirect, logout, isLoading, isAuthenticated } = useAuth0();

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
          {isLoading ? (
            <Spinner color="primary" />
          ) : isAuthenticated ? (
            <LogoutButton />
          ) : (
            <LoginButton />
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
