import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ProductList from "./ProductList";
import axios from "axios";
import { connect } from "react-redux";
import * as action from "../../actions/index";
import { getJwt } from "../../helpers";
class Product extends Component {
  render() {
    return (
      <>
        <Row>
          {/* <Col className="bg-primary col-xs-2 col-sm-2 col-md-2 col-lg-2"></Col> */}
          <Col>
            <ProductList />
          </Col>
        </Row>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  products: state.product,
});
const mapDispatchToProps = (dispatch) => ({
  onLoadProduct: (data) => dispatch(action.getAllProduct(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Product);
