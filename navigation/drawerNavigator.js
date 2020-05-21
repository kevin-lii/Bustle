import React from "react";
import { View, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import auth from "@react-native-firebase/auth";

// import Invites from "../screens/Page/Invites";
// import Profile from "./profileNavigator";
import Settings from "./settingNavigator";
import TabNavigator from "./tabNavigator";
import MyEventsScreen from "../screens/Page/MyEvents";
import { UserContext } from "../dataContainers/context";
import AvatarButton from "../components/Buttons/AvatarButton";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItem
        onPress={() =>
          navigation.navigate('ProfileNavigator', { screen: 'Profile' })}

      ></DrawerItem> */}
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
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <UserContext.Consumer>
        {(user) => <AvatarButton photoURL={user.photoURL} size={50} />}
      </UserContext.Consumer>
      <UserContext.Consumer>
        {(user) => <Text>{user.displayName}</Text>}
      </UserContext.Consumer>
    </View>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      initialRouteName="content"
      drawerPosition="right"
      drawerType="front"
      drawerWidth={200}
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
