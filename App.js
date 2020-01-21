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

export default () => {
  const oldRender = Text.render;
  Text.render = function(...args) {
    const origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [{ fontFamily: "Roboto" }, origin.props.style]
    });
  };
  return <AuthContainer />;
};
