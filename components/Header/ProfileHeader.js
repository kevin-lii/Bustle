import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Icons from "../Image/Icons";
import TextButton from "../Buttons/TextButton";

export function HeaderLeft({ navigation, ...props }) {
  return (
    <Icons
      type="Ionicons"
      icon="md-arrow-back"
      size={30}
      onPress={() => navigation.navigate("Map")}
    />
  );
}

export function HeaderRight({ navigation, ...props }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Edit")}>
      <Text>edit</Text>
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
    backgroundColor: "white"
  }
});
