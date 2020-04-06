import React from "react";
import { View, TouchableOpacity, Image } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/Fontisto";

import Vector from "../Image/Icons/Vector.png";

import styles from "./styles";
import globalStyles from "../../global/styles";

export default ({ toggleOverlay }) => (
  <TouchableOpacity
    style={[styles.button, styles.addButton, globalStyles.overlayElementShadow]}
    onPress={toggleOverlay}
  >
    <View center>
      <Image source={Vector} />
    </View>
  </TouchableOpacity>
);
