import React from "react";
import { View, TouchableOpacity, Image } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/Fontisto";

import Vector from "../Image/Icons/Vector.png";

import styles from "./styles";
import globalStyles from "../../global/styles";

export default ({ onPress }) => (
  <TouchableOpacity
    style={[styles.button, styles.addButton, globalStyles.overlayElementShadow]}
    onPress={onPress}
  >
    <View center>
      <Image source={Vector} />
    </View>
  </TouchableOpacity>
);
