import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import EventDetail from "../screens/Detail/EventDetail";
import Profile from "../screens/Detail/Profile";
import SocialInfo from "../screens/Detail/Profile/SocialInfo";
import FeedScreen from "../screens/Page/Feed";
import PostDetail from "../screens/Detail/PostDetail";
import ForumHeader from "../components/Header/ForumFeedHeader";
import DetailHeader from "../components/Header/DetailHeader";
import PostSearchResult from "../screens/Detail/PostSearchResult";

const Stack = createStackNavigator();

export default function ForumStackNavigator() {
  return (
    <Stack.Navigator headerMode="screen" mode="card">
      <Stack.Screen
        name="forum"
        component={FeedScreen}
        options={{
          header: ({ scene, previous, navigation }) => {
            return <ForumHeader navigation={navigation} />;
          },
        }}
      />
      <Stack.Screen
        name="search"
        component={PostSearchResult}
        options={{
          header: ({ scene, previous, navigation }) => {
            return (
              <DetailHeader
                navigation={navigation}
                text={`#${scene.route.params?.tag}`}
              />
            );
          },
          animationEnabled: false,
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
        name="profile"
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
        name="event"
        component={EventDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
