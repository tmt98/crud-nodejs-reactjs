import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Caterogy from "./Caterogy";
import CaterogySpec from "./CaterogySpec";

class index extends Component {
  render() {
    return (
      <Row>
        <Col className="bg-light col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <Caterogy />
        </Col>
        <Col className="bg-darkgray col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <CaterogySpec />
        </Col>
        <Col className="bg-danger col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div className="d-flex justify-content-center">Banner Quang Cao</div>
        </Col>
      </Row>
    );
  }
}

export default index;
