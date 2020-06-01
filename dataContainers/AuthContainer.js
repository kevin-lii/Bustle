import React, { Component } from "react";
import { connect } from "react-redux";

import LoginContainer from "../navigation/loginNavigator";
import Loading from "../components/Loading";
import Main from "../navigation";
import { login } from "../store/actions";
import { UserContext } from "./context";

class AuthContainer extends Component {
  componentDidMount() {
    this.props.login();
  }

  render() {
    const { user } = this.props;
    if (!user) return <Loading />;

    if (!user.uid) return <LoginContainer />;

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
  }),
  {
    login,
  }
)(AuthContainer);
