import React, { Component } from "react";
import { AppState } from "react-native";
import { connect } from "react-redux";

import LoginContainer from "../navigation/loginNavigator";
import Loading from "../components/Loading";
import Main from "../navigation";
import { registerApp, realmDisable } from "../store/actions";
import { UserContext } from "./context";

class AuthContainer extends Component {
  state = {
    appState: AppState.currentState,
  };
  componentDidMount() {
    this.props.registerApp();
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    const { realm, user } = this.props;
    if (
      this.state.appState?.match(/inactive|background/) &&
      nextAppState === "active" &&
      user._id
    ) {
      realm.syncSession.resume();
      this.setState({ appState: nextAppState });
    } else if (
      this.state.appState == "active" &&
      nextAppState.match(/background/) &&
      user._id
    ) {
      this.props.realmDisable();
      this.setState({ appState: nextAppState });
    }
  };

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
    realm: state.userRealm,
    user: state.user,
    auth: state.auth,
  }),
  {
    registerApp,
    realmDisable,
  }
)(AuthContainer);
