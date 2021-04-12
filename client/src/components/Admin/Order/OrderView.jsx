import React, { useState, useEffect } from "react";
import axios from "axios";
import { getJwt } from "../../../helpers";
import moment from "moment";
import { Link, Switch, Route } from "react-router-dom";
import { Table, Form, Row, Col } from "react-bootstrap";

function OrderView(props) {
  const [orders, setOrders] = useState([]);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const accessToken = getJwt();
    const headers = { Authorization: accessToken };
    const { pathname } = props.location;
    const id = pathname.split("/")[pathname.split("/").length - 1];
    const request = axios.get("http://localhost:9999/order/user/" + id, {
      headers: headers,
    });
    request
      .then((respone) => {
        console.log(respone.data);
        setOrders(respone.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const ListOrders = orders.map((order, index) => {
    return (
      <tr key={index}>
        <td>{order.order_id}</td>
        <td>{moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</td>
        <td>{order.total}</td>
        <td>{order.status}</td>
        <td>
          <Link
            to={{
              pathname: "/admin-temp/order/" + order.order_id,
            }}
          >
            Order Details
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <Table striped bordered hover size="sm">
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

export default OrderView;
