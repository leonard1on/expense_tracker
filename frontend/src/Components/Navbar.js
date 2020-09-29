import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Components/LoginButton";
import LogoutButton from "../Components/LogoutButton";

const NavBar = (props) => {
  const { isLoading, isAuthenticated } = useAuth0();

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <Nav className="mr-auto" navbar>
          <NavItem>
            <Link to="/" className="nav-link">
              Expense Tracker
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/accounts" className="nav-link">
              Accounts
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/categories" className="nav-link">
              Categories
            </Link>
          </NavItem>
          {isLoading ? null : isAuthenticated ? (
            <NavItem>
              <LogoutButton />
            </NavItem>
          ) : (
            <NavItem>
              <LoginButton />
            </NavItem>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
