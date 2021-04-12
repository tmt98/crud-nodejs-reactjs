import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

class About extends Component {
  // constructor(props) {
  //   super(props);
  // }

  showAlert = () => {
    alert(this.props.name + ": " + this.props.engsub);
  };
  render() {
    return (
      <Card key={this.props.key} style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{this.props.name}</Card.Title>
          <Card.Text>English: {this.props.engsub}</Card.Text>
          <Button variant="primary" onClick={this.showAlert}>
            ....
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default About;
