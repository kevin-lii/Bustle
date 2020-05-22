import React from "react";
import { View, Text } from "react-native-ui-lib";

import Icons from "../Image/Icons";

import { Theme } from "../../global/constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default ({
  active,
  label,
  icon,
  size,
  color,
  pillColor = Theme.primary,
  onPress,
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
        borderColor: Theme.primary,
      }}
    >
      <View marginR-5>
        <Icons icon={icon} color={active ? "white" : Theme.primary} size={10} />
      </View>
      <Text
        style={{ fontSize: size || 20 }}
        color={active ? color : Theme.primary}
      >
        {label}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);
