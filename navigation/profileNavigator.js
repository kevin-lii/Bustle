import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../screens/Detail/Profile";
import EditProfile from "../screens/Detail/Profile/EditProfile";

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
        name="editProfile"
        component={EditProfile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
