import React from "react";
import { Button, View, Text } from "react-native-ui-lib";

import { Theme } from "../../global/constants";

export default ({
  primary,
  secondary,
  text,
  onPress,
  disabled,
  style,
  children,
  outlineWidth = 1,
  backgroundColor = "white",
  color = Theme.secondary,
  borderColor = Theme.secondary,
  borderRadius = 30,
}) => (
  <Button
    label={text}
    color={primary ? "white" : color}
    backgroundColor={primary ? Theme.primary : backgroundColor}
    outlineColor={primary ? Theme.primary : borderColor}
    outlineWidth={outlineWidth}
    size="large"
    borderRadius={borderRadius}
    onPress={onPress}
    disabled={disabled}
    style={style}
  >
    {children}
  </Button>
);
