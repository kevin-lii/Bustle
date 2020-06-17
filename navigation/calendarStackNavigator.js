import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import InterestedEvents from "../screens/Page/EventList/interestedEvents";
import EventDetail from "../screens/Detail/EventDetail";
import Profile from "../screens/Detail/Profile";

const Stack = createStackNavigator();

export default function CalendarStackNavigator() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="events"
        component={InterestedEvents}
        options={{ headerShown: false }}
      />
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
