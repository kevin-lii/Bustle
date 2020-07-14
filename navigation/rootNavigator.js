import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import auth from "@react-native-firebase/auth";
import { connect } from "react-redux";

import TabNavigator from "./tabNavigator";
import EventCreate from "../screens/Modal/EventCreate";
import EditProfile from "../screens/Modal/EditProfile";
import FormTypes from "../components/Form/FormTypes";
import NewUserFlow from "../screens/Modal/NewUserFlow";
import SocialInfo from "../screens/Profile/SocialInfo";
import EventFilters from "../screens/Modal/EventFilterCard";
import PrivacyPolicy from "../screens/Settings/PrivacyPolicy";
import Terms from "../screens/Settings/Terms";
import Interstitial from "../screens/Modal/Interstitial";

import { Theme } from "../global/constants";

const Stack = createStackNavigator();

function RootNavigator({ user }) {
  const newUser =
    !auth().currentUser.displayName ||
    // || !auth().currentUser.emailVerified
    user.newUser;

  const modalOptions = {
    cardStyle: { backgroundColor: "transparent" },
  };

  return (
    <Stack.Navigator
      headerMode="none"
      mode="modal"
      initialRouteName={newUser ? "newuser" : "home"}
      screenOptions={{
        cardStyle: { backgroundColor: Theme.defaultBackground },
        cardOverlayEnabled: true,
        animationEnabled: false,
      }}
    >
      <Stack.Screen name="home" component={TabNavigator} />

      {/* modal */}
      <Stack.Screen
        name={"newuser"}
        component={NewUserFlow}
        options={modalOptions}
      />
      <Stack.Screen
        name={FormTypes.EVENT_CREATE}
        component={EventCreate}
        options={modalOptions}
      />
      <Stack.Screen
        name={FormTypes.EVENT_EDIT}
        component={EventCreate}
        options={modalOptions}
      />
      <Stack.Screen
        name={FormTypes.PROFILE_EDIT}
        component={EditProfile}
        options={modalOptions}
      />
      <Stack.Screen
        name={"socialinfo"}
        component={SocialInfo}
        options={modalOptions}
      />
      <Stack.Screen
        name="privacy"
        component={PrivacyPolicy}
        options={{
          headerShown: false,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="terms"
        component={Terms}
        options={{
          headerShown: false,
          headerTransparent: true,
        }}
      />

      {/* sheet */}
      <Stack.Screen
        name={"eventfilters"}
        component={EventFilters}
        options={{ animationEnabled: false, ...modalOptions }}
      />

      <Stack.Screen
        name={"interstitial"}
        component={Interstitial}
        options={{ animationEnabled: false, ...modalOptions }}
      />
    </Stack.Navigator>
  );
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  {}
)(RootNavigator);
