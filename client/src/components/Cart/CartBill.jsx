import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../actions/index";
import { MSG_CART_EMPTY } from "../../constants/ActionType";
import { Image, Transformation } from "cloudinary-react";
// import FA from "react-fontawesome";
import { Table } from "react-bootstrap";
// import axios from "axios";

class CardBill extends Component {
  showCartItem = (cart) => {
    var result = (
      <tr>
        <td colSpan="4">{MSG_CART_EMPTY}</td>
      </tr>
    );
    if (cart.length > 0) {
      result = cart.map((item, index) => {
        return (
          <tr className="pt-3 pb-3 pl-2 pr-2 " key={index}>
            <td className="align-middle">
              <Image
                className="pt-1 pb-1 mr-1 ml-1 pr-1 rounded"
                cloudName="ioecachep"
                publicId={item.product.image}
              >
                <Transformation
                  gravity="face"
                  width="35"
                  height="35"
                  crop="fill"
                />
              </Image>
              {item.product.productname}
            </td>
            <td className="align-middle">{item.product.sellprice}</td>
            <td className="h6 align-middle">{item.quantity}</td>
            <td className="align-middle">
              {item.product.sellprice * item.quantity}
            </td>
          </tr>
        );
      });
    }
    return result;
  };

  render() {
    var { cart } = this.props;
    return (
      <Table striped bordered hover size="sm" className="mt-5">
        <thead className="border-bottom">
          <tr>
            <th
              className="pt-1 pb-1"
              style={{ textAlign: "center" }}
              colSpan="5"
            >
              Check Out
            </th>
          </tr>
          <tr>
            <th />
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{this.showCartItem(cart)}</tbody>
        <thead>
          <tr>
            <th colSpan="3" className="text-center">
              Total
            </th>
            <th>{this.showTotal(cart)}$</th>
          </tr>
        </thead>
      </Table>
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

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdateProductInCart: (product, quantity) => {
      dispatch(action.updateProductInCart(product, quantity));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CardBill);
