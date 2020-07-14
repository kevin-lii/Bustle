import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

export default function ({ count }) {
  return (
    <View style={styles.marker}>
      <Text style={styles.countText}>{count}</Text>
    </View>
  );
}
