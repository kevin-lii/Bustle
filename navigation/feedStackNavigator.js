import React from "react";
import {
  useNavigationBuilder,
  StackRouter,
  createNavigatorFactory,
} from "@react-navigation/native";

import WithOverlayButtons from "../components/Container/WithOverlayButtons";
import FeedScreen from "../screens/Page/Feed";
import FeedHeader from "../components/Header/FeedHeader";

import { forumRegions } from "../global/mapconfig";
import LocationLabel from "../components/Buttons/LocationLabel";

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

  const handleToggle = (state) => {
    navigation.push(state ? "forums" : "events");
  };

  const route = state.routes[state.index];

  const items = forumRegions
    .filter((region) => !region.inactive)
    .map((region) => ({
      id: region.id,
      text: region.name,
      onPress: () => navigation.push("forums", { region: region.id }),
    }));
  const headerLeft = (
    <LocationLabel
      regionID={route.params?.region || items[0].id}
      onPress={() => {}}
      size="large"
    />
  );

  return (
    <WithOverlayButtons
      navigation={navigation}
      route={route}
      toggleState={route.name === "forums"}
      onToggle={handleToggle}
    >
      <FeedHeader navigation={navigation} component={headerLeft} />
      <FeedScreen navigation={navigation} route={route} />
    </WithOverlayButtons>
  );
}

const Stack = createNavigatorFactory(CustomStackNavigator)();

export default function FeedStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="events" component={FeedScreen} />
      <Stack.Screen name="forums" component={FeedScreen} />
      <Stack.Screen name="event" component={FeedScreen} />
    </Stack.Navigator>
  );
}
