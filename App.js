/**
 * @format
 * @flow
 */

import React from "react";
import { Text } from "react-native";

import AuthContainer from "./dataContainers/AuthContainer";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import configureStore from "./store";
import { Theme } from "./global/constants";
import Loading from "./components/Loading";

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
  const { store, persistor } = configureStore();
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <AuthContainer />
      </PersistGate>
    </Provider>
  );
};
