import React from "react";
import { View, TouchableOpacity, Image } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/Fontisto";

import Vector from "../Image/Icons/Vector.png";

import styles from "./styles";

export default ({ toggleOverlay }) => (
  <TouchableOpacity
    style={[styles.button, styles.addButton]}
    onPress={toggleOverlay}
  >
    <View center>
      <Image source={Vector} />
    </View>
  </TouchableOpacity>
);
