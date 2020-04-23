import React from "react";
import { View, Text } from "react-native-ui-lib";
import { TouchableWithoutFeedback } from "react-native";

import Icon from "../Image/Icons";
import { Theme } from "../../global/constants";

export default ({
  color = Theme.secondary,
  size = 50,
  state = false,
  onText = "",
  offText = "",
  onToggle = () => {},
}) => {
  return (
    <TouchableWithoutFeedback onPress={onToggle}>
      <View row centerV>
        <Text>
          {state ? onText : offText}
          {"\t"}
        </Text>
        <Icon
          icon="toggle-on"
          iconOff="toggle-off"
          onChange={state}
          color={state ? color : null}
          size={size}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
