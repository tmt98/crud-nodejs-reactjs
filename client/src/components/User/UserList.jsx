import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import User from "./User";
import * as action from "../../actions/index";

class UserList extends Component {
  componentDidMount() {
    const { onLoad } = this.props;
    axios
      .get("http://localhost:9999/user", {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((respone) => {
        onLoad(respone.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onShowForm = () => {
    this.props.onShowForm();
  };
  render() {
    const { users } = this.props;
    var ListUser = users.map((user, index) => {
      console.log(user);
      return (
        <Col key={user.id} xs={3} md={3} className="p-1">
          <User
            id={user._id_user}
            name={user.name}
            gender={user.gender}
            birthday={user.birthday}
            email={user.email}
            address={user.address}
            phone={user.phone}
            avatar={user.avatar}
          />
        </Col>
      );
    });
    return (
      <Container fluid className="mt-5">
        <Row className="p-1">
          <Button className="w-25" onClick={this.onShowForm}>
            Add User
          </Button>
        </Row>
        <Row>{ListUser}</Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});
const mapDispatchToProps = (dispatch) => ({
  onLoad: (data) => dispatch(action.getAllUser(data)),
  onShowForm: () => dispatch(action.onShowForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
