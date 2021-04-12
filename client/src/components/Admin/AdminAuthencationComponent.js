import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getJwt } from "../../helpers";
import { withRouter } from "react-router-dom";
import * as action from "../../actions/index";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

class AdminAuthenticationComponent extends Component {
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
        if (res.data.level === 1) return isCurrentUser(res.data);
        else return this.props.history.push("/403");
      })
      .catch((err) => {
        localStorage.removeItem("accessToken");
        this.props.history.push("/login");
      });
  }
  useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));

  render() {
    if (
      this.props.currentUser === undefined ||
      this.props.currentUser === null
    ) {
      return (
        <div>
          {" "}
          <CircularProgress color="inherit" />
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
)(withRouter(AdminAuthenticationComponent));
