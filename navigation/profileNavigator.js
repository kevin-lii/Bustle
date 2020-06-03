import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../screens/Detail/Profile";
import EventDetail from "../screens/Detail/EventDetail";
import SocialInfo from "../screens/Detail/Profile/SocialInfo";
import PostDetail from "../screens/Detail/PostDetail";
import DetailHeader from "../components/Header/DetailHeader";
import NewUser from "../screens/Page/Modal/NewUserFlow";

const Stack = createStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="socialinfo"
        component={SocialInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="post"
        component={PostDetail}
        options={{
          header: ({ scene, previous, navigation }) => {
            return <DetailHeader navigation={navigation} route={scene.route} />;
          },
          animationEnabled: false,
          gestureDirection: "horizontal",
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="event"
        component={EventDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="newUser" component={NewUser} />
    </Stack.Navigator>
  );
}
