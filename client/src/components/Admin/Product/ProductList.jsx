import React, { Component } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import * as action from "../../../actions/index";
import { getJwt } from "../../../helpers";
import ProductItem from "./ProductItem";
class ProductList extends Component {
  componentDidMount() {
    const { onLoadProduct } = this.props;
    const accessToken = getJwt();
    const headers = { Authorization: accessToken };
    const request = axios.get("http://localhost:9999/product", {
      headers: headers,
    });
    request
      .then((respone) => {
        onLoadProduct(respone.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { products } = this.props;
    const ListProduct = products.map((product, index) => {
      return (
        <ProductItem
          key={index}
          product_id={product.product_id}
          index={index}
          productname={product.productname}
          description={product.description}
          category_id={product.category_id}
          trademark={product.trademark}
          buyprice={product.buyprice}
          sellprice={product.sellprice}
          image={product.image}
          point={product.point}
          createdAt={product.createdAt}
          updatedAt={product.updatedAt}
          Category={product.Category}
          Storage={product.Storage}
        />
      );
    });
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Trade Mark</th>
            <th>Buy Price</th>
            <th>Sell Price</th>
            <th>Image</th>
            <th>Point</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>{ListProduct}</tbody>
      </Table>
    );
  }
}
const mapStateToProps = (state) => ({
  products: state.product,
});
const mapDispatchToProps = (dispatch) => ({
  onLoadProduct: (data) => dispatch(action.getAllProduct(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
