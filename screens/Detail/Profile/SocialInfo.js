import React from "react";
import { StyleSheet, Linking } from "react-native";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import { SocialIcon } from "react-native-elements";

import { Theme } from "../../../global/constants";
import { openURL } from "../../../global/utils";
import Icons from "../../../components/Image/Icons";
import AvatarButton from "../../../components/Buttons/AvatarButton";
import ActionButton from "../../../components/Buttons/ActionButton";

export default function ({ route, navigation }) {
  const user = route.params?.user;
  return (
    <View style={styles.container}>
      <View centerV style={styles.header}>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icons icon="arrow-left" size={25} color={Theme.primary} />
        </TouchableOpacity>
      </View>
      <View center style={{ height: "100%", width: "100%", marginBottom: 5 }}>
        <AvatarButton
          photoURL={user.photoURL + "?height=150"}
          init={user.displayName}
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
            {"C/O: " + user.year}
          </Text>
        )}
        {user.snapchat && (
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
            <Icons type="Font" icon="snapchat-ghost" size={25} color="white" />
          </ActionButton>
        )}
        {user.twitter && (
          <SocialIcon
            button
            type="twitter"
            onPress={() => openURL(user.twitter, "twitter")}
            style={{ marginVertical: 10 }}
          />
        )}
        {user.instagram && (
          <SocialIcon
            button
            type="instagram"
            onPress={() => openURL(user.instagram, "instagram")}
            style={{ marginVertical: 10, width: "100%" }}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  header: {
    position: "absolute",
    top: 15,
    left: 20,
  },
});
