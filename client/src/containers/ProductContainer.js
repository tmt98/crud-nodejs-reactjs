import React, { Component } from "react";
import { connect } from "react-redux";
import ProductList from "../components/Product/ProductList";
import ProductItem from "../components/Product/ProductItem";
import PropTypes from "prop-types";
import * as action from "../actions/index";

class ProductContainer extends Component {
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
  render() {
    var { product } = this.props;
    return <ProductList>{this.showProduct(products)}</ProductList>;
  }
  showProduct = (product) => {
    var result = null;
    var { onAddToCart } = this.props;
    if (products.length > 0) {
      result = products.map((product, index) => {
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
            onLoadProduct={onAddToCart}
          />
        );
      });
    }
  };
}
ProductContainer.prototype = {
  product: PropTypes.arrayOf(
    PropTypes.shape({
      product_id: PropTypes.string.isRequired,
      productname: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category_id: PropTypes.string.isRequired,
      trademark: PropTypes.string.isRequired,
      buyprice: PropTypes.string.isRequired,
      sellprice: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      point: PropTypes.number.isRequired,
      createdAt: PropTypes.instanceOf(data),
      updateAt: PropTypes.instanceOf(date),
    }).isRequired
  ),
  onAddToCart: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    products: state.propduct,
  };
};
const mapDistpatchToProps = (dispatch, props) => {
  return {
    onAddToCart: (product) => {
      dispatch(action.addToCart(product, 1));
    },
  };
};

export default (mapStateToProps, mapDistpatchToProps)(ProductContainer);
