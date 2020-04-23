import React from "react";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Custom from "./Icons/index";

import { Theme } from "../../global/constants";

export default function Icons({
  type = Theme.icon,
  icon,
  iconOff,
  onChange,
  size,
  color = Theme.primary,
  onPress,
}) {
  switch (type) {
    case "Custom":
      return (
        <Custom color={color} size={size} name={onChange ? icon : iconOff} />
      );
    case "Fontisto":
      return (
        <Fontisto
          name={onChange ? icon : iconOff}
          onPress={onPress}
          size={size}
          color={color}
        ></Fontisto>
      );
    case "Entypo":
      return (
        <Entypo
          name={onChange ? icon : iconOff}
          onPress={onPress}
          size={size}
          color={color}
        ></Entypo>
      );
    case "Feather":
      return (
        <Feather
          name={onChange ? icon : iconOff}
          onPress={onPress}
          size={size}
          color={color}
        ></Feather>
      );
    case "Foundation":
      return (
        <Foundation
          name={onChange ? icon : iconOff}
          onPress={onPress}
          size={size}
          color={color}
        ></Foundation>
      );
    case "MaterialIcons":
      return (
        <MaterialIcons
          name={onChange ? icon : iconOff}
          onPress={onPress}
          size={size}
          color={color}
        ></MaterialIcons>
      );
    case "FontAwesome5":
    case "FontAwesome":
    case "Font":
      return (
        <FontAwesome
          name={onChange ? icon : iconOff}
          onPress={onPress}
          size={size}
          color={color}
        ></FontAwesome>
      );
    case "Ionicons":
    default:
      return (
        <Icon
          name={onChange ? icon : iconOff}
          onPress={onPress}
          size={size}
          color={color}
        ></Icon>
      );
  }
}

Icons.defaultProps = {
  onChange: true,
};
