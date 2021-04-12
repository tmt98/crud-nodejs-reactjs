import React, { Component } from "react";
import { Card, Form, Col, Row } from "react-bootstrap";
import FA from "react-fontawesome";
import * as action from "../../../actions/index";
import { connect } from "react-redux";
import { getJwt } from "../../../helpers";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = { category_id: "", categoryname: "", description: "" };
  }
  UNSAFE_componentWillMount() {
    if (
      this.props.categoryEditing &&
      this.props.categoryEditing.category_id !== null
    ) {
      this.setState({
        category_id: this.props.categoryEditing.category_id,
        categoryname: this.props.categoryEditing.categoryname,
        description: this.props.categoryEditing.description,
      });
    } else {
      this.onClear();
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.categoryEditing) {
      this.setState({
        category_id: nextProps.categoryEditing.category_id,
        categoryname: nextProps.categoryEditing.categoryname,
        description: nextProps.categoryEditing.description,
      });
    }
  }
  handleChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onCloseForm = () => {
    this.props.onCloseForm();
  };
  onSaveCategory = (e) => {
    console.log(this.state.category_id);
    const { categoryname, description } = this.state;
    if (categoryname === "" || description === "") {
      alert("Please fill full field");
      return 0;
    }
    const { onAddCategory, onEditedCategory } = this.props;
    const accessToken = getJwt();
    const headers = {
      Authorization: accessToken,
    };
    const data = {
      categoryname,
      description,
    };
    if (!this.state.category_id) {
      const request = axios.post("http://localhost:9999/category", data, {
        headers: headers,
      });
      request
        .then((respone) => {
          onAddCategory(respone.data);
          this.onClear();
          return alert("Add Category Successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const request = axios.put(
        "http://localhost:9999/category/" + this.state.category_id,
        data,
        {
          headers: headers,
        }
      );
      request
        .then((respone) => {
          onEditedCategory(respone.data);
          this.onClear();
          return alert("Edit Category Successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  onClear = () => {
    this.setState({
      category_id: "",
      categoryname: "",
      description: "",
    });
  };

  render() {
    return (
      <Card>
        <Card.Header className="p-0 m-0">
          <Row className="p-0 m-0">
            <Col className="p-0 m-0">
              <h4 style={{ margin: "10px" }}>
                {!this.state.category_id ? "Add Category" : "Edit Category"}
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
            <TextField
              id="standard-basic"
              label="Category Name"
              name="categoryname"
              className="p-1 m-1"
              // placeholder="Enter product name"
              value={this.state.categoryname}
              onChange={this.handleChange}
              required
            />
            <TextField
              id="standard-basic"
              label="Description"
              name="description"
              className="p-1 m-1"
              // placeholder="Enter description"
              value={this.state.description}
              onChange={this.handleChange}
              required
            />
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{ outline: "none" }}
              onClick={this.onSaveCategory}
              size="small"
              className="mb-3"
            >
              Save
              <DoneIcon />
            </Button>
          </Form.Group>
        </Card.Body>
      </Card>
    );
  }
}
const mapStateToProps = (state) => ({
  categoryEditing: state.categoryEditing,
});
const mapDispatchToProps = (dispatch) => ({
  onAddCategory: (data) => dispatch(action.addCategory(data)),
  onEditedCategory: (data) => dispatch(action.editCategory(data)),
  onCloseForm: () => dispatch(action.onCloseForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
