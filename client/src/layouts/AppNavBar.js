import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Spinner
} from "reactstrap";
import RegisterModal from "../components/auth/RegisterModal";
import LoginModal from "../components/auth/LoginModal";
import { logout } from "../actions/authActions";

const AppNavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const _guestLinks = () => {
    return (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );
  };
  const _authLinks = () => {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          {auth.user.name}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => dispatch(logout())}>Logout</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  const _loading = () => {
    return <Spinner color="danger" />;
  };
  return (
    <div>
      <Navbar
        color="dark"
        dark
        expand="sm"
        style={{ paddingLeft: "13%", paddingRight: "13%" }}
      >
        <NavbarBrand href="/">Mern App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {auth.isLoading
              ? _loading()
              : !auth.isAuthenticated
              ? _guestLinks()
              : _authLinks()}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavBar;
