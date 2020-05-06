import React from "react";
import { View } from "react-native-ui-lib";
import {
  useNavigationBuilder,
  StackRouter,
  createNavigatorFactory,
} from "@react-navigation/native";
import { StackView } from "@react-navigation/stack";

import WithOverlayButtons from "../components/Container/WithOverlayButtons";
import FeedScreen from "../screens/Page/Feed";
import PostDetail from "../screens/Detail/PostDetail";
import FeedHeader from "../components/Header/FeedHeader";

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

  return (
    <WithOverlayButtons
      navigation={navigation}
      route={route}
      toggleState={route.name === "forums"}
      onToggle={(state) => navigation.push(state ? "forums" : "events")}
    >
      <FeedHeader navigation={navigation} route={route} />
      <FeedScreen navigation={navigation} route={route} />
    </WithOverlayButtons>
  );
}

const Stack = createNavigatorFactory(CustomStackNavigator)();

export default function FeedStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="forums">
      <Stack.Screen name="events" component={FeedScreen} />
      <Stack.Screen name="forums" component={FeedScreen} />
      <Stack.Screen name="event" component={FeedScreen} />
      <Stack.Screen name="post" component={PostDetail} />
    </Stack.Navigator>
  );
}
