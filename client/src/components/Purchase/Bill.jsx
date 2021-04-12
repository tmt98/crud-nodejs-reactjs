import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Purchase from "./Purchase";
import CartBill from "../Cart/CartBill";
const Bill = () => {
  if (localStorage.getItem("CART") === "[]") return <Redirect to="/" />;
  return (
    <Container>
      <Row>
        <Col xs={8} md={8} lg={8} sm="8" xs="12">
          <CartBill />
        </Col>
        <Col xs={4} md={4} lg={4} sm="4" xs="12">
          <Purchase />
        </Col>
      </Row>
    </Container>
  );
};

export default Bill;
