import React from "react";
import { View, Text } from "react-native-ui-lib";
import { TouchableWithoutFeedback } from "react-native";

import Icon from "../Image/Icons";
import { Theme } from "../../global/constants";

export default ({
  size = 50,
  state = false,
  onText = "",
  offText = "",
  onToggle = () => {}
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
          uponChange={state}
          color={state ? Theme.secondary : null}
          size={size}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
