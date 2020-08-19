import React, { useEffect, useState, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useLinking, NavigationContainer } from "@react-navigation/native";

import Login from "../screens/Login";
import SignUp from "../screens/Login/SignUp";
import IconButton from "../components/Buttons/IconButton";
import Loading from "../components/Loading";

const Stack = createStackNavigator();

export default () => {
  const prefixes = ["bustle://"];
  const config = {
    screens: {
      SignUp: "signup",
      Login: "confirm",
    },
  };

  const ref = useRef();

  const { getInitialState } = useLinking(ref, {
    prefixes,
    config,
  });

  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    getInitialState()
      .catch(() => {})
      .then((state) => {
        if (state !== undefined) {
          setInitialState(state);
        }
        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return <Loading />;
  }

  return (
    <NavigationContainer initialState={initialState} ref={ref}>
      <Stack.Navigator screenOptions={{ headerTransparent: true }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={({ navigation }) => ({
            headerTitle: () => null,
            headerRight: () => null,
            headerLeft: () => (
              <IconButton
                type="FontAwesome"
                icon="arrow-left"
                size={25}
                color="white"
                onPress={() => navigation.navigate("Login")}
              />
            ),
            headerTransparent: true,
            headerLeftContainerStyle: { marginTop: 20, marginLeft: 25 },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
