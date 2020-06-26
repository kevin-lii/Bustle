import React from "react";
import { TouchableOpacity, View } from "react-native";

import Icons from "../Image/Icons";
import { Theme } from "../../global/constants";

export default ({
  size = 30,
  icon,
  color,
  type,
  onPress,
  iconStyle,
  containerStyle,
  hitBox = {
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
  },
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[containerStyle, { justifyContent: "center", alignItems: "center" }]}
    hitSlop={hitBox}
  >
    <View center>
      <Icons
        type={type}
        size={size}
        icon={icon}
        color={color}
        style={iconStyle}
      />
    </View>
  </TouchableOpacity>
);
