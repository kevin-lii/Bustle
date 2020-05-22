import React from "react";
import { Button, View, Text } from "react-native-ui-lib";

import { Theme } from "../../global/constants";

export default ({ primary, secondary, text, onPress, disabled, style }) => (
  <Button
    label={text}
    color={primary ? "white" : Theme.secondary}
    backgroundColor={primary ? Theme.primary : "white"}
    outlineColor={primary ? Theme.primary : Theme.secondary}
    outlineWidth={1}
    size="large"
    borderRadius={10}
    onPress={onPress}
    disabled={disabled}
    style={style}
  />
);
