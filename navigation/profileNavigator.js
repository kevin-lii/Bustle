import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import Profile from "../screens/Detail/Profile";
import EditProfile from "../screens/Detail/Profile/EditProfile";
import { HeaderLeft, HeaderRight } from "../components/Header/ProfileHeader";
7;

export default createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerRight: () => <HeaderRight navigation={navigation} />,
        headerTransparent: true,
        headerBackground: true
      };
    }
  },
  Edit: EditProfile
});
