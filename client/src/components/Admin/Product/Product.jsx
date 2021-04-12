import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import * as action from "../../../actions/index";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import { Grid, Paper } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
class Product extends Component {
  onShowForm = () => {
    const { props } = this;
    const { onShowForm, onEditProduct } = props;
    const editProduct = {
      product_id: "",
      productname: "",
      description: "",
      buyprice: "",
      sellprice: "",
      point: "",
    };
    console.log(editProduct);
    onEditProduct(editProduct);
    onShowForm();
  };
  onShowProductDetail = () => {
    const { props } = this;
    console.log(props);
    const { onShowProductDetail } = props;
    onShowProductDetail();
  };
  render() {
    var { isDisplayForm, isShowProductDetail, productShow } = this.props;
    return (
      <Container fluid>
        <Row>
          <Col
            className={
              isDisplayForm
                ? "bg-darkgray col-xs-9 col-sm-9 col-md-9 col-lg-9"
                : "bg-darkgray col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <Button
              variant="contained"
              color="primary"
              style={{ outline: "none" }}
              onClick={this.onShowForm}
              size="small"
              className="mb-3"
            >
              <AddIcon />
              Add Product
            </Button>
            <ProductList />
          </Col>
          <Col
            className={
              isDisplayForm ? " col-xs-3 col-sm-3 col-md-3 col-lg-3" : ""
            }
          >
            {isDisplayForm ? <ProductForm /> : ""}
          </Col>
        </Row>
        <Row>
          {isShowProductDetail ? (
            <ProductDetail
              product_id={productShow.product_id}
              productname={productShow.productname}
              description={productShow.description}
              category_id={productShow.category_id}
              trademark={productShow.trademark}
              buyprice={productShow.buyprice}
              sellprice={productShow.sellprice}
              image={productShow.image}
              createdAt={productShow.createdAt}
              updatedAt={productShow.updatedAt}
              Category={productShow.Category}
              Storage={productShow.Storage}
            />
          ) : (
            ""
          )}
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  isDisplayForm: state.isDisplayForm,
  isShowProductDetail: state.isShowProductDetail,
  productShow: state.productShow,
});
const mapDispatchToProps = (dispatch) => ({
  onShowForm: () => dispatch(action.onShowForm()),
  onShowProductDetail: () => dispatch(action.onShowProductDetail()),
  onEditProduct: (Product) => dispatch(action.onEditProduct(Product)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Product);
