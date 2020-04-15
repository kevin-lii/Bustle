import React from "react";
import { View } from "react-native-ui-lib";

export default ({ left, right }) => (
  <View style={{ height: 50, backgroundColor: "white" }}>
    <View absL>{left}</View>
    <View absR>{right}</View>
  </View>
);
