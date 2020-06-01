import React, { useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import { TabView, TabBar } from "react-native-tab-view";
import { connect } from "react-redux";

import Icons from "../../../components/Image/Icons";
import AvatarButton from "../../../components/Buttons/AvatarButton";
import { Theme } from "../../../global/constants";
import ProfileEvent from "./ProfileEvent";
import ProfileActivity from "./ProfileActivity";
import ProfileHosted from "./ProfileHosted";
import ActionButton from "../../../components/Buttons/ActionButton";
import FormTypes from "../../../components/Form/FormTypes";
import { navigatePath } from "../../../global/utils";

function Profile({ navigation, foreignUser, currentUser }) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "events", title: "Past Events" },
    { key: "hosted", title: "Hosted Events" },
    { key: "activity", title: "Activity" },
  ]);
  const user = foreignUser ? foreignUser : currentUser;
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "activity":
        return (
          <ProfileActivity isCurrentUser user={user} navigation={navigation} />
        );
      case "hosted":
        return (
          <ProfileHosted isCurrentUser user={user} navigation={navigation} />
        );
      case "events":
      default:
        return (
          <ProfileEvent isCurrentUser user={user} navigation={navigation} />
        );
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ ...styles.imageContainer, height: 150 }}>
        <ImageBackground
          source={user.coverPhotoURL ? { uri: user.coverPhotoURL } : null}
          style={styles.image}
        >
          <View
            row
            style={{
              paddingHorizontal: 20,
              paddingTop: 15,
              flex: 1,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View centerV center style={styles.iconCircle}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icons icon="arrow-left" size={25} color={Theme.primary} />
              </TouchableOpacity>
            </View>
            {!foreignUser && (
              <View centerV center style={styles.iconCircle}>
                <TouchableOpacity
                  // onPress={() => navigation.navigate("newUser")}
                  onPress={() =>
                    navigatePath(navigation, `modal/${FormTypes.PROFILE_EDIT}`)
                  }
                >
                  <Icons
                    icon="player-settings"
                    type="Fontisto"
                    size={25}
                    color={Theme.primary}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 15,
          marginTop: -50,
        }}
      >
        <AvatarButton
          photoURL={user.photoURL}
          init={user.displayName}
          size={150}
          borderColor={Theme.primary}
          borderWidth={2}
        />
        <View
          style={{
            marginLeft: "10%",
            width: "40%",
            alignContent: "center",
            marginTop: 60,
          }}
        >
          <Text
            numberOfLines={1}
            text60
            style={{ fontWeight: "bold", alignSelf: "center" }}
          >
            {user.displayName}
          </Text>
          <ActionButton
            text="Social Info"
            onPress={() => navigation.navigate("SocialInfo", { user })}
            primary
            style={{
              width: "100%",
              borderRadius: 50,
              borderWidth: 0,
              marginVertical: 10,
            }}
          />
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
    opacity: 0.75,
  },
  iconCircle: {
    backgroundColor: "white",
    opacity: 1,
    borderRadius: 20,
    height: 35,
    width: 35,
  },
});

export default connect((state) => ({ currentUser: state.user }), {})(Profile);
