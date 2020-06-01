import React from "react";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import auth from "@react-native-firebase/auth";

// import Invites from "../screens/Page/Invites";
import Profile from "./profileNavigator";
import Settings from "./settingNavigator";
import TabNavigator from "./tabNavigator";
import MyEventsScreen from "../screens/Page/MyEvents";
import { UserContext } from "../dataContainers/context";
import AvatarButton from "../components/Buttons/AvatarButton";
import { Theme } from "../global/constants";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView style={{ marginTop: 20 }} {...props}>
      <ProfileScreen
        style={{ alignSelf: "center" }}
        navigation={props.navigation}
      />
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log Out"
        onPress={async () => await auth().signOut()}
      />
    </DrawerContentScrollView>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <TouchableOpacity
      style={{ flex: 1, alignItems: "center" }}
      onPress={() => navigation.navigate("profileNav")}
    >
      <UserContext.Consumer>
        {(user) => (
          <AvatarButton
            photoURL={user.photoURL}
            size={100}
            marginBottom={10}
            borderWidth={3}
            borderColor={Theme.secondary}
          />
        )}
      </UserContext.Consumer>
      <UserContext.Consumer>
        {(user) => (
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {user.displayName}
          </Text>
        )}
      </UserContext.Consumer>
    </TouchableOpacity>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      initialRouteName="content"
      drawerPosition="right"
      drawerType="front"
      drawerStyle={{ width: 250 }}
      overlayColor="rgba(0, 0, 0, 0.7)"
    >
      <Drawer.Screen
        name="content"
        component={TabNavigator}
        options={{
          title: "Home",
        }}
      />
      <Drawer.Screen
        name="profileNav"
        component={Profile}
        options={{
          title: "Profile",
        }}
      />
      <Drawer.Screen
        name="myevents"
        component={MyEventsScreen}
        options={{
          title: "My Events",
        }}
      />
      <Drawer.Screen
        name="settings"
        component={Settings}
        options={{
          title: "Settings",
        }}
      />
    </Drawer.Navigator>
  );
}
