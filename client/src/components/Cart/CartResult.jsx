import React, { Component } from "react";
import FA from "react-fontawesome";
import { Link } from "react-router-dom";

class CartResult extends Component {
  render() {
    var { cart } = this.props;
    return (
      <tr>
        <td colSpan="2"></td>
        <td>
          <h5>
            <strong>Total</strong>
          </h5>
        </td>
        <td>
          <h5>
            <strong>{this.showTotal(cart)}$</strong>
          </h5>
        </td>
        <td colSpan="2">
          <Link to="/checkout">
            <button
              type="button"
              className="btn btn-primary waves-effect waves-light"
            >
              Purchase
              <FA className="pl-1 pr-2" name="credit-card" />
            </button>
          </Link>
        </td>
      </tr>
    );
  }

  showTotal = (cart) => {
    var total = 0;
    if (cart.length > 0) {
      for (var i = 0; i < cart.length; i++) {
        total += cart[i].product.sellprice * cart[i].quantity;
      }
    }
    return total;
  };
}

export default CartResult;
