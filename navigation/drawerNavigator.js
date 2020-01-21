import React from "react";
import { ScrollView, Text, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-navigation";
import {
  createDrawerNavigator,
  DrawerNavigatorItems
} from "react-navigation-drawer";
import auth from "@react-native-firebase/auth";

import Invites from "../screens/Page/Invites";
import MyEvents from "../screens/Page/MyEvents";
import Profile from "./profileNavigator";
import Settings from "./settingNavigator";
import OverlayNavigator from "./overlayNavigator";

import styles from "./styles";

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={{ flex: 1 }}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <DrawerNavigatorItems {...props} />
      <TouchableHighlight
        activeOpacity={0.4}
        underlayColor="rgba(0, 0, 0, 0.4)"
        onPress={async () => await auth().signOut()}
      >
        <Text style={styles.drawerText}>Logout</Text>
      </TouchableHighlight>
    </SafeAreaView>
  </ScrollView>
);

export default createDrawerNavigator(
  {
    Map: OverlayNavigator,
    "My Events": MyEvents,
    // Profile
    Settings
  },
  {
    drawerPosition: "right",
    drawerType: "front",
    overlayColor: "rgba(0, 0, 0, 0.7)",
    drawerWidth: 200,
    contentComponent: CustomDrawerContentComponent
  }
);
