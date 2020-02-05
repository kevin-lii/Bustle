import React, { Component } from "react";

import LoginContainer from "../navigation/loginNavigator";
import Loading from "../components/Loading";
import Main from "../navigation";

import { connect } from "react-redux";
import { login } from "../store/actions";
import { UserContext } from "./context";

class AuthContainer extends Component {
  componentDidMount() {
    this.props.login();
  }

  render() {
    const { user } = this.props;
    if (typeof user === "undefined") return <Loading />;

    if (!user) return <LoginContainer />;

    return (
      <UserContext.Provider value={user}>
        <Main />
      </UserContext.Provider>
    );
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  {
    login
  }
)(AuthContainer);
