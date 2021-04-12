import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import axios from "axios";
const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState(true);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [birthday, setBirthday] = useState(new Date("01-01-1990"));
  const handleChangeUserName = (event) => {
    console.log(event.target.value);
    setUsername(event.target.value);
  };
  const handleChangePassword = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };
  const handleChangeName = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };
  const handleChangeGender = (event) => {
    console.log(event.target.value);
    setGender(event.target.value);
  };
  const handleChangeAddress = (event) => {
    console.log(event.target.value);
    setAddress(event.target.value);
  };
  const handleChangeBirthday = (date) => {
    console.log(date);
    setBirthday(date);
  };
  const handleChangeAvatar = (event) => {
    console.log(event.target);
    setSelectedFile(event.target.files[0]);
  };
  const handleChangePhone = (event) => {
    console.log(event.target.value);
    setPhone(event.target.value);
  };
  const handleChangeEmail = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };
  const signUp = () => {
    const data = new FormData();
    data.append("avatar", selectedFile, selectedFile.name);
    data.append("username", username);
    data.append("password", password);
    data.append("name", name);
    data.append("address", address);
    data.append("email", email);
    data.append("phone", phone);
    data.append("birthday", birthday);
    axios
      .post("http://localhost:9999/auth/register", data)
      .then((respone) => {
        alert("Sign Up Success");
        window.location = "/login";
      })
      .catch((error) => {
        console.log(error);
        // console.log(error.response.data.error);
        // return alert(error.response.data.error);
      });
  };
  return (
    <Container className="d-flex justify-content-center pt-5">
      <Card className="w-25">
        <Card.Header>
          <Card.Title>
            <h1>Sign Up</h1>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={handleChangeUserName}
              required
            />
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handleChangePassword}
              required
            />
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              value={name}
              onChange={handleChangeName}
              required
            />{" "}
            <Form.Label>Gender:</Form.Label>
            <Form.Control
              as="select"
              name="category_id"
              value={gender}
              onChange={handleChangeGender}
            >
              <option value={true} selected>
                Boy
              </option>
              <option value={false}>Girl</option>
            </Form.Control>
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              value={address}
              onChange={handleChangeAddress}
              required
            />
            <Form.Label>Phone:</Form.Label>
            <Form.Control
              type="email"
              name="name"
              placeholder="Enter email"
              value={phone}
              onChange={handleChangePhone}
              required
            />
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={handleChangeEmail}
              required
            />
            <Form.Label>Date:</Form.Label>
            <DatePicker
              className="form-control d-block"
              selected={birthday}
              onChange={handleChangeBirthday}
            />
            <Form.Label>Avatar:</Form.Label>
            <Form.Control
              type="file"
              name="image"
              // value={this.state.image}
              onChange={handleChangeAvatar}
              required
            />
            <br />
            <Button variant="primary" type="submit" onClick={signUp}>
              Submit
            </Button>
          </Form.Group>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
