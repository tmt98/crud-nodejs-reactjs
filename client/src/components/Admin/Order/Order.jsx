import React, { useState, useEffect } from "react";
import { getJwt } from "../../../helpers";
import axios from "axios";
import { Table, Form, Row, Col } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { Link, Switch, Route } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import OrderDetail from "../../../components/Order/OrderDetail";
import OrderView from "./OrderView";
const Order = (props) => {
  const [orders, setOrders] = useState([]);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const accessToken = getJwt();
    const headers = { Authorization: accessToken };
    const request = axios.get("http://localhost:9999/order", {
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
  const filterOrderByDate = () => {
    console.log(date);
    let getDate = moment(date).format();
    console.log(getDate);
    const accessToken = getJwt();
    const headers = { Authorization: accessToken };
    const request = axios.get("http://localhost:9999/order/date/" + getDate, {
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
  };
  const resetOrder = () => {
    const accessToken = getJwt();
    const headers = { Authorization: accessToken };
    const request = axios.get("http://localhost:9999/order", {
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
  };
  const handleChangeDate = (date) => {
    console.log(date);
    let getDate = date;
    console.log(getDate);
    setDate(date);
  };
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
    <Switch>
      <Route exact path="/admin-temp/order">
        <Form.Label>Date:</Form.Label>
        <Row>
          <Col>
            <DatePicker
              className="form-control d-block"
              selected={date}
              onChange={handleChangeDate}
            />
          </Col>
          <Col>
            <Button
              variant="contained"
              color="primary"
              onClick={filterOrderByDate}
            >
              OK
            </Button>
            <Button
              className="ml-1"
              variant="contained"
              color="primary"
              onClick={resetOrder}
            >
              Reset
            </Button>
          </Col>
        </Row>
        <br />
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
      </Route>
      <Route exact patch="/admin-temp/order/user/:id" component={OrderView} />
      <Route exact patch="/admin-temp/order/:id" component={OrderDetail} />
    </Switch>
  );
};

export default Order;
