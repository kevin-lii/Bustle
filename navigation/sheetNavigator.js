import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import PostOptions from "../screens/Page/Modal/PostOptionCard";
import EventFilters from "../screens/Page/Modal/EventFilterCard";

const Stack = createStackNavigator();

export default function SheetStackNavigator() {
  return (
    <Stack.Navigator
      headerMode="none"
      mode="modal"
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen
        name={"postoptions"}
        component={PostOptions}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name={"eventfilters"}
        component={EventFilters}
        options={{ animationEnabled: false }}
      />
    </Stack.Navigator>
  );
}
