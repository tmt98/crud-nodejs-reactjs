import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getJwt } from "../../helpers";
import { withRouter } from "react-router-dom";
import * as action from "../../actions/index";

class AuthenticationComponent extends Component {
  componentDidMount() {
    const { isCurrentUser } = this.props;
    const Token = getJwt();
    localStorage.setItem("URL_P", window.location.pathname);
    if (!Token) {
      console.log(this.props.history);
      this.props.history.push("/login");
    }
    axios
      .get("http://localhost:9999/auth/getUser", {
        headers: { Authorization: Token },
      })
      .then((res) => {
        isCurrentUser(res.data);
      })
      .catch((err) => {
        localStorage.removeItem("accessToken");
        this.props.history.push("/login");
      });
  }
  render() {
    if (
      this.props.currentUser === undefined ||
      this.props.currentUser === null
    ) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
    return <div>{this.props.children}</div>;
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
)(withRouter(AuthenticationComponent));
