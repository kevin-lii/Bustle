import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";

import UserModel from "../../models/User";
import Avatar from "../Buttons/AvatarButton";

export default ({ navigation, size = 25, user }) => {
  const [userInfo, setUser] = useState(user);
  useEffect(() => {
    UserModel.get(user.uid).then((user) => setUser(user));
  }, []);

  return (
    <TouchableOpacity onPress={() => navigation.push("profile", { user })}>
      <View marginT-5 centerV row>
        <Avatar
          photoURL={userInfo.photoURL}
          name={userInfo.displayName}
          size={size}
          shadow={false}
          borderWidth={1}
        />
        <Text marginL-7 numberOfLines={1} style={{ fontSize: size * 0.6 }}>
          {userInfo.displayName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
