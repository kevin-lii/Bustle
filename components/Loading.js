import React, { useEffect, useState } from "react";
import { Animated } from "react-native";
import { View, Text } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/Fontisto";
import { Theme } from "../global/constants";

export default function Loading() {
  return (
    <View flex center style={{ backgroundColor: "#ff801a" }}>
      <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
        bustle
      </Text>
    </View>
  );
}
