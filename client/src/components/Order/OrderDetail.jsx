import React, { useEffect, useState } from "react";
import axios from "axios";
import { getJwt } from "../../helpers";
import { Table, Container, Row, Col } from "react-bootstrap";
import { Typography } from "@material-ui/core";
import { Image, Transformation } from "cloudinary-react";

const OrderDetail = (props) => {
  //   const dispatch = useDispatch();
  const [orderDetail, setOrderDetail] = useState(null);
  useEffect(() => {
    const accessToken = getJwt();
    const headers = { Authorization: accessToken };
    const { pathname } = props.location;
    const id = pathname.split("/")[pathname.split("/").length - 1];
    console.log(id);
    const fecthData = async () => {
      const request = await axios.get("http://localhost:9999/order/" + id, {
        headers: headers,
      });
      setOrderDetail(request.data);
    };
    fecthData();
  }, []);
  if (orderDetail != null) {
    console.log(orderDetail.list);
    const { order_id, status, createdAt, total } = orderDetail.order;
    const { name, address, email, phone } = orderDetail.user;
    const { list } = orderDetail;
    return (
      <Container>
        <Row>
          <Col>
            <Typography
              variant="h4"
              gutterBottom
              className="d-flex justify-content-center"
            >
              {"Order ID: " + order_id}
            </Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography variant="button" gutterBottom>
              {"Time: " + createdAt}
            </Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography variant="button" gutterBottom>
              {"Name: " + name}
            </Typography>
          </Col>
          <Col>
            <Typography variant="button" gutterBottom>
              {"Email:" + email}
            </Typography>
          </Col>
          <Col>
            <Typography variant="button" gutterBottom>
              {"Phone: " + phone}
            </Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography variant="button" gutterBottom>
              {"Address: " + address}
            </Typography>
          </Col>
          <Col>
            <Typography variant="button" gutterBottom>
              {"Status: " + status}
            </Typography>
          </Col>
          <Col></Col>
        </Row>
        <Table size="sm" striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((product, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Image
                      className="mr-1"
                      cloudName="ioecachep"
                      publicId={product.Product.image}
                    >
                      <Transformation
                        gravity="face"
                        width="50"
                        height="50"
                        crop="fill"
                      />
                    </Image>
                    {product.Product.productname}
                  </td>
                  <td>{product.current_sellprice}</td>
                  <td>{product.quantity}</td>
                  <td>{product.current_sellprice * product.quantity}</td>
                </tr>
              );
            })}
          </tbody>
          <thead>
            <tr>
              <th colSpan="3">Total</th>
              <th>{total}</th>
            </tr>
          </thead>
        </Table>
      </Container>
    );
  }
  return <Container>Error</Container>;
};

export default OrderDetail;
