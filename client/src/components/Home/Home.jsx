import React from "react";
import { Container } from "react-bootstrap";
import Caterogy from "../Caterogy/index";
import Product from "../Product/Product";

const Home = (props) => {
  return (
    <Container fluid="xl" style={{ backgroundColor: "#f0f0f0" }}>
      <Caterogy />
      <Product />
    </Container>
  );
};

export default Home;
