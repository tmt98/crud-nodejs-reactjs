import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, FormControl, Form, Button } from "react-bootstrap";
import Profile from "./Profile";
import CartNav from "./CartNav";

function Navigation(props) {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="info "
      variant="dark"
      className="sticky-top"
    >
      <Navbar.Brand>
        <NavLink className="nav-link text-white" to="/">
          WWW
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/product" className="nav-link">
            Sản Phẩm
          </NavLink>
          <NavLink to="/users" className="nav-link">
            User
          </NavLink>
          <NavLink to="/colorbox" className="nav-link">
            Color Box
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/order" className="nav-link">
            Order
          </NavLink>
          <Form inline className="pr-1">
            <FormControl
              type="text"
              placeholder="Tìm kiếm"
              className="mr-sm-2"
            />
            <Button variant="success">Search</Button>
          </Form>
        </Nav>
        <Nav>
          <CartNav />
          <Profile />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
