import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import auth from "@react-native-firebase/auth";
import { connect } from "react-redux";

import DrawerNavigator from "./drawerNavigator";
import ModalNavigator from "./modalNavigator";
import SheetNavigator from "./sheetNavigator";

const Stack = createStackNavigator();

function RootNavigator({ user }) {
  const newUser = !auth().currentUser.displayName || user.newUser;

  return (
    <Stack.Navigator
      headerMode="none"
      mode="modal"
      initialRouteName={newUser ? "modal" : "main"}
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
        cardOverlayEnabled: true,
      }}
    >
      <Stack.Screen name="main" component={DrawerNavigator} />
      <Stack.Screen name="modal" component={ModalNavigator} />
      <Stack.Screen
        name="sheet"
        component={SheetNavigator}
        options={{ animationEnabled: false }}
      />
    </Stack.Navigator>
  );
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  {}
)(RootNavigator);
