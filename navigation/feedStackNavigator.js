import React from "react";
import { View } from "react-native-ui-lib";
import {
  useNavigationBuilder,
  StackRouter,
  createNavigatorFactory,
} from "@react-navigation/native";

import FeedScreen from "../screens/Feed";
import EventDetail from "../screens/Detail/EventDetail";

function CustomStackNavigator({
  initialRouteName,
  children,
  screenOptions,
  ...rest
}) {
  const { state, navigation, descriptors } = useNavigationBuilder(StackRouter, {
    children,
    screenOptions,
    initialRouteName,
  });

  const route = state.routes[state.index];

  // return (
  //   <StackView
  //     {...rest}
  //     state={state}
  //     navigation={navigation}
  //     descriptors={descriptors}
  //   />
  // );

  if (route.name !== "forums" && route.name !== "events")
    return <View flex>{descriptors[route.key].render()}</View>;

  return <FeedScreen navigation={navigation} route={route} />;
}

const Stack = createNavigatorFactory(CustomStackNavigator)();

export default function FeedStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="events" component={FeedScreen} />
      <Stack.Screen name="forums" component={FeedScreen} />
      <Stack.Screen name="event" component={EventDetail} />
    </Stack.Navigator>
  );
}
