import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import EventCreate from "../screens/Page/Modal/EventCreate";
import PostCreate from "../screens/Page/Modal/PostCreate";

import FormTypes from "../components/Form/FormTypes";
import NewUserFlow from "../screens/Page/Modal/NewUserFlow";

const Stack = createStackNavigator();

export default function ModalStackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={"newuser"} component={NewUserFlow} />
      <Stack.Screen name={FormTypes.EVENT_CREATE} component={EventCreate} />
      <Stack.Screen name={FormTypes.POST_CREATE} component={PostCreate} />
    </Stack.Navigator>
  );
}
