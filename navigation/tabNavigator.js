import React, { useRef, useEffect } from "react";
import {
  createNavigatorFactory,
  useNavigationBuilder,
  TabRouter,
} from "@react-navigation/native";
import { BottomTabView } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Fontisto";

import FeedNavigator from "./feedStackNavigator";
import MapNavigator from "./mapStackNavigator";
import EventListScreen from "../screens/Page/MyEvents";
import WithOverlayBottomSheet from "../components/Container/WithOverlayBottomSheet";
import { View } from "react-native-ui-lib";
import EventFilters from "../components/Form/EventFilters";

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
    <WithOverlayBottomSheet
      navigation={navigation}
      height={350}
      ref={sheet}
      sheetContent={state.showSheet ? <EventFilters /> : null}
    >
      <View style={{ height: "100%", width: "100%" }}>
        <BottomTabView
          {...rest}
          state={state}
          navigation={navigation}
          descriptors={descriptors}
        />
      </View>
    </WithOverlayBottomSheet>
  );
}

const Tab = createNavigatorFactory(CustomNavigator)();

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
    showTabs = feedRoute?.name !== "post" && !feedRoute?.params?.hideTabBar;
  }

  return (
    <Tab.Navigator
      initialRouteName="feed"
      tabBarOptions={{
        activeTintColor: "#1C004B",
        showLabel: false,
        tabStyle: {
          backgroundColor: "#FFF",
        },
      }}
    >
      <Tab.Screen
        name="feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" size={size} color={color} />
          ),
          tabBarVisible: showTabs,
        }}
      />
      <Tab.Screen
        name="eventlist"
        component={EventListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="date" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
