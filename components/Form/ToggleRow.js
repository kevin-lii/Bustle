import React from "react";
import { Text, View } from "react-native-ui-lib";

import ToggleSwitch from "./ToggleSwitch";

import globalStyle from "../../global/styles";
import { Theme } from "../../global/constants";
import { Switch } from "react-native";

export default ({
  icon,
  label,
  padding = 10,
  onChange,
  size = 50,
  underline = true,
  value,
}) => (
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
      thumbColor={value ? Theme.secondary : null}
      trackColor={{ true: "#ffc69b", false: null }}
    />
  </View>
);
