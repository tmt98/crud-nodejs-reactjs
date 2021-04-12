import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { getJwt } from "../../helpers";
import * as action from "../../actions/index";
import axios from "axios";
import { connect } from "react-redux";
import "./Caterogy.scss";
import { List } from "@material-ui/core";
class Caterogy extends Component {
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
  searchWithCategory = (id) => {
    console.log(id);
    const { onLoadProduct } = this.props;
    const accessToken = getJwt();
    const headers = { Authorization: accessToken };
    const request = axios.get("http://localhost:9999/product/category/" + id, {
      headers: headers,
    });
    request
      .then((respone) => {
        onLoadProduct(respone.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { categorys } = this.props;
    const ListCategory = categorys.map((category, index) => {
      return (
        <Nav.Link
          key={index}
          className="caterogy"
          eventKey={category.category_id}
          onClick={() => {
            this.searchWithCategory(category.category_id);
          }}
        >
          {category.categoryname}
        </Nav.Link>
      );
    });
    return (
      <Nav
        defaultActiveKey="/home"
        className="flex-column"
        // onMouseEnter={(selectedKey) => console.log(`selected ${selectedKey}`)}
      >
        {ListCategory}
      </Nav>
    );
  }
}
const mapStateToProps = (state) => ({
  categorys: state.category,
  products: state.products,
});
const mapDispatchToProps = (dispatch) => ({
  onLoadProduct: (data) => dispatch(action.getAllProduct(data)),
  onLoadCategory: (data) => dispatch(action.getAllCategory(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Caterogy);
