import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../../actions/index";
import { Button } from "@material-ui/core";

class CategoryItem extends Component {
  onUpdateCategory = () => {
    const { props } = this;
    const { onOpenForm, onEditCategory } = props;
    const editCategory = {
      category_id: props.category_id,
      categoryname: props.categoryname,
      description: props.description,
    };
    onEditCategory(editCategory);
    onOpenForm();
  };
  render() {
    return (
      <tr>
        <td>{this.props.index}</td>
        <td>{this.props.categoryname}</td>
        <td>{this.props.description}</td>
        <td>{this.props.createdAt}</td>
        <td>{this.props.updatedAt}</td>
        <td>
          <Button
            variant="contained"
            color="primary"
            style={{ outline: "none" }}
            onClick={this.onUpdateCategory}
            size="small"
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ outline: "none" }}
            className="ml-1"
            size="small"
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  onOpenForm: () => dispatch(action.onOpenForm()),
  onEditCategory: (category) => dispatch(action.onEditCategory(category)),
});
export default connect(null, mapDispatchToProps)(CategoryItem);
