import React, { Component } from "react";
import { Card, Form, Col, Button, Row } from "react-bootstrap";
import FA from "react-fontawesome";
import * as action from "../../../actions/index";
import { connect } from "react-redux";
import { getJwt } from "../../../helpers";
import axios from "axios";
import { TextField } from "@material-ui/core";
class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: "",
      productname: "",
      description: "",
      category_id: "",
      trademark: "",
      buyprice: "",
      sellprice: "",
      image: "",
      point: "",
      selectedFile: null,
    };
  }

  UNSAFE_componentWillMount() {
    if (
      this.props.productEditing &&
      this.props.productEditing.product_id !== null
    ) {
      this.setState({
        product_id: this.props.productEditing.product_id,
        productname: this.props.productEditing.productname,
        description: this.props.productEditing.description,
        category_id: this.props.productEditing.category_id,
        trademark: this.props.productEditing.trademark,
        buyprice: this.props.productEditing.buyprice,
        sellprice: this.props.productEditing.sellprice,
        image: this.props.productEditing.image,
        point: this.props.productEditing.point,
      });
    } else {
      this.onClear();
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.productEditing) {
      this.setState({
        product_id: nextProps.productEditing.product_id,
        productname: nextProps.productEditing.productname,
        description: nextProps.productEditing.description,
        category_id: nextProps.productEditing.category_id,
        trademark: nextProps.productEditing.trademark,
        buyprice: nextProps.productEditing.buyprice,
        sellprice: nextProps.productEditing.sellprice,
        image: nextProps.productEditing.image,
        point: nextProps.productEditing.point,
      });
    }
  }
  componentDidMount() {
    const { onLoadCategory } = this.props;
    const accessToken = getJwt();
    const headers = { Authorization: accessToken };
    const request = axios.get("http://localhost:9999/category", {
      headers: headers,
    });
    request
      .then((respone) => {
        onLoadCategory(respone.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  handleFileChange = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
    });
  };
  onCloseForm = () => {
    this.props.onCloseForm();
  };
  onSaveProduct = (e) => {
    const {
      productname,
      description,
      category_id,
      trademark,
      buyprice,
      sellprice,
      point,
      image,
      selectedFile,
    } = this.state;
    console.log(image);
    if (
      productname === "" ||
      description === "" ||
      trademark === "" ||
      buyprice === "" ||
      sellprice === "" ||
      point === ""
    ) {
      alert("Please fill full field");
      return 0;
    }
    const { onAddProduct, onEditedProduct } = this.props;
    const data = new FormData();
    data.append("productname", productname);
    data.append("description", description);
    data.append("category_id", category_id);
    data.append("trademark", trademark);
    data.append("buyprice", buyprice);
    data.append("sellprice", sellprice);
    data.append("point", point);
    const accessToken = getJwt();
    const headers = {
      Authorization: accessToken,
    };

    if (!this.state.product_id) {
      data.append("image", selectedFile, selectedFile.name);
      const request = axios.post("http://localhost:9999/product", data, {
        headers: headers,
      });
      request
        .then((respone) => {
          onAddProduct(respone.data);
          this.onClear();
          return alert("Add Product Successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      if (selectedFile === null) data.append("image", image);
      else data.append("image", selectedFile, selectedFile.name);
      const request = axios.put(
        "http://localhost:9999/product/" + this.state.product_id,
        data,
        {
          headers: headers,
        }
      );
      request
        .then((respone) => {
          onEditedProduct(respone.data);
          this.onClear();
          return alert("Edit Product Successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  onClear = () => {
    this.setState({
      product_id: "",
      productname: "",
      description: "",
      category_id: "",
      trademark: "",
      buyprice: "",
      sellprice: "",
    });
  };

  render() {
    console.log(this.props.categorys);
    return (
      <Card>
        <Card.Header className="p-0 m-0">
          <Row className="p-0 m-0">
            <Col className="p-0 m-0">
              <h4 style={{ margin: "10px" }}>
                {!this.state.product_id ? "Add Product" : "Edit Product"}
              </h4>
            </Col>
            <Col className="p-0 m-0">
              <p
                className="btn btn-primary btn-sm float-right rounded-circle d-block"
                style={{ margin: "10px" }}
                onClick={this.onCloseForm}
              >
                <FA name="times-circle" className="times-circle" />
              </p>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Label>Product Name:</Form.Label>
            <Form.Control
              type="text"
              name="productname"
              placeholder="Enter productname"
              value={this.state.productname}
              onChange={this.handleChange}
              required
            />
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Enter description"
              value={this.state.description}
              onChange={this.handleChange}
              required
            />
            <Form.Label>Category:</Form.Label>
            <Form.Control
              as="select"
              name="category_id"
              value={this.state.category}
              onChange={this.handleChange}
            >
              {this.props.categorys.map((category, index) => {
                if (this.state.category_id === category.category_id) {
                  return (
                    <option key={index} value={category.category_id} selected>
                      {category.categoryname}
                    </option>
                  );
                }
                return (
                  <option key={index} value={category.category_id}>
                    {category.categoryname}
                  </option>
                );
              })}
            </Form.Control>
            <Form.Label>Trademark:</Form.Label>
            <Form.Control
              type="text"
              name="trademark"
              placeholder="Enter trademark"
              value={this.state.trademark}
              onChange={this.handleChange}
              required
            />
            <Form.Label>Buy Price:</Form.Label>
            <Form.Control
              type="text"
              name="buyprice"
              placeholder="Enter buy price"
              value={this.state.buyprice}
              onChange={this.handleChange}
              required
            />
            <Form.Label>Sell Price:</Form.Label>
            <Form.Control
              type="text"
              name="sellprice"
              placeholder="Enter sell price"
              value={this.state.sellprice}
              onChange={this.handleChange}
              required
            />
            <Form.Label>Image Product:</Form.Label>
            <Form.Control
              type="file"
              name="image"
              // value={this.state.image}
              onChange={this.handleFileChange}
              required
            />
            <Form.Label>Point:</Form.Label>
            <Form.Control
              type="text"
              name="point"
              placeholder="Enter point"
              value={this.state.point}
              onChange={this.handleChange}
              required
            />
            <br />
            <Button
              variant="primary"
              type="submit"
              onClick={this.onSaveProduct}
            >
              Submit
            </Button>
          </Form.Group>
        </Card.Body>
      </Card>
    );
  }
}
const mapStateToProps = (state) => ({
  productEditing: state.productEditing,
  categorys: state.category,
});
const mapDispatchToProps = (dispatch) => ({
  onLoadCategory: (data) => dispatch(action.getAllCategory(data)),
  onAddProduct: (data) => dispatch(action.addProduct(data)),
  onEditedProduct: (data) => dispatch(action.editProduct(data)),
  onCloseForm: () => dispatch(action.onCloseForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
