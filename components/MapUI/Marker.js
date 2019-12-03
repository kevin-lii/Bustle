import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import Icons from "../Image/Icons";
import EventDetails from "./EventBottomSheet";

import styles from "./styles";

export default function({ type, event, ...props }) {
  let icon;
  switch (type) {
    case "Dining":
      icon = (
        <Icons type="MaterialIcons" icon="food-fork-drink" color="white" />
      );
    case "Drinks":
      icon = <Icons type="Entypo" icon="drink" color="white" />;
    case "Business":
      icon = <Icons type="Entypo" icon="suitcase" color="white" size={20} />;
    case "Athletic":
      icon = <Icons icon="ios-basketball" color="white" />;
    case "Learn":
      icon = <Icons type="Entypo" icon="graduation-cap" color="white" />;
    case "Spiritual":
      icon = <Icons type="FontAwesome" icon="cross" color="white" />;
    case "Service":
      icon = <Icons type="MaterialIcons" icon="room-service" color="white" />;
    case "Social":
    default:
      icon = (
        <Icons type="MaterialIcons" icon="earth" color="white" size={25} />
      );
  }
  return <TouchableOpacity style={styles.marker}>{icon}</TouchableOpacity>;
}
