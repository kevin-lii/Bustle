import React from "react";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome5Pro";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
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
  color = Theme.grey,
  onPress,
  style,
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
          style={style}
        ></Fontisto>
      );
    case "Entypo":
      return (
        <Entypo
          name={onChange ? icon : iconOff}
          onPress={onPress}
          size={size}
          color={color}
          style={style}
        ></Entypo>
      );
    case "Feather":
      return (
        <Feather
          name={onChange ? icon : iconOff}
          onPress={onPress}
          size={size}
          color={color}
          style={style}
        ></Feather>
      );
    case "Foundation":
      return (
        <Foundation
          name={onChange ? icon : iconOff}
          onPress={onPress}
          size={size}
          color={color}
          style={style}
        ></Foundation>
      );
    case "MaterialIcons":
      return (
        <MaterialIcons
          name={onChange ? icon : iconOff}
          onPress={onPress}
          size={size}
          color={color}
          style={style}
        ></MaterialIcons>
      );
    case "FontAwesome":
    case "Font":
      return (
        <FontAwesome
          name={onChange ? icon : iconOff}
          onPress={onPress}
          size={size}
          color={color}
          style={style}
        ></FontAwesome>
      );

    case "FontAwesome5":
    case "Font5":
      return (
        <FontAwesome5
          name={onChange ? icon : iconOff}
          onPress={onPress}
          size={size}
          color={color}
          style={style}
        ></FontAwesome5>
      );

    case "Ionicons":
    default:
      return (
        <Icon
          name={onChange ? icon : iconOff}
          onPress={onPress}
          size={size}
          color={color}
          style={style}
        ></Icon>
      );
  }
}

Icons.defaultProps = {
  onChange: true,
};
