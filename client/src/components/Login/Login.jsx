import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
import "./Login.scss";
import axios from "axios";
import { connect } from "react-redux";
import * as action from "../../actions/index";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  signIn = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const request = axios.post("http://localhost:9999/auth/login", {
      username,
      password,
    });
    request.then((respone) => {
      const { onLogin } = this.props;
      const { data } = respone;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      onLogin();
      this.props.history.push(localStorage.getItem("URL_P"));
    });
  };

  render() {
    return (
      <Container fluid className="d-flex justify-content-center pt-5">
        <Card className="w-25">
          <Card.Header>
            {" "}
            <Card.Title>
              <h1>Login</h1>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <Form className="login" onSubmit={this.signIn}>
                <Form.Group controlId="formBasicUser">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    onChange={this.handleUsernameChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    onChange={this.handlePasswordChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Title>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};
const mapThisPatchToProps = (dispatch, props) => {
  return {
    onLogin: () => {
      dispatch(action.onLogin());
    },
  };
};
export default connect(mapStateToProp, mapThisPatchToProps)(withRouter(Login));
