import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import { UserContext } from "../../../dataContainers/context";
import Icons from "../../../components/Image/Icons";
import AvatarButton from "../../../components/Buttons/AvatarButton";
import { Theme } from "../../../global/constants";
import ProfileEvent from "./ProfileEvent";
import ProfileActivity from "./ProfileActivity";
import ProfileHosted from "./ProfileHosted";

export default function Profile({ navigation, uri }) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "events", title: "Events" },
    { key: "hosted", title: "Hosted Events" },
    { key: "activity", title: "Activity" },
  ]);
  const renderScene = SceneMap({
    events: ProfileEvent,
    hosted: ProfileHosted,
    activity: ProfileActivity,
  });
  return (
    <View style={styles.container}>
      <View style={{ ...styles.imageContainer, height: 150 }}>
        <ImageBackground source={uri ? { uri } : null} style={styles.image}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View>
              <TouchableOpacity>
                <Icons icon="arrow-left" size={25} />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Icons icon="player-settings" type="Fontisto" size={25} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <AvatarButton
          useUser
          size={130}
          borderColor={Theme.secondary}
          borderWidth={2}
        />
        <View
          style={{ marginLeft: "10%", width: "40%", alignContent: "center" }}
        >
          <UserContext.Consumer>
            {(user) => (
              <Text
                numberOfLines={1}
                style={{ fontSize: 25, fontWeight: "bold" }}
              >
                {user.displayName}
              </Text>
            )}
          </UserContext.Consumer>
          <Text>Hello</Text>
        </View>
      </View>
      <TabView
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: Theme.secondary }}
            style={{ backgroundColor: "white" }}
            activeColor={Theme.secondary}
            inactiveColor={Theme.secondary}
          />
        )}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: Theme.disabled,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});
