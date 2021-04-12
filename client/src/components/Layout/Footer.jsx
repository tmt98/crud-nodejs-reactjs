import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container className="bg-primary" style={{ minHeight: "3rem" }}>
      <p className="d-flex justify-content-center">(C) 2020</p>
    </Container>
  );
};

export default Footer;
