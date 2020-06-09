import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import InterestedEvents from "../screens/Page/EventList/interestedEvents";
import EventDetail from "../screens/Detail/EventDetail";

const Stack = createStackNavigator();

export default function InterestedStackNavigator() {
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
    </Stack.Navigator>
  );
}
