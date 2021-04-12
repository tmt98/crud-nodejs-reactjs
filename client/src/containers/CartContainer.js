import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Cart from "../components/Cart/Cart";
import CartItem from "../components/Cart/CartItem";
import CartResult from "../components/Cart/CartResult";
import * as action from "../actions/index";
import { MSG_CART_EMPTY } from "../constants/ActionType";

class CartContainer extends Component {
  // componentDidMount() {
  //   const { onLoadCart } = this.props;
  //   const cartTemp = localStorage.getItem("CART");
  //   for (let i = 0; i < cartTemp.length; i++) {
  //     axios
  //       .get("http://localhost:9999/product/" + cartTemp[i].product.product_id)
  //       .then((respone) => {
  //         onLoadCart(respone.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }
  render() {
    var { cart } = this.props;
    return (
      <Cart>
        {this.showCartItem(cart)}
        {this.showTotal(cart)}
      </Cart>
    );
  }
  showCartItem = (cart) => {
    var { onDeleteProductInCart, onUpdateProductInCart } = this.props;
    var result = (
      <tr>
        <td colSpan="5">{MSG_CART_EMPTY}</td>
      </tr>
    );
    if (cart.length > 0) {
      result = cart.map((item, index) => {
        // axious --> get realtime price
        axios
          .get("http://localhost:9999/product/" + item.product.product_id)
          .then((res) => {
            item.product = res.data;
            console.log(item.product);
            return (
              <CartItem
                key={index}
                item={item}
                index={index}
                onDeleteProductInCart={onDeleteProductInCart}
                onUpdateProductInCart={onUpdateProductInCart}
              />
            );
          });
        //
        return (
          <CartItem
            key={index}
            item={item}
            index={index}
            onDeleteProductInCart={onDeleteProductInCart}
            onUpdateProductInCart={onUpdateProductInCart}
          />
        );
      });
    }
    return result;
  };
  showTotal = (cart) => {
    var result = null;
    if (cart.length > 0) {
      result = <CartResult cart={cart} />;
    }
    return result;
  };
}

CartContainer.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.shape({
        product_id: PropTypes.string.isRequired,
        productname: PropTypes.string.isRequired,
        sellprice: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDeleteProductInCart: PropTypes.func.isRequired,
  onUpdateProductInCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onLoadCart: (product) => dispatch(action.getAllCart(product)),
    onDeleteProductInCart: (product) => {
      dispatch(action.deleteProductInCart(product));
    },
    onUpdateProductInCart: (product, quantity) => {
      dispatch(action.updateProductInCart(product, quantity));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
