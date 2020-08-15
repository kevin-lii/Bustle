import React, { useState, useEffect } from "react";
import _ from "lodash";
import { StyleSheet, ScrollView } from "react-native";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import { TabView, TabBar } from "react-native-tab-view";
import { connect } from "react-redux";
import { useSafeArea } from "react-native-safe-area-context";

import Icons from "../../components/Image/Icons";
import AvatarButton from "../../components/Buttons/AvatarButton";
import ProfileEvent from "./Subtabs/ProfileEvent";
import ProfileHosted from "./Subtabs/ProfileHosted";
import ActionButton from "../../components/Buttons/ActionButton";
import FormTypes from "../../components/Form/FormTypes";
import IconButton from "../../components/Buttons/IconButton";
import { SocialIcon } from "react-native-elements";
import { trimString } from "../../global/utils";
import { openURL } from "../../global/utils";

import { Theme } from "../../global/constants";
import globalStyles from "../../global/styles";

function Profile({ navigation, route, currentUser, auth }) {
  const isForeign =
    route.params?.user && route.params.user._id.toString() !== auth.id;
  const [user, setUser] = useState(isForeign ? route.params.user : currentUser);
  const [loading, setLoading] = useState(0);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    navigation.addListener(
      "focus",
      () => {
        setUser(isForeign ? route.params.user : currentUser);
        setLoading(loading + 1);
      },
      []
    );
  });
  const routes = [
    { key: "events", title: "Past" },
    { key: "hosted", title: "Hosted" },
  ];

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
    <ScrollView
      style={{
        ...styles.container,
        marginTop: useSafeArea().top,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ backgroundColor: "white" }}>
        <View
          flex
          row
          spread
          centerV
          style={{
            width: "100%",
            paddingTop: 0,
            paddingTop: 15,
            paddingHorizontal: 15,
            marginBottom: 10,
          }}
        >
          {route.params?.user ? (
            <IconButton
              containerStyle={styles.iconCircle}
              type="MaterialIcons"
              icon="arrow-left"
              color={Theme.primary}
              size={30}
              onPress={navigation.goBack}
            />
          ) : (
            <View />
          )}
          {!isForeign && (
            <View center style={styles.iconCircle}>
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

        <View style={{ paddingHorizontal: 20 }}>
          <View row spread>
            <View centerV style={{ marginBottom: 10 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 30, paddingBottom: 5 }}
              >
                {user.displayName}
              </Text>
              {Boolean(user.major) && (
                <Text
                  style={{
                    fontSize: 15,
                  }}
                >
                  <Text maxLength={20} style={{ fontWeight: "bold" }}>
                    {" "}
                    Major:{" "}
                  </Text>{" "}
                  {user.major}
                </Text>
              )}

              {Boolean(user.year) && (
                <Text
                  style={{
                    fontSize: 15,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}> Year: </Text>{" "}
                  {user.year}
                </Text>
              )}
              {Boolean(user.location) && (
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 5,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Location: </Text>{" "}
                  {trimString(user.location, 25)}
                </Text>
              )}
            </View>
            <View>
              <AvatarButton
                photoURL={user.photoURL}
                name={user.displayName}
                size={100}
                borderColor={Theme.primary}
                borderWidth={2}
              />
            </View>
          </View>
          {Boolean(user.classes?.length > 0) && (
            <Text
              style={{
                marginBottom: 5,
                fontSize: 17.5,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Classes: </Text>{" "}
              {user.classes.join(", ")}
            </Text>
          )}
          {/* <View style={{ flexDirection: "row", marginLeft: 15 }}>
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
            </View> */}
          <View row centerV>
            {Boolean(user.instagram) && (
              <SocialIcon
                type="instagram"
                onPress={() => openURL(user.instagram, "instagram")}
              ></SocialIcon>
            )}
            {Boolean(user.snapchat) && (
              <ActionButton
                backgroundColor="#FFFC00"
                onPress={() => openURL(user.snapchat, "snapchat")}
                round
                borderRadius={50}
                style={{
                  borderWidth: 0,
                  height: 55,
                  width: 55,
                  marginHorizontal: 5,
                }}
              >
                <Icons
                  type="Font5"
                  icon="snapchat-ghost"
                  size={25}
                  color="white"
                />
              </ActionButton>
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

export default connect(
  (state) => ({
    currentUser: state.user,
    auth: state.auth,
  }),
  {}
)(Profile);
