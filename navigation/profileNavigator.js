import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../screens/Detail/Profile";
import EditProfile from "../screens/Detail/Profile/EditProfile";
import { HeaderLeft, HeaderRight } from "../components/Header/ProfileHeader";

const Stack = createStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerRight: () => <HeaderRight navigation={navigation} />,
          headerTransparent: true,
          headerBackground: true
        }}
      />
      <Stack.Screen name="edit_profile" component={EditProfile} />
    </Stack.Navigator>
  );
}
