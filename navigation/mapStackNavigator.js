import React from "react";
import {
  useNavigationBuilder,
  StackRouter,
  createNavigatorFactory,
} from "@react-navigation/native";

import MapScreen from "../screens/Map";

import { View } from "react-native-ui-lib";

import styles from "./styles";
import { TouchableWithoutFeedback } from "react-native";

const MyStackRouter = (options) => {
  const router = StackRouter(options);

  return {
    ...router,
  };
};

function CustomStackNavigator({ initialRouteName, children, screenOptions }) {
  const { state, navigation, descriptors } = useNavigationBuilder(
    MyStackRouter,
    {
      children,
      screenOptions,
      initialRouteName,
    }
  );

  return (
    <React.Fragment>
      <MapScreen route={state.routes[state.index]} navigation={navigation} />

      <View flex spread style={styles.floatingHeader}>
        <View style={styles.headerLeft}></View>
        <View style={styles.headerRight}></View>
      </View>
    </React.Fragment>
  );
}

const Stack = createNavigatorFactory(CustomStackNavigator)();

export default function MapStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="events" component={MapScreen} />
      <Stack.Screen name="forums" component={MapScreen} />
      <Stack.Screen name="event" component={MapScreen} />
      <Stack.Screen name="eventlist" component={MapScreen} />
    </Stack.Navigator>
  );
}
