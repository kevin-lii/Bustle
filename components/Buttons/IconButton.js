import React from "react";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";

export default function IconButton({
  type,
  icon,
  iconOff,
  uponChange,
  size,
  onPress
}) {
  switch (type) {
    case "Entypo":
      return (
        <Entypo
          name={uponChange ? icon : iconOff}
          onPress={onPress}
          size={size}
        ></Entypo>
      );
    case "Feather":
      return (
        <Feather
          name={uponChange ? icon : iconOff}
          onPress={onPress}
          size={size}
        ></Feather>
      );
    case "Foundation":
      return (
        <Foundation
          name={uponChange ? icon : iconOff}
          onPress={onPress}
          size={size}
        ></Foundation>
      );
    case "MaterialIcons":
      return (
        <MaterialIcons
          name={uponChange ? icon : iconOff}
          onPress={onPress}
          size={size}
        ></MaterialIcons>
      );
    case "Ionicons":
    default:
      return (
        <Icon
          name={uponChange ? icon : iconOff}
          onPress={onPress}
          size={size}
        ></Icon>
      );
  }
}

IconButton.defaultProps = {
  uponChange: true
};
