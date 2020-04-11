import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DrawerNavigator from "./drawerNavigator";
import ModalScreen from "../screens/Page/Modal";

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen name="main" component={DrawerNavigator} />
      <Stack.Screen name="modal" component={ModalScreen} />
    </Stack.Navigator>
  );
}
