import React, { Component } from "react";
import FA from "react-fontawesome";
import CartNavbar from "../Cart/CartNavbar";
import { connect } from "react-redux";
class CartNav extends Component {
  render() {
    let result = 0;
    this.props.cart.forEach((cart) => {
      result += cart.quantity;
    });
    return (
      <div className="dropdown">
        <label
          className="notification btn btn-secondary dropdown-toggle mr-1"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <FA className="pr-2" name="cart-arrow-down" />
          {result === 0 ? (
            ""
          ) : (
            <span className="badge badge-danger">
              {result <= 99 ? result : "99+"}
            </span>
          )}
        </label>
        <div
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="dropdownMenuButton"
        >
          <CartNavbar />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
export default connect(mapStateToProps, null)(CartNav);
