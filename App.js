/**
 * Sample React Native App with Firebase
 * https://github.com/invertase/react-native-firebase
 *
 * @format
 * @flow
 */

import React from "react";
import { Text } from "react-native";

import AuthContainer from "./dataContainers/AuthContainer";
import { Provider } from "react-redux";

import store from "./store";
import { Theme } from "./global/constants";

export default () => {
  const oldRender = Text.render;
  Text.render = function (...args) {
    const origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [
        { fontFamily: "Roboto", color: Theme.secondary },
        origin.props.style,
      ],
    });
  };
  return (
    <Provider store={store}>
      <AuthContainer />
    </Provider>
  );
};
