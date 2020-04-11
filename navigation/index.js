import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import DrawerNavigator from "./drawerNavigator";

export default function Navigation() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
