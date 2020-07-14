import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Calendar from "../screens/Calendar";
import EventDetail from "../screens/Detail/EventDetail";
import Profile from "../screens/Profile";

const Stack = createStackNavigator();

export default function CalendarStackNavigator() {
  return (
    <Stack.Navigator
      headerMode="screen"
      headerMode="none"
      screenOptions={{
        animationEnabled: false,
      }}
    >
      <Stack.Screen name="events" component={Calendar} />
      <Stack.Screen
        name="event"
        component={EventDetail}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="profile"
        component={Profile}
        options={{ headerShown: false, animationEnabled: false }}
      />
    </Stack.Navigator>
  );
}
