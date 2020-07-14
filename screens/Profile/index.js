import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import { TabView, TabBar } from "react-native-tab-view";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import Icons from "../../components/Image/Icons";
import AvatarButton from "../../components/Buttons/AvatarButton";
import ProfileEvent from "./Subtabs/ProfileEvent";
import ProfileHosted from "./Subtabs/ProfileHosted";
import ActionButton from "../../components/Buttons/ActionButton";
import FormTypes from "../../components/Form/FormTypes";
import UserModel from "../../models/User";
import IconButton from "../../components/Buttons/IconButton";

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
      <View style={{ ...styles.imageContainer, height: 150 }}>
        <ImageBackground
          source={user.coverPhotoURL ? { uri: user.coverPhotoURL } : null}
          style={styles.image}
        >
          <View
            flex
            row
            spread
            paddingT-15
            paddingH-20
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
        </ImageBackground>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 15,
          marginTop: -50,
          // backgroundColor: "white"
        }}
      >
        <AvatarButton
          photoURL={user.photoURL}
          name={user.displayName}
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
            onPress={() => navigation.navigate("socialinfo", { user })}
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
    </SafeAreaView>
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

export default connect((state) => ({ currentUser: state.user }), {})(Profile);
