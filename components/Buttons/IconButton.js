import React from "react";
import { TouchableOpacity, View } from "react-native";

import Icons from "../Image/Icons";
import { Theme } from "../../global/constants";

const iconContainer = {
  alignItems: "center",
  justifyContent: "center",
};

export default ({
  size = 30,
  icon,
  color,
  type,
  onPress,
  touchStyle,
  iconStyle,
  fullSize,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      touchStyle,
      { justifyContent: "center" },
      fullSize && { height: "100%", width: "100%", padding: 10 },
    ]}
  >
    <View style={iconContainer}>
      <Icons
        type={type || Theme.icon}
        size={size}
        icon={icon}
        color={color || Theme.primary}
        style={iconStyle}
      />
    </View>
  </TouchableOpacity>
);
