import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, ScrollView } from "react-native";
import auth from "@react-native-firebase/auth";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import { TabView, TabBar } from "react-native-tab-view";
import { connect } from "react-redux";
import { SafeAreaView, useSafeArea } from "react-native-safe-area-context";

import Icons from "../../components/Image/Icons";
import AvatarButton from "../../components/Buttons/AvatarButton";
import ProfileEvent from "./Subtabs/ProfileEvent";
import ProfileHosted from "./Subtabs/ProfileHosted";
import ActionButton from "../../components/Buttons/ActionButton";
import FormTypes from "../../components/Form/FormTypes";
import UserModel from "../../models/User";
import IconButton from "../../components/Buttons/IconButton";
import { SocialIcon } from "react-native-elements";
import { openURL } from "../../global/utils";

import { Theme } from "../../global/constants";
import globalStyles from "../../global/styles";

function Profile({ navigation, route, currentUser }) {
  const isForeign =
    route.params?.user && route.params.user.uid !== auth().currentUser.uid;
  const [foreignUser, setUser] = useState(route.params?.user);

  const [index, setIndex] = useState(0);
  const routes = [
    { key: "events", title: "Past" },
    { key: "hosted", title: "Hosted" },
  ];

  useEffect(() => {
    if (isForeign)
      UserModel.get(route.params.user.uid).then((item) => setUser(item));
  }, []);

  const user = isForeign ? foreignUser : currentUser;
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "hosted":
        return (
          <ProfileHosted
            isCurrentUser={!isForeign}
            user={user}
            navigation={navigation}
          />
        );
      case "events":
      default:
        return (
          <ProfileEvent
            isCurrentUser={!isForeign}
            user={user}
            navigation={navigation}
            focused={!index}
          />
        );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View
          flex
          row
          spread
          //paddingT
          // paddingH-20
          style={{ width: "100%" }}
        >
          {route.params?.user && (
            <IconButton
              containerStyle={styles.iconCircle}
              type="MaterialIcons"
              icon="arrow-left"
              color={Theme.primary}
              size={30}
              onPress={navigation.goBack}
            />
          )}
          {!isForeign && (
            <View
              center
              absT
              absR
              marginT-15
              marginR-15
              style={styles.iconCircle}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate(FormTypes.PROFILE_EDIT)}
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

        <ActionButton
          text="Discover"
          onPress={() => navigation.navigate("Discover")}
        ></ActionButton>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
            marginTop: 10,
            marginLeft: 20,

            // backgroundColor: "white"
          }}
        >
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontWeight: "bold", fontSize: 28, marginLeft: 15 }}>
              {" "}
              {user.displayName} {"\n"}{" "}
            </Text>
            <Text style={{ marginLeft: 15 }}>
              <Text style={{ fontWeight: "bold", fontSize: 17 }}> Major: </Text>
              {Boolean(user.major) && (
                <Text
                  style={{
                    marginVertical: 5,
                    fontWeight: "normal",
                    fontSize: 17,
                  }}
                >
                  {user.major}
                </Text>
              )}
              <Text style={{ fontWeight: "bold", fontSize: 17 }}> Year: </Text>

              {Boolean(user.year) && (
                <Text
                  style={{
                    marginVertical: 5,
                    fontWeight: "normal",
                    fontSize: 17,
                  }}
                >
                  {user.year}
                  {"\n"}
                </Text>
              )}
            </Text>
            <Text style={{ marginLeft: 15 }}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                Organizations:{" "}
              </Text>
              {Boolean(user.bio) && (
                <Text
                  text70
                  style={{
                    marginVertical: 5,
                    fontWeight: "normal",
                    fontSize: 15,
                  }}
                >
                  {user.bio}
                  {"\n"}
                </Text>
              )}
            </Text>
            <View style={{ flexDirection: "row", marginLeft: 15 }}>
              <ActionButton
                text="Interested in"
                primary
                size="small"
                style={{ width: "40%" }}
              />
              <ActionButton
                text="I think you're.."
                primary
                size="small"
                style={{ width: "40%" }}
              />
            </View>
            <View style={{ flexDirection: "row", marginLeft: 15 }}>
              {Boolean(user.instagram) && (
                <SocialIcon
                  type="instagram"
                  onPress={() => openURL(user.instagram, "instagram")}
                ></SocialIcon>
              )}

              {Boolean(user.twitter) && (
                <SocialIcon
                  type="twitter"
                  onPress={() => openURL(user.twitter, "twitter")}
                ></SocialIcon>
              )}
              {Boolean(user.linkedin) && (
                <SocialIcon
                  type="linkedin"
                  onPress={() => openURL(user.linkedin, "linkedin")}
                ></SocialIcon>
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              marginTop: -180,
              marginLeft: "-15%",
            }}
          >
            <AvatarButton
              photoURL={user.photoURL}
              name={user.displayName}
              size={100}
              borderColor={Theme.primary}
              borderWidth={2}
            />
          </View>
        </View>

        <TabView
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: Theme.primary }}
              style={{ backgroundColor: "white" }}
              activeColor={Theme.primary}
              inactiveColor={Theme.secondary}
            />
          )}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          lazy
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    backgroundColor: Theme.disabled,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
  iconCircle: {
    backgroundColor: "white",
    borderRadius: 20,
    height: 40,
    width: 40,
    ...globalStyles.overlayElementShadow,
  },
});

export default connect((state) => ({ currentUser: state.user }), {})(Profile);
