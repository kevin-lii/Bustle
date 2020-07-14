import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "../screens/Login";
import SignUp from "../screens/Login/SignUp";
import IconButton from "../components/Buttons/IconButton";

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
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
          headerLeft: () => null,
          headerRight: () => (
            <IconButton
              icon="close-a"
              type="Fontisto"
              size={25}
              onPress={() => navigation.pop()}
            />
          ),
          headerTransparent: true,
          headerRightContainerStyle: { marginTop: 20, marginRight: 25 },
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
