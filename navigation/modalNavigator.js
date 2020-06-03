import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import EventCreate from "../screens/Page/Modal/EventCreate";
import PostCreate from "../screens/Page/Modal/PostCreate";
import EditProfile from "../screens/Page/Modal/EditProfile";

import FormTypes from "../components/Form/FormTypes";
import NewUserFlow from "../screens/Page/Modal/NewUserFlow";

const Stack = createStackNavigator();

export default function ModalStackNavigator() {
  return (
    <Stack.Navigator
      headerMode="none"
      mode="modal"
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name={"newuser"} component={NewUserFlow} />
      <Stack.Screen name={FormTypes.EVENT_CREATE} component={EventCreate} />
      <Stack.Screen name={FormTypes.POST_CREATE} component={PostCreate} />
      <Stack.Screen name={FormTypes.PROFILE_EDIT} component={EditProfile} />
    </Stack.Navigator>
  );
}
