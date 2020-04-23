import React from "react";
import { View, TouchableOpacity, Image } from "react-native-ui-lib";

import styles from "./styles";
import globalStyles from "../../global/styles";
import Icons from "../Image/Icons";

export default ({ onPress, onState }) => (
  <TouchableOpacity
    style={[styles.button, styles.addButton, globalStyles.overlayElementShadow]}
    onPress={onPress}
  >
    <View center>
      <Icons
        type="Custom"
        onChange={onState}
        icon="post-plus"
        iconOff="map-plus"
        size={24}
      />
    </View>
  </TouchableOpacity>
);
