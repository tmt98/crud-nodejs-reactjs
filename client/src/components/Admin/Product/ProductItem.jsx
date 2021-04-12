import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../../actions/index";
import { Button } from "@material-ui/core";
import { Image } from "cloudinary-react";

class ProductItem extends Component {
  onUpdateProduct = () => {
    const { props } = this;
    const { onOpenForm, onEditProduct } = props;
    const editProduct = {
      product_id: props.product_id,
      productname: props.productname,
      description: props.description,
      category_id: props.category_id,
      trademark: props.trademark,
      buyprice: props.buyprice,
      sellprice: props.sellprice,
      image: props.image,
      point: props.point,
    };
    onEditProduct(editProduct);
    onOpenForm();
  };
  onShowProductDetail = () => {
    const { props } = this;
    const product = {
      product_id: props.product_id,
      productname: props.productname,
      description: props.description,
      category_id: props.category_id,
      trademark: props.trademark,
      buyprice: props.buyprice,
      sellprice: props.sellprice,
      point: props.point,
      image: props.image,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      Category: props.Category,
      Storage: props.Storage,
    };
    const { onShowProductDetail, showProduct } = props;
    showProduct(product);
    onShowProductDetail();
  };
  render() {
    return (
      <tr>
        <td>{this.props.index}</td>
        <td>{this.props.productname}</td>
        <td>{this.props.description}</td>
        <td>{this.props.trademark}</td>
        <td>{this.props.buyprice}</td>
        <td>{this.props.sellprice}</td>
        <td>
          <Image
            cloudName="ioecachep"
            publicId={this.props.image}
            width="50"
            height="50"
            crop="scale"
          />
        </td>
        <td>{this.props.point}</td>
        <td>
          <Button
            variant="contained"
            color="primary"
            style={{ outline: "none" }}
            onClick={this.onUpdateProduct}
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
          <Button
            variant="contained"
            style={{ outline: "none" }}
            className="ml-1"
            onClick={this.onShowProductDetail}
            size="small"
          >
            Show
          </Button>
        </td>
      </tr>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  onOpenForm: () => dispatch(action.onOpenForm()),
  onShowProductDetail: () => dispatch(action.onShowProductDetail()),
  onEditProduct: (product) => dispatch(action.onEditProduct(product)),
  showProduct: (product) => dispatch(action.showProductDetail(product)),
});
export default connect(null, mapDispatchToProps)(ProductItem);
