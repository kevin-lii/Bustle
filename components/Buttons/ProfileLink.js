import React from "react";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";

import Avatar from "../Buttons/AvatarButton";

export default ({ navigation, size = 25, user }) => (
  <TouchableOpacity onPress={() => navigation.push("profile", { user })}>
    <View marginT-5 centerV row>
      <Avatar
        photoURL={user.photoURL}
        name={user.displayName}
        size={size}
        shadow={false}
        borderWidth={1}
      />
      <Text marginL-7 numberOfLines={1} style={{ fontSize: size * 0.6 }}>
        {user.displayName}
      </Text>
    </View>
  </TouchableOpacity>
);
