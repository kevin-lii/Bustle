import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";

import IconButton from "../../../components/Buttons/IconButton";

import { Theme } from "../../../global/constants";

export default ({
  title,
  header,
  submitText,
  onSubmit,
  onClose,
  disabled = false,
}) => (
  <View row style={styles.container}>
    <View center style={{ height: "100%" }}>
      <IconButton
        size={20}
        type="Fontisto"
        icon="close-a"
        onPress={onClose}
        fullSize
        color={Theme.primary}
        containerStyle={{ marginHorizontal: 10 }}
        hitBox={{ top: 10, bottom: 10, left: 10, right: 10 }}
      />
    </View>
    <View center>
      {header}
      {title && <Text style={styles.text}>{title}</Text>}
    </View>
    <TouchableOpacity
      onPress={onSubmit}
      style={styles.button}
      disabled={disabled}
    >
      <Text text60 color={Theme.primary}>
        {submitText}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    height: 60,
    borderBottomColor: Theme.grey,
    paddingRight: 15,
    paddingLeft: 5,
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
  },
  button: {
    height: "100%",
    minHeight: "100%",
    maxHeight: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
