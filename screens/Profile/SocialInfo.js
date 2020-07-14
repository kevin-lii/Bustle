import React from "react";
import { StyleSheet } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import { SocialIcon } from "react-native-elements";

import Icons from "../../components/Image/Icons";
import AvatarButton from "../../components/Buttons/AvatarButton";
import ActionButton from "../../components/Buttons/ActionButton";

import { Theme } from "../../global/constants";
import { openURL } from "../../global/utils";

export default function ({ route, navigation }) {
  const user = route.params?.user;
  const insets = useSafeArea();
  return (
    <View flex style={styles.container}>
      <View centerV style={{ ...styles.header, top: 10 + insets.top }}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icons
            type="MaterialIcons"
            icon="arrow-left"
            size={30}
            color={Theme.primary}
          />
        </TouchableOpacity>
      </View>
      <View center style={{ height: "100%", width: "100%", marginBottom: 5 }}>
        <AvatarButton
          photoURL={user.photoURL}
          name={user.displayName}
          size={100}
          borderColor={Theme.primary}
          borderWidth={2}
        />
        <Text text50 style={{ marginVertical: 5, fontWeight: "bold" }}>
          {user.displayName}
        </Text>
        {user.college && (
          <Text text70 style={{ marginVertical: 5, fontWeight: "bold" }}>
            {user.college}
          </Text>
        )}
        {user.major && (
          <Text text70 style={{ marginVertical: 5, fontWeight: "bold" }}>
            {"Major: " + user.major}
          </Text>
        )}
        {user.year && (
          <Text text70 style={{ marginVertical: 5, fontWeight: "bold" }}>
            {"Class of " + user.year}
          </Text>
        )}
        {Boolean(user.snapchat) && (
          <ActionButton
            backgroundColor="#FFFC00"
            onPress={() => openURL(user.snapchat, "snapchat")}
            style={{
              width: "100%",
              borderRadius: 50,
              borderWidth: 0,
              marginVertical: 10,
            }}
          >
            <Icons type="Font5" icon="snapchat-ghost" size={25} color="white" />
          </ActionButton>
        )}
        {Boolean(user.twitter) && (
          <SocialIcon
            button
            type="twitter"
            onPress={() => openURL(user.twitter, "twitter")}
            style={{ marginVertical: 10, width: "100%" }}
          />
        )}
        {Boolean(user.instagram) && (
          <SocialIcon
            button
            type="instagram"
            onPress={() => openURL(user.instagram, "instagram")}
            style={{ marginVertical: 10, width: "100%" }}
          />
        )}
        {Boolean(user.linkedin) && (
          <SocialIcon
            button
            type="linkedin"
            onPress={() => openURL(user.linkedin, "linkedin")}
            style={{ marginVertical: 10, width: "100%" }}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  header: {
    position: "absolute",
    left: 20,
    zIndex: 1,
  },
});
