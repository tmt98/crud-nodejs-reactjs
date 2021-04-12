import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Image, Transformation } from "cloudinary-react";
class CartItem extends Component {
  render() {
    const { props } = this;
    const { item } = props;
    const { quantity } = item;
    return (
      <tr>
        <td>
          <Image cloudName="ioecachep" publicId={item.product.image}>
            <Transformation gravity="face" width="50" height="50" crop="fill" />
          </Image>
        </td>
        <td>{item.product.productname}</td>
        <td>{item.product.sellprice}</td>
        <td>
          <label
            className="d-inline btn btn-primary btn-sm"
            onClick={() =>
              this.onUpdateQuantity(item.product, item.quantity - 1)
            }
          >
            -
          </label>
          <span className="pl-3 pr-3">{quantity}</span>
          <label
            className="d-inline btn btn-primary btn-sm"
            onClick={() =>
              this.onUpdateQuantity(item.product, item.quantity + 1)
            }
          >
            +
          </label>
        </td>
        <td>{this.showTotal(item.product.sellprice, item.quantity)}</td>
        <td>
          <Button
            className="btn-sm"
            variant="danger"
            onClick={() => this.onDelete(item.product)}
          >
            x
          </Button>
        </td>
      </tr>
    );
  }
  onUpdateQuantity = (product, quantity) => {
    if (quantity > 0) {
      var { onUpdateProductInCart, onChangeMessage } = this.props;
      onUpdateProductInCart(product, quantity);
    }
  };
  onDelete = (product) => {
    var { onDeleteProductInCart } = this.props;
    onDeleteProductInCart(product);
  };
  showTotal = (price, quantity) => {
    return price * quantity;
  };
}

export default CartItem;
