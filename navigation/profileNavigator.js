import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../screens/Profile";
import EventDetail from "../screens/Detail/EventDetail";
import SocialInfo from "../screens/Profile/SocialInfo";
import NewUser from "../screens/Modal/NewUserFlow";

const Stack = createStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator>
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
      <Stack.Screen
        name="info"
        component={SocialInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="newUser" component={NewUser} />
    </Stack.Navigator>
  );
}
