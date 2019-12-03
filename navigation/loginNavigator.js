import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Login from "../screens/Page/Login";
import SignUp from "../screens/Page/SignUp";

const LoginNavigator = createStackNavigator(
  {
    Login,
    SignUp
  },
  {
    headerMode: "none"
  }
);

const LoginContainer = createAppContainer(LoginNavigator);

export default LoginContainer;
