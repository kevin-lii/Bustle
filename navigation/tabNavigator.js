import React, { useRef } from "react";
import { useNavigationBuilder, TabRouter } from "@react-navigation/native";
import { View } from "react-native-ui-lib";
import {
  BottomTabView,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

import { Theme } from "../global/constants";
import FeedHeader from "../components/Header/FeedHeader";
import EventStackNavigator from "./eventStackNavigator";
import CalendarStackNavigator from "./calendarStackNavigator";
import ProfileNavigator from "./profileNavigator";

const CustomTabRouter = (options) => {
  const router = TabRouter(options);

  return {
    ...router,
    getStateForAction(state, action, options) {
      switch (action.type) {
        case "OPEN_SHEET":
          return {
            ...state,
            showSheet: true,
          };
        case "CLOSE_SHEET":
          return {
            ...state,
            showSheet: false,
          };
        default:
          return router.getStateForAction(state, action, options);
      }
    },

    actionCreators: {
      ...router.actionCreators,
      openSheet() {
        return { type: "OPEN_SHEET" };
      },
      closeSheet() {
        return { type: "CLOSE_SHEET" };
      },
    },
  };
};

function CustomNavigator({
  initialRouteName,
  backBehavior,
  children,
  screenOptions,
  ...rest
}) {
  const { state, descriptors, navigation } = useNavigationBuilder(
    CustomTabRouter,
    {
      initialRouteName,
      backBehavior,
      children,
      screenOptions,
    }
  );
  const sheet = useRef();

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <BottomTabView
        {...rest}
        state={state}
        navigation={navigation}
        descriptors={descriptors}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function TabNavigator({ route }) {
  const { state } = route;
  const nestedRoute = state?.routes[state.index];
  let showTabs = true;
  if (nestedRoute?.name === "map") {
    const mapRoute = nestedRoute.state?.routes[nestedRoute.state.index];
    showTabs =
      mapRoute?.name !== "event" &&
      mapRoute?.name !== "eventlist" &&
      !mapRoute?.params?.hideTabBar;
  }
  if (nestedRoute?.name === "feed") {
    const feedRoute = nestedRoute.state?.routes[nestedRoute.state.index];
    showTabs = feedRoute?.name !== "event" && !feedRoute?.params?.hideTabBar;
  }

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Theme.primary,
        showLabel: false,
        tabStyle: {
          backgroundColor: "#FFF",
        },
      }}
    >
      <Tab.Screen
        name="explore"
        component={EventStackNavigator}
        options={{
          header: ({ scene, previous, navigation }) => {
            return (
              <FeedHeader
                navigation={navigation}
                text="Explore Events"
                filterable
              />
            );
          },
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" size={size} color={color} />
          ),
          tabBarVisible: showTabs,
        }}
      />
      <Tab.Screen
        name="eventlist"
        component={CalendarStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-alt" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
