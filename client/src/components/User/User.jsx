import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../actions/index";
import { Card, Button } from "react-bootstrap";
import { Image } from "cloudinary-react";
class User extends Component {
  onUpdateOpenForm = () => {
    const { props } = this;
    const { onOpenForm, onEditUser } = props;
    const editUser = {
      id: this.props.id,
      address: props.address,
      birthday: props.birthday,
      name: props.name,
      email: props.email,
      gender: props.gender,
    };
    console.log(this.props);
    onEditUser(editUser);
    onOpenForm();
  };
  render() {
    return (
      <Card key={this.props.key}>
        <Card.Header>
          <Card.Title>{this.props.id}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Image
            cloudName="ioecachep"
            publicId={this.props.avatar}
            width="150"
            height="150"
            crop="scale"
          />
          <Card.Title>{this.props.name}</Card.Title>
          <Card.Text>Gender: {this.props.gender ? "Boy" : "Girl"}</Card.Text>
          <Card.Text>Birthday: {this.props.birthday}</Card.Text>
          <Card.Text>Address: {this.props.address}</Card.Text>
          <Card.Text>Email: {this.props.email}</Card.Text>
          <Card.Text>Phone: {this.props.phone}</Card.Text>
          <Button variant="primary" onClick={this.onUpdateOpenForm}>
            Update
          </Button>
          <Button
            className="ml-1"
            variant="danger"
            onClick={this.onUpdateOpenForm}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  onOpenForm: () => dispatch(action.onOpenForm()),
  onEditUser: (user) => dispatch(action.onEditUser(user)),
});
export default connect(null, mapDispatchToProps)(User);
