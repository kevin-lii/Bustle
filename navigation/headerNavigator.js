import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import TabNavigator from "./tabNavigator";

import HeaderLeft from "../components/Header/HeaderLeft";
import HeaderRight from "../components/Header/HeaderRight";

export default createStackNavigator(
  {
    TabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => null,
        headerLeft: () => <HeaderLeft />,
        headerRight: () => (
          <HeaderRight
            nav={() => navigation.openDrawer()}
            headerTop={20}
            hasBorder
            useUser
          />
        ),
        headerTransparent: true
      };
    }
  }
);
