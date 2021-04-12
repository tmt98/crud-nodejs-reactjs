import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import OrderList from "./OrderList.jsx";
import { Switch, Route, Redirect } from "react-router-dom";
import OrderDetail from "./OrderDetail";

const Order = (props) => {
  if (!localStorage.getItem("accessToken")) return <Redirect to="/login" />;
  return (
    <Switch>
      <Route exact path="/order">
        <Container>
          <Row>
            <Col>
              <OrderList />
            </Col>
          </Row>
        </Container>
      </Route>
      <Route exact patch="/order/:id" component={OrderDetail} />
    </Switch>
  );
};

export default Order;
