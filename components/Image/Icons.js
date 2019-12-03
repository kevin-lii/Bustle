import React from "react";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/Ionicons";

export default function Icons({
  type,
  icon,
  iconOff,
  uponChange,
  size,
  color,
  onPress
}) {
  switch (type) {
    case "Entypo":
      return (
        <Entypo
          name={uponChange ? icon : iconOff}
          onPress={onPress}
          size={size}
          color={color}
        ></Entypo>
      );
    case "Feather":
      return (
        <Feather
          name={uponChange ? icon : iconOff}
          onPress={onPress}
          size={size}
          color={color}
        ></Feather>
      );
    case "Foundation":
      return (
        <Foundation
          name={uponChange ? icon : iconOff}
          onPress={onPress}
          size={size}
          color={color}
        ></Foundation>
      );
    case "MaterialIcons":
      return (
        <MaterialIcons
          name={uponChange ? icon : iconOff}
          onPress={onPress}
          size={size}
          color={color}
        ></MaterialIcons>
      );
    case "FontAwesome":
      <FontAwesome
        name={uponChange ? icon : iconOff}
        onPress={onPress}
        size={size}
        color={color}
      ></FontAwesome>;
    case "Ionicons":
    default:
      return (
        <Icon
          name={uponChange ? icon : iconOff}
          onPress={onPress}
          size={size}
          color={color}
        ></Icon>
      );
  }
}

Icons.defaultProps = {
  uponChange: true
};
