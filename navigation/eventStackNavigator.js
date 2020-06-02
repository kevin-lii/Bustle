import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FeedScreen from "../screens/Page/Feed";
import EventDetail from "../screens/Detail/EventDetail";
import FeedHeader from "../components/Header/FeedHeader";

const Stack = createStackNavigator();

export default function EventStackNavigator() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="events"
        component={FeedScreen}
        options={{
          header: ({ scene, previous, navigation }) => {
            return (
              <FeedHeader
                navigation={navigation}
                text="Explore Events"
                filterable
              />
            );
          },
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
