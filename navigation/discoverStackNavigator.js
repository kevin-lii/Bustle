import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../screens/Profile";
import EventDetail from "../screens/Detail/EventDetail";
import Discover from "../screens/Discover/DiscoverUsers";
import FeedHeader from "../components/Header/FeedHeader";

const Stack = createStackNavigator();

export default function DiscoverNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        component={Discover}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="event"
        component={EventDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
