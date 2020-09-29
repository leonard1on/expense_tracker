import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Components/LoginButton";
import LogoutButton from "../Components/LogoutButton";

const NavBar = (props) => {
  const { isLoading, isAuthenticated } = useAuth0();
  const [dropdown, setDropdown] = useState(false);
  const toggle = () => setDropdown(!dropdown);
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
            <Dropdown isOpen={dropdown} toggle={toggle}>
              <DropdownToggle
                caret
                className="nav-link"
                style={{ background: "none", border: "none" }}
              >
                Expenses
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <Link to="/my-expenses">My Expenses</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/add-expense">Add Expense</Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
