import React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView,
  withNavigation
} from "react-navigation";
import auth from "@react-native-firebase/auth";

import Invites from "../screens/Page/Invites";
import MyEvents from "../screens/Page/MyEvents"
import Profile from "./profileNavigator";

import OverlayNavigator from "./overlayNavigator";

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={{ flex: 1 }}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <DrawerItems {...props} />
      <TouchableOpacity onPress={async () => await auth().signOut()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  </ScrollView>
);

export default createDrawerNavigator(
  {
    Map: OverlayNavigator,
    "My Events": MyEvents,
    // Profile
  },
  {
    drawerPosition: "right",
    drawerType: "front",
    overlayColor: "grey",
    drawerWidth: 200,
    contentComponent: CustomDrawerContentComponent
  }
);
