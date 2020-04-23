import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import EventCreate from "../screens/Page/Modal/EventCreate";
import PostCreate from "../screens/Page/Modal/PostCreate";

import FormTypes from "../components/Form/FormTypes";
import IconButton from "../components/Buttons/IconButton";

const Stack = createStackNavigator();

export default function ModalStackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={FormTypes.EVENT_CREATE} component={EventCreate} />
      <Stack.Screen name={FormTypes.POST_CREATE} component={PostCreate} />
    </Stack.Navigator>
  );
}
