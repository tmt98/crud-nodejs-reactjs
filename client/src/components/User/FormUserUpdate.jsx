import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import FA from "react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class FormUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      name: "",
      gender: true,
      address: "",
      email: "",
      phone: "",
      birthday: new Date("01-01-1990"),
    };
  }
  handleChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  handleDateChange = (date) => {
    this.setState({
      birthday: date,
    });
    console.log(this.state.birthday);
  };
  onCloseForm = () => {
    this.props.onCloseForm();
  };
  addUser = (e) => {
    const { onSubmit } = this.props;
    const {
      username,
      password,
      name,
      address,
      email,
      phone,
      birthday,
    } = this.state;
    e.preventDefault();
    axios
      .post("http://localhost:9999/auth/register", {
        username,
        password,
        name,
        gender: this.state.gender === true ? true : false,
        address,
        email,
        phone,
        birthday,
      })
      .then((respone) => {
        onSubmit(respone.data);
        this.onClear();
        return alert("Add Succsess");
      })
      .catch((error) => {
        console.log(error);
        // console.log(error.response.data.error);
        // return alert(error.response.data.error);
      });
  };
  onClear = () => {
    this.setState({
      username: "",
      password: "",
      name: "",
      gender: true,
      address: "",
      email: "",
      phone: "",
      birthday: new Date("01-01-1990"),
    });
  };

  render() {
    return (
      <Container fluid className="mt-5">
        <Card>
          <Card.Header>
            <Row>
              <Col>
                <h3>Add User</h3>
              </Col>
              <Col>
                <p
                  className="btn btn-primary btn-sm float-right rounded-circle d-block"
                  onClick={this.onCloseForm}
                >
                  <FA name="times-circle" className="times-circle" />
                </p>
              </Col>
            </Row>
          </Card.Header>

          <Card.Body>
            <Form>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={this.state.username}
                onChange={this.handleChange}
              ></Form.Control>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={this.handleChange}
              ></Form.Control>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={this.state.name}
                onChange={this.handleChange}
              ></Form.Control>
              <Form.Label>Gender:</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={this.state.gender}
                onChange={this.handeChange}
              >
                <option value={true}>Boy</option>
                <option value={false}>Girl</option>
              </Form.Control>
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter your address"
                value={this.state.address}
                onChange={this.handleChange}
              ></Form.Control>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <Form.Label>Phone:</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter your phone"
                value={this.state.phone}
                onChange={this.handleChange}
              ></Form.Control>
              <Form.Label>Birthday:</Form.Label>
              <DatePicker
                name="birthday"
                className="form-control d-block"
                selected={this.state.birthday}
                onChange={this.handleDateChange}
              />
              <br />
              <Button variant="primary" type="submit" onClick={this.addUser}>
                Submit
              </Button>
              <Button
                className="ml-1"
                variant="danger"
                type="reset"
                onClick={this.onClear}
              >
                Resest
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  onSubmit: (data) => dispatch({ type: "ADD_USER", data }),
  onCloseForm: () => dispatch(onCloseForm()),
});

export default connect(null, mapDispatchToProps)(FormUser);
