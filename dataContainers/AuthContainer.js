import React, { Component } from "react";
import { connect } from "react-redux";

import LoginContainer from "../navigation/loginNavigator";
import Loading from "../components/Loading";
import Main from "../navigation";
import { registerApp } from "../store/actions";
import { UserContext } from "./context";

class AuthContainer extends Component {
  componentDidMount() {
    this.props.registerApp();
  }

  render() {
    const { user, auth } = this.props;
    if (!user) return <Loading />;
    if (!auth || !user._id) return <LoginContainer />;
    return (
      <UserContext.Provider value={user}>
        <Main />
      </UserContext.Provider>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    auth: state.auth,
  }),
  {
    registerApp,
  }
)(AuthContainer);
