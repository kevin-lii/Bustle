import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from "react-native-vector-icons/Fontisto";

import Feed from "../screens/Page/Feed";
import Map from "../screens/Page/Map";
import EventList from "../screens/Page/EventList";

export default createBottomTabNavigator(
  {
    Feed: { screen: Feed },
    Map,
    Events: { screen: EventList }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        const iconSize = 20;
        if (routeName === "Feed") {
          return (
            <Icon name={"nav-icon-list"} size={iconSize} color={tintColor} />
          );
        } else if (routeName === "Map") {
          return <Icon name={"earth"} size={iconSize} color={tintColor} />;
        } else {
          return <Icon name={"ticket"} size={iconSize} color={tintColor} />;
        }
      }
    }),
    tabBarOptions: {
      activeTintColor: "#1C004B"
    },
    initialRouteName: "Map"
  }
);
