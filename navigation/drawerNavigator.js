import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";

import auth from "@react-native-firebase/auth";

import Invites from "../screens/Page/Invites";
import Profile from "./profileNavigator";
import Settings from "./settingNavigator";
import TabNavigator from "./tabNavigator";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log Out"
        onPress={async () => await auth().signOut()}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      drawerPosition="right"
      drawerType="front"
      drawerWidth={200}
      overlayColor="rgba(0, 0, 0, 0.7)"
    >
      <Drawer.Screen
        name="content"
        component={TabNavigator}
        options={{
          title: "Home"
        }}
      />
      <Drawer.Screen
        name="settings"
        component={Settings}
        options={{
          title: "Settings"
        }}
      />
    </Drawer.Navigator>
  );
}
