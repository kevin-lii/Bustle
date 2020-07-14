import React, { useRef } from "react";
import { Text, View, TouchableOpacity, Animated } from "react-native";

import styles from "../Form/styles";
import globalStyles from "../../global/styles";

import { Theme } from "../../global/constants";
import Icons from "../Image/Icons";

function calculateIconSize(size) {
  switch (size) {
    case "small":
      return 14;
    case "medium":
      return 16;
    case "large":
      return 20;
    default:
      return 14;
  }
}

function calculateDimensions(size) {
  switch (size) {
    case "small":
      return {
        width: 40,
        padding: 10,
        circleWidth: 15,
        circleHeight: 15,
        translateX: 22,
      };
    case "medium":
      return {
        width: 56,
        padding: 17,
        circleWidth: 28,
        circleHeight: 28,
        translateX: 38,
      };
    case "large":
      return {
        width: 70,
        padding: 20,
        circleWidth: 30,
        circleHeight: 30,
        translateX: 38,
      };
    default:
      return {
        width: 60,
        padding: 22,
        circleWidth: 35,
        circleHeight: 35,
        translateX: 44,
      };
  }
}

export default ({
  isOn,
  onToggle,
  disabled,
  labelStyle,
  label,
  icon,
  offIcon,
  onColor = Theme.primary,
  offColor = "white",
  size,
  shadow = true,
  border,
}) => {
  const offsetX = useRef(new Animated.Value(0)).current;
  const dimensions = calculateDimensions(size);

  const createToggleSwitchStyle = () => ({
    justifyContent: "center",
    width: dimensions.width,
    borderRadius: 30,
    padding: dimensions.padding,
    backgroundColor: isOn ? onColor : offColor,
    borderColor: Theme.primary,
    borderWidth: border ? 2 : 0,
  });

  const createInsideCircleStyle = () => ({
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    position: "absolute",
    backgroundColor: isOn ? offColor : onColor,
    transform: [{ translateX: offsetX }],
    width: dimensions.circleWidth,
    height: dimensions.circleHeight,
    borderRadius: dimensions.circleWidth / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1.5,
  });

  const iconSize = calculateIconSize(size);
  const iconColor = isOn ? onColor : offColor;
  const toValue = isOn ? dimensions.width - dimensions.translateX : 0;

  Animated.timing(offsetX, {
    toValue,
    duration: 300,
    useNativeDriver: true,
  }).start();

  return (
    <View style={styles.toggleContainer}>
      {label ? (
        <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
      ) : null}
      <TouchableOpacity
        style={[
          createToggleSwitchStyle(),
          shadow ? globalStyles.overlayElementShadow : null,
        ]}
        activeOpacity={0.8}
        onPress={() => (disabled ? null : onToggle(!isOn))}
      >
        <Animated.View style={createInsideCircleStyle()}>
          {isOn && <Icons icon={icon} color={iconColor} size={iconSize} />}
          {!isOn && (
            <Icons icon={offIcon || icon} color={iconColor} size={iconSize} />
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};
