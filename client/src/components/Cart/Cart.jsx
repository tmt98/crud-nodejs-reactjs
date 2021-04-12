import React, { Component } from "react";
import { Container, Table } from "react-bootstrap";
class Cart extends Component {
  render() {
    var { children } = this.props;
    return (
      <Container>
        <Table responsive className="p-0 mb-0">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </Table>
      </Container>
    );
  }
}

export default Cart;
