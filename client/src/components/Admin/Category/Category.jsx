import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import * as action from "../../../actions/index";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import AddIcon from "@material-ui/icons/Add";

class Category extends Component {
  onShowForm = () => {
    const { props } = this;
    const { onShowForm, onEditCategory } = props;
    const editCategory = {
      category_id: "",
      categoryname: "",
      description: "",
    };
    onEditCategory(editCategory);
    onShowForm();
  };
  render() {
    var { isDisplayForm } = this.props;
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
              className="mb-3"
              size="small"
            >
              <AddIcon />
              Add Category
            </Button>
            <CategoryList />
          </Col>
          <Col
            className={
              isDisplayForm ? " col-xs-3 col-sm-3 col-md-3 col-lg-3" : ""
            }
          >
            {isDisplayForm ? <CategoryForm /> : ""}
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  isDisplayForm: state.isDisplayForm,
});
const mapDispatchToProps = (dispatch) => ({
  onShowForm: () => dispatch(action.onShowForm()),
  onEditCategory: (category) => dispatch(action.onEditCategory(category)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Category);
