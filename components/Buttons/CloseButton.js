import React from "react";
import { View, TouchableOpacity, Image } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/Fontisto";

import styles from "./styles";
import globalStyles from "../../global/styles";

export default ({ onPress }) => (
  <TouchableOpacity
    style={[styles.button, styles.addButton, globalStyles.overlayElementShadow]}
    onPress={onPress}
  >
    <View center>
      <Icon name="close-a" size={20} />
    </View>
  </TouchableOpacity>
);
