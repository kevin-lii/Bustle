import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import IconButton from "../components/Buttons/IconButton";
import PrivacyPolicy from "../screens/Detail/Settings/PrivacyPolicy";
import Settings from "../screens/Detail/Settings";
import Terms from "../screens/Detail/Settings/Terms";

const Stack = createStackNavigator();

export default function SettingNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="settings"
        title="Settings"
        component={Settings}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold"
              }}
            >
              Settings
            </Text>
          ),
          headerRight: () => (
            <IconButton
              icon="close-a"
              type="Fontisto"
              size={25}
              onPress={() => navigation.goBack()}
            />
          ),
          headerTransparent: true,
          headerTitle: () => null,
          headerLeftContainerStyle: { marginTop: 10, marginLeft: 25 },
          headerRightContainerStyle: { marginTop: 20, marginRight: 25 }
        })}
      />
      <Stack.Screen
        name="privacy"
        component={PrivacyPolicy}
        options={{
          headerShown: false,
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="terms"
        component={Terms}
        options={{
          headerShown: false,
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
