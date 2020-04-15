import React from "react";
import {
  createNavigatorFactory,
  useNavigationBuilder,
  TabRouter
} from "@react-navigation/native";
import { BottomTabView, Ta } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Fontisto";

import FeedNavigator from "./feedStackNavigator";
import MapNavigator from "./mapStackNavigator";
import EventListScreen from "../screens/Page/EventList";

function CustomNavigator({
  initialRouteName,
  backBehavior,
  children,
  screenOptions,
  ...rest
}) {
  const { state, descriptors, navigation } = useNavigationBuilder(TabRouter, {
    initialRouteName,
    backBehavior,
    children,
    screenOptions
  });

  return (
    <BottomTabView
      {...rest}
      state={state}
      navigation={navigation}
      descriptors={descriptors}
    />
  );
}

const Tab = createNavigatorFactory(CustomNavigator)();

export default function TabNavigator({ route }) {
  const { state } = route;
  const nestedRoute = state?.routes[state.index];
  let showTabs = true;
  if (nestedRoute?.name === "map") {
    const mapRoute = nestedRoute.state?.routes[nestedRoute.state.index];
    showTabs = mapRoute?.name !== "event" && mapRoute?.name !== "eventlist";
  }

  return (
    <Tab.Navigator
      initialRouteName="map"
      tabBarOptions={{
        activeTintColor: "#1C004B",
        showLabel: false
      }}
    >
      <Tab.Screen
        name="feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name={"nav-icon-list"} size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="map"
        component={MapNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name={"earth"} size={size} color={color} />
          ),
          tabBarVisible: showTabs
        }}
      />
      <Tab.Screen
        name="eventlist"
        component={EventListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name={"ticket"} size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
