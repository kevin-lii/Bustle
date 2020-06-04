import React from "react";
import { View, Text } from "react-native-ui-lib";

import Icons from "../Image/Icons";

import { Theme } from "../../global/constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default ({
  active,
  label,
  icon,
  fontSize = 20,
  iconSize = 10,
  color = "white",
  pillColor = Theme.primary,
  onPress,
  defaultColor = Theme.primary,
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      row
      centerV
      style={{
        backgroundColor: active ? pillColor : "white",
        marginRight: 10,
        marginBottom: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 100,
        borderWidth: active ? 0 : 1,
        borderColor: defaultColor,
      }}
    >
      <View marginR-5>
        <Icons
          icon={icon}
          color={active ? "white" : defaultColor}
          size={iconSize}
        />
      </View>
      <Text style={{ fontSize }} color={active ? color : defaultColor}>
        {label}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);
