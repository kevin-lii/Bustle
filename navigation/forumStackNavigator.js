import React from "react";
import { View } from "react-native-ui-lib";
import {
  useNavigationBuilder,
  StackRouter,
  createNavigatorFactory,
} from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import FeedScreen from "../screens/Page/Feed";
import PostDetail from "../screens/Detail/PostDetail";
import FeedHeader from "../components/Header/FeedHeader";
import DetailHeader from "../components/Header/DetailHeader";

const Stack = createStackNavigator();

export default function ForumStackNavigator() {
  return (
    <Stack.Navigator headerMode="screen" mode="card">
      <Stack.Screen
        name="forum"
        component={FeedScreen}
        options={{
          header: ({ scene, previous, navigation }) => {
            return <FeedHeader navigation={navigation} />;
          },
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
    </Stack.Navigator>
  );
}
