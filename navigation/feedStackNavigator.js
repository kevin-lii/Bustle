import React from "react";
import {
  useNavigationBuilder,
  StackRouter,
  createNavigatorFactory
} from "@react-navigation/native";
import { StackView } from "@react-navigation/stack";

import WithOverlayButtons from "../components/Container/WithOverlayButtons";
import FeedScreen from "../screens/Page/Feed";

import HeaderLeft from "../components/Header/HeaderLeft";
import HeaderRight from "../components/Buttons/AvatarButton";
import { View } from "react-native-ui-lib";

import styles from "./styles";

function CustomStackNavigator({
  initialRouteName,
  children,
  screenOptions,
  ...rest
}) {
  const { state, navigation, descriptors } = useNavigationBuilder(StackRouter, {
    children,
    screenOptions,
    initialRouteName
  });

  const handleToggle = state => {
    navigation.push(state ? "forums" : "events");
  };

  const route = state.routes[state.index];

  return (
    <WithOverlayButtons
      navigation={navigation}
      route={route}
      toggleState={route.name === "forums"}
      onToggle={handleToggle}
    >
      <StackView
        {...rest}
        state={state}
        navigation={navigation}
        descriptors={descriptors}
      />
    </WithOverlayButtons>
  );
}

const Stack = createNavigatorFactory(CustomStackNavigator)();

export default function FeedStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <HeaderRight
            onPress={() => navigation.openDrawer()}
            hasBorder
            useUser
            marginTop={2}
            marginRight={8}
            size={40}
          />
        )
      })}
    >
      <Stack.Screen name="events" component={FeedScreen} />
      <Stack.Screen name="forums" component={FeedScreen} />
      <Stack.Screen name="event" component={FeedScreen} />
    </Stack.Navigator>
  );
}
