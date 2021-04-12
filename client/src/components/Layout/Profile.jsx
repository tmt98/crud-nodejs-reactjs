import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getJwt } from "../../helpers";
import * as action from "../../actions/index";
import { Link, withRouter } from "react-router-dom";
import FA from "react-fontawesome";

class Profile extends Component {
  componentDidMount() {
    const { isCurrentUser } = this.props;
    const Token = getJwt();
    if (!Token) {
      console.log("NEED TOKEN TO CHECK LOGIN");
    } else {
      axios
        .get("http://localhost:9999/auth/getUser", {
          headers: { Authorization: Token },
        })
        .then((res) => {
          isCurrentUser(res.data);
        })
        .catch((err) => {
          console.log(err.response);
          localStorage.removeItem("accessToken");
          isCurrentUser(null);
        });
    }
  }
  onLogout = () => {
    const { isCurrentUser } = this.props;
    console.log("LOGOUT");
    localStorage.removeItem("accessToken");
    isCurrentUser(null);
    this.props.history.push("/login");
  };
  render() {
    if (this.props.currentUser === null) {
      return (
        <Link to="/login">
          <label className="btn btn-default ml-1">Login</label>
        </Link>
      );
    }
    const { currentUser } = this.props;
    return (
      <div className="dropdown">
        <label
          className="notification btn btn-default dropdown-toggle mr-1"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span>
            <FA className="pr-1" name="user-circle-o" />
            {currentUser.username}
          </span>
        </label>
        <div
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="dropdownMenuButton"
        >
          <Link to="/users" className="dropdown-item">
            Profile
          </Link>
          <Link to="/users" className="dropdown-item">
            Edit Profile
          </Link>
          <label onClick={this.onLogout} className="dropdown-item">
            Logout
          </label>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  isCurrentUser: (currentUser) => dispatch(action.getCurrentUser(currentUser)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
