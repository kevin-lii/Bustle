import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import IconImage from "../../../../components/Image/IconImage";
import { UserContext } from "../../../../dataContainers/context";

export function HeaderRight({ navigation }) {
  const margin = 30;

  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={{
        marginTop: margin,
        marginRight: margin,
      }}
    >
      <UserContext.Consumer>
        {(user) => <IconImage source={{ uri: user ? user.photoURL : "" }} />}
      </UserContext.Consumer>
    </TouchableOpacity>
  );
}

export function HeaderLeft(props) {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text>Search...</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 200,
    borderRadius: 10,
    marginTop: 30,
    marginLeft: 20,
    backgroundColor: "white",
  },
});
