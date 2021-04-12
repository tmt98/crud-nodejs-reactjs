import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../actions/index";
import { MSG_CART_EMPTY } from "../../constants/ActionType";
import { Image, Transformation } from "cloudinary-react";
import { Link } from "react-router-dom";
import FA from "react-fontawesome";
import { Table } from "react-bootstrap";

class CartNavbar extends Component {
  onDelete = (product) => {
    var { onDeletePropductInCart } = this.props;
    onDeletePropductInCart(product);
  };
  showCartItem = (cart) => {
    var result = (
      <tr>
        <td className="pt-3 pb-3 text-center" colSpan="4">
          {MSG_CART_EMPTY}
        </td>
      </tr>
    );
    if (cart.length > 0) {
      result = cart.map((item, index) => {
        return (
          <tr className="pt-3 pb-3 pl-2 pr-2 " key={index}>
            <td>
              <Image
                className="pt-1 pb-1 mr-1 ml-1 rounded"
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
            </td>
            <td>{item.product.productname}</td>
            <td className="h6" style={{ fontSize: "90%" }}>
              {item.product.sellprice}x{item.quantity}
            </td>
            <td>
              <label
                className="btn btn-sm btn-danger p-0 m-0 pr-2 pl-2"
                onClick={() => this.onDelete(item.product)}
              >
                <FA className="p-0 m-0" name="times" />
              </label>
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
      <Table
        striped
        bordered
        hover
        size="sm"
        className="p-0 mb-0"
        style={{ width: "23rem" }}
      >
        <thead className="border-bottom">
          <tr>
            <th
              className="pt-1 pb-1"
              style={{ textAlign: "center" }}
              colSpan="4"
            >
              Cart
            </th>
          </tr>
        </thead>
        <tbody>
          {this.showCartItem(cart)}
          {cart.length > 0 ? (
            <tr className="border-top">
              <td colSpan="2"></td>
              <td colSpan="2">
                <Link to="/cart">
                  <label className="mt-1 btn btn-sm btn-primary">
                    Purchase{" "}
                    <FA className="p-0 m-0" name="chevron-circle-right" />
                  </label>
                </Link>
              </td>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onDeletePropductInCart: (product) => {
      dispatch(action.deleteProductInCart(product));
    },
    onUpdateProductInCart: (product, quantity) => {
      dispatch(action.updateProductInCart(product, quantity));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartNavbar);
