import React from "react";
import {
  useNavigationBuilder,
  StackRouter,
  createNavigatorFactory,
} from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";
import { StyleSheet } from "react-native";

import WithOverlayButtons from "../components/Container/WithOverlayButtons";
import FeedScreen from "../screens/Page/Feed";
import Icons from "../components/Image/Icons";
import FeedHeader from "../components/Header/FeedHeader";

import { forumRegions } from "../global/mapconfig";
import { Theme } from "../global/constants";

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

  const forumIndex = forumRegions.findIndex(
    (region) => region.id === route.params?.region
  );
  const items = forumRegions
    .filter((region) => !region.inactive)
    .map((region) => ({
      id: region.id,
      text: region.name,
      onPress: () => navigation.push("forums", { region: region.id }),
    }));
  const headerLeft = (
    <TouchableOpacity onPress={() => {}}>
      <View row centerV style={styles.label}>
        <Icons icon="map-marker-alt" size={15} color={Theme.secondary} />
        <Text style={styles.text}>
          {items[forumIndex]?.text || items[0].text}
        </Text>
        {/* <Icons type="MaterialIcons" icon="pencil" size={23} color={Theme.secondary}/> */}
      </View>
    </TouchableOpacity>
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

const styles = StyleSheet.create({
  label: {
    height: "100%",
    marginLeft: 10,
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: Theme.secondary,
    marginRight: 10,
    marginLeft: 5,
  },
});
