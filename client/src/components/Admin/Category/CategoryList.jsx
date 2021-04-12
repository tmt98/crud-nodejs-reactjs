import React, { Component } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import * as action from "../../../actions/index";
import { getJwt } from "../../../helpers";
import CategoryItem from "./CategoryItem";
class CategoryList extends Component {
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
  render() {
    const { categorys } = this.props;

    const ListCategory = categorys.map((category, index) => {
      return (
        <CategoryItem
          key={index}
          category_id={category.category_id}
          index={index}
          categoryname={category.categoryname}
          description={category.description}
          createdAt={category.createdAt}
          updatedAt={category.updatedAt}
        />
      );
    });
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Category Name</th>
            <th>Description</th>
            <th>Create At</th>
            <th>Update At</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>{ListCategory}</tbody>
      </Table>
    );
  }
}
const mapStateToProps = (state) => ({
  categorys: state.category,
});
const mapDispatchToProps = (dispatch) => ({
  onLoadCategory: (data) => dispatch(action.getAllCategory(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
