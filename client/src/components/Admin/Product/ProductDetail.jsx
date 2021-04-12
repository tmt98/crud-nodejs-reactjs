import React, { Component } from "react";
import { Card, Button, Row, Col, FormControl } from "react-bootstrap";
import { Image, Transformation } from "cloudinary-react";
import { connect } from "react-redux";
import { getJwt } from "../../../helpers";
import axios from "axios";
import * as action from "../../../actions/index";
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: 0,
    };
  }
  handleChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    console.log(this.props.product_id + ":" + value);
    this.setState({
      [name]: value,
    });
  };
  onSaveStock = () => {
    if (this.state.stock <= 0) return alert("Please fill stock > 0");
    alert(this.props.product_id);
    const { onAddStock } = this.props;
    const accessToken = getJwt();
    const headers = {
      Authorization: accessToken,
    };
    const request = axios.put(
      "http://localhost:9999/product/add_stock/" + this.props.product_id,
      { stock: this.state.stock },
      {
        headers: headers,
      }
    );
    request
      .then((respone) => {
        onAddStock(respone.data);
        this.onClear();
        return alert("Add Stock Successfully");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };
  onClear = () => {
    this.setState({
      stock: 0,
    });
  };
  render() {
    return (
      <Col lg={4}>
        <Card key={this.props.key}>
          <Card.Header className="p-0 d-flex justify-content-center">
            <Card.Title className="mb-1 mt-1">
              {this.props.productname}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Image
              className="rounded mx-auto d-block"
              cloudName="ioecachep"
              publicId={this.props.image}
            >
              <Transformation
                gravity="face"
                width="300"
                height="300"
                crop="fill"
              />
            </Image>
            {/* <Card.Title>{this.props.name}</Card.Title> */}
            <Card.Text>
              Description:
              {this.props.description}
            </Card.Text>
            <Card.Text>Category: {this.props.Category.categoryname}</Card.Text>
            <Card.Text>Trademark: {this.props.trademark}</Card.Text>
            <Card.Text>Buy price: {this.props.buyprice}</Card.Text>
            <Card.Text>Sell price: {this.props.sellprice}</Card.Text>
            <Card.Text>Create At: {this.props.createdAt}</Card.Text>
            <Card.Text>Update At: {this.props.updatedAt}</Card.Text>
            <Card.Text>Total: {this.props.Storage.total}</Card.Text>
            <Card.Text>Stock: {this.props.Storage.stock}</Card.Text>
            <Card.Text>Sold: {this.props.Storage.sold}</Card.Text>
            <Card.Text>
              <Row>
                <Col xs="8" sm="8" md="8" lg="8">
                  <FormControl
                    size="sm"
                    type="text"
                    name="stock"
                    value={this.state.stock}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
                <Col xs="4" sm="4" md="4" lg="4">
                  <label
                    className="btn btn-primary btn-sm"
                    onClick={this.onSaveStock}
                  >
                    Add Stock
                  </label>
                </Col>
              </Row>
            </Card.Text>
            <Button className="ml-1" variant="danger">
              Close
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onAddStock: (data) => dispatch(action.addStock(data)),
});
export default connect(null, mapDispatchToProps)(ProductDetail);
