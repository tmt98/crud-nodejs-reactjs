import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import * as action from "../../actions/index";
import { getJwt } from "../../helpers";
import ProductItem from "./ProductItem";
import { TextField, Button } from "@material-ui/core";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchproduct: "",
    };
  }

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
  searchProduct = () => {
    console.log(this.state.searchproduct);
    const { onLoadProduct } = this.props;
    const accessToken = getJwt();
    const headers = { Authorization: accessToken };
    var request;
    if (this.state.searchproduct == "") {
      request = axios.get("http://localhost:9999/product", {
        headers: headers,
      });
    } else {
      request = axios.get(
        "http://localhost:9999/product/search/" + this.state.searchproduct,
        {
          headers: headers,
        }
      );
    }
    request
      .then((respone) => {
        onLoadProduct(respone.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleChange = (e) => {
    var target = e.target;
    var value = target.value;
    var name = target.name;
    this.setState({
      searchproduct: value,
    });
    console.log(this.state.searchproduct);
  };
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
        />
      );
    });
    return (
      <Container className="mt-3">
        {" "}
        <Row>
          <Col>
            <Container>
              <br />
              <Row>
                <Col>
                  <TextField
                    className=""
                    label="Search"
                    variant="standard"
                    onChange={this.handleChange}
                    value={this.state.searchproduct}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.searchProduct}
                  >
                    Sort
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>{ListProduct}</Row>
      </Container>
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
