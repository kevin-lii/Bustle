/**
 * Sample React Native App with Firebase
 * https://github.com/invertase/react-native-firebase
 *
 * @format
 * @flow
 */

import React from "react";

import AuthContainer from "./dataContainers/AuthContainer";
import { Provider } from "react-redux";

import store from "./store";

export default () => {
  return (
    <Provider store={store}>
      <AuthContainer />
    </Provider>
  );
};
