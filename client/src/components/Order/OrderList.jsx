import React, { Component } from "react";
import axios from "axios";
import * as action from "../../actions/index";
import { getJwt } from "../../helpers";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

class OrderList extends Component {
  componentDidMount() {
    const { getAllOrderWithJWT } = this.props;
    const accessToken = getJwt();
    const headers = { Authorization: accessToken };
    const request = axios.get("http://localhost:9999/order/list", {
      headers: headers,
    });
    request
      .then((respone) => {
        console.log(respone.data);
        getAllOrderWithJWT(respone.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { orders } = this.props;
    const ListOrders = orders.map((order, index) => {
      return (
        <tr key={index}>
          <td>{order.order_id}</td>
          <td>{order.createdAt}</td>
          <td>{order.total}</td>
          <td>{order.status}</td>
          <td>
            <Link
              to={{
                pathname: "/order/" + order.order_id,
              }}
            >
              Order Details
            </Link>
          </td>
        </tr>
      );
    });
    return (
      <Table>
        <thead>
          <tr>
            <th>ID Order</th>
            <th>Buy Date</th>
            <th>Total Price</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{ListOrders}</tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.order,
});
const mapDispatchToProps = (dispatch) => ({
  getAllOrderWithJWT: (data) => dispatch(action.getAllOrderWithJWT(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
