import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";

class CaterogySpec extends Component {
  render() {
    return (
      <Row className="m-1">
        <Col className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <button className="btn btn-danger"> May tinh dell</button>
        </Col>
        <Col className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <button className="btn btn-danger"> May tinh dell</button>
        </Col>
        <Col className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <button className="btn btn-danger"> May tinh dell</button>
        </Col>
        <Col className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <button className="btn btn-danger"> May tinh dell</button>
        </Col>
      </Row>
    );
  }
}

export default CaterogySpec;
