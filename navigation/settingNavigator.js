import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import IconButton from "../components/Buttons/IconButton";
import PrivacyPolicy from "../screens/Detail/Settings/PrivacyPolicy";
import Settings from "../screens/Detail/Settings";
import Terms from "../screens/Detail/Settings/Terms";

export default createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => (
          <Text style={{ fontWeight: "bold", fontSize: 30, color: "black" }}>
            Settings
          </Text>
        ),
        headerRight: () => (
          <IconButton
            icon="close-a"
            type="Fontisto"
            size={25}
            onPress={() => navigation.goBack(null)}
          />
        ),
        headerTransparent: true,
        headerTitle: () => null,
        headerLeftContainerStyle: { marginTop: 10, marginLeft: 25 },
        headerRightContainerStyle: { marginTop: 20, marginRight: 25 }
      };
    }
  },
  "Privacy Policy": {
    screen: PrivacyPolicy,
    navigationOptions: () => {
      return {
        headerShown: false,
        headerTransparent: true
      };
    }
  },
  "Terms of Service": {
    screen: Terms,
    navigationOptions: () => {
      return {
        headerShown: false,
        headerTransparent: true
      };
    }
  }
});
