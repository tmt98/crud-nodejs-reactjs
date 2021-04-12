import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import UserList from "./UserList";
import FormUser from "./FormUser";

class index extends Component {
  render() {
    var { isDisplayForm } = this.props;
    var elmFormUser = isDisplayForm ? <FormUser /> : "";

    return (
      <Container fluid>
        <Row>
          <Col
            className={
              isDisplayForm ? " col-xs-3 col-sm-3 col-md-3 col-lg-3" : ""
            }
          >
            {elmFormUser}
          </Col>
          <Col
            className={
              isDisplayForm
                ? "bg-darkgray col-xs-9 col-sm-9 col-md-9 col-lg-9"
                : "bg-darkgray col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <UserList />
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  isDisplayForm: state.isDisplayForm,
});
export default connect(mapStateToProps, null)(index);
