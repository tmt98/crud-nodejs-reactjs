import React, { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Image } from "cloudinary-react";
import * as action from "../../actions/index";
import { connect } from "react-redux";
import FA from "react-fontawesome";
import { Typography } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import "./ProductItem.scss";

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      vertical: "top",
      horizontal: "center",
    };
  }

  showAlert = () => {
    alert(this.props.name + ": " + this.props.engsub);
  };
  onAddToCart = () => {
    console.log(this.props);
    const { onAddToCart } = this.props;
    onAddToCart(this.props);
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  render() {
    return (
      <>
        <Col xl={3} lg={4} md={4} sm={12} xs={12} className="p-1">
          <Card className="card-product-item">
            <Image
              className="card-img-top"
              cloudName="ioecachep"
              publicId={this.props.image}
              width="250"
              height="250"
              crop="fill"
            />
            <Card.Body>
              <Typography
                className="text-primary"
                variant="h6"
                gutterBottom
                style={{ minHeight: "4rem" }}
              >
                {this.props.productname}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                {this.props.sellprice}$
              </Typography>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                style={{ minHeight: "5rem" }}
              >
                Description: {this.props.description}
              </Typography>
              {/* <Button className="ml-1" variant="danger" onClick={this.showAlert}>
              Buy Now
            </Button> */}
              <Card.Text></Card.Text>
            </Card.Body>
            <div>
              <Row className="p-0 mx-0 rounded-bottom">
                <Col className="p-0 mx-0">
                  <a
                    className="bg-primary text-white addToCard "
                    onClick={this.onAddToCart}
                  >
                    <FA className="pr-1" name="cart-plus" />
                    Add To Cart
                  </a>
                </Col>
                <Col className="p-0 mx-0">
                  <a className="bg-info text-white addToCard">
                    <FA className="pr-1" name="search" />
                    View
                  </a>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.state.open}
          onClose={this.handleClose}
          key={"bottom" + "right"}
        >
          <Alert
            severity="success"
            className="border shadow p-3 mb-5 bg-white rounded"
          >
            <b>Add success</b>
          </Alert>
        </Snackbar>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddToCart: (product) => {
      dispatch(action.onAddToCart(product, 1));
    },
  };
};

export default connect(null, mapDispatchToProps)(ProductItem);
