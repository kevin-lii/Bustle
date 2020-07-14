import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

export default function Invites({ navigation }) {
  return (
    <View>
      <TouchableOpacity onPress={navigation.openDrawer}>
        <Text>Invites</Text>
      </TouchableOpacity>
    </View>
  );
}
