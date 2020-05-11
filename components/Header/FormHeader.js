import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, ThemeManager } from "react-native-ui-lib";

import TextButton from "../Buttons/TextButton";
import IconButton from "../Buttons/IconButton";

import { Theme } from "../../global/constants";

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
      <IconButton size={20} icon="close-a" onPress={onClose} fullSize />
    </View>
    <View center>
      {header}
      {title && <Text style={styles.text}>{title}</Text>}
    </View>
    <View center style={{ height: "100%" }}>
      <TextButton
        text={submitText}
        disabled={disabled}
        onPress={onSubmit}
        primary
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    height: 60,
    borderBottomColor: Theme.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingRight: 15,
    paddingLeft: 5,
    backgroundColor: Theme.defaultBackground,
  },
  text: {
    fontSize: 20,
    color: "#1c004b",
  },
});
