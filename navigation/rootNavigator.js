import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DrawerNavigator from "./drawerNavigator";
import ModalScreen from "../screens/Page/Modal";

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      headerMode="none"
      mode="modal"
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
      <Stack.Screen name="modal" component={ModalScreen} />
    </Stack.Navigator>
  );
}
