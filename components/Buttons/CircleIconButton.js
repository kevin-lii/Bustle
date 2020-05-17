import React from "react";
import { View, TouchableOpacity, Image } from "react-native-ui-lib";

import Icons from "../Image/Icons";

import styles from "./styles";
import globalStyles from "../../global/styles";

export default ({ onPress, icon, type, size = 20 }) => (
  <TouchableOpacity
    style={[styles.button, styles.addButton, globalStyles.overlayElementShadow]}
    onPress={onPress}
  >
    <View center>
      <Icons icon={icon} type={type} size={size} color="black" />
    </View>
  </TouchableOpacity>
);
