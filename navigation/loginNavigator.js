import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Login from "../screens/Page/Login";
import SignUp from "../screens/Page/SignUp";
import IconButton from "../components/Buttons/IconButton";

const LoginNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: () => {
        return {
          headerShown: false,
          headerTransparent: true
        };
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: () => null,
          headerLeft: () => null,
          headerRight: () => (
            <IconButton
              icon="close-a"
              type="Fontisto"
              size={25}
              onPress={() => navigation.navigate("Login")}
            />
          ),
          headerTransparent: true,
          headerRightContainerStyle: { marginTop: 20, marginRight: 25 }
        };
      }
    }
  },
  {}
);

const LoginContainer = createAppContainer(LoginNavigator);

export default LoginContainer;
