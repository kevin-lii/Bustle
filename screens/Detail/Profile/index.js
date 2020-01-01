import React from "react";
import { Text, View } from "react-native";

import { UserContext } from "../../../dataContainers/context";
import IconImage from "../../../components/Image/IconImage";

export default function Profile({ navigation }) {
  return (
    <View>
      <UserContext.Consumer>
        {user => <IconImage source={{ uri: user ? user.photoURL : "" }} />}
      </UserContext.Consumer>
      <UserContext.Consumer>
        {user => <Text>{user.displayName}</Text>}
      </UserContext.Consumer>
    </View>
  );
}
