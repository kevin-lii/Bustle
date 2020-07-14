import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { Switch } from "react-native";

import globalStyle from "../../../global/styles";
import { Theme } from "../../../global/constants";

export default ({
  icon,
  label,
  padding = 10,
  onChange,
  size = 50,
  underline = true,
  value,
}) => (
  <TouchableWithoutFeedback onPress={() => onChange(!value)}>
    <View
      style={[{ height: size + 10 }, underline && globalStyle.underline]}
      centerV
      spread
      row
    >
      <View row centerV>
        <View style={{ marginRight: padding }}>{icon}</View>
        <Text style={{ fontSize: size * 0.4 }}>{label}</Text>
      </View>
      <Switch
        onValueChange={onChange}
        value={value}
        thumbColor={value ? Theme.primary : null}
        trackColor={{ true: Theme.lightPrimary, false: null }}
      />
    </View>
  </TouchableWithoutFeedback>
);
