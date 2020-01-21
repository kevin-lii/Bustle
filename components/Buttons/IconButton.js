import React from "react";
import { TouchableOpacity, View } from "react-native";

import Icons from "../Image/Icons";
import { Theme } from "../../constants";

const iconContainer = {
  height: "100%",
  width: "100%",
  alignItems: "center",
  justifyContent: "center"
};

export default ({
  size,
  icon,
  color,
  type,
  onPress,
  touchStyle,
  iconStyle
}) => (
  <TouchableOpacity onPress={onPress} style={touchStyle}>
    <View style={iconContainer}>
      <Icons
        type={Theme.icon}
        size={size || 30}
        icon={icon}
        type={type}
        color={color || Theme.primary}
        style={iconStyle}
      />
    </View>
  </TouchableOpacity>
);
