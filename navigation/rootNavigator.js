import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import auth from "@react-native-firebase/auth";
import { connect } from "react-redux";

import DrawerNavigator from "./drawerNavigator";
import ModalNavigator from "./modalNavigator";

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
        // cardStyleInterpolator: ({ current: { progress } }) => ({
        //   cardStyle: {
        //     transform: [{
        //       translateY: progress.interpolate({
        //         inputRange: [0, 0.5, 0.9, 1],
        //         outputRange: [150, 100, 25, 0],
        //       })
        //     }]
        //   },
        //   overlayStyle: {
        //     opacity: progress.interpolate({
        //       inputRange: [0, 1],
        //       outputRange: [0, 0.5],
        //       extrapolate: 'clamp',
        //     }),
        //   },
        // }),
      }}
    >
      <Stack.Screen name="main" component={DrawerNavigator} />
      <Stack.Screen name="modal" component={ModalNavigator} />
    </Stack.Navigator>
  );
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  {}
)(RootNavigator);
